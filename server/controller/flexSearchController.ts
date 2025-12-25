import type { Request, Response } from "express";
import FlexSearch from "flexsearch";
import Fuse from "fuse.js";
import fs from "fs";

// FlexSearch Document index
const flexIndex = new FlexSearch.Document({
  document: {
    id: "id",
    index: ["title", "description"],
  },
  tokenize: "forward",
  resolution: 9,
  minlength: 2,
  suggest: true,
  boost: {
    name: 2,
    category: 1.5,
  },
});

// Fuse.js options
const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ["title", "description"],
};

let fuseIndex: any = null;

// Sample data (MUST contain id)
const dataFile = new URL("../db.json", import.meta.url);
const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

async function loadDataIntoIndex() {
  for (const item of data) {
    flexIndex.add(item);
  }
  fuseIndex = new Fuse(data, fuseOptions);
}

loadDataIntoIndex();

export const search = async (req: Request, res: Response) => {
  const { searchValue } = req.body;
  if (!searchValue) return res.status(401).json([]);
  try {
    let results = flexIndex.search(searchValue, {
      limit: 50,
      enrich: true,
    });

    const fuseResults = fuseIndex.search(searchValue);

    const hasResults =
      results &&
      results.some((r: any) => Array.isArray(r.result) && r.result.length > 0);

    return res.json(
      fuseResults.map((r: any) => ({
        id: r.item.id,
        item: r.item,
      }))
    );
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

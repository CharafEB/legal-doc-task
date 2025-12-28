import Fuse from "fuse.js";
import fs from "fs";

// Fuse.js options
const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ["content"],
};

// Sample data (MUST contain id)
const dataFile = new URL(
  "../data/json/Best-Cases-19-7.26.json",
  import.meta.url
);
const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

const dataFile2 = new URL("../data/json/case_studies.json", import.meta.url);
const data2 = JSON.parse(fs.readFileSync(dataFile2, "utf-8"));

const fuseIndex = new Fuse(data, fuseOptions);

// identify the Fuse indexer
const AddNewDataIntoIndex = async (data: any) => {
  data.forEach((newData: any) => {
    fuseIndex.add(newData);
  });
};

await AddNewDataIntoIndex(data2);

export const fuseSearch = async (searchValue: string) => {
  try {
    const fuseResults = fuseIndex.search(searchValue);
    return fuseResults.map((r: any) => ({
      data: r.item,
    }));
  } catch (error) {}
};

import type { Request, Response, NextFunction } from "express";
import { fuseSearch } from "../service/fuseSearchService.ts";
import { AppError } from "../middleware/error.ts";

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { searchValue } = req.body;
  console.log(searchValue);

  if (!searchValue)
    throw new AppError(
      "Search value is missing",
      400,
      "BAD_REQUEST",
      "Please provide a search value",
      "Ensure the body contains 'searchValue'"
    );

  try {
    const searchResponse = await fuseSearch(searchValue);
    return res.json(searchResponse);
  } catch (err) {
    next(err);
  }
};

import type { Response, Request, NextFunction } from "express";
import { aiSummary } from "../service/summarizeDocService.ts";

import { AppError } from "../middleware/error.ts";

export const summarizeFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName } = req.body;
    if (!fileName) {
       return next(new AppError("Missing file name", 400, "BAD_REQUEST", "Please add one", "link"));
    }
    
    const result = await aiSummary(fileName);
    res.status(200).json({ message: "done", txt: result });
  } catch (error) {
    next(error); 
  }
};

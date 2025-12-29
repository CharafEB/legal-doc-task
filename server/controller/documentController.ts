import type { Request, Response, NextFunction } from "express";

import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../middleware/error.ts";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDocument = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const documentTitle = req.query.documentTitle;
  if (!documentTitle) {
    return next(
      new AppError(
        "Document title is required",
        400,
        "BAD_REQUEST",
        "Please provide a document title",
        "Ensure the query parameter 'documentTitle' is set"
      )
    );
  }

  try {
    const pdfPath = path.join(__dirname, "..", "data", "pdf", `${documentTitle}.pdf`);
    res.sendFile(pdfPath);
  } catch (error) {
    next(error);
  }
};

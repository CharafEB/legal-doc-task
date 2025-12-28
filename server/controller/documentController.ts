import type { Request, Response } from "express";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDocument = (req: Request, res: Response) => {
  const documentTitle = req.query.documentTitle;
  const pdfPath = path.join(__dirname, "data", "pdf", `${documentTitle}.pdf`);
  res.sendFile(pdfPath);
};

import type { Response, Request } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const summarizeFile = async (req: Request, res: Response) => {
  const { fileName } = req.body;
  if (!fileName)
    return res
      .status(400)
      .json({ message: "missing file name pease add one and try again " });

  try {
    const filePath = new URL(`../data/pdf/${fileName}.pdf`, import.meta.url);
    const pdfBase64 = fs.readFileSync(filePath).toString("base64");

    const result = await model.generateContent([
      { text: "Summarize this document" },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "summarizing done", txt: result.response.text() });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "failed to summarize", error: error.message });
  }
};

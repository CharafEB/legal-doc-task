import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const aiSummary = async (fileName: string) => {
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
    return result.response.text();
  } catch (error) {}
};

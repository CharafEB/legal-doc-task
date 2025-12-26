import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

type Document = {
  id: number;
  content: string;
};

const response: Array<Document> = [];

function bufferToUint8ArrayView(buf: Buffer) {
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

const PDFConverterToJSON = async (fileName: string) => {
  try {
    const data = new URL(`../data/pdf/${fileName}.pdf`, import.meta.url);
    const buffer = bufferToUint8ArrayView(Buffer.from(fs.readFileSync(data)));
    const path: any = new URL(`../data/json/${fileName}.json`, import.meta.url);

    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    //
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      var text: Document = { id: i, content: pageText };

      response.push(text);
    }

    let jsonString = JSON.stringify(response, null, 2);

    fs.writeFile(path, jsonString, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Successfully created user_data.json");
      }
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

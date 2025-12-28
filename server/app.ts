import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Import the router function for the main endpoint
import searchRouter from "./router/searchRouter.ts";
import summarizeDocRouter from "./router/summarizeDocRouter.ts";
import documentsRouter from "./router/documentsRouter.ts";
import { AppErrorMiddleware } from "./middleware/error.ts";
//config the env file
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3001;

// Define allowed origins
const allowedOrigins = ["http://localhost:3000"];

// Define CORS options
const options: any = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Apply CORS middleware with specific options
app.use(cors(options));
app.use(express.json());

//Handel the router
app.use("/search", searchRouter);
app.use("/summarize", summarizeDocRouter);
app.use("/document", documentsRouter);
app.use(AppErrorMiddleware);
//test router app;
const documents = [
  {
    id: 1,
    category: "Healthcare",
    title: "case19",
    description:
      "A comprehensive summary of patient rights regarding confidentiality and access to medical records under current legislation.",
    updatedAt: "2 days ago",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "Corporate",
    title: "case studies",
    description:
      "Guidelines governing the lawful termination of employment contracts, including notice periods and severance calculation.",
    updatedAt: "1 week ago",
    imageUrl:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Intellectual Property",
    title: "lw Clinic RT CaseStudiesHandout",
    description:
      "Overview of intellectual property rights for digital assets, covering copyright infringement and trademark registration.",
    updatedAt: "3 weeks ago",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
];
app.get("/", (req: any, res: any) => {
  res.status(200).json({ data: documents });
});

//fire up the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

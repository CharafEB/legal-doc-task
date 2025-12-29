import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//config the env file
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3001;

//Import the router function for the main endpoint
import searchRouter from "./router/searchRouter.ts";
import summarizeDocRouter from "./router/summarizeDocRouter.ts";
import documentsRouter from "./router/documentsRouter.ts";
import { AppErrorMiddleware } from "./middleware/error.ts";

// Define allowed origins
const allowedOrigins = [
  "https://legal-doc-task-5i1uie1f6-charafs-projects-9716ce19.vercel.app",
];

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

//fire up the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

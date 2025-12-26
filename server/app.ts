import express from "express";
import dotenv from "dotenv";

//Import the router function for the main endpoint
import searchRouter from "./router/searchRouter.ts";
import summarizeDocRouter from "./router/summarizeDocRouter.ts";

//config the env file
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

//Handel the router
app.use("/search", searchRouter);
app.use("/summarize", summarizeDocRouter);

//fire up the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

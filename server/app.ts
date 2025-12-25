import express from "express";
import searchRouter from "./router/searchRouter.ts";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

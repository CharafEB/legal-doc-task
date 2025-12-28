import { Router } from "express";
import { summarizeFile } from "../controller/summarizeDocController.ts";

const router = Router();

router.post("/", summarizeFile);

export default router;

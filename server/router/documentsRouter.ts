import { Router } from "express";

import { getDocument } from "../controller/documentController.ts";
const router = Router();

router.post("/", getDocument);

export default router;

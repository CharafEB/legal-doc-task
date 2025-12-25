import { Router } from "express";
import { search } from "../controller/flexSearchController.ts";
const router = Router();

router.post("/", search);

export default router;

import type { Response, Request } from "express";
import { Router } from "express";
import { getDocument } from "../controller/documentController.ts";
import { documents } from "../data/mockup.ts";
const router = Router();

router.post("/", getDocument);
router.get("/view", getDocument);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ data: documents });
});

export default router;

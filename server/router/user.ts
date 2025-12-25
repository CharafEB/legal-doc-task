import { Router } from "express";

const router = Router();

router.get("/", (req: any, res: any) => {
  res.status(200).json({ user: "hello from user" });
});

export default router;

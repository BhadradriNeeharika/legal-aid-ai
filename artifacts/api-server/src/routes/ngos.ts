import { Router, type IRouter } from "express";
import { db, ngosTable } from "@workspace/db";
import { GetNgosResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/ngos", async (_req, res): Promise<void> => {
  const ngos = await db.select().from(ngosTable);
  res.json(GetNgosResponse.parse(ngos));
});

export default router;

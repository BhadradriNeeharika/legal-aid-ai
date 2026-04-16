import { Router, type IRouter } from "express";
import { db, legalClinicsTable } from "@workspace/db";
import { GetLegalClinicsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/legal-clinics", async (_req, res): Promise<void> => {
  const clinics = await db.select().from(legalClinicsTable);
  res.json(GetLegalClinicsResponse.parse(clinics));
});

export default router;

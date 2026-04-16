import { Router, type IRouter } from "express";
import { db, helplinesTable } from "@workspace/db";
import { ilike } from "drizzle-orm";
import { GetHelplinesResponse, GetHelplinesQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/helplines", async (req, res): Promise<void> => {
  const params = GetHelplinesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { category } = params.data;

  let helplines;
  if (category) {
    helplines = await db
      .select()
      .from(helplinesTable)
      .where(ilike(helplinesTable.category, `%${category}%`));
  } else {
    helplines = await db.select().from(helplinesTable);
  }

  res.json(GetHelplinesResponse.parse(helplines));
});

export default router;

import { Router, type IRouter } from "express";
import { db, chatMessagesTable, helplinesTable, ngosTable } from "@workspace/db";
import { desc, eq, or, ilike } from "drizzle-orm";
import { SendMessageBody, SendMessageResponse, GetChatHistoryResponse } from "@workspace/api-zod";
import { detectCategoryAndResponse, generateFallbackResponse } from "../lib/legal-knowledge";

const router: IRouter = Router();

router.get("/chat/history", async (req, res): Promise<void> => {
  const messages = await db
    .select()
    .from(chatMessagesTable)
    .orderBy(chatMessagesTable.createdAt)
    .limit(100);

  res.json(GetChatHistoryResponse.parse(messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }))));
});

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = SendMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const userMessage = parsed.data.message;

  await db.insert(chatMessagesTable).values({
    role: "user",
    content: userMessage,
    category: null,
  });

  const { category, response: ruleBasedResponse } = detectCategoryAndResponse(userMessage);
  const responseText = ruleBasedResponse ?? generateFallbackResponse(userMessage);

  await db.insert(chatMessagesTable).values({
    role: "assistant",
    content: responseText,
    category: category,
  });

  let relevantHelplines: { id: number; name: string; phone: string; category: string }[] = [];
  let relevantNgos: { id: number; name: string; service: string; contact: string }[] = [];

  if (category) {
    const categoryKeyword = category.toLowerCase().replace(/[^a-z\s]/g, "").trim();
    relevantHelplines = await db
      .select()
      .from(helplinesTable)
      .where(ilike(helplinesTable.category, `%${categoryKeyword.split(" ")[0]}%`))
      .limit(3);

    if (relevantHelplines.length === 0) {
      relevantHelplines = await db.select().from(helplinesTable).limit(3);
    }

    relevantNgos = await db
      .select()
      .from(ngosTable)
      .where(
        or(
          ilike(ngosTable.service, `%${categoryKeyword.split(" ")[0]}%`),
          ilike(ngosTable.service, `%women%`)
        )
      )
      .limit(2);
  } else {
    relevantHelplines = await db.select().from(helplinesTable).limit(3);
    relevantNgos = await db.select().from(ngosTable).limit(2);
  }

  res.json(SendMessageResponse.parse({
    response: responseText,
    category: category,
    helplines: relevantHelplines,
    ngos: relevantNgos,
  }));
});

export default router;

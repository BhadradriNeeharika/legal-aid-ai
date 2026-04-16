import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const helplinesTable = pgTable("helplines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  category: text("category").notNull(),
});

export const insertHelplineSchema = createInsertSchema(helplinesTable).omit({ id: true });
export type InsertHelpline = z.infer<typeof insertHelplineSchema>;
export type Helpline = typeof helplinesTable.$inferSelect;

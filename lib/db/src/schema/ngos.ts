import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ngosTable = pgTable("ngos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  service: text("service").notNull(),
  contact: text("contact").notNull(),
});

export const insertNgoSchema = createInsertSchema(ngosTable).omit({ id: true });
export type InsertNgo = z.infer<typeof insertNgoSchema>;
export type Ngo = typeof ngosTable.$inferSelect;

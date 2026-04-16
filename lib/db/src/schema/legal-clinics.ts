import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const legalClinicsTable = pgTable("legal_clinics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  contact: text("contact").notNull(),
});

export const insertLegalClinicSchema = createInsertSchema(legalClinicsTable).omit({ id: true });
export type InsertLegalClinic = z.infer<typeof insertLegalClinicSchema>;
export type LegalClinic = typeof legalClinicsTable.$inferSelect;

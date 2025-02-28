import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  condition: text("condition").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: integer("user_id").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tradeOffers = pgTable("trade_offers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  condition: text("condition").notNull(),
  notes: text("notes"),
  requestedItemId: integer("requested_item_id").notNull(),
  offeringUserId: integer("offering_user_id").notNull(),
  images: text("images").array().notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertItemSchema = createInsertSchema(items).omit({ id: true, createdAt: true });
export const insertTradeOfferSchema = createInsertSchema(tradeOffers).omit({ id: true, createdAt: true, status: true });

export const conditionOptions = ["New", "Like New", "Good", "Fair", "Poor"] as const;
export const categoryOptions = ["Textbooks", "Notes", "Study Materials", "Electronics", "Other"] as const;
export const tradeOfferStatusOptions = ["pending", "accepted", "rejected"] as const;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;
export type TradeOffer = typeof tradeOffers.$inferSelect;
export type InsertTradeOffer = z.infer<typeof insertTradeOfferSchema>;
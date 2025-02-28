import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertItemSchema, insertTradeOfferSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Items endpoints
  app.get("/api/items", async (req, res) => {
    const category = req.query.category as string | undefined;
    const items = category 
      ? await storage.getItemsByCategory(category)
      : await storage.getAllItems();
    res.json(items);
  });

  app.get("/api/items/:id", async (req, res) => {
    const item = await storage.getItem(Number(req.params.id));
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.json(item);
  });

  app.post("/api/items", async (req, res) => {
    const result = insertItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid item data" });
      return;
    }
    const item = await storage.createItem(result.data);
    res.status(201).json(item);
  });

  // Trade Offers endpoints
  app.post("/api/items/:id/offers", async (req, res) => {
    const result = insertTradeOfferSchema.safeParse({
      ...req.body,
      requestedItemId: Number(req.params.id),
    });
    if (!result.success) {
      res.status(400).json({ message: "Invalid trade offer data" });
      return;
    }
    const offer = await storage.createTradeOffer(result.data);
    res.status(201).json(offer);
  });

  app.get("/api/items/:id/offers", async (req, res) => {
    const offers = await storage.getTradeOffersForItem(Number(req.params.id));
    res.json(offers);
  });

  app.patch("/api/offers/:id/status", async (req, res) => {
    const { status } = req.body;
    if (!status || !["accepted", "rejected"].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }
    try {
      const offer = await storage.updateTradeOfferStatus(Number(req.params.id), status);
      res.json(offer);
    } catch (error) {
      res.status(404).json({ message: "Trade offer not found" });
    }
  });

  // Users endpoints
  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(Number(req.params.id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  });

  const httpServer = createServer(app);
  return httpServer;
}
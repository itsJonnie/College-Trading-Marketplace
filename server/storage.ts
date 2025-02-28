import { Item, InsertItem, User, InsertUser, TradeOffer, InsertTradeOffer } from "@shared/schema";

export interface IStorage {
  // Items
  createItem(item: InsertItem): Promise<Item>;
  getItem(id: number): Promise<Item | undefined>;
  getAllItems(): Promise<Item[]>;
  getItemsByCategory(category: string): Promise<Item[]>;

  // Users
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;

  // Trade Offers
  createTradeOffer(offer: InsertTradeOffer): Promise<TradeOffer>;
  getTradeOffer(id: number): Promise<TradeOffer | undefined>;
  getTradeOffersForItem(itemId: number): Promise<TradeOffer[]>;
  updateTradeOfferStatus(id: number, status: string): Promise<TradeOffer>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private items: Map<number, Item>;
  private tradeOffers: Map<number, TradeOffer>;
  private userId: number;
  private itemId: number;
  private tradeOfferId: number;

  constructor() {
    this.users = new Map();
    this.items = new Map();
    this.tradeOffers = new Map();
    this.userId = 1;
    this.itemId = 1;
    this.tradeOfferId = 1;
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const id = this.itemId++;
    const item: Item = {
      ...insertItem,
      id,
      createdAt: new Date(),
    };
    this.items.set(id, item);
    return item;
  }

  async getItem(id: number): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async getAllItems(): Promise<Item[]> {
    return Array.from(this.items.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getItemsByCategory(category: string): Promise<Item[]> {
    return Array.from(this.items.values())
      .filter(item => item.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createTradeOffer(insertOffer: InsertTradeOffer): Promise<TradeOffer> {
    const id = this.tradeOfferId++;
    const offer: TradeOffer = {
      ...insertOffer,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.tradeOffers.set(id, offer);
    return offer;
  }

  async getTradeOffer(id: number): Promise<TradeOffer | undefined> {
    return this.tradeOffers.get(id);
  }

  async getTradeOffersForItem(itemId: number): Promise<TradeOffer[]> {
    return Array.from(this.tradeOffers.values())
      .filter(offer => offer.requestedItemId === itemId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateTradeOfferStatus(id: number, status: string): Promise<TradeOffer> {
    const offer = await this.getTradeOffer(id);
    if (!offer) {
      throw new Error("Trade offer not found");
    }
    const updatedOffer = { ...offer, status };
    this.tradeOffers.set(id, updatedOffer);
    return updatedOffer;
  }
}

export const storage = new MemStorage();
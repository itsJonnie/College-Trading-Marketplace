import { Item, InsertItem, User, InsertUser } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private items: Map<number, Item>;
  private userId: number;
  private itemId: number;

  constructor() {
    this.users = new Map();
    this.items = new Map();
    this.userId = 1;
    this.itemId = 1;
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
}

export const storage = new MemStorage();

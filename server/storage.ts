import { db } from "./db";
import { contacts, invoices, type InsertContact, type Contact, type InsertInvoice, type Invoice } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [newInvoice] = await db.insert(invoices).values(invoice).returning();
    return newInvoice;
  }

  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    const [invoice] = await db
      .select()
      .from(invoices)
      .where(eq(invoices.invoiceNumber, invoiceNumber));
    return invoice;
  }
}

export const storage = new DatabaseStorage();
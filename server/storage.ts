import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db";
import { contacts, invoices, type InsertContact, type Contact, type InsertInvoice, type Invoice } from "@shared/schema";
import { eq } from "drizzle-orm";

const storageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.data");
const fallbackContactsPath = path.join(storageDir, "contacts.json");

async function appendContactToFallback(contact: Contact): Promise<void> {
  await mkdir(storageDir, { recursive: true });

  let existingContacts: Array<Record<string, unknown>> = [];

  try {
    const fileContents = await readFile(fallbackContactsPath, "utf8");
    const parsed = JSON.parse(fileContents);
    if (Array.isArray(parsed)) {
      existingContacts = parsed;
    }
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") {
      throw error;
    }
  }

  existingContacts.push({
    ...contact,
    createdAt: contact.createdAt?.toISOString() ?? null,
    updatedAt: contact.updatedAt?.toISOString() ?? null,
  });

  await writeFile(fallbackContactsPath, JSON.stringify(existingContacts, null, 2));
}

async function createFallbackContact(contact: InsertContact): Promise<Contact> {
  const now = new Date();
  const fallbackContact: Contact = {
    id: randomUUID(),
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    company: contact.company ?? null,
    companyWebsite: contact.companyWebsite ?? null,
    role: contact.role ?? null,
    service: contact.service ?? null,
    additionalInfo: contact.additionalInfo ?? null,
    createdAt: now,
    updatedAt: now,
  };

  await appendContactToFallback(fallbackContact);
  return fallbackContact;
}

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    try {
      const [newContact] = await db.insert(contacts).values(contact).returning();
      return newContact;
    } catch (error) {
      console.error("[contacts] Database insert failed, using fallback storage.", error);
      return createFallbackContact(contact);
    }
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
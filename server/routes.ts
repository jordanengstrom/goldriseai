import type { Express } from "express";
import type { Server } from "http";
import { ContactEmailDeliveryError, sendContactSubmissionEmail } from "./mailer";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);

      const newContact = await storage.createContact(input);

      await sendContactSubmissionEmail(input);

      res.status(201).json(newContact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (err instanceof ContactEmailDeliveryError) {
        return res.status(500).json({ message: err.message });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.invoices.getByNumber.path, async (req, res) => {
    try {
      const { number } = req.params;
      const invoice = await storage.getInvoiceByNumber(number);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      res.status(200).json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
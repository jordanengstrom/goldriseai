import type { Express } from "express";
import type { Server } from "http";
import { sendContactSubmissionEmail, ContactEmailDeliveryError } from "./mailer";
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
      res.status(201).json(newContact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.internalEmail.send.path, async (req, res) => {
    try {
      const input = api.internalEmail.send.input.parse(req.body);
      await sendContactSubmissionEmail(input);
      res.status(200).json({ sent: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (err instanceof ContactEmailDeliveryError) {
        console.error("[internal-email] Email delivery failed", err);
        return res.status(503).json({
          message: "Your message was saved but we couldn't send the notification. Please try again or contact us directly.",
        });
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
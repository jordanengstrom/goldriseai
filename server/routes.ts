import type { Express } from "express";
import type { Server } from "http";
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
      
      // The user requested: "Send an email with this information to info@goldrise.ai"
      // The subject should say: New Prospect
      // For now, we will log this out since setting up real SMTP would require credentials.
      console.log(`[EMAIL MOCK] To: info@goldrise.ai`);
      console.log(`[EMAIL MOCK] Subject: New Prospect`);
      console.log(`[EMAIL MOCK] Body:
First Name: ${input.firstName}
Last Name: ${input.lastName}
Email: ${input.email}
Phone: ${input.phone}
Company: ${input.company || 'N/A'}
Website: ${input.companyWebsite || 'N/A'}
Role: ${input.role || 'N/A'}
Service Interested In: ${input.service || 'N/A'}
Additional Info: ${input.additionalInfo || 'N/A'}
      `);

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

  return httpServer;
}
import type { Express } from "express";
import type { Server } from "http";
import {
  sendContactSubmissionEmail,
  sendContactConfirmationEmail,
  ContactEmailDeliveryError,
} from "./mailer";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Keep in sync with sitemapPaths in client/src/lib/seo-keyword-map.ts
const SITEMAP_URLS: { path: string; changefreq: string; priority: string }[] = [
  { path: "/",                          changefreq: "weekly",  priority: "1.0"  },
  { path: "/services/ai-assessment",    changefreq: "weekly",  priority: "0.85" },
  { path: "/services/ai-education",     changefreq: "weekly",  priority: "0.85" },
  { path: "/services/ai-implementation",changefreq: "weekly",  priority: "0.85" },
  { path: "/values",                    changefreq: "monthly", priority: "0.8"  },
  { path: "/contact",                   changefreq: "weekly",  priority: "0.8"  },
  { path: "/terms",                     changefreq: "yearly",  priority: "0.4"  },
];

const SITE_ORIGIN = "https://goldrise.ai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Dynamic sitemap — lastmod reflects today's date at request time so it's
  // always current without manual updates. This route is registered before the
  // static file middleware so it supersedes client/public/sitemap.xml.
  app.get("/sitemap.xml", (_req, res) => {
    const today = new Date().toISOString().split("T")[0];
    const urlBlock = SITEMAP_URLS.map(
      ({ path, changefreq, priority }) =>
        `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    ).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlBlock}\n</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

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

  app.post(api.externalEmail.send.path, async (req, res) => {
    try {
      const input = api.externalEmail.send.input.parse(req.body);
      await sendContactConfirmationEmail(input);
      res.status(200).json({ sent: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (err instanceof ContactEmailDeliveryError) {
        console.error("[external-email] Email delivery failed", err);
        return res.status(503).json({
          message: "Your message was saved but we couldn't send the confirmation email. Please check your inbox later or contact us directly.",
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
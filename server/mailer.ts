import nodemailer, { type Transporter } from "nodemailer";
import type { InsertContact } from "@shared/schema";

const DEFAULT_CONTACT_RECIPIENT = "info@goldrise.ai";
const DEFAULT_FROM_NAME = "Goldrise AI";
const DEFAULT_FROM_ADDRESS = "info@goldrise.ai";

let transporterPromise: Promise<Transporter> | null = null;

export class ContactEmailDeliveryError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ContactEmailDeliveryError";
  }
}

function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no", "off"].includes(normalized)) {
    return false;
  }

  return undefined;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayValue(value: string | null | undefined): string {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : "N/A";
}

function getFromAddress(): string {
  const configuredFrom = process.env.SMTP_FROM?.trim();
  if (configuredFrom) {
    return configuredFrom;
  }

  const configuredUser = process.env.SMTP_USER?.trim();
  if (configuredUser) {
    return `${DEFAULT_FROM_NAME} <${configuredUser}>`;
  }

  const sendmailFrom = process.env.SENDMAIL_FROM?.trim();
  if (sendmailFrom) {
    return sendmailFrom;
  }

  return `${DEFAULT_FROM_NAME} <${DEFAULT_FROM_ADDRESS}>`;
}

async function createTransporter(): Promise<Transporter> {
  const smtpUrl = process.env.SMTP_URL?.trim();
  const secureFlag = parseBoolean(process.env.SMTP_SECURE);

  if (smtpUrl) {
    try {
      const transporter = nodemailer.createTransport(smtpUrl);
      await transporter.verify();
      return transporter;
    } catch (error) {
      throw new ContactEmailDeliveryError(
        "Contact form email delivery is not configured correctly. Check SMTP_URL and mail server access.",
        { cause: error },
      );
    }
  }

  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;

  if (!host && !portValue && !user && !pass) {
    try {
      const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: "unix",
        path: process.env.SENDMAIL_PATH?.trim() || "/usr/sbin/sendmail",
      });

      await transporter.verify();
      return transporter;
    } catch (error) {
      throw new ContactEmailDeliveryError(
        "No SMTP settings were provided and the local sendmail transport is unavailable.",
        { cause: error },
      );
    }
  }

  if (!host || !portValue || !user || !pass) {
    throw new ContactEmailDeliveryError(
      "SMTP is not fully configured. Set SMTP_URL or SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.",
    );
  }

  const port = Number(portValue);
  if (!Number.isFinite(port)) {
    throw new ContactEmailDeliveryError("SMTP_PORT must be a valid number.");
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: secureFlag ?? port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.verify();
    return transporter;
  } catch (error) {
    throw new ContactEmailDeliveryError(
      "Contact form email delivery is not configured correctly. Check your SMTP host, credentials, and network access.",
      { cause: error },
    );
  }
}

async function getTransporter(): Promise<Transporter> {
  if (!transporterPromise) {
    transporterPromise = createTransporter().catch((error) => {
      transporterPromise = null;
      throw error;
    });
  }

  return transporterPromise;
}

export async function sendContactSubmissionEmail(contact: InsertContact): Promise<void> {
  try {
    const transporter = await getTransporter();
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_CONTACT_RECIPIENT;
    const from = getFromAddress();
    const subject = `New Prospect: ${contact.firstName} ${contact.lastName}`;

    const details = [
      ["First Name", contact.firstName],
      ["Last Name", contact.lastName],
      ["Email", contact.email],
      ["Phone", contact.phone],
      ["Company", displayValue(contact.company)],
      ["Website", displayValue(contact.companyWebsite)],
      ["Role", displayValue(contact.role)],
      ["Service Interested In", displayValue(contact.service)],
      ["Additional Info", displayValue(contact.additionalInfo)],
    ] as const;

    const text = details.map(([label, value]) => `${label}: ${value}`).join("\n");
    const html = `
      <div style="font-family: Helvetica, Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New Prospect</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tbody>
            ${details
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="padding: 8px 12px 8px 0; font-weight: 600; vertical-align: top; width: 180px;">${escapeHtml(label)}</td>
                    <td style="padding: 8px 0;">${escapeHtml(value)}</td>
                  </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    await transporter.sendMail({
      to: recipient,
      from,
      replyTo: contact.email,
      subject,
      text,
      html,
    });
  } catch (error) {
    if (error instanceof ContactEmailDeliveryError) {
      console.error("[contacts] Email delivery setup error.", error);
      throw error;
    }

    console.error("[contacts] Failed to send contact submission email.", error);
    throw new ContactEmailDeliveryError(
      "Contact information was saved, but the notification email could not be sent.",
      { cause: error },
    );
  }
}
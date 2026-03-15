import { Resend } from "resend";
import type { InsertContact } from "@shared/schema";

const DEFAULT_CONTACT_RECIPIENT = "info@goldrise.ai";
const DEFAULT_FROM_NAME = "Goldrise AI";
const DEFAULT_FROM_ADDRESS = "info@mail.goldrise.ai";

let resendClient: Resend | null = null;

export class ContactEmailDeliveryError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ContactEmailDeliveryError";
  }
}

function displayValue(value: string | null | undefined): string {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : "N/A";
}

function getFromAddress(): string {
  const configuredFrom = process.env.RESEND_API_FROM?.trim();
  if (configuredFrom) {
    return configuredFrom;
  }

  return `${DEFAULT_FROM_NAME} <${DEFAULT_FROM_ADDRESS}>`;
}

function getReplyToAddress(): string {
  const configuredReplyTo = process.env.RESEND_API_REPLY_TO?.trim();
  if (configuredReplyTo) {
    return configuredReplyTo;
  }

  return process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_CONTACT_RECIPIENT;
}

function getResendClient(): Resend {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new ContactEmailDeliveryError(
      "RESEND_API_KEY is missing. Configure RESEND_API_KEY and RESEND_API_FROM in your runtime environment before sending email.",
    );
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
  logPrefix: "internal" | "external";
};

async function sendEmailWithResend(input: SendEmailInput): Promise<void> {
  const resend = getResendClient();
  const from = getFromAddress();
  const { data, error } = await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    replyTo: input.replyTo,
  });

  if (error) {
    throw new ContactEmailDeliveryError(
      `Resend rejected the email request: ${error.message}`,
      { cause: error },
    );
  }

  console.info(`[${input.logPrefix}-email] Email sent via Resend`, {
    messageId: data?.id ?? "unknown",
    to: input.to,
  });
}

export async function sendContactSubmissionEmail(contact: InsertContact): Promise<void> {
  try {
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_CONTACT_RECIPIENT;
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

    await sendEmailWithResend({
      to: recipient,
      subject,
      text,
      replyTo: contact.email,
      logPrefix: "internal",
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

export async function sendContactConfirmationEmail(contact: InsertContact): Promise<void> {
  try {
    const subject = "Goldrise AI - Request Received";

    const text = [
      `Hi ${contact.firstName},`,
      "",
      "Thank you for reaching out to our team at goldrise.ai! We have received your request, and someone from our team will follow up within the next 24 hours.",
      "",

      "Thank you,",
      "",
      "GoldRise AI Team",
    ].join("\n");

    await sendEmailWithResend({
      to: contact.email,
      subject,
      text,
      replyTo: getReplyToAddress(),
      logPrefix: "external",
    });
  } catch (error) {
    if (error instanceof ContactEmailDeliveryError) {
      console.error("[contacts] Confirmation email delivery setup error.", error);
      throw error;
    }

    console.error("[contacts] Failed to send confirmation email.", error);
    throw new ContactEmailDeliveryError(
      "Contact information was saved, but the confirmation email could not be sent.",
      { cause: error },
    );
  }
}
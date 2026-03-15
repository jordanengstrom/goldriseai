import { useMutation } from "@tanstack/react-query";
import { api, type ContactInput, type ContactResponse } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data: ContactInput): Promise<ContactResponse> => {
      // console.log("data:", data);

      // Validate input before sending
      const validatedInput = api.contacts.create.input.parse(data);

      // console.log("validatedInput:", validatedInput);

      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
        credentials: "include",
      });

      const responseData = await res.json();
      // console.log("responseData:", responseData);
      if (!res.ok) {
        if (res.status === 400) {
          const error = parseWithLogging(api.contacts.create.responses[400], responseData, "contacts.create.error.400");
          throw new Error(error.message);
        }
        if (res.status === 500) {
          const error = parseWithLogging(api.contacts.create.responses[500], responseData, "contacts.create.error.500");
          throw new Error(error.message);
        }
        throw new Error("Failed to submit contact form");
      }

      return parseWithLogging(api.contacts.create.responses[201], responseData, "contacts.create.success");
    },
  });
}

export function useSendInternalEmail() {
  return useMutation({
    mutationFn: async (data: ContactInput): Promise<{ sent: boolean }> => {
      const validatedInput = api.internalEmail.send.input.parse(data);
      const res = await fetch(api.internalEmail.send.path, {
        method: api.internalEmail.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
        credentials: "include",
      });
      const responseData = await res.json();
      if (!res.ok) {
        if (res.status === 503) {
          const error = parseWithLogging(api.internalEmail.send.responses[503], responseData, "internalEmail.send.error.503");
          throw new Error(error.message);
        }
        if (res.status === 500) {
          const error = parseWithLogging(api.internalEmail.send.responses[500], responseData, "internalEmail.send.error.500");
          throw new Error(error.message);
        }
        throw new Error("Failed to send notification email");
      }
      return parseWithLogging(api.internalEmail.send.responses[200], responseData, "internalEmail.send.success");
    },
  });
}

export function useSendConfirmationEmail() {
  return useMutation({
    mutationFn: async (data: ContactInput): Promise<{ sent: boolean }> => {
      const validatedInput = api.confirmationEmail.send.input.parse(data);
      const res = await fetch(api.confirmationEmail.send.path, {
        method: api.confirmationEmail.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
        credentials: "include",
      });
      const responseData = await res.json();
      if (!res.ok) {
        if (res.status === 503) {
          const error = parseWithLogging(api.confirmationEmail.send.responses[503], responseData, "confirmationEmail.send.error.503");
          throw new Error(error.message);
        }
        if (res.status === 500) {
          const error = parseWithLogging(api.confirmationEmail.send.responses[500], responseData, "confirmationEmail.send.error.500");
          throw new Error(error.message);
        }
        throw new Error("Failed to send confirmation email");
      }
      return parseWithLogging(api.confirmationEmail.send.responses[200], responseData, "confirmationEmail.send.success");
    },
  });
}

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
      // Validate input before sending
      const validatedInput = api.contacts.create.input.parse(data);

      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
        credentials: "include",
      });

      const responseData = await res.json();

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

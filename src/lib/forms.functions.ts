import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const NOTIFY_TO = "info@7wingsimmigration.com";

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  country_interest: z.string().trim().max(80).optional().nullable(),
  message: z.string().trim().min(1).max(2000),
});

const ConsultationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  preferred_country: z.string().trim().min(2).max(80),
  preferred_date: z.string().trim().max(20).optional().nullable(),
  preferred_time: z.string().trim().max(40).optional().nullable(),
  current_status: z.string().trim().max(200).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country_interest: data.country_interest ?? null,
      message: data.message,
    });
    if (error) {
      console.error("[contact] insert failed", error.message);
      throw new Error("Could not submit your message. Please try again or call us.");
    }

    // Fire-and-forget emails: don't block the user response if SMTP is slow.
    try {
      const { sendInternalEmail } = await import("@/lib/email/send-internal.server");
      await Promise.allSettled([
        sendInternalEmail({
          templateName: "enquiry-notification",
          recipientEmail: NOTIFY_TO,
          replyTo: data.email,
          templateData: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country_interest ?? undefined,
            message: data.message,
            source: "contact_page",
          },
        }),
        sendInternalEmail({
          templateName: "welcome",
          recipientEmail: data.email,
          templateData: {
            name: data.name,
            country: data.country_interest ?? undefined,
          },
        }),
      ]);
    } catch (e) {
      console.error("[contact] email send failed", e);
    }

    return { ok: true };
  });

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ConsultationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("consultation_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferred_country: data.preferred_country,
      preferred_date: data.preferred_date || null,
      preferred_time: data.preferred_time || null,
      current_status: data.current_status || null,
      notes: data.notes || null,
    });
    if (error) {
      console.error("[consultation] insert failed", error.message);
      throw new Error("Could not book your consultation. Please try again or call us.");
    }

    try {
      const { sendInternalEmail } = await import("@/lib/email/send-internal.server");
      await Promise.allSettled([
        sendInternalEmail({
          templateName: "enquiry-notification",
          recipientEmail: NOTIFY_TO,
          replyTo: data.email,
          templateData: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.preferred_country,
            preferredDate: data.preferred_date ?? undefined,
            preferredTime: data.preferred_time ?? undefined,
            currentStatus: data.current_status ?? undefined,
            message: data.notes ?? undefined,
            source: "book_consultation",
          },
        }),
        sendInternalEmail({
          templateName: "welcome",
          recipientEmail: data.email,
          templateData: {
            name: data.name,
            country: data.preferred_country,
          },
        }),
      ]);
    } catch (e) {
      console.error("[consultation] email send failed", e);
    }

    return { ok: true };
  });

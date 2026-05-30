"use server";

import { Resend } from "resend";
import { getAdminSupabase } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "amirisgoofyashell@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Ussly <onboarding@resend.dev>";

export type ContactState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string };

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const project = String(formData.get("project") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const honeypot = String(formData.get("website") || "").trim();

  if (honeypot) {
    return { status: "ok", message: "Thanks — we'll be in touch." };
  }

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email, and a message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "That email doesn't look quite right." };
  }

  // Persist to DB first — the lead is captured even if email send fails.
  let persisted = false;
  try {
    const supabase = getAdminSupabase();
    await supabase.from("briefs").insert({
      name,
      email,
      project: project || null,
      budget: budget || null,
      message,
    });
    persisted = true;
  } catch (err) {
    console.error("Brief persist failed", err);
    // Don't block the user — still try to send the email.
  }

  const ok: ContactState = { status: "ok", message: "Got it. We'll reply within a day." };

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set — brief saved, notification email skipped");
    // The brief was stored, so the lead isn't lost; don't show the user an error.
    return persisted
      ? ok
      : { status: "error", message: "Couldn't reach us right now. Email hello@ussly.design." };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New project enquiry — ${name}${project ? ` · ${project}` : ""}`,
      text: [
        `From: ${name} <${email}>`,
        project ? `Project: ${project}` : null,
        budget ? `Budget: ${budget}` : null,
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error", error);
      // Notification failed but the brief is saved — still acknowledge.
      return persisted
        ? ok
        : { status: "error", message: "Couldn't send right now. Try again or email hello@ussly.design." };
    }

    return ok;
  } catch (err) {
    console.error("Contact send failed", err);
    return persisted
      ? ok
      : { status: "error", message: "Couldn't send right now. Try again in a minute." };
  }
}

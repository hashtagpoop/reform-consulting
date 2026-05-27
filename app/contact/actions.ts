"use server";

import { Resend } from "resend";

type Result = { ok: true } | { ok: false; error: string };

export async function submitContact(formData: FormData): Promise<Result> {
  const name = String(formData.get("name") ?? "").trim();
  const business = String(formData.get("business") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set — logging instead.",
    );
    console.log("[contact submission]", { name, business, email, message });
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Reform Consulting <noreply@reformconsulting.com>",
      to,
      replyTo: email,
      subject: `New inquiry from ${name}${business ? ` (${business})` : ""}`,
      text: `Name: ${name}\nBusiness: ${business || "—"}\nEmail: ${email}\n\n${message}`,
    });
    return { ok: true };
  } catch (err) {
    console.error("[contact] resend error", err);
    return {
      ok: false,
      error: "Something went wrong sending your note. Please email us directly.",
    };
  }
}

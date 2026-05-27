"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/app/contact/actions";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "ok" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await submitContact(formData);
          if (result.ok) setStatus({ kind: "ok" });
          else setStatus({ kind: "error", message: result.error });
        });
      }}
      className="space-y-6"
    >
      <Field label="Your name" name="name" required />
      <Field label="Business name" name="business" />
      <Field label="Email" name="email" type="email" required />
      <div>
        <label
          htmlFor="message"
          className="block text-[11px] uppercase tracking-[0.22em] text-ink-faint"
        >
          What brought you here?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full border-b border-ink/40 bg-transparent py-3 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-clay"
          placeholder="The bottleneck, the curiosity, the half-formed idea&hellip;"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-clay disabled:opacity-50"
      >
        {pending ? "Sending&hellip;" : "Send the note"}
        <span aria-hidden>&rarr;</span>
      </button>

      {status.kind === "ok" && (
        <p className="font-display italic text-moss">
          Thank you &mdash; we&rsquo;ll be in touch within a working day.
        </p>
      )}
      {status.kind === "error" && (
        <p className="font-display italic text-clay-deep">{status.message}</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[11px] uppercase tracking-[0.22em] text-ink-faint"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-ink/40 bg-transparent py-3 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-clay"
      />
    </div>
  );
}

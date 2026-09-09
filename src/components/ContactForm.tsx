"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="border border-border bg-surface p-8 text-center">
        <h2 className="font-display text-xl">Thanks for reaching out</h2>
        <p className="mt-2 text-muted">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id="name" type="text" autoComplete="name" required />
        <Field label="Email" id="email" type="email" autoComplete="email" required />
      </div>
      <Field label="Subject" id="subject" type="text" />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-fit bg-foreground px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-background transition-opacity hover:opacity-90"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  type,
  autoComplete,
  required,
}: {
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}

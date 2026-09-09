"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between border-b border-border pb-12">
      <div>
        <h2 className="font-display text-2xl tracking-tight text-neutral-900">Architectural Specifier Bulletin</h2>
        <p className="mt-1 text-sm text-muted">
          Quarterly releases of new architectural profiles, updated photometric files, and technical datasheets.
        </p>
      </div>

      {status === "submitted" ? (
        <p className="text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-md border border-emerald-200">
          Thank you. You are subscribed to technical specification updates.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Professional Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="architect@studio.com"
            className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-neutral-900 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-800"
          >
            Join Network
          </button>
        </form>
      )}
    </div>
  );
}

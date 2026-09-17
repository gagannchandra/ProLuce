"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between border-b border-border pb-12">
      <div>
        <div className="inline-flex items-center gap-2 mb-1">
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-border">
            Technical Bulletins
          </Badge>
        </div>
        <h2 className="font-display text-2xl tracking-tight text-foreground font-normal">
          Architectural Specifier Bulletin
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-light max-w-xl">
          Quarterly releases of new architectural profiles, updated photometric files, and technical datasheets.
        </p>
      </div>

      {status === "submitted" ? (
        <Badge
          variant="secondary"
          className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-full gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Thank you. You are subscribed to technical specification updates.
        </Badge>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Professional Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            placeholder="architect@studio.com"
            className="w-full text-xs font-mono rounded-full px-4"
          />
          <Button
            type="submit"
            className="shrink-0 font-mono text-xs uppercase tracking-wider px-6 rounded-full shadow-xs"
          >
            <Mail className="mr-1.5 h-3.5 w-3.5" />
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}

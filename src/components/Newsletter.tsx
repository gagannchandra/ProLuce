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
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between border-b border-border pb-10">
      <div>
        <div className="inline-flex items-center gap-2 mb-1">
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-border py-0.5 px-2">
            Technical Bulletins
          </Badge>
        </div>
        <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground font-normal">
          Architectural Specifier Bulletin
        </h2>
        <p className="mt-1 text-xs sm:text-[13.5px] text-muted-foreground font-light max-w-xl">
          Quarterly releases of new architectural profiles, updated photometric files, and technical datasheets.
        </p>
      </div>

      {status === "submitted" ? (
        <Badge
          variant="secondary"
          className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 px-3.5 py-2 rounded-full gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Thank you. You are subscribed to technical specification updates.
        </Badge>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2.5">
          <label htmlFor="newsletter-email" className="sr-only">
            Professional Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            inputMode="email"
            required
            placeholder="architect@studio.com"
            className="w-full text-xs sm:text-[13px] font-mono rounded-full px-4 h-11 sm:h-10 touch-manipulation"
          />
          <Button
            type="submit"
            className="shrink-0 font-sans text-xs sm:text-[13px] uppercase tracking-[0.14em] font-semibold px-6 h-11 sm:h-10 rounded-full shadow-xs touch-manipulation cursor-pointer gap-2"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Subscribe</span>
          </Button>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <Card className="border-border bg-card p-10 text-center shadow-xs">
        <CardContent className="p-0 flex flex-col items-center justify-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-normal text-foreground">
            Message Transmitted to Engineering Desk
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto font-light">
            Thank you for reaching out. Our architectural project managers will review your schedule and respond within 24 hours.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus("idle")}
            className="mt-4 font-mono text-xs uppercase rounded-full px-6"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card shadow-xs rounded-2xl">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="e.g. Alessandro Moretti"
                className="text-xs h-10 touch-manipulation"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
                Business Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="architect@studio.com"
                className="text-xs h-10 touch-manipulation"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
              Project Subject / Tender Code
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. Specification Inquiry - Milan Galleria Project"
              className="text-xs h-10 touch-manipulation"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
              Engineering Requirements & Space Brief <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Describe luminaire quantities, ceiling mounting details, DALI-2 dimming needs, or photometric calculation requests..."
              className="text-xs resize-none rounded-2xl p-4 touch-manipulation"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 w-full sm:w-fit font-sans text-xs uppercase tracking-[0.14em] font-semibold px-8 h-11 gap-2 shadow-sm rounded-full touch-manipulation cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Send Message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

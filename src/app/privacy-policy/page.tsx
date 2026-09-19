import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Pro-Luce Architectural Lighting",
  description: `How ${siteConfig.name} collects, uses, and safeguards your architectural specification and contact data.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-site max-w-4xl py-12 md:py-20">
      <div className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="outline" className="gap-1.5 font-sans text-[11px] uppercase tracking-[0.18em] font-medium border-border/80 text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            <span>Governance & Data Integrity</span>
          </Badge>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          Specification Release · Architectural Client Protections
        </p>
      </div>

      <div className="mt-10 space-y-6 text-foreground/90 font-sans leading-relaxed">
        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              1. Specification Data & Information Collected
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you submit a project bill of materials (BOM), request customized extrusion lengths, schedule a photometric consultation, or request IES/BIM packages, we collect the necessary project and contact details (including architect name, studio email, firm address, and luminaire schedules).
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              2. Technical Utilization
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We process technical project data solely to prepare factory quotations, compute photometric distributions, coordinate freight deliveries to job sites, and provide firmware updates for smart DALI-2 drivers. Pro-Luce strictly does not sell or distribute specifier data to third-party marketing brokers.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              3. Specification Registry & Opt-Out
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Architects and specifiers may modify their project schedule records, request data redaction, or unsubscribe from engineering release announcements at any time by contacting our engineering studio at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="font-mono text-foreground underline underline-offset-4 font-medium">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              4. Studio Engineering Contact
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For inquiries regarding data custody, compliance standards, or project confidentiality agreements, please contact {siteConfig.contact.email}.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

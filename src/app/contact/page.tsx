import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Download, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Specification Inquiries | Pro-Luce",
  description:
    "Connect with the Pro-Luce engineering team for architectural project schedules, DIALux simulations, or factory quotation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Pro-Luce Architectural Lighting",
          url: `${siteConfig.url}/contact`,
        }}
      />

      <div className="max-w-2xl border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="outline" className="gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] border-border/80 text-muted-foreground">
            <Building2 className="h-3 w-3 text-stone-300" />
            <span>Commercial Project Inquiries</span>
          </Badge>
        </div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-[52px] font-light tracking-tight text-foreground leading-[1.08]">
          Architectural Specification Support
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans font-light">
          Submit your project bill of materials (BOM), request customized extrusion lengths, or consult our engineering team on DALI-2 dimming protocols and photometric schedules.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ContactForm />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs shadow-2xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-xl font-normal tracking-tight text-foreground flex items-center justify-between">
                <span>Studio Direct</span>
                <Badge variant="secondary" className="font-mono text-[9px] uppercase tracking-wider bg-muted text-foreground border border-border/60">
                  Verified Inquiries
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/60 text-foreground">
                  <Mail className="h-4 w-4 text-stone-300" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
                    Studio Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-0.5 block text-sm font-medium text-foreground hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
                    Commercial Phone
                  </h3>
                  <p className="mt-0.5 text-sm text-foreground font-medium">{siteConfig.contact.phone}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
                    Engineering Studio
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{siteConfig.contact.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-wider">
                Full Technical Binder
              </Badge>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Master Architectural Catalogue
            </h3>
            <p className="mt-1 text-xs text-muted-foreground font-mono leading-relaxed mb-4">
              119 pages of high-resolution datasheets, polar candlepower curves, and dimensioned CAD schematics.
            </p>
            <Button asChild size="sm" className="w-full font-mono text-xs uppercase tracking-wider gap-2 rounded-full px-5">
              <a
                href={siteConfig.catalogPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Pro-Luce-Catalogue.pdf"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF (140MB)</span>
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

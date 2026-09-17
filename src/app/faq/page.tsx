import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { HelpCircle, ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Architectural Specification FAQ | Pro-Luce",
  description:
    "Frequently asked questions regarding Pro-Luce luminaires, photometric IES files, DIALux calculations, DALI-2 drivers, and custom extrusion lengths.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    id: "photometrics",
    question: "Where can I download IES / LDT polar curves and Revit BIM families?",
    answer:
      "Every luminaire in our architectural catalogue includes direct download links for verified IES and EULUMDAT (LDT) photometric files. Revit (.RFA) families, IFC models, and 2D/3D CAD files (.DWG/.STEP) can be batch-requested or downloaded directly from the product specification drawer. For complex DIALux Evo or Relux calculations, our lighting engineering team can prepare turnkey photometric layouts upon submission of your CAD drawings.",
  },
  {
    id: "custom-lengths",
    question: "Are linear profile extrusions customizable to exact architectural dimensions?",
    answer:
      "Yes. Our continuous linear architectural profiles (such as the ARCOS and VEGA series) are CNC-milled to custom mm-accurate lengths. We provide pre-wired corner modules (90° planar and vertical return transitions) and continuous run power feeds that eliminate visible dark spots at joint seams.",
  },
  {
    id: "dimming-protocols",
    question: "What control protocols and dimming drivers are supported?",
    answer:
      "Pro-Luce luminaires support DALI-2 (DT6 and DT8 tunable white), 0-10V, 1-10V sink, Phase cut (trailing-edge), and wireless Casambi Bluetooth mesh integrations. All standard commercial drivers are flicker-free (IEEE 1789 compliant) with deep dimming curves down to 0.1%. Drivers are available in remote enclosures or integrated track adapters.",
  },
  {
    id: "ugr-standards",
    question: "How does Pro-Luce achieve UGR < 12 glare ratings for WELL and LEED projects?",
    answer:
      "Our trimless downlights and architectural linear systems utilize precision micro-faceted TIR secondary optics with deep-recessed honeycomb baffles and high-absorption dark-light specular reflectors. This achieves a 45° visual shielding angle that prevents direct line-of-sight view into the LED die from standard human viewing cones.",
  },
  {
    id: "cri-color-consistency",
    question: "What are the color rendering and binning standards across fixture batches?",
    answer:
      "All Pro-Luce fixtures specify Cree or Citizen COBs binned within a 2-step MacAdam ellipse (SDCM ≤ 2). We guarantee Ra ≥ 98 (CRI) with R9 saturated red values exceeding 94, ensuring precise color fidelity for museum, art gallery, luxury retail, and high-end hospitality environments.",
  },
  {
    id: "lead-times",
    question: "What are the standard lead times for custom specification batches?",
    answer:
      "Standard catalogue configurations (black/white finish, 24°/36° optics, 3000K/4000K) dispatch within 5–7 business days from regional hubs. Custom RAL powder-coatings, anodized special finishes, and made-to-measure linear lengths generally require 3–4 weeks for precision fabrication and QA bench testing prior to crated dispatch.",
  },
  {
    id: "warranty",
    question: "What warranty coverage is provided for commercial installations?",
    answer:
      "All Pro-Luce luminaires and drivers are backed by a comprehensive 5-year commercial warranty, rated for 50,000 hours continuous operation at L80/B10 (Ta = 25°C). Replacement LED light engines and driver modules remain available for at least 10 years following product specification.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-site max-w-4xl py-12 md:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <div className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="outline" className="gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] border-border/80 text-muted-foreground">
            <HelpCircle className="h-3 w-3 text-amber-500" />
            <span>Engineering Documentation</span>
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-light tracking-tight text-foreground leading-[1.08]">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl font-sans font-light">
          Architectural specification standards, photometric simulation data, dimming driver protocols, and custom extrusion fabrication.
        </p>
      </div>

      {/* Shadcn Accordion */}
      <div className="mt-10">
        <Accordion type="single" collapsible defaultValue="photometrics" className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-xl border border-border bg-card px-6 transition-all data-[state=open]:border-foreground/30 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="text-left font-display text-lg font-semibold tracking-tight text-card-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-sans leading-relaxed text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Direct Contact Card */}
      <Card className="mt-14 border border-border bg-surface p-6 sm:p-8 rounded-2xl">
        <CardContent className="p-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-md">
            <h3 className="font-display text-xl font-bold text-foreground">
              Require DIALux Simulations or Custom Project Schedules?
            </h3>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              Our engineering studio reviews CAD drawings, schedules, and custom lumen calculations with typical 24-hour turnaround.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider gap-1.5 rounded-full px-4">
              <a href={siteConfig.catalogPdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-3.5 w-3.5" />
                <span>Datasheet PDF</span>
              </a>
            </Button>
            <Button asChild size="sm" className="font-mono text-xs uppercase tracking-wider gap-1.5 rounded-full px-5">
              <Link href="/contact">
                <span>Studio Consultation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

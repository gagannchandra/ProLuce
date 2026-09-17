import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Specification Conditions | Pro-Luce Architectural Lighting",
  description:
    "Architectural specification, quotation, and engineering terms governing the use of Pro-Luce products, BIM data, and online specification tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-site max-w-4xl py-12 md:py-20">
      <div className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="outline" className="gap-1.5 font-mono text-[10px] uppercase tracking-widest">
            <Scale className="h-3 w-3 text-neutral-500" />
            <span>Specification Framework</span>
          </Badge>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          Current Specification Release · Commercial Architectural Contracts
        </p>
      </div>

      <div className="mt-10 space-y-6 text-foreground/90 font-sans leading-relaxed">
        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              1. Architectural Specification & CAD/BIM Usage
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By utilizing Pro-Luce digital specification assets—including IES photometric polar curves, EULUMDAT files, Revit (.RFA) BIM families, and CAD drawings—you are granted a non-exclusive license for architectural design and project rendering. Reverse engineering, redistributing CAD models for third-party manufacture, or falsifying photometric labels is strictly prohibited.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              2. Technical Specifications & Continuous Engineering Revision
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All photometrics, lumen outputs, efficacy (lm/W), and physical dimensions are verified under lab conditions (Ta = 25°C). Pro-Luce reserves the right to improve optical collimation, LED binning, and driver thermal architectures to higher performance standards without advance notification. Factory quotations and project schedules are validated upon formal RFQ submission.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              3. Custom Fabrication & Continuous Extrusion Approvals
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Orders requiring custom CNC millimeter lengths, special RAL powder coating, or pre-wired field assemblies require sign-off on Pro-Luce shop submittals prior to fabrication. Custom extruded profiles are non-cancellable once machining operations commence.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <CardContent className="p-0 space-y-3">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              4. Commercial Warranty & Field Performance
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Luminaires and drivers are warranted for 5 years at L80/B10 standards when installed according to Pro-Luce engineering guidelines by licensed electrical contractors. Pro-Luce is not liable for indirect or consequential site installation delays resulting from unapproved on-site field modifications.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

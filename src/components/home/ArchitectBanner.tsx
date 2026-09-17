import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Download, Compass } from "lucide-react";

export default function ArchitectBanner() {
  const offerings = [
    { label: "DIALux Calculations", detail: "Fast photometric lux level and uniformity mapping." },
    { label: "BIM & Revit Families", detail: "Parametric 3D objects with MEP electrical connectors." },
    { label: "Custom Millwork Cuts", detail: "Exact profile length cutting and miter joins to 1mm." },
    { label: "DALI-2 / Casambi", detail: "Control topology planning and driver schedule verification." },
  ];

  return (
    <section className="container-site py-12 md:py-16">
      <Card className="relative overflow-hidden bg-neutral-950 text-white border border-neutral-800/80 p-8 sm:p-12 lg:p-16 shadow-2xl rounded-2xl">
        {/* Soft Ambient Light Beam */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -mr-32 -mt-32" />

        <CardContent className="p-0 relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-white/20 bg-neutral-900/90 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 rounded-full"
            >
              <Compass className="mr-1.5 h-3.5 w-3.5 text-amber-400" />
              Studio Specification Engineering
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-light tracking-tight text-white leading-tight">
            Consult With Our Lighting Engineers
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans font-light max-w-2xl">
            From initial concept sketches to tender documentation, our engineering desk collaborates directly with architecture and MEP consulting teams worldwide.
          </p>

          <Separator className="bg-neutral-800/80 my-6" />

          {/* Offerings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item) => (
              <div key={item.label} className="space-y-1.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-neutral-950 hover:bg-amber-300 font-mono text-xs uppercase tracking-wider px-8 h-12 rounded-full shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 font-bold border-none"
            >
              <Link href="/contact">
                <span>Contact Engineering Desk</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-neutral-700 bg-neutral-900/60 font-mono text-xs uppercase tracking-wider text-neutral-200 hover:text-white hover:bg-neutral-800 px-8 h-12 rounded-full hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
            >
              <a
                href={siteConfig.catalogPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Pro-Luce-Catalogue.pdf"
              >
                <Download className="mr-2 h-4 w-4 text-neutral-400" />
                <span>Download Master PDF (Catalogue)</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

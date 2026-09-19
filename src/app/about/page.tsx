import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Eye, Cpu, ShieldCheck, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "About Pro-Luce | Lighting Systems & Engineering",
  description:
    "Pro-Luce engineers precision architectural luminaires, 48V magnetic track channels, and micro-faceted optical systems for architects, lighting designers, and specifiers worldwide.",
  alternates: { canonical: "/about" },
};

const PILLARS = [
  {
    icon: Eye,
    title: "Spectral Fidelity (Ra ≥ 98 / R9 > 94)",
    desc: "Color precision is critical in cultural museums, luxury retail, and high-end residential interiors. We specify premium COB and SMD emitters binned strictly within a 2-step MacAdam ellipse (SDCM ≤ 2).",
  },
  {
    icon: ShieldCheck,
    title: "Deep Dark-Light Cutoff (UGR < 12)",
    desc: "Engineered with 45° physical shielding angles and specular micro-faceted TIR reflectors to eliminate stray light and ocular fatigue for WELL and LEED Platinum certified spaces.",
  },
  {
    icon: Cpu,
    title: "48V Low-Voltage Modularity",
    desc: "Ultra-compact magnetic track extrusions allow tool-free hot-swapping of directional spots, linear diffusers, and wall-wash modules without electrical shutdown.",
  },
  {
    icon: Layers,
    title: "CNC 6063-T5 Thermal Architecture",
    desc: "Milled aerospace-grade aluminum housings provide superior passive convective heat dissipation, ensuring a tested L80/B10 lifespan exceeding 50,000 operational hours.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-4 border-b border-border pb-10">
          <Badge variant="outline" className="font-sans text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground border-border/80">
            Studio & Engineering Philosophy
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-foreground font-display leading-[1.06]">
            Precision Optics & Architectural Integrity
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans font-light">
            Founded with an uncompromising focus on optical physics, thermal thermodynamics, and architectural minimalism, Pro-Luce designs lighting instruments that quietly elevate the built environment.
          </p>
        </div>

        {/* Philosophy & Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-border/80">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-light text-foreground font-display leading-snug">
              Light as an Inherent Architectural Material
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans font-light">
              We believe true architectural illumination should reveal materiality, geometry, and space rather than call attention to the fixture itself. Our luminaires are engineered with trimless plaster-in housings, ultra-narrow bezels, and deep-recessed baffles that dissolve into ceiling planes.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans font-light">
              Every system in our portfolio is engineered for seamless integration with modern dimming architectures, including DALI-2 (DT6 and DT8 tunable white), 0-10V, and wireless Casambi Bluetooth mesh ecosystems.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <Card key={pillar.title} className="p-5 rounded-xl border border-border/80 bg-card/90 backdrop-blur-xs shadow-2xs hover:border-[#e6dfd1]/40 transition-colors">
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-muted text-foreground">
                        <IconComp className="h-4 w-4 text-stone-300" />
                      </div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono leading-tight">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Master PDF Catalogue Callout */}
        <div className="pt-16">
          <Card className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-foreground shadow-2xl relative overflow-hidden">
            {/* Soft Ambient Light Beam */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4f0e6]/10 dark:bg-[#f4f0e6]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            <CardContent className="p-0 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <Badge variant="outline" className="border-border bg-muted text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                  Tender Documentation
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-normal font-display text-foreground">
                  Download the Complete Architectural Catalogue
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Access all 119 pages of technical datasheets, dimensional line drawings, polar candlepower curves, and photometric schedules in high-resolution PDF format.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <Button
                  asChild
                  className="bg-[#f4f0e6] text-neutral-950 hover:bg-[#eae4d5] font-mono text-xs uppercase tracking-wider px-6 h-11 shadow-sm rounded-full font-bold border-none cursor-pointer"
                >
                  <a
                    href={siteConfig.catalogPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Pro-Luce-Catalogue.pdf"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download PDF Spec
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-border bg-card font-mono text-xs uppercase tracking-wider text-foreground hover:bg-muted h-11 rounded-full px-6 cursor-pointer shadow-2xs"
                >
                  <Link href="/catalogue">
                    <span>Browse Catalogue</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

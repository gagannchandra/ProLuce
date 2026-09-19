"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

interface SystemCard {
  id: string;
  categoryName: string;
  title: string;
  subtitle: string;
  pageRange: string;
  specs: { label: string; value: string }[];
  beamAngles: string[];
  imageSrc: string;
  href: string;
  accent: string;
}

const SYSTEMS: SystemCard[] = [
  {
    id: "downlights",
    categoryName: "Spot Light",
    title: "Precision Trimless Downlights",
    subtitle: "Deep-recessed dark-light optics with sub-glare honeycomb baffles and micro-apertures.",
    pageRange: "P.08 – P.19",
    specs: [
      { label: "Cutout", value: "Ø45–Ø125mm" },
      { label: "Glare", value: "UGR < 13" },
      { label: "Power", value: "6W – 30W" },
      { label: "Efficacy", value: "100–115 Lm/W" },
    ],
    beamAngles: ["15°", "24°", "36°", "60°"],
    imageSrc: "/images/products/rona.png",
    href: "/catalogue?category=Spot+Light",
    accent: "#f4f0e6",
  },
  {
    id: "linear",
    categoryName: "Linear Light",
    title: "Continuous Linear Profiles",
    subtitle: "Monolithic architectural extrusion channels with seamless micro-prismatic and opal diffusers.",
    pageRange: "P.21 – P.29",
    specs: [
      { label: "Length", value: "1000–2000mm" },
      { label: "Milling", value: "Custom Cut" },
      { label: "Power", value: "15W/m – 60W/m" },
      { label: "Mounting", value: "Recessed / Pendant" },
    ],
    beamAngles: ["120° Diffuse"],
    imageSrc: "/images/products/lena-50-linear.png",
    href: "/catalogue?category=Linear+Light",
    accent: "#60a5fa",
  },
  {
    id: "magnetic",
    categoryName: "Magnetic Series",
    title: "48V Low-Voltage Magnetic Rail",
    subtitle: "Tool-free click & lock luminaire modules with integrated DALI multi-channel addressing.",
    pageRange: "P.30 – P.44",
    specs: [
      { label: "Voltage", value: "48V Safe DC" },
      { label: "Dimming", value: "DALI / Tuya / BLE" },
      { label: "Profiles", value: "Surface / Trimless" },
      { label: "Modules", value: "Spot / Linear / Opal" },
    ],
    beamAngles: ["24°", "36°", "120°"],
    imageSrc: "/images/products/artis.png",
    href: "/catalogue?category=Magnetic+Series",
    accent: "#f4f0e6",
  },
  {
    id: "pendants",
    categoryName: "Pendant Light",
    title: "Architectural Statement Pendants",
    subtitle: "Direct/indirect volumetric suspended luminaires with acoustic felt and brushed aluminum.",
    pageRange: "P.45 – P.55",
    specs: [
      { label: "Direct/Ind.", value: "70% Down / 30% Up" },
      { label: "Suspension", value: "Max 3000mm Wire" },
      { label: "Drivers", value: "Internal Isolated" },
      { label: "Finishes", value: "Matte Anodized" },
    ],
    beamAngles: ["60° Direct", "120° Indirect"],
    imageSrc: "/images/products/c44-pendant.png",
    href: "/catalogue?category=Pendant+Light",
    accent: "#a78bfa",
  },
  {
    id: "track",
    categoryName: "Track Light",
    title: "Commercial & Museum Track Projectors",
    subtitle: "High-output architectural framing projectors with 355° pan, 90° tilt, and toolless zoom optics.",
    pageRange: "P.56 – P.70",
    specs: [
      { label: "Mounting", value: "3-Phase Global Track" },
      { label: "Optics", value: "Zoom 15°–50° Lens" },
      { label: "Rotation", value: "355° Pan / 90° Tilt" },
      { label: "CRI", value: "Ra ≥ 95 (R9 > 80)" },
    ],
    beamAngles: ["15°", "24°", "38°", "50°"],
    imageSrc: "/images/products/1911.png",
    href: "/catalogue?category=Track+Light",
    accent: "#34d399",
  },
  {
    id: "exterior",
    categoryName: "Outdoor Light",
    title: "IP67 / IP68 Inground & Façade Grazers",
    subtitle: "Marine-grade 316L stainless steel optical fixtures engineered for severe weather and drive-over loads.",
    pageRange: "P.71 – P.99",
    specs: [
      { label: "Protection", value: "IP68 Waterproof" },
      { label: "Impact", value: "IK10 Robust" },
      { label: "Load Cap.", value: "Drive-over 2000kg" },
      { label: "Housing", value: "316L Stainless Steel" },
    ],
    beamAngles: ["10° Graze", "25°", "45° Asym"],
    imageSrc: "/images/products/coastal.png",
    href: "/catalogue?category=Outdoor+Light",
    accent: "#38bdf8",
  },
];

export default function ArchitecturalSystems() {
  return (
    <section
      className="relative w-full py-20 lg:py-28 bg-background text-foreground overflow-hidden border-b border-border transition-colors duration-300"
      aria-labelledby="systems-title"
    >
      <div className="container-site relative z-10">
        
        {/* Section Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-muted-foreground shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f4f0e6] dark:bg-[#f4f0e6] border border-amber-600/30" />
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] font-medium text-foreground">
                Architectural Taxonomy
              </span>
            </div>
            <h2
              id="systems-title"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-foreground"
            >
              Master Engineering Systems
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl font-sans font-light leading-relaxed">
              6 modular architectural families engineered for seamless spatial integration, optical precision, and standardized DIN mounting interfaces.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-border bg-card text-foreground hover:bg-muted hover:border-border font-mono text-xs uppercase tracking-wider h-10 px-6 shrink-0 shadow-2xs"
          >
            <Link href="/catalogue">
              <span>View All 99 Fixtures</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* 6-Card High-Contrast Architectural Spec Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {SYSTEMS.map((system) => (
            <Link
              key={system.id}
              href={system.href}
              className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card/80 p-5 sm:p-7 lg:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#e6dfd1] dark:hover:border-[#e6dfd1]/50 hover:bg-card hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:-translate-y-1 touch-manipulation"
            >
              {/* Card Top: Category Tag + Catalog Page Anchor */}
              <div>
                <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-border/80">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-foreground font-bold">
                    {system.categoryName}
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border px-2 py-0.5">
                    {system.pageRange}
                  </Badge>
                </div>

                {/* Product Renders & Visual Focus Area */}
                <div className="relative h-36 sm:h-44 w-full my-4 sm:my-6 flex items-center justify-center overflow-hidden rounded-2xl bg-surface/80 dark:bg-zinc-950/60 border border-border/60 group-hover:border-border transition-colors">
                  {/* Subtle Light Halo */}
                  <div
                    className="absolute w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-transform duration-500 group-hover:scale-125"
                    style={{ background: system.accent }}
                  />
                  <Image
                    src={system.imageSrc}
                    alt={system.title}
                    width={180}
                    height={140}
                    className="object-contain p-2 max-h-36 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-medium text-foreground group-hover:text-primary dark:group-hover:text-[#f4f0e6] transition-colors">
                  {system.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-sans font-light">
                  {system.subtitle}
                </p>

                {/* Technical Specs List */}
                <div className="grid grid-cols-2 gap-2.5 mt-6 pt-5 border-t border-border/80 text-[11px] font-mono">
                  {system.specs.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-muted-foreground uppercase text-[9px] tracking-wider">{s.label}</span>
                      <span className="text-foreground font-medium truncate">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Beam Options & Explore Action */}
              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {system.beamAngles.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground font-semibold border border-border/60"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center text-xs font-mono font-semibold text-foreground dark:text-[#f4f0e6] group-hover:underline gap-1">
                  Explore
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

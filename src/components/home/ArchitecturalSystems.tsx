"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    accent: "#c8b88a",
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
    accent: "#008C45",
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
    accent: "#d4973a",
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
    accent: "#c8b88a",
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
    accent: "#008C45",
  },
  {
    id: "exterior",
    categoryName: "Outdoor Light",
    title: "IP67/IP68 Inground & Façade Grazers",
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
    accent: "#CD212A",
  },
];

export default function ArchitecturalSystems() {
  return (
    <section
      className="relative w-full py-20 lg:py-28 bg-background text-foreground overflow-hidden border-b border-border/50 transition-colors duration-300"
      aria-labelledby="systems-title"
    >
      <div className="container-site relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-border/50">
          <div>
            {/* Eyebrow — tricolore dots + editorial label */}
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="flex items-center gap-[3px]" aria-hidden="true">
                <span className="h-[9px] w-[4px] rounded-sm bg-[#008C45]" />
                <span className="h-[9px] w-[4px] rounded-sm bg-foreground/25 dark:bg-foreground/30" />
                <span className="h-[9px] w-[4px] rounded-sm bg-[#CD212A]" />
              </span>
              <span className="text-[11.5px] font-sans tracking-[0.10em] uppercase font-medium text-muted-foreground">
                Architectural Taxonomy
              </span>
            </div>

            <h2
              id="systems-title"
              className="text-3xl sm:text-4xl lg:text-[52px] font-light font-display tracking-tight text-foreground leading-[1.08] text-balance"
            >
              Master Engineering Systems
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-muted-foreground max-w-lg font-sans font-light leading-[1.75] text-pretty">
              6 modular architectural families engineered for seamless spatial integration,
              optical precision, and standardized DIN mounting interfaces.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-border/60 bg-transparent text-foreground hover:bg-accent/70 font-sans text-[12.5px] tracking-[0.06em] uppercase font-medium h-10 px-6 shrink-0 transition-colors"
          >
            <Link href="/catalogue" className="flex items-center gap-2">
              <span>View All 99 Fixtures</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* 6-Card Spec Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-12">
          {SYSTEMS.map((system) => (
            <Link
              key={system.id}
              href={system.href}
              className={`
                group relative flex flex-col justify-between
                rounded-2xl border border-border/60
                bg-card
                p-5 sm:p-6 lg:p-7
                transition-all duration-280
                hover:border-border
                hover:shadow-md
                dark:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]
                hover:-translate-y-[2px]
                touch-manipulation
              `}
            >
              {/* Card Top: Category tag + page anchor */}
              <div>
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border/50">
                  <span className="text-[11px] font-sans tracking-[0.10em] uppercase text-foreground font-semibold">
                    {system.categoryName}
                  </span>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] text-muted-foreground border-border/60 px-2 py-0.5 rounded-md"
                  >
                    {system.pageRange}
                  </Badge>
                </div>

                {/* Product render — warm surface, ambient halo */}
                <div className="relative h-36 sm:h-44 w-full my-5 sm:my-6 flex items-center justify-center overflow-hidden rounded-xl bg-surface dark:bg-surface-elevated border border-border/40 group-hover:border-border/70 transition-colors">
                  {/* Accent halo */}
                  <div
                    className="absolute w-24 h-24 rounded-full blur-[48px] opacity-25 pointer-events-none transition-all duration-500 group-hover:scale-130 group-hover:opacity-35"
                    style={{ background: system.accent }}
                  />
                  <Image
                    src={system.imageSrc}
                    alt={system.title}
                    width={180}
                    height={140}
                    className="object-contain p-3 max-h-36 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Title & description */}
                <h3 className="text-[18px] sm:text-[19px] font-display font-medium text-foreground leading-snug text-balance group-hover:text-foreground/90 transition-colors">
                  {system.title}
                </h3>
                <p className="mt-2 text-[12.5px] text-muted-foreground leading-[1.7] font-sans font-light text-pretty">
                  {system.subtitle}
                </p>

                {/* Technical specs — 2×2 grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 pt-4 border-t border-border/50">
                  {system.specs.map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-sans uppercase tracking-[0.09em] text-muted-foreground/70 font-medium">
                        {s.label}
                      </span>
                      <span className="text-[12px] font-mono text-foreground font-medium truncate">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom */}
              <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-1 flex-wrap">
                  {system.beamAngles.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-md bg-muted/60 dark:bg-muted/40 text-[10px] font-mono text-muted-foreground font-medium border border-border/40"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold text-foreground/70 group-hover:text-foreground transition-colors">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

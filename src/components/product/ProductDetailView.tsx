"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductVariant } from "@/lib/products";
import QuoteModal from "./QuoteModal";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Camera,
  Printer,
  Check,
  Plus,
  FileText,
  Download,
  ArrowRight,
  Sliders,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Eye,
  Compass,
  ChevronRight,
} from "lucide-react";
import { BeamAngleIcon } from "@/components/ui/beam-angle-icon";
import MobileProductVariantPicker from "@/components/mobile/MobileProductVariantPicker";

interface BeamSpec {
  angle: string;
  angleNumber: number;
  label: string;
  candela: number;
  application: string;
}

interface CctSpec {
  key: string;
  kelvin: number;
  label: string;
  name: string;
  hex: string;
  description: string;
}

const BEAM_CATALOG: Record<string, { label: string; candela: number; application: string }> = {
  "10°": { label: "Pin Spot", candela: 18500, application: "High ceiling pinpoint highlights, fine art displays" },
  "15°": { label: "Narrow Spot", candela: 12500, application: "Museum exhibits, sculpture accents, architectural focal points" },
  "20°": { label: "Spot", candela: 8200, application: "Gallery displays, high-end retail vitrines, table accents" },
  "24°": { label: "Medium Spot", candela: 5400, application: "Dining tables, retail mannequins, feature walls" },
  "30°": { label: "Medium Flood", candela: 3800, application: "Residential dining, hospitality lounges, art collections" },
  "36°": { label: "Flood", candela: 2800, application: "General ambient accent, residential lounges, hotel lobbies" },
  "40°": { label: "Wide Flood", candela: 2200, application: "Showrooms, living spaces, hotel guest rooms" },
  "45°": { label: "Wide Flood", candela: 1900, application: "Conference tables, hospitality suites, reception areas" },
  "50°": { label: "Very Wide Flood", candela: 1650, application: "Commercial interiors, open lounge spaces, retail ambient" },
  "60°": { label: "Wide Flood", candela: 1450, application: "Open plan offices, conference rooms, circulation corridors" },
  "90°": { label: "Extra Wide", candela: 950, application: "Low ceiling general illumination, wide spatial wash" },
  "120°": { label: "Diffuse Linear", candela: 620, application: "Continuous perimeter grazing, cove lighting, wall washing" },
};

function getBeamSpec(angleStr: string): BeamSpec {
  const angleNumber = parseInt(angleStr.replace(/[^0-9]/g, ""), 10) || 24;
  const normalizedKey = `${angleNumber}°`;
  const meta = BEAM_CATALOG[normalizedKey] || {
    label: angleNumber <= 15 ? "Narrow Spot" : angleNumber <= 30 ? "Medium Spot" : angleNumber <= 50 ? "Flood" : "Wide Flood",
    candela: Math.round(5400 * (24 / Math.max(10, angleNumber))),
    application: "Architectural general & accent illumination",
  };
  return {
    angle: angleStr,
    angleNumber,
    label: meta.label,
    candela: meta.candela,
    application: meta.application,
  };
}

const CCT_CATALOG: Record<string, { kelvin: number; name: string; hex: string; description: string }> = {
  "2700K": { kelvin: 2700, name: "Warm Incandescent", hex: "#ffb366", description: "Intimate residential warmth, luxury hospitality & spa suites" },
  "3000K": { kelvin: 3000, name: "Soft Architectural", hex: "#ffd199", description: "Standard architectural warm white; museums, retail & galleries" },
  "3500K": { kelvin: 3500, name: "Warm Neutral", hex: "#ffe4c4", description: "Modern commercial spaces, executive suites, hospitality" },
  "4000K": { kelvin: 4000, name: "Neutral Daylight", hex: "#fff0d9", description: "Crisp neutral white for modern offices, healthcare & studios" },
  "5000K": { kelvin: 5000, name: "Daylight White", hex: "#eaf4ff", description: "High-acuity tasks, graphic design studios & clinical rooms" },
  "5700K": { kelvin: 5700, name: "Cool Daylight", hex: "#d8ebff", description: "Industrial precision, exhibition halls & sports facilities" },
  "6000K": { kelvin: 6000, name: "Cool Daylight", hex: "#dbeafe", description: "Crisp architectural cool light, clean minimalist spaces" },
  "6500K": { kelvin: 6500, name: "Circadian Daylight", hex: "#c8e4ff", description: "Human-centric biodynamic lighting synchronized to solar cycle" },
  "Tunable White": { kelvin: 6500, name: "Circadian 2700–6500K", hex: "#c8e4ff", description: "Human-centric biodynamic lighting synchronized to solar cycle" },
  "RGB / RGBW": { kelvin: 4000, name: "Dynamic Spectrum", hex: "#f43f5e", description: "Full chromatic control for immersive architectural environments" },
};

function getCctSpec(cctStr: string): CctSpec {
  const kelvinNum = parseInt(cctStr.replace(/[^0-9]/g, ""), 10) || (cctStr.toLowerCase().includes("tunable") ? 6500 : 3000);
  const meta = CCT_CATALOG[cctStr] || {
    kelvin: kelvinNum,
    name: kelvinNum <= 2700 ? "Warm Incandescent" : kelvinNum <= 3000 ? "Soft Architectural" : kelvinNum <= 4000 ? "Neutral Daylight" : "Cool Daylight",
    hex: kelvinNum <= 2700 ? "#ffb366" : kelvinNum <= 3000 ? "#ffd199" : kelvinNum <= 4000 ? "#fff0d9" : "#c8e4ff",
    description: "Architectural color temperature specification",
  };
  return {
    key: cctStr,
    kelvin: meta.kelvin,
    label: cctStr,
    name: meta.name,
    hex: meta.hex,
    description: meta.description,
  };
}

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [activeMedia, setActiveMedia] = useState<"photo" | "diagram">("photo");
  const [activeSpecTab, setActiveSpecTab] = useState<"optical" | "electrical" | "mechanical" | "downloads">("optical");
  const [selectedCct, setSelectedCct] = useState<string>(product.cct[0] || "3000K");
  const [selectedBeam, setSelectedBeam] = useState<string>(product.beamAngles[0] || "24°");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product.variants?.[0] || null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const mountingHeight = 3.0;
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const { isInSchedule, addItem, removeItem, openDrawer } = useSpecSchedule();
  const inSchedule = isInSchedule(product.id);

  const photoSrc = product.images[selectedPhotoIndex] || product.images[0] || "/images/products/rona.png";
  const diagramSrc = product.dimensionDiagram || photoSrc;

  // Optical & Photometric calculations for interactive simulation
  const ceilingHeight = 3.0;
  const selectedBeamSpec = getBeamSpec(selectedBeam);
  const selectedCctSpec = getCctSpec(selectedCct);
  const currentCctColor = selectedCctSpec.hex;
  const activeLightColor = currentCctColor;

  // Optical beam geometry
  const rad = (selectedBeamSpec.angleNumber * Math.PI) / 360;
  const beamRadius = ceilingHeight * Math.tan(rad);
  const beamDiameter = (2 * beamRadius).toFixed(2);
  const floorLux = Math.round(selectedBeamSpec.candela / Math.pow(ceilingHeight, 2));

  return (
    <div className="space-y-10 sm:space-y-12 pb-24 sm:pb-16 max-w-7xl mx-auto text-foreground">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO HEADER & PRODUCT CONFIGURATION STAGE (SYMMETRICAL)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4 sm:space-y-5">
        {/* Top Breadcrumb & Action Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-3.5 sm:pb-4 no-print">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] text-muted-foreground font-medium flex-wrap">
            <Link href="/catalogue" className="hover:text-foreground transition-colors">Catalogue</Link>
            <ChevronRight className="h-3 w-3 opacity-40" />
            <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3 opacity-40" />
            <span className="text-foreground font-semibold truncate max-w-[180px] sm:max-w-none">{product.model}</span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="font-sans text-xs uppercase tracking-[0.14em] font-medium gap-2 rounded-full px-3.5 h-8.5 touch-manipulation cursor-pointer border-border hover:bg-[#f4f0e6] hover:text-neutral-950 hover:border-[#e6dfd1]"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Spec</span>
            </Button>

            <Button
              variant={inSchedule ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (inSchedule) {
                  removeItem(product.id);
                } else {
                  addItem(product, {
                    selectedCct,
                    selectedBeamAngle: selectedBeam,
                  });
                  openDrawer();
                }
              }}
              className={`font-sans text-xs uppercase tracking-[0.14em] gap-2 rounded-full px-3.5 h-8.5 transition-all touch-manipulation cursor-pointer ${
                inSchedule
                  ? "bg-[#f4f0e6] hover:bg-[#eae4d5] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs"
                  : "border-border/90 text-foreground hover:bg-[#f4f0e6] hover:text-neutral-950 hover:border-[#e6dfd1] font-medium"
              }`}
            >
              {inSchedule ? <Check className="h-3.5 w-3.5 text-neutral-950 stroke-[3]" /> : <Plus className="h-3.5 w-3.5" />}
              <span>{inSchedule ? "In Schedule" : "Add Schedule"}</span>
            </Button>

            <Button
              size="sm"
              onClick={() => setIsQuoteOpen(true)}
              className="font-sans text-xs uppercase tracking-[0.14em] font-bold gap-2 shadow-xs rounded-full px-4.5 h-8.5 touch-manipulation cursor-pointer bg-[#f4f0e6] text-neutral-950 hover:bg-[#eae4d5] border border-[#e6dfd1]"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Request RFQ</span>
            </Button>
          </div>
        </div>

        {/* Full-Width Panoramic Luminaire Visual Stage */}
        <div className="w-full">
          <Card
            style={{ viewTransitionName: `product-image-${product.slug}` } as React.CSSProperties}
            className="relative w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[380px] rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-muted/30 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden shadow-xs transform-gpu"
          >
            {/* Dynamic Ambient Kelvin Glow */}
            <div
              className="absolute top-0 inset-x-0 h-full pointer-events-none opacity-40 blur-3xl transition-all duration-700"
              style={{
                background: activeLightColor.startsWith("linear")
                  ? activeLightColor
                  : `radial-gradient(circle at 50% 25%, ${activeLightColor} 0%, transparent 70%)`,
              }}
            />

            <Image
              src={activeMedia === "photo" ? photoSrc : diagramSrc}
              alt={`${product.model} architectural luminaire`}
              fill
              priority
              sizes="100vw"
              className="object-contain p-4 sm:p-6 md:p-8 transition-all duration-500 hover:scale-105 transform-gpu mix-blend-multiply dark:mix-blend-normal"
            />

            {/* Floating Architectural Badges (Top-Left) */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-[48%]">
              <Badge variant="secondary" className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider shadow-2xs rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 bg-secondary text-secondary-foreground border border-border/50">
                {product.ipRating}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] tracking-wider shadow-2xs bg-background/90 text-foreground backdrop-blur-md rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 border-border/80">
                {product.environment}
              </Badge>
              {product.installationMethod && (
                <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] tracking-wider shadow-2xs bg-background/90 text-foreground backdrop-blur-md rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 hidden md:inline-flex border-border/80">
                  {product.installationMethod}
                </Badge>
              )}
            </div>

            {/* Top-Right Corner Floating Media Switcher Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 no-print">
              <Tabs
                value={activeMedia}
                onValueChange={(v) => setActiveMedia(v as "photo" | "diagram")}
                className="w-auto"
              >
                <TabsList className="h-8 sm:h-9 rounded-full p-1 bg-background/85 dark:bg-zinc-950/85 backdrop-blur-md border border-border/90 dark:border-white/15 shadow-xs gap-1 flex items-center">
                  <TabsTrigger
                    value="photo"
                    className="h-full font-mono text-[10px] sm:text-xs uppercase tracking-wider rounded-full px-3 sm:px-3.5 text-muted-foreground hover:text-foreground hover:bg-[#f4f0e6]/40 data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:shadow-xs data-[state=active]:font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70" />
                    <span>Photography</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="diagram"
                    className="h-full font-mono text-[10px] sm:text-xs uppercase tracking-wider rounded-full px-3 sm:px-3.5 text-muted-foreground hover:text-foreground hover:bg-[#f4f0e6]/40 data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:shadow-xs data-[state=active]:font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Compass className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70" />
                    <span>Cutout & CAD</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Gallery Thumbnails Strip (Bottom-Left Floating Glass Dock) */}
            {activeMedia === "photo" && product.images.length > 1 && (
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2 bg-background/85 dark:bg-zinc-950/85 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-border/90 dark:border-white/15 shadow-sm max-w-[calc(100%-140px)] overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider pl-1.5 pr-0.5 hidden sm:inline-block">Views:</span>
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl border overflow-hidden bg-card transition-all shrink-0 cursor-pointer ${
                      selectedPhotoIndex === idx
                        ? "border-foreground ring-2 ring-foreground/20 shadow-xs scale-105"
                        : "border-border/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.model} angle ${idx + 1}`}
                      fill
                      className="object-contain p-1 mix-blend-multiply dark:mix-blend-normal"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Bottom-Right Catalogue Page */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] bg-background/90 backdrop-blur-md rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-muted-foreground border-border/80 shadow-2xs">
                Catalogue P.{product.catalogPage}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Full-Width Product Identity, Description, Metrics & Technical Specs Below Image */}
        <div className="w-full space-y-6 pt-1">
          <div className="space-y-2.5">
            {/* Model Header Title & Series Identity */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold">
                {product.category}
              </span>
              {product.subseries && (
                <>
                  <span className="text-muted-foreground opacity-40">•</span>
                  <Badge variant="outline" className="font-mono text-[11px] font-medium border-border/80 px-2.5 py-0.5 text-foreground bg-muted/40">
                    {product.subseries}
                  </Badge>
                </>
              )}
            </div>

            <h1
              style={{ viewTransitionName: `product-title-${product.slug}` } as React.CSSProperties}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground font-display leading-[1.05]"
            >
              {product.model}
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Pro-Luce Architectural Master Catalogue · Page {product.catalogPage}
            </p>

            {/* Architectural Summary Statement */}
            <p className="pt-0.5 text-xs sm:text-sm text-foreground/85 leading-relaxed font-light max-w-4xl">
              {product.description}
            </p>
          </div>

          {/* 4-Metric Key Performance Matrix (Full Width 4 Columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full pt-1">
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                Power
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-foreground truncate block">
                {selectedVariant ? selectedVariant.power : product.power}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                Output
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-foreground truncate block">
                {selectedVariant ? selectedVariant.lumens : (product.efficacy || product.lumens)}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                CRI Quality
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-foreground truncate block">
                {product.cri}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                Protection
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-foreground truncate block">
                {product.ipRating}
              </span>
            </div>
          </div>

          {/* Series Model Matrix (if variants exist) */}
          {product.variants && product.variants.length > 0 ? (
            <Card className="p-5 sm:p-6 shadow-xs space-y-4 border-border/80 bg-card/90 backdrop-blur-md rounded-3xl w-full">
              <div className="flex flex-row items-center justify-between gap-2 border-b border-border pb-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  Series Model Matrix
                </h3>
                {selectedVariant && (
                  <Badge variant="default" className="font-mono text-[11px] rounded-full px-3 py-1 bg-[#f4f0e6] text-neutral-950 border border-[#e6dfd1] font-semibold">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {selectedVariant.model} · {selectedVariant.power}
                  </Badge>
                )}
              </div>

              {/* Mobile Variant Picker (< sm) */}
              <div className="block sm:hidden">
                <MobileProductVariantPicker
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={(v) => setSelectedVariant(v)}
                />
              </div>

              {/* Desktop Variant Table (>= sm) */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border text-muted-foreground font-mono uppercase text-[10px]">
                      <TableHead>Model</TableHead>
                      <TableHead>Power</TableHead>
                      <TableHead>Output</TableHead>
                      <TableHead>Dimensions</TableHead>
                      <TableHead>Cut-Out</TableHead>
                      <TableHead className="text-right">Select</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-border/60">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.model === v.model;
                      return (
                        <TableRow
                          key={v.model}
                          onClick={() => setSelectedVariant(v)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-muted/70 font-semibold" : "hover:bg-muted/30"
                          }`}
                        >
                          <TableCell className="font-mono font-bold text-foreground">
                            {v.model}
                          </TableCell>
                          <TableCell className="font-mono text-foreground/90">{v.power}</TableCell>
                          <TableCell className="font-mono text-foreground/90">{v.lumens}</TableCell>
                          <TableCell className="font-mono text-foreground/90">{v.dimensions}</TableCell>
                          <TableCell className="font-mono text-foreground font-semibold">{v.cutout}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              size="xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedVariant(v);
                              }}
                              className={`font-mono text-[10px] uppercase tracking-wider rounded-full px-3.5 ${
                                isSelected
                                  ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] hover:bg-[#eae4d5]"
                                  : "border-border text-foreground hover:bg-muted"
                              }`}
                            >
                              {isSelected ? "Active" : "Select"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            /* Engineering Quick Specifications (Full Width 4-Columns on lg) */
            <Card className="p-5 sm:p-6 shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl space-y-4 w-full">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2 border-b border-border pb-3">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                Engineering Quick Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                  <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Mounting / Installation</span>
                  <span className="font-semibold text-foreground mt-1 block text-xs sm:text-sm">{product.installationMethod}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                  <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Housing Construction</span>
                  <span className="font-semibold text-foreground mt-1 block text-xs sm:text-sm">{product.material}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                  <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Standard Finishes</span>
                  <span className="font-semibold text-foreground mt-1 block text-xs sm:text-sm">{product.finishes.join(" · ")}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                  <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Driver Protocols</span>
                  <span className="font-semibold text-foreground mt-1 block text-xs sm:text-sm">{product.driverOptions.join(", ")}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Direct Specifier Action Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-xl">
            <Button
              onClick={() => setIsQuoteOpen(true)}
              className="w-full sm:w-auto flex-1 rounded-full bg-[#f4f0e6] text-neutral-950 hover:bg-[#eae4d5] hover:border-[#ded6c3] border border-[#e6dfd1] font-sans text-xs uppercase tracking-[0.14em] font-bold shadow-xs h-12 gap-2 flex items-center justify-center cursor-pointer transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Request Project RFQ</span>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto flex-1 rounded-full border-border bg-card/80 hover:bg-accent font-sans text-xs uppercase tracking-[0.14em] font-medium text-foreground h-12 cursor-pointer"
            >
              <a
                href={product.datasheetPdf || "/pdf/Pro-Luce-Catalogue.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download={`${product.model}-Datasheet.pdf`}
                className="flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Spec PDF</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: DEDICATED INTERACTIVE PHOTOMETRIC & OPTICAL STUDIO
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-10 border-t border-border no-print">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground font-medium mb-1">
              <Sliders className="h-3.5 w-3.5 text-stone-400" />
              <span>Pro-Luce Optical Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-foreground">
              Interactive Photometric Lab
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl font-sans font-light leading-relaxed">
              Explore the physics of our optical engine: real-time TIR beam distribution, 30° anti-glare shielding angle, and calculated floor illuminance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Badge variant="outline" className="font-mono text-xs text-foreground border-border px-3 py-1 bg-card shadow-2xs">
              CRI {product.cri || "Ra ≥ 90"}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs text-foreground border-border px-3 py-1 bg-card shadow-2xs">
              SDCM {product.sdcm || "< 2-Step"}
            </Badge>
          </div>
        </div>

        {/* Studio Grid: Left Optical Controls + Right Real-time Light Cone Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
          
          {/* Left Column: Interactive Parametric Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Beam Angle Selector Card */}
            {product.beamAngles.length > 0 && (
              <Card className="p-4 sm:p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">Optical Distribution</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground shrink-0">
                    {selectedBeamSpec.angle} · {selectedBeamSpec.label}
                  </span>
                </div>

                <div className={`grid gap-1.5 sm:gap-2 ${product.beamAngles.length <= 3 ? "grid-cols-3" : product.beamAngles.length === 4 ? "grid-cols-4" : "grid-cols-5"}`}>
                  {product.beamAngles.map((b) => {
                    const bSpec = getBeamSpec(b);
                    const isSelected = selectedBeam === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBeam(b)}
                        className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border font-mono transition-all duration-200 cursor-pointer touch-manipulation ${
                          isSelected
                            ? "bg-[#f4f0e6] border-[#e6dfd1] text-zinc-950 font-bold shadow-md scale-[1.02]"
                            : "bg-surface/80 dark:bg-zinc-800/60 border-border text-foreground hover:border-stone-400 hover:bg-muted"
                        }`}
                      >
                        <BeamAngleIcon
                          angle={bSpec.angleNumber}
                          isSelected={isSelected}
                          className="h-4 w-4 sm:h-5 sm:w-5 mb-0.5 sm:mb-1 shrink-0"
                        />
                        <span className="text-[11px] sm:text-xs font-bold">{b}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-border/80 text-xs text-muted-foreground leading-relaxed font-sans">
                  <strong className="text-foreground font-medium">Application:</strong> {selectedBeamSpec.application}
                </div>
              </Card>
            )}

            {/* 2. Color Temperature (CCT) Card with Available Presets & Synced Spectrum */}
            <Card className="p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-stone-400" />
                  Color Temperature (CCT)
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {selectedCctSpec.label}
                </span>
              </div>

              {/* Preset Buttons for Available CCTs */}
              <div className={`grid gap-2.5 ${product.cct.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {product.cct.map((c) => {
                  const cSpec = getCctSpec(c);
                  const isSelected = selectedCct === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedCct(c)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer touch-manipulation ${
                        isSelected
                          ? "bg-[#f4f0e6] border-[#e6dfd1] text-zinc-950 font-bold shadow-xs"
                          : "bg-surface/80 dark:bg-zinc-800/60 border-border text-foreground hover:border-stone-400 hover:bg-muted"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shrink-0 shadow-xs border border-black/30 transition-colors duration-200"
                        style={{ background: cSpec.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-mono font-bold leading-none">
                          {cSpec.label}
                        </div>
                        <div
                          className={`text-[10px] truncate mt-0.5 ${
                            isSelected ? "text-zinc-800 font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {cSpec.name}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="h-3 w-3 text-zinc-950 shrink-0 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Kelvin Spectrum Indicator Bar */}
              <div className="mt-4 pt-3.5 border-t border-border/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span
                      className="h-2 w-2 rounded-full border border-black/20 shadow-2xs transition-colors duration-200"
                      style={{ background: currentCctColor }}
                    />
                    <span>Kelvin Spectrum</span>
                  </span>
                  <span className="text-foreground font-semibold font-mono">
                    {selectedCctSpec.kelvin}K · {selectedCctSpec.name}
                  </span>
                </div>

                {/* Quick Snap Reference Markers for Available Product CCTs */}
                <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground px-1 pt-1">
                  {product.cct.map((c) => {
                    const isSelected = selectedCct === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCct(c)}
                        className={`hover:text-foreground transition-colors cursor-pointer touch-manipulation flex flex-col items-center gap-0.5 ${
                          isSelected ? "text-foreground font-bold" : ""
                        }`}
                      >
                        <span className={`w-0.5 rounded-full transition-all duration-200 ${isSelected ? "h-2 bg-foreground" : "h-1 bg-muted-foreground/30"}`} />
                        <span>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Direct Action Button */}
            <div className="pt-1">
              <Button
                onClick={() => setIsQuoteOpen(true)}
                className="w-full rounded-full bg-[#f4f0e6] text-zinc-950 hover:bg-[#eae4d5] font-sans text-xs uppercase tracking-[0.14em] font-semibold h-11 shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border border-[#e6dfd1]"
              >
                <span>Request Project RFQ for {selectedBeam}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>

          </div>

          {/* Right Column: Real-Time Optical Stage (SVG Light Cone Simulation) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl p-6 sm:p-7 flex flex-col items-center backdrop-blur-md">
              
              {/* Studio Canvas HUD Top Bar */}
              <div className="w-full flex items-center justify-between border-b border-zinc-800/80 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse transition-colors duration-300"
                    style={{
                      background: currentCctColor,
                      boxShadow: `0 0 8px ${currentCctColor}`,
                    }}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                    Optical Ray Simulator
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span>CBCP: <strong className="text-[#f4f0e6] font-semibold">{selectedBeamSpec.candela.toLocaleString()} cd</strong></span>
                  <span>Cutoff: <strong className="text-zinc-100 font-semibold">30° Shielded</strong></span>
                </div>
              </div>

              {/* Dynamic SVG Optical Cone Simulation Canvas */}
              <div className="relative w-full max-w-[460px] h-[270px] sm:h-[285px] flex items-center justify-center">
                
                {/* SVG Ray Cone */}
                <svg
                  viewBox="0 0 400 270"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Beam Glow Radial Gradient */}
                    <radialGradient id={`pdpBeamGrad-${product.id}`} cx="50%" cy="0%" r="90%">
                      <stop offset="0%" stopColor={currentCctColor} stopOpacity="0.85" />
                      <stop offset="35%" stopColor={currentCctColor} stopOpacity="0.45" />
                      <stop offset="70%" stopColor={currentCctColor} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={currentCctColor} stopOpacity="0.0" />
                    </radialGradient>

                    {/* Lens Point Flare */}
                    <radialGradient id={`pdpFlare-${product.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor={currentCctColor} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={currentCctColor} stopOpacity="0.0" />
                    </radialGradient>
                  </defs>

                  {/* Architectural Grid Lines */}
                  <line x1="20" y1="20" x2="380" y2="20" stroke="#333" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="20" y1="230" x2="380" y2="230" stroke="#444" strokeWidth="1.5" />
                  <text x="25" y="15" fill="#777" fontSize="9" fontFamily="monospace">CEILING PLANE (H=0.0m)</text>
                  <text x="25" y="244" fill="#777" fontSize="9" fontFamily="monospace">FLOOR / WORKPLANE (H={ceilingHeight.toFixed(1)}m)</text>

                  {/* Calculated SVG Optical Cone Points */}
                  {(() => {
                    const apexX = 200;
                    const apexY = 20;
                    const floorY = 230;
                    const heightPixels = floorY - apexY;
                    const halfWidth = Math.min(170, Math.max(25, heightPixels * Math.tan(rad)));
                    const leftX = apexX - halfWidth;
                    const rightX = apexX + halfWidth;

                    return (
                      <>
                        {/* Light Cone Polygon */}
                        <polygon
                          points={`${apexX},${apexY} ${leftX},${floorY} ${rightX},${floorY}`}
                          fill={`url(#pdpBeamGrad-${product.id})`}
                          className="transition-all duration-300 ease-out"
                        />

                        {/* Optical Edge Rays */}
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={leftX}
                          y2={floorY}
                          stroke={currentCctColor}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="transition-all duration-300 ease-out"
                        />
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={rightX}
                          y2={floorY}
                          stroke={currentCctColor}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="transition-all duration-300 ease-out"
                        />

                        {/* Floor Light Pool (Ellipse) */}
                        <ellipse
                          cx={apexX}
                          cy={floorY}
                          rx={halfWidth}
                          ry="9"
                          fill={currentCctColor}
                          fillOpacity="0.35"
                          className="transition-all duration-300 ease-out"
                        />

                        {/* Dimension Arrow for Floor Beam Diameter */}
                        <line x1={leftX} y1="254" x2={rightX} y2="254" stroke="#888" strokeWidth="1" />
                        <line x1={leftX} y1="249" x2={leftX} y2="259" stroke="#888" strokeWidth="1" />
                        <line x1={rightX} y1="249" x2={rightX} y2="259" stroke="#888" strokeWidth="1" />
                        <text
                          x={apexX}
                          y="266"
                          fill="#f4f0e6"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          Ø {beamDiameter}m Beam Spread
                        </text>
                      </>
                    );
                  })()}

                  {/* Luminaire Head Hardware */}
                  <rect x="186" y="8" width="28" height="12" rx="2" fill="#171717" stroke="#525252" strokeWidth="1.5" />
                  <circle cx="200" cy="20" r="6" fill={`url(#pdpFlare-${product.id})`} />
                </svg>

              </div>

              {/* Real-time Photometric Metrics Summary Bar (3 tiles) */}
              <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-zinc-800">
                <div className="text-center p-2 sm:p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-zinc-400">Calculated Lux</div>
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-[#f4f0e6] mt-0.5">
                    {floorLux.toLocaleString()} lx
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-zinc-400 font-mono hidden xs:block">Floor Center</div>
                </div>

                <div className="text-center p-2 sm:p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-zinc-400">Beam Spread</div>
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-zinc-100 mt-0.5">
                    Ø {beamDiameter}m
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-zinc-400 font-mono hidden xs:block">at {ceilingHeight.toFixed(1)}m H</div>
                </div>

                <div className="text-center p-2 sm:p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-zinc-400">Glare Rating</div>
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-emerald-400 mt-0.5">
                    UGR {product.ugr || "< 19"}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-zinc-400 font-mono hidden xs:block">Dark-Light</div>
                </div>
              </div>

              {/* Engineering Standard Validation Footer */}
              <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-4 px-1 text-center xs:text-left">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  IEC 62722 Photometric Validated
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-stone-300 shrink-0" />
                  RG0 Zero Risk
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TECHNICAL SPECIFICATIONS & DOWNLOADS TABBED MATRIX (FULL-WIDTH)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-10 sm:pt-14 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-1.5">
              <Zap className="h-3.5 w-3.5 text-foreground" />
              <span>Datasheet & Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-foreground font-display leading-snug pt-1">
              Technical Engineering Specifications
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-light">
              Exhaustive optical, electrical, mechanical parameters, and certified compliance documentation.
            </p>
          </div>
        </div>

        {/* Tabbed Specification Matrix Card */}
        <Card className="p-6 sm:p-8 shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
          <Tabs
            value={activeSpecTab}
            onValueChange={(v) => setActiveSpecTab(v as typeof activeSpecTab)}
            className="w-full space-y-6"
          >
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 h-auto sm:h-12 p-1.5 bg-muted/60 dark:bg-muted/40 rounded-2xl sm:rounded-full border border-border/80 gap-1.5 items-center">
              <TabsTrigger
                value="optical"
                className="h-10 sm:h-full rounded-xl sm:rounded-full font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-background/40 data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:font-bold data-[state=active]:shadow-xs transition-all cursor-pointer flex items-center justify-center text-center px-2 sm:px-3"
              >
                Optics & Photometry
              </TabsTrigger>
              <TabsTrigger
                value="electrical"
                className="h-10 sm:h-full rounded-xl sm:rounded-full font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-background/40 data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:font-bold data-[state=active]:shadow-xs transition-all cursor-pointer flex items-center justify-center text-center px-2 sm:px-3"
              >
                Electrical & Drivers
              </TabsTrigger>
              <TabsTrigger
                value="mechanical"
                className="h-10 sm:h-full rounded-xl sm:rounded-full font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-background/40 data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:font-bold data-[state=active]:shadow-xs transition-all cursor-pointer flex items-center justify-center text-center px-2 sm:px-3"
              >
                Mechanical & Construction
              </TabsTrigger>
              <TabsTrigger
                value="downloads"
                className="h-10 sm:h-full rounded-xl sm:rounded-full font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground hover:bg-background/40 data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:font-bold data-[state=active]:shadow-xs transition-all cursor-pointer flex items-center justify-center text-center px-2 sm:px-3"
              >
                Downloads & CAD
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Optical & Photometry (Symmetrical 5 vs 5 rows) */}
            <TabsContent value="optical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-xs">
                <div className="divide-y divide-border/60">
                  <SpecRow
                    label={selectedVariant ? `Power Rating (${selectedVariant.model})` : "Power Consumption"}
                    value={selectedVariant ? selectedVariant.power : product.power}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label={selectedVariant ? `Luminous Output (${selectedVariant.model})` : "Luminous Flux Output"}
                    value={selectedVariant ? selectedVariant.lumens : (product.efficacy || product.lumens)}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label="System Luminous Efficacy"
                    value={product.efficacy || "100 Lm/W"}
                    isMono
                  />
                  <SpecRow
                    label="Color Rendering Index (CRI)"
                    value={product.cri}
                    isMono
                  />
                  <SpecRow
                    label="Color Temperatures (CCT)"
                    value={product.cct.join(" · ")}
                  />
                </div>

                <div className="divide-y divide-border/60">
                  <SpecRow
                    label="Optical Beam Angles"
                    value={product.beamAngles.join(", ")}
                    isMono
                  />
                  <SpecRow
                    label="Glare Shielding Standard"
                    value={product.ugr ? `UGR < ${product.ugr} Shielded` : "UGR < 19 Shielded"}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label="Color Consistency (SDCM)"
                    value={product.sdcm || "SDCM ≤ 3 (MacAdam 3-Step)"}
                    isMono
                  />
                  <SpecRow
                    label="Reflector Architecture"
                    value={product.optics || "Specular Aluminum Reflector"}
                  />
                  <SpecRow
                    label="Rated Lifespan Expectancy"
                    value={product.lifeHours || "50,000 Hours (L80B10 @ 25°C)"}
                    isMono
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Electrical & Drivers (Symmetrical 5 vs 5 rows) */}
            <TabsContent value="electrical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-xs">
                <div className="divide-y divide-border/60">
                  <SpecRow
                    label="Input Voltage Range"
                    value={product.inputVoltage || "AC 85–265V / 220–240V"}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label="Driver & Control Protocols"
                    value={product.driverOptions.join(", ")}
                    isHighlight
                  />
                  <SpecRow
                    label="Power Factor (PF)"
                    value="PF ≥ 0.95 (High-Efficiency)"
                    isMono
                  />
                  <SpecRow
                    label="Mains Frequency Range"
                    value="50 / 60 Hz"
                    isMono
                  />
                  <SpecRow
                    label="Electrical Safety Class"
                    value="Class I / Class II Protective Earth"
                  />
                </div>

                <div className="divide-y divide-border/60">
                  <SpecRow
                    label="Ambient Operating Temp (Ta)"
                    value={product.operatingTemp || "-20°C to +45°C"}
                    isMono
                  />
                  <SpecRow
                    label="Glow Wire Flammability"
                    value={product.glowWireTest || "850°C Self-Extinguishing"}
                    isMono
                  />
                  <SpecRow
                    label="Certified Safety Standards"
                    value={product.standards || "CE, RoHS, EN 60598-1, CB"}
                  />
                  <SpecRow
                    label="Surge Protection Level"
                    value="2.0 kV (L-N) / 4.0 kV (L-PE)"
                    isMono
                  />
                  <SpecRow
                    label="Wireless Mesh Protocol"
                    value="Casambi / Tuya / BLE on request"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Mechanical & Construction (Symmetrical 5 vs 5 rows) */}
            <TabsContent value="mechanical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-xs">
                <div className="divide-y divide-border/60">
                  <SpecRow
                    label="Mounting & Installation"
                    value={product.installationMethod}
                    isHighlight
                  />
                  <SpecRow
                    label={selectedVariant ? `Ceiling Cutout (${selectedVariant.model})` : "Ceiling Cutout Required"}
                    value={selectedVariant ? selectedVariant.cutout : (product.cutout || "Per model cut-out")}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label={selectedVariant ? `Profile Dimensions (${selectedVariant.model})` : "Overall Profile Dimensions"}
                    value={selectedVariant ? selectedVariant.dimensions : product.dimensions}
                    isMono
                  />
                  <SpecRow
                    label="Optical Head Adjustability"
                    value="Fixed Deep Recessed / Directional"
                  />
                  <SpecRow
                    label="Approximate Net Weight"
                    value="0.45 kg – 1.20 kg (luminaire body)"
                    isMono
                  />
                </div>

                <div className="divide-y divide-border/60">
                  <SpecRow
                    label="Housing Construction Material"
                    value={product.material}
                  />
                  <SpecRow
                    label="Ingress Protection (IP Rating)"
                    value={product.ipRating}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label="Standard Powder-Coat Finishes"
                    value={product.finishes.join(" / ")}
                  />
                  <SpecRow
                    label="Thermal Management"
                    value="Passive Die-Cast Heat Sink Architecture"
                  />
                  <SpecRow
                    label="Impact Resistance Standard"
                    value="IK06 / IK08 Architectural Grade"
                    isMono
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Downloads & CAD */}
            <TabsContent value="downloads" className="mt-0">
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Download official engineering datasheets, certified photometric files (IES/LDT), and dimensional CAD drawings for {product.model}.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <Button
                    asChild
                    variant="default"
                    className="h-auto p-4 justify-start gap-3.5 text-left rounded-2xl cursor-pointer bg-[#f4f0e6] text-neutral-950 border border-[#e6dfd1] hover:bg-[#eae4d5] hover:border-[#ded6c3] shadow-xs transition-all"
                  >
                    <a
                      href={product.datasheetPdf || "/pdf/Pro-Luce-Catalogue.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`${product.model}-Datasheet.pdf`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-[#f4f0e6] font-mono text-xs font-bold shrink-0 shadow-2xs">
                        PDF
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Product Datasheet</div>
                        <div className="text-[10px] font-mono opacity-80">Verified Engineering Sheet</div>
                      </div>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 justify-start gap-3.5 text-left rounded-2xl cursor-pointer border-border bg-card text-foreground hover:bg-muted"
                  >
                    <a
                      href="/pdf/Pro-Luce-Catalogue.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download="Pro-Luce-Catalogue.pdf"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground font-mono text-xs font-bold shrink-0 shadow-2xs">
                        PDF
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Master Catalogue</div>
                        <div className="text-[10px] font-mono text-muted-foreground">Page {product.catalogPage} · Complete Series</div>
                      </div>
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setIsQuoteOpen(true)}
                    className="h-auto p-4 justify-start gap-3.5 text-left rounded-2xl cursor-pointer border-border bg-card text-foreground hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground font-mono text-xs font-bold shrink-0 shadow-2xs">
                      IES
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Request Photometrics</div>
                      <div className="text-[10px] font-mono text-muted-foreground">DIALux / CAD & BIM files</div>
                    </div>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: COMMERCIAL TRADE SPECIFICATION BANNER (SYMMETRIC & LUXURIOUS)
          ───────────────────────────────────────────────────────────── */}
      <section className="no-print">
        <Card className="relative border border-border bg-card p-8 sm:p-10 text-foreground shadow-lg rounded-3xl overflow-hidden backdrop-blur-md">
          {/* Ambient Warm Ray Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4f0e6]/40 dark:bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <CardContent className="relative z-10 p-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 dark:bg-zinc-800/60 px-3 py-1 text-foreground shadow-2xs">
                <FileText className="h-3 w-3 text-stone-400 shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] font-medium text-muted-foreground">
                  Architectural Lighting Specification
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground">
                Ready to specify {product.model} for your project?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans font-light">
                Connect with our commercial project engineering team for formal trade pricing, tailored photometric schedules, custom RAL finishes, and lead times.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 items-center">
              <Button
                onClick={() => setIsQuoteOpen(true)}
                className="rounded-full bg-[#f4f0e6] text-neutral-950 hover:bg-[#eae4d5] hover:border-[#ded6c3] border border-[#e6dfd1] font-sans text-xs uppercase tracking-[0.14em] font-bold shadow-md px-7 h-12 gap-2 flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileText className="h-4 w-4" />
                <span>Request Project Quote</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border bg-card text-foreground hover:bg-muted font-sans text-xs uppercase tracking-[0.14em] font-semibold px-7 h-12 cursor-pointer transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
              >
                <a
                  href="/pdf/Pro-Luce-Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Pro-Luce-Catalogue.pdf"
                  className="flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Open Master Catalogue</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: CURATED COMPLEMENTARY LUMINAIRES GRID (PERFECTLY SYMMETRIC)
          ───────────────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border pt-12 no-print space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-1">
                <Compass className="h-3.5 w-3.5 text-foreground" />
                <span>Curated Systems</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
                Related {product.category} Systems
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-light">
                Explore complementary architectural luminaires from the Pro-Luce collection
              </p>
            </div>

            <Button asChild variant="ghost" className="font-sans text-xs uppercase tracking-[0.14em] font-medium text-foreground px-4 h-9 hidden sm:inline-flex hover:bg-muted">
              <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`} className="flex items-center gap-1.5">
                <span>View all {product.category}s</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group block"
              >
                <Card className="p-4 hover:border-foreground/60 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between rounded-3xl bg-card border-border/80">
                  <div className="relative aspect-square w-full rounded-2xl bg-muted/40 dark:bg-surface overflow-hidden mb-3.5 flex items-center justify-center p-3">
                    <Image
                      src={rel.images[0] || "/images/products/rona.png"}
                      alt={rel.model}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge variant="secondary" className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-background/90 text-foreground backdrop-blur-xs border border-border/60">
                        {rel.ipRating}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-foreground group-hover:text-foreground transition-colors truncate">
                        {rel.model}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                        {rel.power}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground truncate">
                      {rel.subseries || rel.category}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Quote Dialog Modal */}
      <QuoteModal
        product={product}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}

function SpecRow({
  label,
  value,
  isMono,
  isHighlight,
}: {
  label: string;
  value: string;
  isMono?: boolean;
  isHighlight?: boolean;
}) {
  return (
    <div className="group flex items-baseline justify-between py-3 sm:py-3.5 border-b border-border/60 last:border-none px-2.5 -mx-2.5 rounded-lg hover:bg-muted/40 transition-colors">
      <dt className="text-foreground/75 font-medium pr-4 text-xs tracking-tight">{label}</dt>
      <dd
        className={`text-right ${
          isHighlight ? "text-foreground font-bold text-xs sm:text-[13px]" : "text-foreground font-medium text-xs"
        } ${isMono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}



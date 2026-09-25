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
  Compass,
  ChevronRight,
} from "lucide-react";
import { BeamAngleIcon } from "@/components/ui/beam-angle-icon";
import MobileProductVariantPicker from "@/components/mobile/MobileProductVariantPicker";

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
  const [mountingHeight, setMountingHeight] = useState<number>(3.0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const { isInSchedule, addItem, removeItem, openDrawer } = useSpecSchedule();
  const inSchedule = isInSchedule(product.id);

  const photoSrc = product.images[selectedPhotoIndex] || product.images[0] || "/images/products/rona.png";
  const diagramSrc = product.dimensionDiagram || photoSrc;

  // CCT temperature color simulation
  const cctColorMap: Record<string, string> = {
    "2700K": "#ffb366",
    "3000K": "#ffc58a",
    "4000K": "#ffe4c4",
    "5000K": "#f0f4ff",
    "6000K": "#dbeafe",
    "6500K": "#cce0ff",
    "Tunable White": "linear-gradient(135deg, #ffc58a, #dbeafe)",
    "RGB / RGBW": "linear-gradient(135deg, #f43f5e, #3b82f6)",
  };
  const activeLightColor = cctColorMap[selectedCct] || "#ffe4c4";

  // Optical beam calculations
  const beamDeg = parseInt(selectedBeam.replace(/[^0-9]/g, ""), 10) || 24;
  const beamRad = (beamDeg * Math.PI) / 360;
  const spotRadius = mountingHeight * Math.tan(beamRad);
  const spotDiameter = (2 * spotRadius).toFixed(2);
  const floorArea = (Math.PI * Math.pow(spotRadius, 2)).toFixed(2);

  return (
    <div className="space-y-12 sm:space-y-16 pb-28 sm:pb-20 max-w-7xl mx-auto text-foreground">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO HEADER & PRODUCT CONFIGURATION STAGE (SYMMETRICAL)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        {/* Top Breadcrumb & Action Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5 no-print">
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
              className="font-sans text-xs uppercase tracking-[0.14em] font-medium gap-2 rounded-full px-4 h-9 touch-manipulation cursor-pointer border-border hover:bg-muted"
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
              className={`font-sans text-xs uppercase tracking-[0.14em] gap-2 rounded-full px-4 h-9 transition-all touch-manipulation cursor-pointer ${
                inSchedule
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border-none"
                  : "border-border/90 text-foreground hover:bg-muted font-medium"
              }`}
            >
              {inSchedule ? <Check className="h-3.5 w-3.5 text-white stroke-[3]" /> : <Plus className="h-3.5 w-3.5" />}
              <span>{inSchedule ? "In Schedule" : "Add Schedule"}</span>
            </Button>

            <Button
              size="sm"
              onClick={() => setIsQuoteOpen(true)}
              className="font-sans text-xs uppercase tracking-[0.14em] font-semibold gap-2 shadow-sm rounded-full px-5 h-9 touch-manipulation cursor-pointer bg-foreground text-background hover:bg-foreground/90"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Request RFQ</span>
            </Button>
          </div>
        </div>

        {/* Hero Symmetrical Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Luminaire Visual Presentation Stage */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <Card
              style={{ viewTransitionName: `product-image-${product.slug}` } as React.CSSProperties}
              className="relative aspect-square w-full rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-muted/30 p-8 flex items-center justify-center overflow-hidden shadow-xs transform-gpu"
            >
              {/* Dynamic Ambient Kelvin Glow */}
              <div
                className="absolute top-0 inset-x-0 h-72 pointer-events-none opacity-40 blur-3xl transition-all duration-700"
                style={{
                  background: activeLightColor.startsWith("linear")
                    ? activeLightColor
                    : `radial-gradient(circle at 50% 10%, ${activeLightColor} 0%, transparent 70%)`,
                }}
              />

              <Image
                src={activeMedia === "photo" ? photoSrc : diagramSrc}
                alt={`${product.model} architectural luminaire`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 transition-all duration-500 hover:scale-105 transform-gpu mix-blend-multiply dark:mix-blend-normal"
              />

              {/* Floating Architectural Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-mono text-[11px] font-bold tracking-wider shadow-2xs rounded-full px-3 py-1 bg-secondary text-secondary-foreground border border-border/50">
                  {product.ipRating}
                </Badge>
                <Badge variant="outline" className="font-mono text-[11px] tracking-wider shadow-2xs bg-background/90 text-foreground backdrop-blur-md rounded-full px-3 py-1 border-border/80">
                  {product.environment}
                </Badge>
                {product.installationMethod && (
                  <Badge variant="outline" className="font-mono text-[11px] tracking-wider shadow-2xs bg-background/90 text-foreground backdrop-blur-md rounded-full px-3 py-1 hidden sm:inline-flex border-border/80">
                    {product.installationMethod}
                  </Badge>
                )}
              </div>

              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[11px] bg-background/90 backdrop-blur-md rounded-full px-3 py-1 text-muted-foreground border-border/80">
                  Catalogue P.{product.catalogPage}
                </Badge>
              </div>
            </Card>

            {/* Media Mode Switcher & Thumbnails */}
            <div className="space-y-3 no-print">
              <Tabs
                value={activeMedia}
                onValueChange={(v) => setActiveMedia(v as "photo" | "diagram")}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2 h-11 rounded-full p-1 bg-muted/80 backdrop-blur-xs border border-border/60">
                  <TabsTrigger value="photo" className="font-mono text-xs uppercase tracking-wider rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground cursor-pointer">
                    Fixture Photography
                  </TabsTrigger>
                  <TabsTrigger value="diagram" className="font-mono text-xs uppercase tracking-wider rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground cursor-pointer">
                    Cutout & CAD Schematic
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Gallery Thumbnails Strip */}
              {activeMedia === "photo" && product.images.length > 1 && (
                <div className="flex items-center gap-2.5 pt-1 overflow-x-auto pb-1">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">Views:</span>
                  {product.images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative h-12 w-12 rounded-2xl border overflow-hidden bg-card transition-all shrink-0 cursor-pointer ${
                        selectedPhotoIndex === idx
                          ? "border-foreground ring-2 ring-foreground/20 shadow-xs scale-105"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.model} angle ${idx + 1}`}
                        fill
                        className="object-contain p-1.5 mix-blend-multiply dark:mix-blend-normal"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Identity, Architectural Summary, Matrix & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Model Header Title & Series Identity */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
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
                  className="text-4xl sm:text-5xl font-light tracking-tight text-foreground font-display leading-[1.05]"
                >
                  {product.model}
                </h1>
                <p className="mt-1 text-xs text-muted-foreground font-mono">
                  Pro-Luce Architectural Master Catalogue · Page {product.catalogPage}
                </p>
              </div>

              {/* Architectural Summary Statement */}
              <p className="text-sm text-foreground/85 leading-relaxed font-light">
                {product.description}
              </p>

              {/* 4-Metric Key Performance Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Power
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-foreground truncate block">
                    {selectedVariant ? selectedVariant.power : product.power}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Output
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-foreground truncate block">
                    {selectedVariant ? selectedVariant.lumens : (product.efficacy || product.lumens)}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                    CRI Quality
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-foreground truncate block">
                    {product.cri}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-center shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Protection
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-foreground truncate block">
                    {product.ipRating}
                  </span>
                </div>
              </div>

              {/* Series Model Matrix (if variants exist) */}
              {product.variants && product.variants.length > 0 ? (
                <Card className="p-4 sm:p-5 shadow-xs space-y-3 border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
                  <div className="hidden sm:flex sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                      Series Model Matrix
                    </h3>
                    {selectedVariant && (
                      <Badge variant="default" className="font-mono text-[11px] rounded-full px-2.5 py-0.5 bg-foreground text-background">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {selectedVariant.model} · {selectedVariant.power}
                      </Badge>
                    )}
                  </div>

                  {/* Mobile Variant Picker (< sm) */}
                  <MobileProductVariantPicker
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onSelectVariant={(v) => setSelectedVariant(v)}
                  />

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
                                  className={`font-mono text-[10px] uppercase tracking-wider rounded-full px-3 ${
                                    isSelected ? "bg-foreground text-background font-bold border-transparent" : "border-border text-foreground hover:bg-muted"
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
                /* Engineering Quick Specifications */
                <Card className="p-5 sm:p-6 shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2 border-b border-border pb-2.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                    Engineering Quick Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Mounting / Installation</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{product.installationMethod}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Housing Construction</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{product.material}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Standard Finishes</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{product.finishes.join(" · ")}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider block">Driver Protocols</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{product.driverOptions.join(", ")}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Direct Specifier Action Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={() => setIsQuoteOpen(true)}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-[0.14em] font-semibold shadow-sm h-12 gap-2 flex items-center justify-center cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>Request Project RFQ</span>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-border bg-card/80 hover:bg-accent font-sans text-xs uppercase tracking-[0.14em] font-medium text-foreground h-12 cursor-pointer"
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
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: DEDICATED INTERACTIVE PHOTOMETRIC & OPTICAL STUDIO (FULL-WIDTH SYMMETRIC)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-8 border-t border-border no-print">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-1">
              <Sliders className="h-3.5 w-3.5 text-foreground" />
              <span>Optical Studio</span>
              <span>•</span>
              <span>Live Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground font-display">
              Interactive Photometric Laboratory
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl font-light">
              Simulate color temperature rendition, optical beam cone angles, and floor illuminance across architectural mounting heights.
            </p>
          </div>

          <Badge variant="secondary" className="font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1 self-start sm:self-auto shrink-0">
            <Sparkles className="h-3 w-3 mr-1.5 inline" />
            Live Vector Ray Simulator
          </Badge>
        </div>

        {/* 2-Column Symmetrical Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Console: Controls & Live Telemetry Matrix */}
          <Card className="lg:col-span-6 p-6 sm:p-8 space-y-6 shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* CCT Kelvin Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-foreground font-sans uppercase tracking-wider text-[11px]">
                    Color Temperature (CCT):
                  </span>
                  <Badge variant="outline" className="font-mono font-bold rounded-full px-3 text-foreground border-border bg-muted/30">
                    {selectedCct}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.cct.map((c) => {
                    const isSelected = selectedCct === c;
                    return (
                      <Button
                        key={c}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCct(c)}
                        className={`gap-2 font-mono text-xs rounded-full px-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-foreground text-background font-semibold shadow-xs border-transparent"
                            : "bg-card text-foreground hover:bg-muted border-border"
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full inline-block border border-black/20 shrink-0 shadow-2xs"
                          style={{ background: cctColorMap[c] || "#ffe4c4" }}
                        />
                        <span>{c}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Optical Beam Distribution Selector */}
              {product.beamAngles.length > 0 && (
                <div className="border-t border-border/80 pt-5">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-foreground font-sans uppercase tracking-wider text-[11px]">
                      Optical Beam Distribution:
                    </span>
                    <Badge variant="outline" className="font-mono font-bold rounded-full px-3 text-foreground border-border bg-muted/30">
                      {selectedBeam}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.beamAngles.map((b) => {
                      const isSelected = selectedBeam === b;
                      return (
                        <Button
                          key={b}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedBeam(b)}
                          className={`gap-2 font-mono text-xs rounded-full px-4 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-foreground text-background font-semibold shadow-xs border-transparent"
                              : "bg-card text-foreground hover:bg-muted border-border"
                          }`}
                        >
                          <BeamAngleIcon
                            angle={b}
                            isSelected={isSelected}
                            className="h-3.5 w-3.5 shrink-0"
                          />
                          <span>{b}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mounting Height Controller */}
              <div className="border-t border-border/80 pt-5">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-foreground font-sans uppercase tracking-wider text-[11px]">
                    Mounting Height Simulation:
                  </span>
                  <Badge variant="outline" className="font-mono font-bold rounded-full px-3 text-foreground border-border bg-muted/30">
                    {mountingHeight.toFixed(1)}m Ceiling
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[2.4, 3.0, 3.5, 4.5].map((h) => {
                    const isSelected = mountingHeight === h;
                    return (
                      <Button
                        key={h}
                        variant={isSelected ? "default" : "outline"}
                        size="xs"
                        onClick={() => setMountingHeight(h)}
                        className={`font-mono text-xs rounded-full py-2 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-foreground text-background font-semibold shadow-xs border-transparent"
                            : "bg-card text-foreground hover:bg-muted border-border"
                        }`}
                      >
                        {h.toFixed(1)}m
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Photometric Telemetry Matrix (4 tiles) */}
            <div className="border-t border-border/80 pt-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold block mb-3">
                Calculated Optical Telemetry
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 text-center">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Beam Spread</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5 block">{selectedBeam}</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 text-center">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Spot Ø @ {mountingHeight.toFixed(1)}m</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5 block">≈ {spotDiameter}m</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 text-center">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Coverage Area</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5 block">≈ {floorArea} m²</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 text-center">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Glare Cutoff</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5 block">30° Shielded</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Right Darkroom: High-Resolution Optical Vector Ray Tracer */}
          <Card className="lg:col-span-6 relative rounded-3xl bg-zinc-950 border border-white/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[460px]">
            {/* Ambient Kelvin Back-Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 transition-all duration-700 blur-3xl"
              style={{
                background: activeLightColor.startsWith("linear")
                  ? activeLightColor
                  : `radial-gradient(circle at 50% 15%, ${activeLightColor} 0%, transparent 65%)`,
              }}
            />

            {/* Darkroom Header Datum */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                  Ray-Tracing Laboratory
                </span>
              </div>
              <Badge variant="outline" className="font-mono text-[10px] text-zinc-300 bg-white/5 border-white/10">
                Scale 1:25
              </Badge>
            </div>

            {/* Ray-Tracer SVG Canvas */}
            {(() => {
              const apexX = 200;
              const apexY = 28;
              const floorY = 210;
              const heightPixels = floorY - apexY;
              const halfWidth = Math.min(170, Math.max(28, heightPixels * Math.tan(beamRad)));
              const leftX = apexX - halfWidth;
              const rightX = apexX + halfWidth;
              const colorStop = activeLightColor.startsWith("linear") ? "#ffe4c4" : activeLightColor;

              return (
                <div className="relative z-10 w-full my-4 flex-1 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 240"
                    className="w-full h-full max-h-[300px] overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id={`pdpBeamGrad-${product.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={colorStop} stopOpacity="0.95" />
                        <stop offset="35%" stopColor={colorStop} stopOpacity="0.5" />
                        <stop offset="80%" stopColor={colorStop} stopOpacity="0.18" />
                        <stop offset="100%" stopColor={colorStop} stopOpacity="0.0" />
                      </linearGradient>
                      <radialGradient id={`pdpFlare-${product.id}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="40%" stopColor={colorStop} stopOpacity="0.95" />
                        <stop offset="100%" stopColor={colorStop} stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Ceiling Plane Datum Line */}
                    <line x1="20" y1={apexY} x2="380" y2={apexY} stroke="#3f3f46" strokeDasharray="3 3" strokeWidth="1" />
                    {/* Floor Workplane Datum Line */}
                    <line x1="20" y1={floorY} x2="380" y2={floorY} stroke="#52525b" strokeWidth="1.2" />

                    {/* Optical Cone Polygon */}
                    <polygon
                      points={`${apexX},${apexY} ${leftX.toFixed(1)},${floorY} ${rightX.toFixed(1)},${floorY}`}
                      fill={`url(#pdpBeamGrad-${product.id})`}
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Boundary Ray Lines */}
                    <line
                      x1={apexX}
                      y1={apexY}
                      x2={leftX.toFixed(1)}
                      y2={floorY}
                      stroke={colorStop}
                      strokeWidth="1.6"
                      strokeOpacity="0.9"
                      className="transition-all duration-500 ease-out"
                    />
                    <line
                      x1={apexX}
                      y1={apexY}
                      x2={rightX.toFixed(1)}
                      y2={floorY}
                      stroke={colorStop}
                      strokeWidth="1.6"
                      strokeOpacity="0.9"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Central Optical Axis */}
                    <line
                      x1={apexX}
                      y1={apexY}
                      x2={apexX}
                      y2={floorY}
                      stroke="#a1a1aa"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                      strokeOpacity="0.5"
                    />

                    {/* Floor Illuminance Footprint Ellipse */}
                    <ellipse
                      cx={apexX}
                      cy={floorY}
                      rx={halfWidth}
                      ry={Math.max(5, halfWidth * 0.14)}
                      fill={colorStop}
                      fillOpacity="0.3"
                      stroke={colorStop}
                      strokeWidth="1.5"
                      strokeOpacity="0.95"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Luminaire Emitter Head & Anti-Glare Shielding Baffle */}
                    <rect x="180" y="16" width="40" height="12" rx="2" fill="#18181b" stroke="#71717a" strokeWidth="1" />
                    <circle cx={apexX} cy={apexY} r="6" fill={`url(#pdpFlare-${product.id})`} />
                    <circle cx={apexX} cy={apexY} r="2.5" fill="#ffffff" />

                    {/* Technical Datum Annotations */}
                    <text x="24" y="20" fill="#a1a1aa" fontSize="9" fontFamily="monospace">CEILING H=0.0m</text>
                    <text x="24" y={floorY + 20} fill="#a1a1aa" fontSize="9" fontFamily="monospace">
                      WORKPLANE H={mountingHeight.toFixed(1)}m
                    </text>
                    <text x="376" y={floorY + 20} textAnchor="end" fill="#f4f0e6" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      SPOT Ø ≈ {spotDiameter}m
                    </text>
                  </svg>
                </div>
              );
            })()}

            {/* Darkroom Bottom Telemetry Strip */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <Badge variant="outline" className="font-mono text-[10px] text-zinc-300 bg-black/60 border-zinc-700 backdrop-blur-xs">
                {selectedBeam} cone · 30° Shielded
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] text-[#f4f0e6] bg-black/60 border-zinc-700 backdrop-blur-xs">
                {selectedCct} · {product.cri}
              </Badge>
            </div>
          </Card>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TECHNICAL SPECIFICATIONS & DOWNLOADS TABBED MATRIX (FULL-WIDTH)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-1">
              <Zap className="h-3.5 w-3.5 text-foreground" />
              <span>Datasheet & Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground font-display">
              Technical Engineering Specifications
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 font-light">
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
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 h-auto p-1.5 bg-muted/80 rounded-full border border-border/60">
              <TabsTrigger value="optical" className="font-mono text-xs uppercase tracking-wider py-2.5 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground cursor-pointer">
                Optics & Photometry
              </TabsTrigger>
              <TabsTrigger value="electrical" className="font-mono text-xs uppercase tracking-wider py-2.5 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground cursor-pointer">
                Electrical & Drivers
              </TabsTrigger>
              <TabsTrigger value="mechanical" className="font-mono text-xs uppercase tracking-wider py-2.5 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground cursor-pointer">
                Mechanical & Construction
              </TabsTrigger>
              <TabsTrigger value="downloads" className="font-mono text-xs uppercase tracking-wider py-2.5 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground cursor-pointer">
                Downloads & CAD
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Optical & Photometry (Symmetrical 5 vs 5 rows) */}
            <TabsContent value="optical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-xs">
                <div className="divide-y divide-border/70">
                  <SpecRow
                    label={selectedVariant ? `Power Rating (${selectedVariant.model})` : "Power Rating"}
                    value={selectedVariant ? selectedVariant.power : product.power}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label={selectedVariant ? `Luminous Output (${selectedVariant.model})` : "Luminous Flux"}
                    value={selectedVariant ? selectedVariant.lumens : (product.efficacy || product.lumens)}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label="Luminous Efficacy"
                    value={product.efficacy || "100 Lm/W"}
                    isMono
                  />
                  <SpecRow
                    label="Color Rendering Index (CRI)"
                    value={product.cri}
                    isMono
                  />
                  <SpecRow
                    label="Color Temperatures Available"
                    value={product.cct.join(" · ")}
                  />
                </div>

                <div className="divide-y divide-border/70">
                  <SpecRow
                    label="Optical Beam Angles"
                    value={product.beamAngles.join(", ")}
                    isMono
                  />
                  <SpecRow
                    label="Glare Control Standard"
                    value={product.ugr ? `UGR < ${product.ugr}` : "UGR < 19 Shielded"}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label="Color Consistency (SDCM)"
                    value={product.sdcm || "SDCM ≤ 3 (MacAdam Ellipse)"}
                    isMono
                  />
                  <SpecRow
                    label="Reflector Optics"
                    value={product.optics || "Specular Aluminum Reflector"}
                  />
                  <SpecRow
                    label="Operational Lifespan"
                    value={product.lifeHours || "50,000 Hours (L80B10)"}
                    isMono
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Electrical & Drivers (Symmetrical 4 vs 4 rows) */}
            <TabsContent value="electrical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-xs">
                <div className="divide-y divide-border/70">
                  <SpecRow label="Input Voltage" value={product.inputVoltage} isHighlight isMono />
                  <SpecRow label="Driver & Control Protocols" value={product.driverOptions.join(", ")} isHighlight />
                  <SpecRow label="Power Factor" value="> 0.95 High-Efficiency" isMono />
                  <SpecRow label="Frequency Range" value="50–60Hz" isMono />
                </div>

                <div className="divide-y divide-border/70">
                  <SpecRow
                    label="Operating Ambient Temp (Ta)"
                    value={product.operatingTemp || "-20°C to +45°C"}
                    isMono
                  />
                  <SpecRow
                    label="Glowing Wire Test"
                    value={product.glowWireTest || "850°C Self-Extinguishing"}
                    isMono
                  />
                  <SpecRow
                    label="Tested Standards & Compliance"
                    value={product.standards || "CE, RoHS, EN 60598-1"}
                  />
                  <SpecRow
                    label="Smart Control Option"
                    value="Casambi / Tuya Wireless on request"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Mechanical & Construction (Symmetrical 4 vs 4 rows) */}
            <TabsContent value="mechanical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-xs">
                <div className="divide-y divide-border/70">
                  <SpecRow label="Installation / Mounting" value={product.installationMethod} isHighlight />
                  <SpecRow
                    label={selectedVariant ? `Ceiling Cutout (${selectedVariant.model})` : "Ceiling Cutout Required"}
                    value={selectedVariant ? selectedVariant.cutout : (product.cutout || "Per model cut-out")}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label={selectedVariant ? `Dimensions (${selectedVariant.model})` : "Overall Profile Dimensions"}
                    value={selectedVariant ? selectedVariant.dimensions : product.dimensions}
                    isMono
                  />
                  <SpecRow
                    label="Fixture Adjustability"
                    value="Directional Accent / Fixed Deep Recessed"
                  />
                </div>

                <div className="divide-y divide-border/70">
                  <SpecRow label="Housing Construction" value={product.material} />
                  <SpecRow label="Ingress Protection (IP Rating)" value={product.ipRating} isHighlight isMono />
                  <SpecRow label="Standard Powder-Coat Finishes" value={product.finishes.join(" / ")} />
                  <SpecRow label="Thermal Management" value="Passive Die-Cast Heat Sink Architecture" />
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
                    className="h-auto p-4 justify-start gap-3.5 text-left rounded-2xl cursor-pointer bg-foreground text-background hover:bg-foreground/90"
                  >
                    <a
                      href={product.datasheetPdf || "/pdf/Pro-Luce-Catalogue.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`${product.model}-Datasheet.pdf`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-foreground font-mono text-xs font-bold shrink-0 shadow-2xs">
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
        <Card className="relative border-neutral-900 dark:border-neutral-800 bg-neutral-950 p-8 sm:p-10 text-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Ambient Warm Ray Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4f0e6]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <CardContent className="relative z-10 p-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#f4f0e6]/80 font-medium">
                <span>Architectural Lighting Specification</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white">
                Ready to specify {product.model} for your project?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Connect with our commercial project engineering team for formal trade pricing, tailored photometric schedules, custom RAL finishes, and lead times.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <Button
                onClick={() => setIsQuoteOpen(true)}
                className="rounded-full bg-white text-black hover:bg-neutral-200 font-sans text-xs uppercase tracking-[0.14em] font-semibold shadow-md px-7 h-12 gap-2 flex items-center justify-center cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>Request Project Quote</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-neutral-700 bg-black/50 font-sans text-xs uppercase tracking-[0.14em] font-medium text-neutral-300 hover:text-white px-6 h-12 cursor-pointer"
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
    <div className="flex items-baseline justify-between py-2.5 border-b border-border/40 last:border-none">
      <dt className="text-muted-foreground font-medium pr-4">{label}</dt>
      <dd
        className={`text-right font-semibold ${
          isHighlight ? "text-foreground font-bold" : "text-foreground/80"
        } ${isMono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}



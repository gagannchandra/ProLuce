"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
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
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [activeMedia, setActiveMedia] = useState<"photo" | "diagram">("photo");
  const [activeSpecTab, setActiveSpecTab] = useState<"optical" | "electrical" | "mechanical" | "downloads">("optical");
  const [selectedCct, setSelectedCct] = useState<string>(product.cct[0] || "3000K");
  const [selectedBeam, setSelectedBeam] = useState<string>(product.beamAngles[0] || "24°");
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
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

  // Map a beam angle string like "24°" → the closest available SVG filename
  const BEAM_SVG_ANGLES = [3, 5, 10, 15, 20, 22, 24, 30, 35, 36, 40, 48, 50, 60];
  function beamSvgPath(angleStr: string, variant: "grey" | "black" = "grey"): string {
    const deg = parseInt(angleStr.replace("°", "")) || 36;
    const closest = BEAM_SVG_ANGLES.reduce((prev, cur) =>
      Math.abs(cur - deg) < Math.abs(prev - deg) ? cur : prev
    );
    const padded = String(closest).padStart(2, "0");
    return `/images/beams/beam_${padded}deg_${variant}.svg`;
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 no-print">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            <Link href="/catalogue" className="hover:text-foreground transition-colors">Catalogue</Link>
            <span>/</span>
            <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{product.model}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h1
              style={{ viewTransitionName: `product-title-${product.slug}` } as React.CSSProperties}
              className="text-3xl sm:text-4xl lg:text-[48px] font-light tracking-tight text-foreground font-display leading-[1.08]"
            >
              {product.model}
            </h1>
            {product.subseries && (
              <Badge variant="outline" className="font-mono text-xs font-medium border-border/80">
                {product.subseries}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Source: Pro-Luce Master Catalogue · Page {product.catalogPage}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="font-mono text-xs uppercase tracking-wider gap-1.5 rounded-full px-4"
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
            className="font-mono text-xs uppercase tracking-wider gap-1.5 rounded-full px-4"
          >
            {inSchedule ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Plus className="h-3.5 w-3.5" />}
            <span>{inSchedule ? "In Schedule" : "Spec Schedule"}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setIsQuoteOpen(true)}
            className="font-mono text-xs uppercase tracking-wider gap-1.5 shadow-sm rounded-full px-5"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Request RFQ</span>
          </Button>
        </div>
      </div>

      {/* Main Two-Column Architectural Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Fixture Media & Optical Atmosphere Simulator */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Visual Box */}
          <Card
            style={{ viewTransitionName: `product-image-${product.slug}` } as React.CSSProperties}
            className="relative aspect-square w-full rounded-3xl border-border/80 bg-gradient-to-b from-card to-background p-8 flex items-center justify-center overflow-hidden shadow-xs transform-gpu"
          >
            {/* Dynamic Ambient Kelvin Glow */}
            <div
              className="absolute top-0 inset-x-0 h-64 pointer-events-none opacity-40 blur-3xl transition-all duration-700"
              style={{
                background: activeLightColor.startsWith("linear")
                  ? activeLightColor
                  : `radial-gradient(circle at 50% 0%, ${activeLightColor} 0%, transparent 70%)`,
              }}
            />

            <Image
              src={activeMedia === "photo" ? photoSrc : diagramSrc}
              alt={`${product.model} architectural view`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 transition-all duration-500 hover:scale-105 transform-gpu"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Badge variant="secondary" className="font-mono text-[11px] font-bold tracking-wider shadow-2xs rounded-full px-3">
                {product.ipRating}
              </Badge>
              <Badge variant="outline" className="font-mono text-[11px] tracking-wider shadow-2xs bg-background/90 backdrop-blur-md rounded-full px-3">
                {product.environment}
              </Badge>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <Badge variant="outline" className="font-mono text-[11px] bg-background/90 backdrop-blur-md rounded-full px-3">
                Catalogue P.{product.catalogPage}
              </Badge>
            </div>
          </Card>

          {/* Media Switcher: Fixture vs Dimensions */}
          <div className="space-y-3 no-print">
            <Tabs
              value={activeMedia}
              onValueChange={(v) => setActiveMedia(v as "photo" | "diagram")}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2 h-10 rounded-full p-1 bg-muted/80 backdrop-blur-xs border border-border/50">
                <TabsTrigger value="photo" className="font-mono text-xs uppercase tracking-wider rounded-full">
                  Fixture Photography
                </TabsTrigger>
                <TabsTrigger value="diagram" className="font-mono text-xs uppercase tracking-wider rounded-full">
                  Cutout & CAD Schematic
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Thumbnail switcher */}
            {activeMedia === "photo" && product.images.length > 1 && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Views:</span>
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative h-12 w-12 rounded-full border overflow-hidden bg-surface transition-all ${
                      selectedPhotoIndex === idx
                        ? "border-foreground ring-2 ring-foreground/20 shadow-xs"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.model} view ${idx + 1}`}
                      fill
                      className="object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Optical Studio Card */}
          <Card className="p-6 space-y-6 no-print shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2">
                <Sliders className="h-3.5 w-3.5" />
                Interactive Photometric Studio
              </h3>
              <Badge variant="secondary" className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 rounded-full px-3">
                Live Simulator
              </Badge>
            </div>

            {/* CCT Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-foreground">Color Temperature:</span>
                <Badge variant="outline" className="font-mono font-bold rounded-full px-2.5">
                  {selectedCct}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.cct.map((c) => (
                  <Button
                    key={c}
                    variant={selectedCct === c ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCct(c)}
                    className="gap-2 font-mono text-xs rounded-full px-3.5"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full inline-block border border-black/20 shrink-0"
                      style={{ background: cctColorMap[c] || "#ffe4c4" }}
                    />
                    <span>{c}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Beam Angle Cone Visualizer */}
            {product.beamAngles.length > 0 && (
              <div className="border-t border-border/80 pt-5">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-semibold text-foreground">Optical Beam Distribution:</span>
                  <Badge variant="outline" className="font-mono font-bold rounded-full px-2.5">
                    {selectedBeam}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.beamAngles.map((b) => (
                    <Button
                      key={b}
                      variant={selectedBeam === b ? "default" : "outline"}
                      size="xs"
                      onClick={() => setSelectedBeam(b)}
                      className="font-mono text-xs rounded-full px-3.5"
                    >
                      {b}
                    </Button>
                  ))}
                </div>

                {/* Real Photometric Beam Diagram */}
                <div className="relative h-44 w-full rounded-xl bg-neutral-950 flex flex-col items-center justify-center overflow-hidden shadow-inner border border-white/5">
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-700"
                    style={{
                      background: activeLightColor.startsWith("linear")
                        ? activeLightColor
                        : `radial-gradient(ellipse at 50% 0%, ${activeLightColor} 0%, transparent 70%)`,
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={selectedBeam}
                    src={beamSvgPath(selectedBeam, "grey")}
                    alt={`${selectedBeam} beam angle distribution diagram`}
                    className="h-full w-auto max-w-full object-contain opacity-90 transition-all duration-500 mix-blend-lighten"
                  />
                  <Badge variant="outline" className="absolute bottom-2 font-mono text-[10px] text-neutral-400 bg-neutral-950/80 border-neutral-800">
                    {selectedBeam} photometric beam · {selectedCct}
                  </Badge>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Tabbed Specifications & Engineering Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Series Model Matrix */}
          {product.variants && product.variants.length > 0 && (
            <Card className="p-6 shadow-xs space-y-4 border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
                    Series Model Matrix
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Select a model variant to update cut-out and wattage parameters
                  </p>
                </div>
                {selectedVariant && (
                  <Badge variant="default" className="font-mono text-xs rounded-full px-3">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {selectedVariant.model} · {selectedVariant.power}
                  </Badge>
                )}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border text-muted-foreground font-mono uppercase text-[10px]">
                      <TableHead>Model</TableHead>
                      <TableHead>Power</TableHead>
                      <TableHead>Output</TableHead>
                      <TableHead>Dimensions</TableHead>
                      <TableHead>Cut-Out</TableHead>
                      <TableHead className="text-right">Action</TableHead>
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
                            isSelected ? "bg-muted/60 font-semibold" : "hover:bg-muted/30"
                          }`}
                        >
                          <TableCell className="font-mono font-bold text-foreground">
                            {v.model}
                          </TableCell>
                          <TableCell className="font-mono">{v.power}</TableCell>
                          <TableCell className="font-mono">{v.lumens}</TableCell>
                          <TableCell className="font-mono">{v.dimensions}</TableCell>
                          <TableCell className="font-mono text-foreground font-semibold">{v.cutout}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              size="xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedVariant(v);
                              }}
                              className="font-mono text-[10px] uppercase tracking-wider rounded-full px-3"
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
          )}

          {/* Engineering Tabs */}
          <Card className="p-6 shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
            <Tabs
              value={activeSpecTab}
              onValueChange={(v) => setActiveSpecTab(v as typeof activeSpecTab)}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-muted mb-6">
                <TabsTrigger value="optical" className="font-mono text-xs uppercase tracking-wider py-2">
                  Optics
                </TabsTrigger>
                <TabsTrigger value="electrical" className="font-mono text-xs uppercase tracking-wider py-2">
                  Electrical
                </TabsTrigger>
                <TabsTrigger value="mechanical" className="font-mono text-xs uppercase tracking-wider py-2">
                  Mechanical
                </TabsTrigger>
                <TabsTrigger value="downloads" className="font-mono text-xs uppercase tracking-wider py-2">
                  Downloads
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Optical */}
              <TabsContent value="optical">
                <dl className="divide-y divide-border/80 text-xs">
                  <SpecRow
                    label={selectedVariant ? `Power Rating (${selectedVariant.model})` : "Power Rating"}
                    value={selectedVariant ? selectedVariant.power : product.power}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label={selectedVariant ? `Luminous Output (${selectedVariant.model})` : "Luminous Efficacy"}
                    value={selectedVariant ? selectedVariant.lumens : (product.efficacy || product.lumens)}
                    isHighlight
                    isMono
                  />
                  {product.efficacy && (
                    <SpecRow label="Luminous Efficacy" value={product.efficacy} isMono />
                  )}
                  <SpecRow label="Color Rendering Index (CRI)" value={product.cri} isMono />
                  <SpecRow label="Color Temperatures Available" value={product.cct.join(" · ")} />
                  <SpecRow label="Optical Beam Angles" value={product.beamAngles.join(", ")} isMono />
                  {product.ugr && (
                    <SpecRow label="Glare Control Standard" value={product.ugr} isHighlight isMono />
                  )}
                  {product.sdcm && (
                    <SpecRow label="Color Consistency (SDCM)" value={product.sdcm} isMono />
                  )}
                  {product.optics && (
                    <SpecRow label="Reflector Optics" value={product.optics} />
                  )}
                  {product.diffuser && (
                    <SpecRow label="Diffuser Glass" value={product.diffuser} />
                  )}
                  {product.chipPartners && product.chipPartners.length > 0 && (
                    <SpecRow label="LED Chip Partners" value={product.chipPartners.join(", ")} />
                  )}
                  <SpecRow label="Operational Lifespan" value={product.lifeHours} isMono />
                </dl>
              </TabsContent>

              {/* Tab 2: Electrical */}
              <TabsContent value="electrical">
                <dl className="divide-y divide-border/80 text-xs">
                  <SpecRow label="Input Voltage" value={product.inputVoltage} isHighlight isMono />
                  <SpecRow label="Driver & Control Protocols" value={product.driverOptions.join(", ")} isHighlight />
                  <SpecRow label="Power Factor" value="> 0.95 High-Efficiency" isMono />
                  <SpecRow label="Frequency Range" value="50–60Hz" isMono />
                  {product.operatingTemp && (
                    <SpecRow label="Operating Ambient Temp (Ta)" value={product.operatingTemp} isMono />
                  )}
                  {product.glowWireTest && (
                    <SpecRow label="Glowing Wire Test" value={product.glowWireTest} isMono />
                  )}
                  {product.standards && (
                    <SpecRow label="Tested Standards & Compliance" value={product.standards} />
                  )}
                  <SpecRow label="Smart Control Option" value="Casambi / Tuya Wireless on request" />
                </dl>
              </TabsContent>

              {/* Tab 3: Mechanical */}
              <TabsContent value="mechanical">
                <dl className="divide-y divide-border/80 text-xs">
                  <SpecRow label="Installation / Mounting" value={product.installationMethod} isHighlight />
                  <SpecRow
                    label={selectedVariant ? `Ceiling Cutout Required (${selectedVariant.model})` : "Ceiling Cutout Required"}
                    value={selectedVariant ? selectedVariant.cutout : (product.cutout || "Cut-out per model")}
                    isHighlight
                    isMono
                  />
                  <SpecRow
                    label={selectedVariant ? `Overall Dimensions (${selectedVariant.model})` : "Overall Dimensions / Profile"}
                    value={selectedVariant ? selectedVariant.dimensions : product.dimensions}
                    isMono
                  />
                  <SpecRow label="Housing Construction" value={product.material} />
                  <SpecRow label="Ingress Protection (IP Rating)" value={product.ipRating} isHighlight isMono />
                  <SpecRow label="Standard Powder-Coat Finishes" value={product.finishes.join(" / ")} />
                  <SpecRow label="Fixture Adjustability" value="Adjustable angle for focused directional accent" />
                </dl>
              </TabsContent>

              {/* Tab 4: Downloads */}
              <TabsContent value="downloads">
                <div className="space-y-4 py-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Download certified photometric files, dimensional CAD drawings, and official engineering datasheets for {product.model}.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {product.datasheetPdf && (
                      <Button
                        asChild
                        variant="default"
                        className="h-auto p-3 justify-start gap-3 text-left"
                      >
                        <a
                          href={product.datasheetPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={`${product.model}-Datasheet.pdf`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-background text-foreground font-mono text-xs font-bold shrink-0">
                            PDF
                          </div>
                          <div>
                            <div className="text-xs font-semibold">Product Datasheet</div>
                            <div className="text-[10px] font-mono opacity-80">Verified Technical Spec</div>
                          </div>
                        </a>
                      </Button>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      className="h-auto p-3 justify-start gap-3 text-left"
                    >
                      <a
                        href="/pdf/Pro-Luce-Catalogue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Pro-Luce-Catalogue.pdf"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-background font-mono text-xs font-bold shrink-0">
                          PDF
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-foreground">Master Catalogue</div>
                          <div className="text-[10px] font-mono text-muted-foreground">Page {product.catalogPage} · Verified</div>
                        </div>
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setIsQuoteOpen(true)}
                      className="h-auto p-3 justify-start gap-3 text-left"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-foreground font-mono text-xs font-bold shrink-0">
                        IES
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Request Photometrics</div>
                        <div className="text-[10px] font-mono text-muted-foreground">DIALux / CAD files</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Architectural Notes */}
          <Card className="p-6 shadow-xs border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono mb-2">
              Architectural Application & Engineering Highlights
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </Card>

          {/* Direct Project RFQ Banner */}
          <Card className="relative border-neutral-900 bg-neutral-950 p-6 sm:p-8 text-white no-print shadow-xl rounded-3xl overflow-hidden">
            {/* Ambient Gold Ray Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

            <CardContent className="relative z-10 p-0 space-y-3">
              <h3 className="font-display text-2xl font-normal tracking-tight text-white">
                Ready to specify {product.model}?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Connect with our project engineering team for formal trade pricing, lead times, and tailored photometric schedules.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  onClick={() => setIsQuoteOpen(true)}
                  className="rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider shadow-sm px-6"
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  Request Project Quote
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-neutral-700 bg-black/50 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white px-6"
                >
                  <a
                    href="/pdf/Pro-Luce-Catalogue.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Pro-Luce-Catalogue.pdf"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Open Master Catalogue
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Fixtures */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border pt-12 no-print">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl font-normal tracking-tight text-foreground">
                Related {product.category} Systems
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-light">Explore complementary luminaires from the collection</p>
            </div>
            <Button asChild variant="ghost" className="font-mono text-xs uppercase tracking-wider text-foreground">
              <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`}>
                View all {product.category}s
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group block"
              >
                <Card className="p-4 hover:border-foreground/60 hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div className="relative aspect-square w-full rounded-lg bg-surface overflow-hidden mb-3">
                    <Image
                      src={rel.images[0] || "/images/products/rona.png"}
                      alt={rel.model}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {rel.model}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {rel.power} · {rel.ipRating}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Specifier Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur-md p-3 sm:hidden flex items-center justify-between shadow-lg no-print">
        <div>
          <div className="text-xs font-bold text-foreground truncate max-w-[140px]">{product.model}</div>
          <div className="text-[10px] font-mono text-muted-foreground">{product.power} · {product.ipRating}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={inSchedule ? "default" : "outline"}
            size="xs"
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
            className="font-mono text-[11px]"
          >
            {inSchedule ? "✓ In List" : "+ Schedule"}
          </Button>
          <Button
            size="xs"
            onClick={() => setIsQuoteOpen(true)}
            className="font-mono text-[11px] uppercase tracking-wider"
          >
            RFQ
          </Button>
        </div>
      </div>

      {/* Quote Dialog */}
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
    <div className="flex items-baseline justify-between py-2.5">
      <dt className="text-muted-foreground font-medium pr-4">{label}</dt>
      <dd
        className={`text-right font-semibold ${
          isHighlight ? "text-foreground font-bold" : "text-muted-foreground"
        } ${isMono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

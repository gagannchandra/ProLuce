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

  return (
    <div className="space-y-8 sm:space-y-12 pb-28 sm:pb-16">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 no-print">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] text-muted-foreground font-medium flex-wrap">
            <Link href="/catalogue" className="hover:text-foreground transition-colors">Catalogue</Link>
            <span className="opacity-40">/</span>
            <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-foreground font-semibold truncate max-w-[160px] sm:max-w-none">{product.model}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-2.5 sm:gap-3">
            <h1
              style={{ viewTransitionName: `product-title-${product.slug}` } as React.CSSProperties}
              className="text-2xl sm:text-4xl lg:text-[48px] font-light tracking-tight text-foreground font-display leading-[1.08]"
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

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="font-sans text-xs uppercase tracking-[0.14em] font-medium gap-2 rounded-full px-4 h-10 sm:h-9 touch-manipulation cursor-pointer col-span-2 sm:col-auto"
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
            className={`font-sans text-xs uppercase tracking-[0.14em] gap-2 rounded-full px-4 h-10 sm:h-9 transition-all touch-manipulation cursor-pointer ${
              inSchedule
                ? "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border-none"
                : "border-border/90 text-foreground hover:bg-accent font-medium"
            }`}
          >
            {inSchedule ? <Check className="h-3.5 w-3.5 text-white stroke-[3]" /> : <Plus className="h-3.5 w-3.5" />}
            <span>{inSchedule ? "In Schedule" : "Add Schedule"}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setIsQuoteOpen(true)}
            className="font-sans text-xs uppercase tracking-[0.14em] font-medium gap-2 shadow-sm rounded-full px-4 h-10 sm:h-9 touch-manipulation cursor-pointer"
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
                  {product.beamAngles.map((b) => {
                    const isSelected = selectedBeam === b;
                    return (
                      <Button
                        key={b}
                        variant={isSelected ? "default" : "outline"}
                        size="xs"
                        onClick={() => setSelectedBeam(b)}
                        className={`gap-1.5 font-mono text-xs rounded-full px-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#f4f0e6] text-neutral-950 hover:bg-[#eae4d5] font-semibold border-none shadow-xs"
                            : ""
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

                {/* Real Photometric Beam Vector Visualizer */}
                {(() => {
                  const deg = parseInt(selectedBeam.replace(/[^0-9]/g, ""), 10) || 24;
                  const rad = (deg * Math.PI) / 360;
                  const apexX = 180;
                  const apexY = 18;
                  const floorY = 145;
                  const heightPixels = floorY - apexY;
                  const halfWidth = Math.min(140, Math.max(16, heightPixels * Math.tan(rad)));
                  const leftX = apexX - halfWidth;
                  const rightX = apexX + halfWidth;
                  const estimatedSpot = (2 * 3.0 * Math.tan(rad)).toFixed(2);
                  const colorStop = activeLightColor.startsWith("linear") ? "#ffe4c4" : activeLightColor;

                  return (
                    <div className="relative h-48 w-full rounded-2xl bg-zinc-950 flex flex-col items-center justify-center overflow-hidden shadow-inner border border-white/10 p-3">
                      {/* Ambient Kelvin Glow */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-700 blur-2xl"
                        style={{
                          background: activeLightColor.startsWith("linear")
                            ? activeLightColor
                            : `radial-gradient(circle at 50% 10%, ${activeLightColor} 0%, transparent 70%)`,
                        }}
                      />

                      <svg
                        viewBox="0 0 360 160"
                        className="w-full h-full overflow-visible"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <defs>
                          <linearGradient id={`pdpBeamGrad-${product.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={colorStop} stopOpacity="0.85" />
                            <stop offset="40%" stopColor={colorStop} stopOpacity="0.4" />
                            <stop offset="85%" stopColor={colorStop} stopOpacity="0.12" />
                            <stop offset="100%" stopColor={colorStop} stopOpacity="0.0" />
                          </linearGradient>
                          <radialGradient id={`pdpFlare-${product.id}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                            <stop offset="40%" stopColor={colorStop} stopOpacity="0.9" />
                            <stop offset="100%" stopColor={colorStop} stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Ceiling Plane Datum Line */}
                        <line x1="20" y1={apexY} x2="340" y2={apexY} stroke="#3f3f46" strokeDasharray="3 3" strokeWidth="1" />
                        {/* Floor Workplane Datum Line */}
                        <line x1="20" y1={floorY} x2="340" y2={floorY} stroke="#52525b" strokeWidth="1.2" />

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
                          strokeWidth="1.5"
                          strokeOpacity="0.75"
                          className="transition-all duration-500 ease-out"
                        />
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={rightX.toFixed(1)}
                          y2={floorY}
                          stroke={colorStop}
                          strokeWidth="1.5"
                          strokeOpacity="0.75"
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
                          ry={Math.max(4, halfWidth * 0.1)}
                          fill={colorStop}
                          fillOpacity="0.2"
                          stroke={colorStop}
                          strokeWidth="1.2"
                          strokeOpacity="0.8"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Luminaire Emitter Head & Baffle */}
                        <rect x="164" y="10" width="32" height="8" rx="2" fill="#27272a" stroke="#71717a" strokeWidth="1" />
                        <circle cx={apexX} cy={apexY} r="4" fill={`url(#pdpFlare-${product.id})`} />
                        <circle cx={apexX} cy={apexY} r="1.5" fill="#ffffff" />

                        {/* Technical Datum Annotations */}
                        <text x="24" y="13" fill="#71717a" fontSize="8" fontFamily="monospace">CEILING H=0m</text>
                        <text x="24" y={floorY + 11} fill="#71717a" fontSize="8" fontFamily="monospace">WORKPLANE H=3.0m</text>
                        <text x="336" y={floorY + 11} textAnchor="end" fill="#f4f0e6" fontSize="8" fontFamily="monospace" fontWeight="bold">
                          SPOT Ø ≈ {estimatedSpot}m
                        </text>
                      </svg>

                      {/* Photometric Technical Badges */}
                      <div className="absolute bottom-2 inset-x-3 flex items-center justify-between pointer-events-none">
                        <Badge variant="outline" className="font-mono text-[10px] text-zinc-300 bg-zinc-950/80 border-zinc-800 backdrop-blur-xs">
                          {selectedBeam} distribution · 30° Shielded
                        </Badge>
                        <Badge variant="outline" className="font-mono text-[10px] text-[#f4f0e6] bg-zinc-950/80 border-[#e6dfd1]/40 backdrop-blur-xs">
                          {selectedCct} · Ra ≥ 90
                        </Badge>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Tabbed Specifications & Engineering Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Series Model Matrix */}
          {product.variants && product.variants.length > 0 && (
            <Card className="p-4 sm:p-6 shadow-xs space-y-4 border-border/80 bg-card/90 backdrop-blur-md rounded-3xl">
              <div className="hidden sm:flex sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
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
            {/* Ambient Cream Ray Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#f4f0e6]/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

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
                  className="rounded-full bg-white text-black hover:bg-neutral-200 font-sans text-xs uppercase tracking-[0.14em] font-semibold shadow-sm px-6 h-11 gap-2 flex items-center justify-center cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  <span>Request Project Quote</span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-neutral-700 bg-black/50 font-sans text-xs uppercase tracking-[0.14em] font-medium text-neutral-300 hover:text-white px-6 h-11 cursor-pointer"
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
            <Button asChild variant="ghost" className="font-sans text-xs uppercase tracking-[0.14em] font-medium text-foreground px-4 h-9">
              <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`} className="flex items-center gap-1.5">
                <span>View all {product.category}s</span>
                <ArrowRight className="h-3.5 w-3.5" />
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

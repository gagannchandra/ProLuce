"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import QuoteModal from "@/components/product/QuoteModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Check,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Maximize2,
  FileText,
} from "lucide-react";

const FLAGSHIP_SLUGS = ["nova", "rona", "lena-50-linear", "coastal", "artis"];

export default function FlagshipShowcase() {
  const flagshipProducts: Product[] = FLAGSHIP_SLUGS.map((slug) => {
    return products.find((p) => p.slug === slug) ?? products[0];
  }).filter(Boolean);

  const [activeSlug, setActiveSlug] = useState<string>(flagshipProducts[0]?.slug || "nova");
  const [selectedCct, setSelectedCct] = useState<string>("3000K");
  const [selectedBeam, setSelectedBeam] = useState<string>("24°");
  const [selectedFinish, setSelectedFinish] = useState<string>("Matte Black");
  const [showDiagram, setShowDiagram] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);

  const currentProduct = flagshipProducts.find((p) => p.slug === activeSlug) || flagshipProducts[0];

  const { addItem, isInSchedule, openDrawer } = useSpecSchedule();
  const inSchedule = currentProduct ? isInSchedule(currentProduct.id) : false;

  const handleSelectProduct = (slug: string) => {
    setActiveSlug(slug);
    const prod = flagshipProducts.find((p) => p.slug === slug);
    if (prod) {
      if (prod.cct && prod.cct.length > 0) setSelectedCct(prod.cct[0]);
      if (prod.beamAngles && prod.beamAngles.length > 0) setSelectedBeam(prod.beamAngles[0]);
      if (prod.finishes && prod.finishes.length > 0) setSelectedFinish(prod.finishes[0]);
      setShowDiagram(false);
    }
  };

  const handleAddToSchedule = () => {
    if (!currentProduct) return;
    addItem(currentProduct, {
      selectedCct,
      selectedBeamAngle: selectedBeam,
      selectedFinish,
      projectTag: `TYPE-${currentProduct.model.substring(0, 3).toUpperCase()}`,
    });
    openDrawer();
  };

  return (
    <section className="relative bg-background text-foreground py-24 sm:py-32 border-t border-border overflow-hidden transition-colors duration-300">
      {/* Subtle architectural ambient background — Italian Tricolore atmospheric diffusion */}
      <div className="absolute top-1/2 left-1/6 -translate-y-1/2 w-[600px] h-[600px] bg-[#008C45]/5 dark:bg-[#008C45]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#f4f0e6]/10 dark:bg-[#f4f0e6]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/6 w-[500px] h-[500px] bg-[#CD212A]/4 dark:bg-[#CD212A]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-card text-foreground text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] font-medium mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-stone-400" />
              <span>Flagship Architectural Luminaires</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight">
              Masterwork <span className="font-serif italic text-muted-foreground">Engineering</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
              Precision-machined luminaire systems designed for museum-grade color rendering, micro-recessed glare shielding, and seamless building integration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>Explore All {products.length} Luminaires</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Luminaire Selector Ribbon (Swipeable Carousel on Mobile) */}
        <div className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-2.5 sm:gap-3 mb-8 sm:mb-10 pb-2 sm:pb-0 lg:grid lg:grid-cols-5">
          {flagshipProducts.map((prod) => {
            const isSelected = prod.slug === activeSlug;
            return (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(prod.slug)}
                className={`relative shrink-0 w-[160px] sm:w-[200px] lg:w-auto snap-start flex flex-col p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer touch-manipulation ${
                  isSelected
                    ? "bg-card border-[#e6dfd1] dark:border-[#e6dfd1]/70 shadow-lg shadow-black/5 dark:shadow-black/40 ring-1 ring-[#e6dfd1]/40"
                    : "bg-card/40 border-border hover:bg-card hover:border-border text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    P.{prod.catalogPage.toString().padStart(2, "0")}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-muted text-foreground font-medium" : "bg-muted/60 text-muted-foreground"
                  }`}>
                    {prod.category}
                  </span>
                </div>
                <div className={`text-sm sm:text-base font-medium tracking-tight ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                  {prod.model}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 sm:mt-1 truncate">
                  {prod.power} · {prod.ipRating}
                </div>
                {isSelected && (
                  <div className="absolute -bottom-[1px] left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#f4f0e6] dark:via-[#f4f0e6] to-transparent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Flagship Interactive Stage */}
        {currentProduct && (
          <div className="bg-card border border-border rounded-3xl overflow-hidden backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
            {/* Left: Product Visual / Dimensional Diagram Canvas */}
            <div className="lg:col-span-6 p-4 sm:p-6 lg:p-10 flex flex-col justify-between relative bg-surface/80 border-b lg:border-b-0 lg:border-r border-border">
              {/* Top Bar inside image stage */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-border bg-card text-foreground text-xs font-mono">
                    {currentProduct.subseries || currentProduct.category}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    CAT. #{currentProduct.id.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-card/80 p-1 rounded-full border border-border text-xs font-mono">
                  <button
                    onClick={() => setShowDiagram(false)}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      !showDiagram ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    3D Render
                  </button>
                  <button
                    onClick={() => setShowDiagram(true)}
                    className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      showDiagram ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>CAD / Cutout</span>
                  </button>
                </div>
              </div>

              {/* Main Visual Display */}
              <div className="relative w-full aspect-square max-h-[420px] flex items-center justify-center my-6">
                {!showDiagram ? (
                  <div className="relative w-full h-full flex items-center justify-center group">
                    {/* Subtle Radial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f4f0e6]/5 via-transparent to-transparent rounded-full blur-2xl" />
                    
                    <Image
                      src={currentProduct.images[0] || "/images/products/rona-fixture.png"}
                      alt={currentProduct.model}
                      fill
                      className="object-contain p-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-surface/90 rounded-xl p-4 border border-border/80">
                    {currentProduct.dimensionDiagram ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={currentProduct.dimensionDiagram}
                          alt={`${currentProduct.model} Engineering Diagram`}
                          fill
                          className="object-contain invert opacity-90 p-4"
                        />
                      </div>
                    ) : (
                      <div className="text-center p-6 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mx-auto text-stone-300">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                        <div className="text-foreground font-mono text-sm font-medium">
                          Mechanical Dimensions
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          Dimensions: {currentProduct.dimensions}
                          {currentProduct.cutout && ` · Cutout: ${currentProduct.cutout}`}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Info inside left stage */}
              <div className="flex items-center justify-between pt-4 border-t border-border text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Specification Ready</span>
                </div>
                <Link
                  href={`/products/${currentProduct.slug}`}
                  className="inline-flex items-center gap-1 text-foreground hover:underline transition-colors"
                >
                  <span>Full Datasheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Matrix & Specifier Interactivity */}
            <div className="lg:col-span-6 p-5 sm:p-7 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                      {currentProduct.model}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      {currentProduct.installationMethod} · {currentProduct.environment}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-muted-foreground block">Efficacy</span>
                    <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {currentProduct.lumens}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                  {currentProduct.description}
                </p>

                {/* Configuration Options */}
                <div className="space-y-4 mb-6 pt-4 border-t border-border">
                  {/* CCT Selection */}
                  {currentProduct.cct && currentProduct.cct.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                        Color Temperature (CCT): <strong className="text-foreground">{selectedCct}</strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentProduct.cct.map((c) => (
                          <button
                            key={c}
                            onClick={() => setSelectedCct(c)}
                            className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                              selectedCct === c
                                ? "bg-[#f4f0e6] text-zinc-950 font-bold border-[#e6dfd1] shadow-xs"
                                : "bg-card border-border text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Beam Angle Selection */}
                  {currentProduct.beamAngles && currentProduct.beamAngles.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                        Optical Distribution: <strong className="text-foreground">{selectedBeam}</strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentProduct.beamAngles.map((b) => (
                          <button
                            key={b}
                            onClick={() => setSelectedBeam(b)}
                            className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                              selectedBeam === b
                                ? "bg-[#f4f0e6] text-zinc-950 font-bold border-[#e6dfd1] shadow-xs"
                                : "bg-card border-border text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finish Selection */}
                  {currentProduct.finishes && currentProduct.finishes.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                        Architectural Finish: <strong className="text-foreground">{selectedFinish}</strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentProduct.finishes.map((f) => (
                          <button
                            key={f}
                            onClick={() => setSelectedFinish(f)}
                            className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                              selectedFinish === f
                                ? "bg-[#f4f0e6] text-zinc-950 font-bold border-[#e6dfd1] shadow-xs"
                                : "bg-card border-border text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Specification Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-surface/80 border border-border mb-6 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">Power</span>
                    <span className="text-foreground font-medium">{currentProduct.power}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">CRI</span>
                    <span className="text-foreground font-medium">{currentProduct.cri}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">IP Rating</span>
                    <span className="text-foreground font-medium">{currentProduct.ipRating}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">Dimensions</span>
                    <span className="text-foreground font-medium truncate block" title={currentProduct.dimensions}>
                      {currentProduct.dimensions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={handleAddToSchedule}
                    className={`w-full font-mono text-xs uppercase tracking-wider py-5 flex items-center justify-center gap-2 cursor-pointer ${
                      inSchedule
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                        : "bg-[#f4f0e6] hover:bg-[#eae4d5] text-zinc-950 font-semibold shadow-md"
                    }`}
                  >
                    {inSchedule ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>In Spec Schedule</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add To Schedule</span>
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => setIsQuoteOpen(true)}
                    variant="outline"
                    className="w-full border-border bg-card hover:bg-muted text-foreground font-mono text-xs uppercase tracking-wider py-5 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-stone-400" />
                    <span>Request Quotation</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
                  <span>DALI-2 / 0-10V / Phase Dimming</span>
                  <span>L80/B10 &gt; 50,000h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      {currentProduct && (
        <QuoteModal
          product={currentProduct}
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      )}
    </section>
  );
}

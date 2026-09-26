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
    <section className="relative bg-background text-foreground py-20 sm:py-28 border-t border-border/50 overflow-hidden transition-colors duration-300">
      {/* Ambient tricolore atmospheric diffusion */}
      <div className="absolute top-1/2 left-1/6 -translate-y-1/2 w-[500px] h-[500px] bg-[#008C45]/4 dark:bg-[#008C45]/7 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[440px] h-[440px] bg-[#f0ece0]/8 dark:bg-[#f0ece0]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/6 w-[420px] h-[420px] bg-[#CD212A]/3 dark:bg-[#CD212A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-6">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex items-center gap-[3px]" aria-hidden="true">
                <span className="h-[9px] w-[4px] rounded-sm bg-[#f0ece0]/80 dark:bg-[#f0ece0]/60" />
                <span className="h-[9px] w-[4px] rounded-sm bg-[#008C45]/70" />
                <span className="h-[9px] w-[4px] rounded-sm bg-[#CD212A]/70" />
              </span>
              <span className="text-[11.5px] font-sans tracking-[0.10em] uppercase font-medium text-muted-foreground">
                Flagship Architectural Luminaires
              </span>
            </div>

            <h2 className="text-3xl sm:text-[40px] lg:text-[52px] font-light text-foreground tracking-tight leading-[1.06] text-balance">
              Masterwork{" "}
              <span className="font-display italic text-muted-foreground">Engineering</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg text-[14px] sm:text-[15px] leading-[1.75] font-light text-pretty">
              Precision-machined luminaire systems designed for museum-grade color rendering,
              micro-recessed glare shielding, and seamless building integration.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-[12.5px] font-sans tracking-[0.06em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors group shrink-0"
          >
            <span>Explore All {products.length} Luminaires</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Selector Ribbon */}
        <div className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-2 sm:gap-2.5 mb-7 sm:mb-8 pb-2 sm:pb-0 lg:grid lg:grid-cols-5">
          {flagshipProducts.map((prod) => {
            const isSelected = prod.slug === activeSlug;
            return (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(prod.slug)}
                className={`relative shrink-0 w-[155px] sm:w-[190px] lg:w-auto snap-start flex flex-col p-3.5 sm:p-4 rounded-xl text-left transition-all duration-250 border cursor-pointer touch-manipulation ${
                  isSelected
                    ? "bg-card border-border shadow-sm dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] ring-1 ring-foreground/[0.06]"
                    : "bg-surface/60 dark:bg-card/30 border-border/40 hover:bg-card hover:border-border/70 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
                  <span className={`text-[10px] font-mono tracking-[0.06em] ${isSelected ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                    P.{prod.catalogPage.toString().padStart(2, "0")}
                  </span>
                  <span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                    isSelected
                      ? "bg-muted text-foreground font-semibold"
                      : "bg-muted/40 text-muted-foreground/70"
                  }`}>
                    {prod.category}
                  </span>
                </div>
                <div className={`text-[14px] sm:text-[15px] font-medium tracking-tight transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                  {prod.model}
                </div>
                <div className="text-[11.5px] text-muted-foreground/70 mt-0.5 sm:mt-1 truncate font-mono">
                  {prod.power} · {prod.ipRating}
                </div>

                {/* Active indicator — warm bottom line */}
                {isSelected && (
                  <div className="absolute -bottom-[1px] left-3 right-3 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        {currentProduct && (
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-lg dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]">

            {/* Left: Visual Stage */}
            <div className="lg:col-span-6 p-5 sm:p-6 lg:p-9 flex flex-col justify-between relative bg-surface dark:bg-surface-elevated border-b lg:border-b-0 lg:border-r border-border/50">

              {/* View Toggle */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-border/60 bg-card text-foreground text-[11px] font-mono tracking-[0.04em]">
                    {currentProduct.subseries || currentProduct.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground tracking-[0.04em]">
                    CAT. #{currentProduct.id.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 bg-muted/60 dark:bg-card/60 p-1 rounded-full border border-border/50 text-[11px] font-sans">
                  <button
                    onClick={() => setShowDiagram(false)}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer tracking-[0.03em] ${
                      !showDiagram
                        ? "bg-[#f0ece0] text-neutral-950 font-semibold border border-[#ddd6c6] shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    3D Render
                  </button>
                  <button
                    onClick={() => setShowDiagram(true)}
                    className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer tracking-[0.03em] ${
                      showDiagram
                        ? "bg-[#f0ece0] text-neutral-950 font-semibold border border-[#ddd6c6] shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>CAD / Cutout</span>
                  </button>
                </div>
              </div>

              {/* Product Image / Diagram */}
              <div className="relative w-full aspect-square max-h-[400px] flex items-center justify-center my-5">
                {!showDiagram ? (
                  <div className="relative w-full h-full flex items-center justify-center group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f0ece0]/4 via-transparent to-transparent rounded-full blur-2xl" />
                    <Image
                      src={currentProduct.images[0] || "/images/products/rona-fixture.png"}
                      alt={currentProduct.model}
                      fill
                      className="object-contain p-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04]"
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-background/80 dark:bg-card rounded-xl p-4 border border-border/50">
                    {currentProduct.dimensionDiagram ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={currentProduct.dimensionDiagram}
                          alt={`${currentProduct.model} Engineering Diagram`}
                          fill
                          className="object-contain invert opacity-85 p-4"
                        />
                      </div>
                    ) : (
                      <div className="text-center p-6 space-y-3">
                        <div className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center mx-auto text-muted-foreground">
                          <Maximize2 className="w-4.5 h-4.5" />
                        </div>
                        <div className="text-foreground font-sans text-[13px] font-medium">
                          Mechanical Dimensions
                        </div>
                        <div className="text-[12px] text-muted-foreground font-mono">
                          {currentProduct.dimensions}
                          {currentProduct.cutout && ` · Cutout: ${currentProduct.cutout}`}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Stage footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50 text-[11.5px] font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Specification Ready</span>
                </div>
                <Link
                  href={`/products/${currentProduct.slug}`}
                  className="inline-flex items-center gap-1 text-foreground hover:underline underline-offset-3 transition-colors"
                >
                  <span>Full Datasheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Matrix */}
            <div className="lg:col-span-6 p-5 sm:p-7 lg:p-9 flex flex-col justify-between">
              <div>
                {/* Product Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl sm:text-[30px] font-light text-foreground tracking-tight leading-none">
                      {currentProduct.model}
                    </h3>
                    <p className="text-[11.5px] font-mono text-muted-foreground mt-1.5 tracking-[0.04em]">
                      {currentProduct.installationMethod} · {currentProduct.environment}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10.5px] font-mono text-muted-foreground/80 block tracking-[0.06em] uppercase">Efficacy</span>
                    <span className="text-[13px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {currentProduct.lumens}
                    </span>
                  </div>
                </div>

                <p className="text-[13.5px] text-muted-foreground leading-[1.75] mb-6 font-light text-pretty">
                  {currentProduct.description}
                </p>

                {/* Configuration Options */}
                <div className="space-y-4 mb-6 pt-4 border-t border-border/50">
                  {/* CCT */}
                  {currentProduct.cct && currentProduct.cct.length > 0 && (
                    <div>
                      <span className="text-[11px] font-sans tracking-[0.08em] uppercase text-muted-foreground block mb-2 font-medium">
                        Color Temperature:{" "}
                        <strong className="text-foreground font-semibold">{selectedCct}</strong>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProduct.cct.map((c) => (
                          <button
                            key={c}
                            onClick={() => setSelectedCct(c)}
                            className={`px-2.5 py-1 text-[11.5px] font-mono rounded-lg border transition-all cursor-pointer ${
                              selectedCct === c
                                ? "bg-[#f0ece0] text-zinc-950 font-bold border-[#ddd6c6] shadow-sm"
                                : "bg-card border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Beam Angle */}
                  {currentProduct.beamAngles && currentProduct.beamAngles.length > 0 && (
                    <div>
                      <span className="text-[11px] font-sans tracking-[0.08em] uppercase text-muted-foreground block mb-2 font-medium">
                        Optical Distribution:{" "}
                        <strong className="text-foreground font-semibold">{selectedBeam}</strong>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProduct.beamAngles.map((b) => (
                          <button
                            key={b}
                            onClick={() => setSelectedBeam(b)}
                            className={`px-2.5 py-1 text-[11.5px] font-mono rounded-lg border transition-all cursor-pointer ${
                              selectedBeam === b
                                ? "bg-[#f0ece0] text-zinc-950 font-bold border-[#ddd6c6] shadow-sm"
                                : "bg-card border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finish */}
                  {currentProduct.finishes && currentProduct.finishes.length > 0 && (
                    <div>
                      <span className="text-[11px] font-sans tracking-[0.08em] uppercase text-muted-foreground block mb-2 font-medium">
                        Architectural Finish:{" "}
                        <strong className="text-foreground font-semibold">{selectedFinish}</strong>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProduct.finishes.map((f) => (
                          <button
                            key={f}
                            onClick={() => setSelectedFinish(f)}
                            className={`px-2.5 py-1 text-[11.5px] font-mono rounded-lg border transition-all cursor-pointer ${
                              selectedFinish === f
                                ? "bg-[#f0ece0] text-zinc-950 font-bold border-[#ddd6c6] shadow-sm"
                                : "bg-card border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Spec Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface dark:bg-surface-elevated border border-border/50 mb-6">
                  {[
                    { label: "Power", value: currentProduct.power },
                    { label: "CRI", value: currentProduct.cri },
                    { label: "IP Rating", value: currentProduct.ipRating },
                    { label: "Dimensions", value: currentProduct.dimensions },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-sans uppercase tracking-[0.09em] text-muted-foreground/70 font-medium">
                        {label}
                      </span>
                      <span className="text-[12px] font-mono text-foreground font-medium truncate" title={value}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Button
                    onClick={handleAddToSchedule}
                    className={`w-full font-sans text-[12.5px] tracking-[0.06em] uppercase py-5 flex items-center justify-center gap-2 cursor-pointer rounded-xl transition-all ${
                      inSchedule
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-sm"
                        : "bg-[#f0ece0] hover:bg-[#e6e0d0] text-zinc-950 font-semibold border border-[#ddd6c6] shadow-sm hover:shadow-md"
                    }`}
                  >
                    {inSchedule ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" />
                        <span>In Spec Schedule</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 shrink-0" />
                        <span>Add To Schedule</span>
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => setIsQuoteOpen(true)}
                    variant="outline"
                    className="w-full border-border/60 bg-transparent hover:bg-accent/70 text-foreground font-sans text-[12.5px] tracking-[0.06em] uppercase py-5 flex items-center justify-center gap-2 cursor-pointer rounded-xl"
                  >
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>Request Quotation</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/70 pt-0.5">
                  <span>DALI-2 / 0-10V / Phase Dimming</span>
                  <span>L80/B10 &gt; 50,000h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
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

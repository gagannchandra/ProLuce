"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import QuoteModal from "@/components/product/QuoteModal";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Plus,
  Check,
  Power,
} from "lucide-react";

interface HeroProps {
  product?: Product;
}

export default function Hero({ product }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLightOn, setIsLightOn] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const { isInSchedule, addItem, removeItem, openDrawer } = useSpecSchedule();
  const activeProductId = product?.id || "rona";
  const inSchedule = isInSchedule(activeProductId);

  // Apply 2.0x playback rate for smooth kinetic motion
  const enforceSpeed = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);

  useEffect(() => {
    enforceSpeed();
    if (videoRef.current && !videoEnded && isLightOn) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [videoEnded, enforceSpeed, isLightOn]);

  const handleScheduleToggle = () => {
    if (!product) return;
    if (inSchedule) {
      removeItem(product.id);
    } else {
      addItem(product, {
        selectedCct: "3500K",
        selectedBeamAngle: "24°",
        selectedFinish: "Matte Black",
      });
      openDrawer();
    }
  };

  const toggleLight = () => {
    setIsLightOn((prev) => !prev);
  };

  return (
    <section
      className="relative w-full min-h-[680px] lg:min-h-[820px] xl:min-h-[880px] bg-black text-white flex items-center overflow-hidden select-none border-b border-neutral-800/60 transition-colors duration-700"
      aria-label="ProLuce Architectural Luminaire Showcase"
    >
      {/* 1. Cinematic Background Stage */}
      <div className="absolute inset-0 z-0 flex items-center justify-end bg-black overflow-hidden pointer-events-none">
        {isLightOn ? (
          !videoEnded ? (
            <div className="relative w-full h-full lg:w-[76%] xl:w-[72%] 2xl:w-[75%] lg:ml-auto flex items-center justify-center transition-opacity duration-700">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                poster="/images/hero-poster.webp"
                preload="auto"
                onPlay={enforceSpeed}
                onLoadedMetadata={enforceSpeed}
                onEnded={() => setVideoEnded(true)}
                className="w-full h-full object-cover bg-black"
              >
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="relative w-full h-full lg:w-[76%] xl:w-[72%] 2xl:w-[75%] lg:ml-auto flex items-center justify-center bg-black transition-opacity duration-700">
              <Image
                src="/images/hero-spotlight-on.webp"
                alt="ProLuce Architectural Track Spotlight — Light Emitting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 76vw"
                className="object-cover bg-black"
              />
            </div>
          )
        ) : (
          <div className="relative w-full h-full lg:w-[76%] xl:w-[72%] 2xl:w-[75%] lg:ml-auto flex items-center justify-center bg-black transition-opacity duration-700">
            <Image
              src="/images/hero-spotlight-off.webp"
              alt="ProLuce Architectural Track Spotlight — Light Extinguished"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 76vw"
              className="object-cover bg-black"
            />
          </div>
        )}

        {/* Soft atmospheric gradient for text readability across mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90 lg:hidden pointer-events-none z-[1]" />
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none z-[1]" />
      </div>

      {/* 2. Streamlined Architectural Content Overlay */}
      <div className="container-site relative z-10 py-10 sm:py-12 lg:py-16 w-full flex items-center">
        {/* Soft Ambient Light Beam Behind Text (dims when light is off) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[100px] pointer-events-none -z-10 transition-all duration-700 ${
            isLightOn ? "bg-[#f4f0e6]/10 opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"
          }`}
        />

        <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-[620px] space-y-5 sm:space-y-6">
          
          {/* Subtle Eyebrow Badge with Live Luminaire Status */}
          <div className="animate-hero-badge inline-flex items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/80 backdrop-blur-md px-3 sm:px-3.5 py-1">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                isLightOn
                  ? "bg-[#f4f0e6] shadow-[0_0_8px_rgba(244,240,230,0.8)] animate-pulse"
                  : "bg-neutral-500"
              }`}
            />
            <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] text-neutral-300 font-medium">
              {isLightOn ? "Architectural Optic · 3000K Active" : "Optic Standby · Dark Mode"}
            </span>
          </div>

          {/* Clean Display Headline */}
          <div className="animate-hero-title">
            <h1 className="text-[36px] sm:text-5xl lg:text-[66px] font-normal tracking-tight text-white font-display leading-[1.05]">
              Light Sculpted in <br className="hidden xs:inline" />
              <span className={`italic font-serif transition-colors duration-700 ${
                isLightOn
                  ? "bg-gradient-to-r from-white via-stone-100 to-[#f4f0e6] bg-clip-text text-transparent drop-shadow-sm"
                  : "text-neutral-400"
              }`}>
                Pure Precision
              </span>
              .
            </h1>
          </div>

          {/* Clean Subhead */}
          <p className="animate-hero-desc text-sm sm:text-base lg:text-lg text-neutral-300 font-light leading-relaxed font-sans max-w-lg">
            Precision-milled architectural luminaires engineered with micro-faceted TIR optics, deep glare suppression, and continuous dimming intelligence.
          </p>

          {/* Clean Action Buttons */}
          <div className="animate-hero-cta flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
            <Button
              asChild
              size="lg"
              className="group h-11 sm:h-12 rounded-full bg-[#f4f0e6] text-zinc-950 hover:bg-[#eae4d5] font-mono text-xs uppercase tracking-wider px-6 sm:px-7 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold touch-manipulation"
            >
              <Link href="/catalogue" className="flex items-center gap-2.5 sm:gap-3">
                <span>Explore Catalogue</span>
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-zinc-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </Button>

            {product ? (
              <Button
                variant={inSchedule ? "secondary" : "outline"}
                size="lg"
                onClick={handleScheduleToggle}
                className={`h-11 sm:h-12 rounded-full font-mono text-xs uppercase tracking-wider px-5 sm:px-7 border hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-md touch-manipulation ${
                  inSchedule
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white font-medium border-emerald-500 shadow-md"
                    : "bg-white/5 text-white border-white/20 hover:bg-white/15 hover:border-white/40"
                }`}
              >
                {inSchedule ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-white stroke-[3]" />
                    <span>In Spec Schedule</span>
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4 text-stone-300" />
                    <span>Add to Schedule</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsQuoteOpen(true)}
                className="h-11 sm:h-12 rounded-full font-mono text-xs uppercase tracking-wider px-5 sm:px-7 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 touch-manipulation"
              >
                <FileText className="mr-2 h-4 w-4 text-stone-300" />
                <span>Request Project RFQ</span>
              </Button>
            )}
          </div>

        </div>
      </div>

      {/* Tactile Stage Luminaire Optic Switcher (Bottom Right HUD) */}
      <div className="flex absolute bottom-4 right-4 sm:bottom-8 sm:right-10 z-20 items-center">
        <button
          type="button"
          onClick={toggleLight}
          className={`flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 cursor-pointer shadow-2xl touch-manipulation ${
            isLightOn
              ? "bg-neutral-900/90 border-[#e6dfd1]/50 text-neutral-100 shadow-black/20"
              : "bg-neutral-950/90 border-neutral-700/80 text-neutral-400 hover:border-neutral-500"
          }`}
          aria-label={isLightOn ? "Extinguish luminaire (Switch to dark standby)" : "Illuminate luminaire (Switch to 3000K active beam)"}
        >
          <div
            className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full transition-all duration-300 ${
              isLightOn
                ? "bg-[#f4f0e6] text-zinc-950 shadow-[0_0_10px_rgba(244,240,230,0.6)]"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            <Power className="h-3 w-3" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 leading-none">
              Luminaire Optic
            </span>
            <span className={`text-[11px] sm:text-xs font-mono font-semibold leading-none mt-0.5 sm:mt-1 transition-colors ${
              isLightOn ? "text-[#f4f0e6]" : "text-neutral-300"
            }`}>
              {isLightOn ? "3000K Active" : "Dark Standby"}
            </span>
          </div>
        </button>
      </div>

      {/* Trade Quote Modal */}
      {product && (
        <QuoteModal
          product={product}
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      )}
    </section>
  );
}

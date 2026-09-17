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

        {/* Soft atmospheric radial gradient on left edge for text readability */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none z-[1]" />
      </div>

      {/* 2. Streamlined Architectural Content Overlay */}
      <div className="container-site relative z-10 py-12 lg:py-16 w-full flex items-center">
        {/* Soft Ambient Light Beam Behind Text (dims when light is off) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[100px] pointer-events-none -z-10 transition-all duration-700 ${
            isLightOn ? "bg-amber-500/18 opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"
          }`}
        />

        <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-[620px] space-y-6">
          
          {/* Subtle Eyebrow Badge with Live Luminaire Status */}
          <div className="animate-hero-badge inline-flex items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/70 backdrop-blur-md px-3.5 py-1">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                isLightOn
                  ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse"
                  : "bg-neutral-500"
              }`}
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300 font-medium">
              {isLightOn ? "Architectural Optic · 3000K Active" : "Optic Standby · Dark Mode"}
            </span>
          </div>

          {/* Clean Display Headline */}
          <div className="animate-hero-title">
            <h1 className="text-5xl sm:text-6xl lg:text-[66px] font-normal tracking-tight text-white font-display leading-[1.03]">
              Light Sculpted in <br />
              <span className={`italic font-serif transition-colors duration-700 ${
                isLightOn
                  ? "bg-gradient-to-r from-white via-amber-100 to-amber-200/90 bg-clip-text text-transparent drop-shadow-sm"
                  : "text-neutral-400"
              }`}>
                Pure Precision
              </span>
              .
            </h1>
          </div>

          {/* Clean Subhead */}
          <p className="animate-hero-desc text-base sm:text-lg text-neutral-300/90 font-light leading-relaxed font-sans max-w-lg">
            Precision-milled architectural luminaires engineered with micro-faceted TIR optics, deep glare suppression, and continuous dimming intelligence.
          </p>

          {/* Clean Action Buttons */}
          <div className="animate-hero-cta flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-white text-black hover:bg-neutral-100 font-mono text-xs uppercase tracking-wider px-7 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Link href="/catalogue" className="flex items-center gap-3 font-semibold">
                <span>Explore Catalogue</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </Button>

            {product ? (
              <Button
                variant={inSchedule ? "secondary" : "outline"}
                size="lg"
                onClick={handleScheduleToggle}
                className={`h-12 rounded-full font-mono text-xs uppercase tracking-wider px-7 border hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-md ${
                  inSchedule
                    ? "bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/10"
                    : "bg-white/5 text-white border-white/20 hover:bg-white/15 hover:border-white/40"
                }`}
              >
                {inSchedule ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-neutral-950 stroke-[3]" />
                    <span>In Spec Schedule</span>
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4 text-amber-400" />
                    <span>Add to Spec Schedule</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsQuoteOpen(true)}
                className="h-12 rounded-full font-mono text-xs uppercase tracking-wider px-7 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <FileText className="mr-2 h-4 w-4 text-amber-400" />
                <span>Request Project RFQ</span>
              </Button>
            )}
          </div>

        </div>
      </div>

      {/* Tactile Stage Luminaire Optic Switcher (Bottom Right HUD) */}
      <div className="flex absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 items-center">
        <button
          type="button"
          onClick={toggleLight}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-2xl ${
            isLightOn
              ? "bg-neutral-900/90 border-amber-400/50 text-neutral-100 shadow-amber-500/10"
              : "bg-neutral-950/90 border-neutral-700/80 text-neutral-400 hover:border-neutral-500"
          }`}
          aria-label={isLightOn ? "Extinguish luminaire (Switch to dark standby)" : "Illuminate luminaire (Switch to 3000K active beam)"}
        >
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
              isLightOn
                ? "bg-amber-400 text-neutral-950 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            <Power className="h-3 w-3" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 leading-none">
              Luminaire Optic
            </span>
            <span className={`text-xs font-mono font-semibold leading-none mt-1 transition-colors ${
              isLightOn ? "text-amber-300" : "text-neutral-300"
            }`}>
              {isLightOn ? "Beam Active (3000K)" : "Dark Standby (0 lx)"}
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

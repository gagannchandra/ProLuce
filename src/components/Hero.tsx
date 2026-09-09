"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlide {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
  image: string;
  spotlight: {
    name: string;
    series: string;
    specs: string;
    href: string;
    image: string;
  };
}

const slides: HeroSlide[] = [
  {
    eyebrow: "Architectural Spotlight Collection",
    title: "LENA75 Precision Trimless Downlights",
    copy: "Seamless plaster-in recessed downlights with 50,000h operational lifespan, Ra≥90 high-CRI optics, and multi-angle 15°/24°/36° beam distribution.",
    cta: "Explore Spotlights",
    href: "/catalogue?category=Spot+Light",
    image: "/images/products/rona-fixture.png",
    spotlight: {
      name: "RONA Recessed",
      series: "LENA75 Series",
      specs: "10W · IP44 · Ø75mm Cutout",
      href: "/products/rona",
      image: "/images/products/rona-fixture.png",
    },
  },
  {
    eyebrow: "Low-Voltage Magnetic System",
    title: "48V Modular Architectural Tracks",
    copy: "Ultra-slim continuous DC48V tracks with tool-free snap-in magnetic modules — micro-spots, wall washers, and diffuse linear tubes.",
    cta: "Explore 48V Magnetic",
    href: "/catalogue?category=Magnetic+Series",
    image: "/images/products/mega-tube.png",
    spotlight: {
      name: "Mega Tube 48V",
      series: "Mega Magnetic Series",
      specs: "18W · DC48V · Magnetic Track",
      href: "/products/mega-tube",
      image: "/images/products/mega-tube.png",
    },
  },
  {
    eyebrow: "Continuous Linear & Geometric Lighting",
    title: "Extruded Aluminum Architectural Profiles",
    copy: "Direct/indirect continuous linear luminaires, sharp triangular contours, and suspended geometric rings for expansive commercial volumes.",
    cta: "Explore Linear Profiles",
    href: "/catalogue?category=Linear+Light",
    image: "/images/products/lena-20-linear.png",
    spotlight: {
      name: "LENA 20 Linear",
      series: "LENA Architectural Profiles",
      specs: "15W/m · Customizable · 120° Diffuse",
      href: "/products/lena-20-linear",
      image: "/images/products/lena-20-linear.png",
    },
  },
  {
    eyebrow: "Facade & Landscape Illumination",
    title: "IP65 / IP67 Architectural Outdoor Projectors",
    copy: "Engineered die-cast aluminum floodlights and in-ground drive-over fixtures with precision asymmetrical optics for facade illumination.",
    cta: "Explore Outdoor Series",
    href: "/catalogue?category=Outdoor+Light",
    image: "/images/products/flood18.png",
    spotlight: {
      name: "Flood18 Projector",
      series: "Outdoor Architectural Series",
      specs: "36W · IP65 · 12°/30°/45°/60°",
      href: "/products/flood18",
      image: "/images/products/flood18.png",
    },
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Pro-Luce Featured Collections"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <div className="container-site relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium tracking-widest text-neutral-300 uppercase">
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display leading-[1.1]">
              {slide.title}
            </h1>

            <p className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed">
              {slide.copy}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={slide.href}
                className="rounded-lg bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:bg-neutral-100 transition-colors shadow-sm"
              >
                {slide.cta}
              </Link>

              <a
                href="/pdf/Pro-Luce-Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Pro-Luce-Catalogue.pdf"
                className="rounded-lg border border-neutral-700 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
              >
                Download PDF
              </a>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-3 pt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-8 bg-white" : "w-2 bg-neutral-700 hover:bg-neutral-500"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
              <span className="ml-2 font-mono text-xs text-neutral-500">
                0{active + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Spotlight Fixture Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/90 p-8 backdrop-blur-md shadow-2xl">
              {/* Product Visual Container */}
              <div className="relative aspect-square w-full rounded-xl bg-neutral-950 border border-neutral-800/80 p-6 flex items-center justify-center overflow-hidden">
                <Image
                  src={slide.spotlight.image}
                  alt={slide.spotlight.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute top-3 right-3">
                  <span className="rounded bg-neutral-900/90 px-2 py-0.5 text-[10px] font-mono text-neutral-300 border border-neutral-700">
                    Featured Luminaire
                  </span>
                </div>
              </div>

              {/* Spotlight Metadata */}
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    {slide.spotlight.series}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white mt-0.5">
                    {slide.spotlight.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-neutral-400">
                    {slide.spotlight.specs}
                  </p>
                </div>

                <Link
                  href={slide.spotlight.href}
                  className="rounded-md bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white transition-colors"
                >
                  Specs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

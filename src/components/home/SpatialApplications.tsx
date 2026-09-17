"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  ArrowUpRight,
  Sparkles,
  Building2,
  Home,
  Landmark,
  Layers,
} from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  title: string;
  category: string;
  cct: string;
  beam: string;
  cri: string;
  notes: string;
  href: string;
}

interface ProjectTypology {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  architecture: string;
  lightingDesign: string;
  imageSrc: string;
  icon: typeof Landmark;
  hotspots: Hotspot[];
}

const PROJECTS: ProjectTypology[] = [
  {
    id: "museum",
    title: "Museum & Gallery",
    subtitle: "High-contrast conservation lighting with 98+ CRI and micro-recessed glare cut-off.",
    location: "KÖLN CONTEMPORARY, GERMANY",
    architecture: "Minimalist brutalist concrete & white plaster",
    lightingDesign: "Dark-light optic downlights & precision framing projectors",
    imageSrc: "/images/projects/gallery.jpg",
    icon: Landmark,
    hotspots: [
      {
        id: "m-1",
        x: 32,
        y: 38,
        title: "RONA Recessed Downlight",
        category: "Spot Light",
        cct: "3000K",
        beam: "15° Narrow",
        cri: "Ra ≥ 90",
        notes: "Deep-recessed dark-light optics highlighting focal artworks with zero peripheral glare.",
        href: "/product/rona",
      },
      {
        id: "m-2",
        x: 68,
        y: 28,
        title: "NOVA Architectural Spot",
        category: "Spot Light",
        cct: "3000K",
        beam: "24° Medium",
        cri: "Ra ≥ 95",
        notes: "Precision 355° rotatable gimbal for flexible wall grazing and object accentuation.",
        href: "/product/nova",
      },
    ],
  },
  {
    id: "residence",
    title: "Minimalist Residence",
    subtitle: "Circadian-tuned warm illumination and integrated architectural cove profiles.",
    location: "PRIVATE VILLA, ZÜRICH",
    architecture: "Warm limestone, walnut timber & floor-to-ceiling glass",
    lightingDesign: "Hidden low-voltage magnetic tracks and warm-dimming accents",
    imageSrc: "/images/projects/residence.jpg",
    icon: Home,
    hotspots: [
      {
        id: "r-1",
        x: 46,
        y: 38,
        title: "ARTIS Magnetic Series",
        category: "Magnetic Series",
        cct: "2700K Warm Dim",
        beam: "36° Flood",
        cri: "Ra ≥ 95",
        notes: "48V low-voltage magnetic channel concealed flush in architectural ceiling groove.",
        href: "/product/artis",
      },
      {
        id: "r-2",
        x: 82,
        y: 62,
        title: "MINI MSP Accent",
        category: "Spot Light",
        cct: "2700K",
        beam: "24° Spot",
        cri: "Ra ≥ 90",
        notes: "Ø75mm compact trimless fixture providing subtle floor plane grazing.",
        href: "/product/mini-msp",
      },
    ],
  },
  {
    id: "atrium",
    title: "Corporate Atrium",
    subtitle: "Endless monolithic linear channels seamlessly integrated into monolithic timber slats.",
    location: "HORIZON TOWERS, SINGAPORE",
    architecture: "High-volume atrium with structural concrete and acoustical fins",
    lightingDesign: "Continuous extruded linear light channels with micro-prismatic optics",
    imageSrc: "/images/projects/atrium.jpg",
    icon: Building2,
    hotspots: [
      {
        id: "a-1",
        x: 50,
        y: 32,
        title: "LENA 50 Linear System",
        category: "Linear Light",
        cct: "4000K Neutral",
        beam: "120° Diffuse",
        cri: "Ra ≥ 90",
        notes: "Continuous custom-milled linear extrusion channels delivering unified glare-free light.",
        href: "/product/lena-50-linear",
      },
      {
        id: "a-2",
        x: 24,
        y: 65,
        title: "C44 Pendant Monolith",
        category: "Pendant Light",
        cct: "4000K",
        beam: "Direct / Indirect",
        cri: "Ra ≥ 90",
        notes: "Suspended architectural pendant system with integrated DALI-2 drivers.",
        href: "/product/c44-pendant",
      },
    ],
  },
  {
    id: "facade",
    title: "Architectural Façade",
    subtitle: "Rugged IP68 optical grazing creating dramatic night-time structural rhythms.",
    location: "NORDIC CIVIC CENTER, OSLO",
    architecture: "Textured monolithic granite and geometric concrete colonnades",
    lightingDesign: "IP68 flush in-ground uplighters and narrow-beam grazer projectors",
    imageSrc: "/images/projects/facade.jpg",
    icon: Layers,
    hotspots: [
      {
        id: "f-1",
        x: 42,
        y: 78,
        title: "COASTAL In-ground Grazer",
        category: "Outdoor Light",
        cct: "3000K Warm",
        beam: "10° Narrow Graze",
        cri: "Ra ≥ 85",
        notes: "IP68 walk-over marine-grade stainless steel housing with asymmetric wall-wash lens.",
        href: "/product/coastal",
      },
      {
        id: "f-2",
        x: 75,
        y: 48,
        title: "FLOOD Architectural Projector",
        category: "Outdoor Light",
        cct: "3000K",
        beam: "15° Precision",
        cri: "Ra ≥ 85",
        notes: "High-output architectural floodlight illuminating colonnade capitals and soffits.",
        href: "/catalogue?category=Outdoor+Light",
      },
    ],
  },
];

export default function SpatialApplications() {
  const [activeTab, setActiveTab] = useState<string>("museum");
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>("m-1");

  const activeProject = PROJECTS.find((p) => p.id === activeTab) || PROJECTS[0];
  const currentHotspot = activeProject.hotspots.find((h) => h.id === activeHotspotId) || activeProject.hotspots[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    const proj = PROJECTS.find((p) => p.id === id);
    if (proj && proj.hotspots.length > 0) {
      setActiveHotspotId(proj.hotspots[0].id);
    }
  };

  return (
    <section className="relative bg-background text-foreground py-24 sm:py-32 border-t border-border overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-foreground text-xs font-mono uppercase tracking-widest mb-3 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-stone-400" />
              <span>Spatial Applications & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight">
              Luminaires in <span className="font-serif italic text-muted-foreground">Architecture</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed font-light">
              Explore how Pro-Luce optical systems define atmosphere, render architectural materials, and deliver purposeful photometric distributions in world-class projects.
            </p>
          </div>

          {/* Typology Navigation Buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-card border border-border shadow-2xs">
            {PROJECTS.map((proj) => {
              const Icon = proj.icon;
              const isActive = proj.id === activeTab;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleTabChange(proj.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-md font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Spatial Photography Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
          {/* Main Visual Display */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[480px]">
            <Image
              src={activeProject.imageSrc}
              alt={activeProject.title}
              fill
              className="object-cover transition-opacity duration-700"
              priority
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />

            {/* Location & Architecture Badge (Top Left) */}
            <div className="absolute top-6 left-6 max-w-md z-10 pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#f4f0e6] block mb-1 font-semibold">
                {activeProject.location}
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-white drop-shadow-md">
                {activeProject.title}
              </h3>
              <p className="text-xs text-stone-200 mt-1 font-light drop-shadow line-clamp-2">
                {activeProject.subtitle}
              </p>
            </div>

            {/* Interactive Luminaire Hotspots */}
            {activeProject.hotspots.map((spot) => {
              const isSelected = spot.id === activeHotspotId;
              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspotId(spot.id)}
                    aria-label={`Inspect ${spot.title}`}
                    className="relative group flex items-center justify-center cursor-pointer"
                  >
                    {/* Pulsing Ripple rings */}
                    <span
                      className={`absolute w-10 h-10 rounded-full animate-ping opacity-50 ${
                        isSelected ? "bg-[#f4f0e6]" : "bg-white/80"
                      }`}
                    />
                    <span
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                        isSelected
                          ? "bg-[#f4f0e6] text-zinc-950 ring-4 ring-[#f4f0e6]/40 font-semibold"
                          : "bg-black/80 text-white border border-white/40 hover:border-white"
                      }`}
                    >
                      +
                    </span>

                    {/* Small preview tag on hover */}
                    <span className="absolute left-full ml-2 px-2 py-1 rounded bg-black/90 text-white border border-white/20 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {spot.title}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Active Hotspot Deep-Dive Spec Card (Bottom Floating Island) */}
            {currentHotspot && (
              <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-20">
                <div className="bg-black/85 backdrop-blur-xl border border-white/15 p-5 rounded-xl shadow-2xl text-left text-white">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <Badge variant="outline" className="border-[#e6dfd1]/40 bg-[#f4f0e6]/15 text-[#f4f0e6] text-[10px] font-mono">
                      {currentHotspot.category}
                    </Badge>
                    <span className="text-[10px] font-mono text-zinc-300">
                      SPECIFICATION OVERLAY
                    </span>
                  </div>

                  <h4 className="text-base font-medium text-white">
                    {currentHotspot.title}
                  </h4>

                  <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-light">
                    {currentHotspot.notes}
                  </p>

                  {/* Optical Spec Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-white/15 font-mono text-[11px]">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">CCT</span>
                      <span className="text-white font-medium">{currentHotspot.cct}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Beam</span>
                      <span className="text-white font-medium">{currentHotspot.beam}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">CRI Index</span>
                      <span className="text-[#f4f0e6] font-medium">{currentHotspot.cri}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-zinc-400">
                      Click hotspot &apos;+&apos; to change fixture
                    </span>
                    <Link
                      href={currentHotspot.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#f4f0e6] text-white text-xs font-mono transition-colors"
                    >
                      <span>View Luminaire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Project Architecture Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3 shadow-2xs">
            <div className="p-2 rounded-lg bg-muted text-muted-foreground shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Architectural Intent
              </span>
              <p className="text-xs text-foreground font-light mt-0.5">
                {activeProject.architecture}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3 shadow-2xs">
            <div className="p-2 rounded-lg bg-muted text-muted-foreground shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Photometric Execution
              </span>
              <p className="text-xs text-foreground font-light mt-0.5">
                {activeProject.lightingDesign}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

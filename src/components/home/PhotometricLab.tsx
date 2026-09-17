"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  Check,
  Plus,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { BeamAngleIcon } from "@/components/ui/beam-angle-icon";

interface BeamSpec {
  angle: string;
  angleNumber: number;
  label: string;
  candela: number;
  application: string;
}

interface CctSpec {
  kelvin: number;
  label: string;
  name: string;
  hex: string;
  description: string;
}

const BEAMS: BeamSpec[] = [
  {
    angle: "15°",
    angleNumber: 15,
    label: "Narrow Spot",
    candela: 12500,
    application: "Museum exhibits, sculpture accents, architectural focal points",
  },
  {
    angle: "24°",
    angleNumber: 24,
    label: "Medium Spot",
    candela: 5400,
    application: "Dining tables, retail mannequins, feature walls",
  },
  {
    angle: "36°",
    angleNumber: 36,
    label: "Flood",
    candela: 2800,
    application: "General ambient accent, residential lounges, hotel lobbies",
  },
  {
    angle: "60°",
    angleNumber: 60,
    label: "Wide Flood",
    candela: 1450,
    application: "Open plan offices, conference rooms, circulation corridors",
  },
  {
    angle: "120°",
    angleNumber: 120,
    label: "Diffuse Linear",
    candela: 620,
    application: "Continuous perimeter grazing, cove lighting, wall washing",
  },
];

const CCTS: CctSpec[] = [
  {
    kelvin: 2700,
    label: "2700K",
    name: "Warm Incandescent",
    hex: "#ffb366",
    description: "Intimate residential warmth, luxury hospitality & spa suites",
  },
  {
    kelvin: 3000,
    label: "3000K",
    name: "Soft Architectural",
    hex: "#ffd199",
    description: "Standard architectural warm white; museums, retail & galleries",
  },
  {
    kelvin: 4000,
    label: "4000K",
    name: "Neutral Daylight",
    hex: "#fff0d9",
    description: "Crisp neutral white for modern offices, healthcare & studios",
  },
  {
    kelvin: 5000,
    label: "Tunable",
    name: "Circadian 2700–6500K",
    hex: "#f4f0e6",
    description: "Human-centric biodynamic lighting synchronized to solar cycle",
  },
];

export default function PhotometricLab() {
  const [selectedBeam, setSelectedBeam] = useState<BeamSpec>(BEAMS[1]);
  const [selectedCct, setSelectedCct] = useState<CctSpec>(CCTS[1]);
  const [ceilingHeight, setCeilingHeight] = useState<number>(3.5);
  const [isAddedToSchedule, setIsAddedToSchedule] = useState(false);

  const { addItem, openDrawer } = useSpecSchedule();

  // Trigonometric Optical Calculations
  const rad = (selectedBeam.angleNumber * Math.PI) / 360;
  const beamDiameter = (2 * ceilingHeight * Math.tan(rad)).toFixed(2);
  const floorLux = Math.round(selectedBeam.candela / (ceilingHeight * ceilingHeight));

  const handleAddOpticToSchedule = () => {
    const rona = products.find((p) => p.slug === "rona") || products[0];
    addItem(rona, {
      selectedCct: selectedCct.label,
      selectedBeamAngle: selectedBeam.angle,
      selectedFinish: "Matte Black",
    });
    setIsAddedToSchedule(true);
    openDrawer();
    setTimeout(() => setIsAddedToSchedule(false), 3000);
  };

  return (
    <section
      className="relative w-full py-20 lg:py-28 bg-background text-foreground overflow-hidden border-b border-border transition-colors duration-300"
      aria-labelledby="photometric-lab-title"
    >
      {/* Soft Ambient Light Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-15"
        style={{ background: selectedCct.hex }}
      />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-foreground shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-stone-400" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
                Pro-Luce Optical Engineering
              </span>
            </div>
            <h2
              id="photometric-lab-title"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-foreground"
            >
              Interactive Photometric Lab
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl font-sans font-light leading-relaxed">
              Explore the physics of our optical engine: real-time TIR beam distribution, 30° anti-glare shielding angle, and calculated floor illuminance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Badge variant="outline" className="font-mono text-xs text-foreground border-border px-3 py-1 bg-card shadow-2xs">
              CRI Ra ≥ 90 (R9 &gt; 50)
            </Badge>
            <Badge variant="outline" className="font-mono text-xs text-foreground border-border px-3 py-1 bg-card shadow-2xs">
              SDCM &lt; 2-Step
            </Badge>
          </div>
        </div>

        {/* Studio Grid: Left Optical Controls + Right Real-time Light Cone Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          
          {/* Left Column: Interactive Parametric Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Beam Angle Selector */}
            <Card className="p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-stone-400" />
                  Select Optical Distribution
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {selectedBeam.angle} · {selectedBeam.label}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {BEAMS.map((b) => {
                  const isSelected = selectedBeam.angle === b.angle;
                  return (
                    <button
                      key={b.angle}
                      type="button"
                      onClick={() => setSelectedBeam(b)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border font-mono transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#f4f0e6] border-[#e6dfd1] text-zinc-950 font-bold shadow-md scale-[1.02]"
                          : "bg-surface/80 dark:bg-zinc-800/60 border-border text-foreground hover:border-stone-400 hover:bg-muted"
                      }`}
                    >
                      <BeamAngleIcon
                        angle={b.angleNumber}
                        isSelected={isSelected}
                        className="h-5 w-5 mb-1"
                      />
                      <span className="text-xs">{b.angle}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-border/80 text-xs text-muted-foreground leading-relaxed font-sans">
                <strong className="text-foreground font-medium">Application:</strong> {selectedBeam.application}
              </div>
            </Card>

            {/* 2. Color Temperature (CCT) Tuner */}
            <Card className="p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-stone-400" />
                  Color Temperature (CCT)
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {selectedCct.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {CCTS.map((c) => {
                  const isSelected = selectedCct.label === c.label;
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setSelectedCct(c)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#f4f0e6] border-[#e6dfd1] text-zinc-950 font-bold shadow-xs"
                          : "bg-surface/80 dark:bg-zinc-800/60 border-border text-foreground hover:border-stone-400 hover:bg-muted"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shrink-0 shadow-xs border border-black/30"
                        style={{ background: c.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-mono font-bold leading-none">{c.label}</div>
                        <div className={`text-[10px] truncate mt-0.5 ${isSelected ? "text-zinc-800" : "text-muted-foreground"}`}>{c.name}</div>
                      </div>
                      {isSelected && <Check className="h-3 w-3 text-zinc-950 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* 3. Ceiling Mounting Height */}
            <Card className="p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-stone-400" />
                  Mounting Height (H)
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {ceilingHeight.toFixed(1)} Meters
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[2.5, 3.0, 3.5].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setCeilingHeight(h)}
                    className={`py-2 px-3 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                      ceilingHeight === h
                        ? "bg-[#f4f0e6] text-zinc-950 font-bold border-[#e6dfd1] shadow-md"
                        : "bg-surface/80 dark:bg-zinc-800/60 border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {h.toFixed(1)}m Ceiling
                  </button>
                ))}
              </div>
            </Card>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                className="flex-1 rounded-full bg-[#f4f0e6] text-zinc-950 hover:bg-[#eae4d5] font-mono text-xs uppercase tracking-wider h-11 font-semibold shadow-md cursor-pointer"
              >
                <Link href={`/catalogue?beam=${encodeURIComponent(selectedBeam.angle)}&cct=${encodeURIComponent(selectedCct.label)}`}>
                  <span>Filter Catalogue for {selectedBeam.angle}</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleAddOpticToSchedule}
                className="rounded-full border-border bg-card text-foreground hover:bg-muted font-mono text-xs uppercase tracking-wider h-11 px-5 cursor-pointer shadow-2xs"
              >
                {isAddedToSchedule ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                    <span>Added to Schedule</span>
                  </>
                ) : (
                  <>
                    <Plus className="mr-1.5 h-3.5 w-3.5 text-stone-400" />
                    <span>Add to Schedule</span>
                  </>
                )}
              </Button>
            </div>

          </div>

          {/* Right Column: Real-Time Optical Stage (SVG Light Cone Simulation) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col items-center backdrop-blur-md">
              
              {/* Studio Canvas HUD Top Bar */}
              <div className="w-full flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f4f0e6] animate-pulse shadow-[0_0_8px_rgba(244,240,230,0.8)]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                    Optical Ray Simulator
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span>CBCP: <strong className="text-[#f4f0e6] font-semibold">{selectedBeam.candela.toLocaleString()} cd</strong></span>
                  <span>Cutoff: <strong className="text-zinc-100 font-semibold">30° Shielded</strong></span>
                </div>
              </div>

              {/* Dynamic SVG Optical Cone Simulation Canvas */}
              <div className="relative w-full max-w-[480px] h-[340px] flex items-center justify-center">
                
                {/* SVG Ray Cone */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Beam Glow Radial Gradient */}
                    <radialGradient id="beamGradient" cx="50%" cy="0%" r="90%">
                      <stop offset="0%" stopColor={selectedCct.hex} stopOpacity="0.85" />
                      <stop offset="35%" stopColor={selectedCct.hex} stopOpacity="0.45" />
                      <stop offset="70%" stopColor={selectedCct.hex} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={selectedCct.hex} stopOpacity="0.0" />
                    </radialGradient>

                    {/* Lens Point Flare */}
                    <radialGradient id="lensFlare" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor={selectedCct.hex} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={selectedCct.hex} stopOpacity="0.0" />
                    </radialGradient>
                  </defs>

                  {/* Architectural Grid Lines */}
                  <line x1="20" y1="20" x2="380" y2="20" stroke="#333" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="20" y1="260" x2="380" y2="260" stroke="#444" strokeWidth="1.5" />
                  <text x="25" y="16" fill="#777" fontSize="9" fontFamily="monospace">CEILING PLANE (H=0.0m)</text>
                  <text x="25" y="275" fill="#777" fontSize="9" fontFamily="monospace">FLOOR / WORKPLANE (H={ceilingHeight.toFixed(1)}m)</text>

                  {/* Calculated SVG Optical Cone Points */}
                  {(() => {
                    const apexX = 200;
                    const apexY = 22;
                    const floorY = 260;
                    const heightPixels = floorY - apexY;
                    const halfWidth = Math.min(180, heightPixels * Math.tan(rad));
                    const leftX = apexX - halfWidth;
                    const rightX = apexX + halfWidth;

                    return (
                      <>
                        {/* Light Cone Polygon */}
                        <polygon
                          points={`${apexX},${apexY} ${leftX},${floorY} ${rightX},${floorY}`}
                          fill="url(#beamGradient)"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Optical Edge Rays */}
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={leftX}
                          y2={floorY}
                          stroke={selectedCct.hex}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="transition-all duration-500 ease-out"
                        />
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={rightX}
                          y2={floorY}
                          stroke={selectedCct.hex}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Floor Light Pool (Ellipse) */}
                        <ellipse
                          cx={apexX}
                          cy={floorY}
                          rx={halfWidth}
                          ry="10"
                          fill={selectedCct.hex}
                          fillOpacity="0.35"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Dimension Arrow for Floor Beam Diameter */}
                        <line x1={leftX} y1="285" x2={rightX} y2="285" stroke="#888" strokeWidth="1" />
                        <line x1={leftX} y1="280" x2={leftX} y2="290" stroke="#888" strokeWidth="1" />
                        <line x1={rightX} y1="280" x2={rightX} y2="290" stroke="#888" strokeWidth="1" />
                        <text
                          x={apexX}
                          y="298"
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
                  <rect x="186" y="8" width="28" height="14" rx="2" fill="#171717" stroke="#525252" strokeWidth="1.5" />
                  <circle cx="200" cy="22" r="7" fill="url(#lensFlare)" />
                </svg>

              </div>

              {/* Real-time Photometric Metrics Summary Bar */}
              <div className="w-full grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-zinc-800">
                <div className="text-center p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Calculated Lux (E)</div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-[#f4f0e6] mt-0.5">
                    {floorLux.toLocaleString()} lx
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">Floor Level Center</div>
                </div>

                <div className="text-center p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Beam Diameter</div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-zinc-100 mt-0.5">
                    Ø {beamDiameter} m
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">at {ceilingHeight.toFixed(1)}m height</div>
                </div>

                <div className="text-center p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Glare Rating</div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400 mt-0.5">
                    UGR &lt; 13
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">Deep Glare Cutoff</div>
                </div>
              </div>

              {/* Engineering Standard Validation Footer */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  IEC 62722 Photometric Validated
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-stone-300" />
                  RG0 Zero Photobiological Risk
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

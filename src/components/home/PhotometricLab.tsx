"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sliders,
  Sparkles,
  ArrowRight,
  Check,
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

interface CctPreset {
  key: string;
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

const CCT_PRESETS: CctPreset[] = [
  {
    key: "2700k",
    kelvin: 2700,
    label: "2700K",
    name: "Warm Incandescent",
    hex: "#ffb366",
    description: "Intimate residential warmth, luxury hospitality & spa suites",
  },
  {
    key: "3000k",
    kelvin: 3000,
    label: "3000K",
    name: "Soft Architectural",
    hex: "#ffd199",
    description: "Standard architectural warm white; museums, retail & galleries",
  },
  {
    key: "4000k",
    kelvin: 4000,
    label: "4000K",
    name: "Neutral Daylight",
    hex: "#fff0d9",
    description: "Crisp neutral white for modern offices, healthcare & studios",
  },
  {
    key: "tunable",
    kelvin: 6500,
    label: "Tunable",
    name: "Circadian 2700–6500K",
    hex: "#c8e4ff",
    description: "Human-centric biodynamic lighting synchronized to solar cycle",
  },
];

// Piecewise mapping to ensure 100% visual and physical alignment between the slider thumb,
// color gradient track, preset buttons, and scale reference labels (2700K=0%, 3000K=33.33%, 4000K=66.67%, 6500K=100%).
function sliderPosToKelvin(pos: number): number {
  if (pos <= 0) return 2700;
  if (pos >= 100) return 6500;
  let k: number;
  if (pos <= 33.333) {
    k = 2700 + (pos / 33.333) * (3000 - 2700);
  } else if (pos <= 66.667) {
    k = 3000 + ((pos - 33.333) / 33.334) * (4000 - 3000);
  } else {
    k = 4000 + ((pos - 66.667) / 33.333) * (6500 - 4000);
  }
  if (Math.abs(k - 2700) < 15) return 2700;
  if (Math.abs(k - 3000) < 15) return 3000;
  if (Math.abs(k - 4000) < 15) return 4000;
  if (Math.abs(k - 6500) < 15) return 6500;
  return Math.round(k / 25) * 25;
}

function kelvinToSliderPos(k: number): number {
  if (k <= 2700) return 0;
  if (k >= 6500) return 100;
  if (k <= 3000) {
    return ((k - 2700) / 300) * 33.333;
  } else if (k <= 4000) {
    return 33.333 + ((k - 3000) / 1000) * 33.334;
  } else {
    return 66.667 + ((k - 4000) / 2500) * 33.333;
  }
}

// Calibrated architectural color interpolation across 2700K - 6500K
function getCctColor(kelvin: number): string {
  const stops = [
    { k: 2700, r: 255, g: 179, b: 102 }, // Warm incandescent #ffb366
    { k: 3000, r: 255, g: 209, b: 153 }, // Soft architectural #ffd199
    { k: 4000, r: 255, g: 240, b: 217 }, // Neutral daylight #fff0d9
    { k: 5000, r: 234, g: 244, b: 255 }, // Crisp daylight #eaf4ff
    { k: 6500, r: 200, g: 228, b: 255 }, // Circadian sky daylight #c8e4ff
  ];

  if (kelvin <= stops[0].k) return "#ffb366";
  if (kelvin >= stops[stops.length - 1].k) return "#c8e4ff";

  for (let i = 0; i < stops.length - 1; i++) {
    const s1 = stops[i];
    const s2 = stops[i + 1];
    if (kelvin >= s1.k && kelvin <= s2.k) {
      const factor = (kelvin - s1.k) / (s2.k - s1.k);
      const r = Math.round(s1.r + factor * (s2.r - s1.r));
      const g = Math.round(s1.g + factor * (s2.g - s1.g));
      const b = Math.round(s1.b + factor * (s2.b - s1.b));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return "#ffd199";
}

function getCctMeta(kelvin: number) {
  if (kelvin === 2700) {
    return {
      label: "2700K",
      name: "Warm Incandescent",
      filterValue: "2700K",
    };
  }
  if (kelvin === 3000) {
    return {
      label: "3000K",
      name: "Soft Architectural",
      filterValue: "3000K",
    };
  }
  if (kelvin === 4000) {
    return {
      label: "4000K",
      name: "Neutral Daylight",
      filterValue: "4000K",
    };
  }
  if (kelvin === 6500) {
    return {
      label: "6500K",
      name: "Circadian Daylight",
      filterValue: "Tunable",
    };
  }
  if (kelvin >= 5000) {
    return {
      label: `${kelvin}K`,
      name: "Circadian Daylight",
      filterValue: "Tunable",
    };
  }
  return {
    label: `${kelvin}K`,
    name: "Tunable Architectural",
    filterValue: "Tunable",
  };
}

export default function PhotometricLab() {
  const [selectedBeam, setSelectedBeam] = useState<BeamSpec>(BEAMS[1]);
  const [kelvin, setKelvin] = useState<number>(3000);
  const ceilingHeight = 3.0;

  const currentCctColor = getCctColor(kelvin);
  const currentCctMeta = getCctMeta(kelvin);

  // Trigonometric Optical Calculations
  const rad = (selectedBeam.angleNumber * Math.PI) / 360;
  const beamDiameter = (2 * ceilingHeight * Math.tan(rad)).toFixed(2);
  const floorLux = Math.round(selectedBeam.candela / (ceilingHeight * ceilingHeight));

  return (
    <section
      className="relative w-full py-20 lg:py-28 bg-background text-foreground overflow-hidden border-b border-border transition-colors duration-300"
      aria-labelledby="photometric-lab-title"
    >
      {/* Soft Ambient Light Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-15"
        style={{ background: currentCctColor }}
      />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-foreground shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-stone-400" />
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] font-medium">
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
            <Card className="p-4 sm:p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">Optical Distribution</span>
                </span>
                <span className="text-xs font-mono font-bold text-foreground shrink-0">
                  {selectedBeam.angle} · {selectedBeam.label}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {BEAMS.map((b) => {
                  const isSelected = selectedBeam.angle === b.angle;
                  return (
                    <button
                      key={b.angle}
                      type="button"
                      onClick={() => setSelectedBeam(b)}
                      className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border font-mono transition-all duration-200 cursor-pointer touch-manipulation ${
                        isSelected
                          ? "bg-[#f4f0e6] border-[#e6dfd1] text-zinc-950 font-bold shadow-md scale-[1.02]"
                          : "bg-surface/80 border-border text-foreground hover:border-stone-400 hover:bg-muted"
                      }`}
                    >
                      <BeamAngleIcon
                        angle={b.angleNumber}
                        isSelected={isSelected}
                        className="h-4 w-4 sm:h-5 sm:w-5 mb-0.5 sm:mb-1 shrink-0"
                      />
                      <span className="text-[11px] sm:text-xs font-bold">{b.angle}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-border/80 text-xs text-muted-foreground leading-relaxed font-sans">
                <strong className="text-foreground font-medium">Application:</strong> {selectedBeam.application}
              </div>
            </Card>

            {/* 2. Color Temperature (CCT) Tuner with Interactive Synced Slider */}
            <Card className="p-5 bg-card border-border backdrop-blur-md rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-stone-400" />
                  Color Temperature (CCT)
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {currentCctMeta.label}
                </span>
              </div>

              {/* 4 Preset Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                {CCT_PRESETS.map((preset) => {
                  const isSelected =
                    preset.key === "tunable"
                      ? kelvin !== 2700 && kelvin !== 3000 && kelvin !== 4000
                      : kelvin === preset.kelvin;

                  const dotColor =
                    preset.key === "tunable" && isSelected
                      ? currentCctColor
                      : preset.hex;

                  return (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => setKelvin(preset.kelvin)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer touch-manipulation ${
                        isSelected
                          ? "bg-[#f4f0e6] border-[#e6dfd1] text-zinc-950 font-bold shadow-xs"
                          : "bg-surface/80 border-border text-foreground hover:border-stone-400 hover:bg-muted"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shrink-0 shadow-xs border border-black/30 transition-colors duration-200"
                        style={{ background: dotColor }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-mono font-bold leading-none">
                          {preset.label}
                        </div>
                        <div
                          className={`text-[10px] truncate mt-0.5 ${
                            isSelected ? "text-zinc-800" : "text-muted-foreground"
                          }`}
                        >
                          {preset.name}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="h-3 w-3 text-zinc-950 shrink-0 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Kelvin Spectrum Slider Synced with Buttons */}
              <div
                className="mt-4 pt-3.5 border-t border-border/80 space-y-2"
                style={
                  {
                    "--cct-glow": currentCctColor,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span
                      className="h-2 w-2 rounded-full border border-black/20 shadow-2xs transition-colors duration-200"
                      style={{ background: currentCctColor }}
                    />
                    <span>Kelvin Spectrum</span>
                  </span>
                  <span className="text-foreground font-semibold font-mono">
                    {kelvin}K · {currentCctMeta.name}
                  </span>
                </div>

                {/* Slider Input with Dynamic Continuous Color Track Synced to Scale */}
                <div className="relative py-1 flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.5}
                    value={kelvinToSliderPos(kelvin)}
                    onChange={(e) => setKelvin(sliderPosToKelvin(Number(e.target.value)))}
                    className="cct-slider w-full h-2 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                    style={{
                      background:
                        "linear-gradient(to right, #ffb366 0%, #ffd199 33.33%, #fff0d9 66.67%, #c8e4ff 100%)",
                    }}
                    aria-label="Color Temperature in Kelvin"
                  />
                </div>

                {/* Quick Snap Reference Markers Perfectly Aligned to Scale */}
                <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground px-0.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setKelvin(2700)}
                    className={`hover:text-foreground transition-colors cursor-pointer touch-manipulation flex flex-col items-center gap-0.5 ${
                      kelvin === 2700 ? "text-foreground font-bold" : ""
                    }`}
                  >
                    <span className={`w-0.5 rounded-full transition-all duration-200 ${kelvin === 2700 ? "h-1.5 bg-foreground" : "h-1 bg-muted-foreground/30"}`} />
                    <span>2700K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setKelvin(3000)}
                    className={`hover:text-foreground transition-colors cursor-pointer touch-manipulation flex flex-col items-center gap-0.5 ${
                      kelvin === 3000 ? "text-foreground font-bold" : ""
                    }`}
                  >
                    <span className={`w-0.5 rounded-full transition-all duration-200 ${kelvin === 3000 ? "h-1.5 bg-foreground" : "h-1 bg-muted-foreground/30"}`} />
                    <span>3000K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setKelvin(4000)}
                    className={`hover:text-foreground transition-colors cursor-pointer touch-manipulation flex flex-col items-center gap-0.5 ${
                      kelvin === 4000 ? "text-foreground font-bold" : ""
                    }`}
                  >
                    <span className={`w-0.5 rounded-full transition-all duration-200 ${kelvin === 4000 ? "h-1.5 bg-foreground" : "h-1 bg-muted-foreground/30"}`} />
                    <span>4000K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setKelvin(6500)}
                    className={`hover:text-foreground transition-colors cursor-pointer touch-manipulation flex flex-col items-center gap-0.5 ${
                      kelvin === 6500 ? "text-foreground font-bold" : ""
                    }`}
                  >
                    <span className={`w-0.5 rounded-full transition-all duration-200 ${kelvin === 6500 ? "h-1.5 bg-foreground" : "h-1 bg-muted-foreground/30"}`} />
                    <span>6500K</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Direct Action Button */}
            <div className="pt-2">
              <Button
                asChild
                className="w-full rounded-full bg-[#f4f0e6] text-zinc-950 hover:bg-[#eae4d5] font-sans text-xs uppercase tracking-[0.14em] font-semibold h-11 shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Link
                  href={`/catalogue?beam=${encodeURIComponent(selectedBeam.angle)}&cct=${encodeURIComponent(currentCctMeta.filterValue)}`}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Filter Catalogue for {selectedBeam.angle}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column: Real-Time Optical Stage (SVG Light Cone Simulation) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border bg-card/90 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col items-center backdrop-blur-md">
              
              {/* Studio Canvas HUD Top Bar */}
              <div className="w-full flex items-center justify-between border-b border-border/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse transition-colors duration-300"
                    style={{
                      background: currentCctColor,
                      boxShadow: `0 0 8px ${currentCctColor}`,
                    }}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                    Optical Ray Simulator
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                  <span>CBCP: <strong className="text-[#f4f0e6] font-semibold">{selectedBeam.candela.toLocaleString()} cd</strong></span>
                  <span>Cutoff: <strong className="text-foreground font-semibold">30° Shielded</strong></span>
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
                      <stop offset="0%" stopColor={currentCctColor} stopOpacity="0.85" />
                      <stop offset="35%" stopColor={currentCctColor} stopOpacity="0.45" />
                      <stop offset="70%" stopColor={currentCctColor} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={currentCctColor} stopOpacity="0.0" />
                    </radialGradient>

                    {/* Lens Point Flare */}
                    <radialGradient id="lensFlare" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor={currentCctColor} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={currentCctColor} stopOpacity="0.0" />
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
                          className="transition-all duration-300 ease-out"
                        />

                        {/* Optical Edge Rays */}
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={leftX}
                          y2={floorY}
                          stroke={currentCctColor}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="transition-all duration-300 ease-out"
                        />
                        <line
                          x1={apexX}
                          y1={apexY}
                          x2={rightX}
                          y2={floorY}
                          stroke={currentCctColor}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="transition-all duration-300 ease-out"
                        />

                        {/* Floor Light Pool (Ellipse) */}
                        <ellipse
                          cx={apexX}
                          cy={floorY}
                          rx={halfWidth}
                          ry="10"
                          fill={currentCctColor}
                          fillOpacity="0.35"
                          className="transition-all duration-300 ease-out"
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
              <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-border">
                <div className="text-center p-2 sm:p-3 rounded-xl bg-surface/80 border border-border">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-muted-foreground">Calculated Lux</div>
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-[#f4f0e6] mt-0.5">
                    {floorLux.toLocaleString()} lx
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground font-mono hidden xs:block">Floor Center</div>
                </div>

                <div className="text-center p-2 sm:p-3 rounded-xl bg-surface/80 border border-border">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-muted-foreground">Beam Spread</div>
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-foreground mt-0.5">
                    Ø {beamDiameter}m
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground font-mono hidden xs:block">at {ceilingHeight.toFixed(1)}m H</div>
                </div>

                <div className="text-center p-2 sm:p-3 rounded-xl bg-surface/80 border border-border">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-muted-foreground">Glare Rating</div>
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-emerald-400 mt-0.5">
                    UGR &lt; 13
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground font-mono hidden xs:block">Dark-Light</div>
                </div>
              </div>

              {/* Engineering Standard Validation Footer */}
              <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-muted-foreground mt-4 px-1 text-center xs:text-left">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  IEC 62722 Photometric Validated
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-stone-300 shrink-0" />
                  RG0 Zero Risk
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

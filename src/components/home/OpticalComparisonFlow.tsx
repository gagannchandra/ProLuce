"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Eye, ShieldCheck, MoveHorizontal } from "lucide-react";

export default function OpticalComparisonFlow() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, pos)));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((p) => Math.max(5, p - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((p) => Math.min(95, p + 5));
    }
  };

  return (
    <section
      className="bg-black text-white py-20 md:py-28 overflow-hidden relative border-y border-neutral-800"
      aria-labelledby="optical-cutoff-heading"
    >
      {/* Ambient Soft Gold Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-neutral-700/60 bg-neutral-900/80 backdrop-blur-md px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 rounded-full shadow-xs"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Glare Suppression Telemetry
            </Badge>
          </div>

          <h2
            id="optical-cutoff-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-white font-display leading-[1.1]"
          >
            See the Light. Not the Source.
          </h2>

          <p className="text-sm sm:text-base text-neutral-300/90 max-w-xl mx-auto leading-relaxed font-sans font-light">
            Standard downlights scatter harsh peripheral flare across the ceiling. ProLuce recessed dark-light baffles conceal the LED diode outside a 40° viewing angle, delivering true visual comfort.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-neutral-800 bg-neutral-950 p-0 overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div
                role="slider"
                aria-label="Interactive glare comparison slider"
                aria-valuenow={Math.round(sliderPosition)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="relative h-[380px] sm:h-[460px] w-full overflow-hidden select-none cursor-ew-resize group bg-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onMouseMove={(e) => {
                  if (isDragging || e.buttons === 1) handleSliderMove(e);
                }}
                onTouchMove={handleSliderMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
              >
                {/* Left Layer: ProLuce Dark-Light Glareless Optics */}
                <div
                  className="absolute inset-0 bg-[#07090e] flex items-center justify-center p-8 select-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  {/* Deep beam projection */}
                  <div
                    className="absolute top-0 w-80 h-full pointer-events-none opacity-85"
                    style={{
                      background: "conic-gradient(from 180deg at 50% 0%, rgba(255, 230, 180, 0.5) 0deg, rgba(255, 180, 100, 0) 32deg, transparent 45deg, transparent 315deg, rgba(255, 180, 100, 0) 328deg, rgba(255, 230, 180, 0.5) 360deg)",
                    }}
                  />
                  <div className="absolute bottom-8 left-6 sm:left-10 text-left z-10 max-w-xs sm:max-w-sm space-y-2.5">
                    <Badge variant="outline" className="bg-emerald-950/80 border-emerald-500/40 text-emerald-300 font-mono text-xs">
                      <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                      ProLuce Cutoff: UGR &lt; 12
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-display font-normal text-white">Dark-Light Precision</h3>
                    <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                      Diode recessed 45mm behind black micro-faceted baffle. Zero direct glare to the eye.
                    </p>
                  </div>
                </div>

                {/* Right Layer: Standard Downlight Glare */}
                <div
                  className="absolute inset-0 bg-neutral-900 flex items-center justify-center p-8 select-none"
                  style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                >
                  <div
                    className="absolute top-4 w-96 h-80 rounded-full bg-white/20 blur-[80px] pointer-events-none"
                  />
                  <div className="absolute bottom-8 right-6 sm:right-10 text-right z-10 max-w-xs sm:max-w-sm space-y-2.5">
                    <Badge variant="outline" className="bg-rose-950/80 border-rose-500/40 text-rose-300 font-mono text-xs">
                      ✕ Conventional Downlight: UGR &gt; 25
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-display font-normal text-neutral-200">Exposed Ceiling Glare</h3>
                    <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                      Shallow diffuser creates peripheral flare, visual fatigue, and uneven ceiling hot-spots.
                    </p>
                  </div>
                </div>

                {/* Draggable Divider Line with Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] z-30 transition-none pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-neutral-900 transition-transform group-hover:scale-110">
                    <MoveHorizontal className="h-4 w-4" />
                  </div>
                </div>

                {/* Hint label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <Badge variant="outline" className="bg-black/80 border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300 backdrop-blur-md">
                    Drag slider or use ← → arrow keys
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Precision Controls and Quick Telemetry */}
          <div className="mt-6 flex items-center justify-between gap-4 p-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md shadow-xs">
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
              <Eye className="h-4 w-4 text-neutral-300" />
              Direct Slider Position:
            </span>
            <div className="w-48 sm:w-64">
              <Slider
                value={[sliderPosition]}
                onValueChange={(val) => {
                  const nextVal = Array.isArray(val) ? val[0] : typeof val === "number" ? val : 50;
                  setSliderPosition(nextVal);
                }}
                min={5}
                max={95}
                step={1}
                className="cursor-pointer"
              />
            </div>
            <span className="text-xs font-mono text-white font-medium">{Math.round(sliderPosition)}% ProLuce</span>
          </div>

          {/* Bottom Quick Spec Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <Card className="border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md p-5 rounded-2xl hover:border-neutral-700 transition-colors shadow-xs">
              <CardContent className="p-0">
                <p className="text-3xl font-semibold font-mono text-emerald-400">&lt; 12</p>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Unified Glare Rating</p>
              </CardContent>
            </Card>
            <Card className="border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md p-5 rounded-2xl hover:border-neutral-700 transition-colors shadow-xs">
              <CardContent className="p-0">
                <p className="text-3xl font-semibold font-mono text-amber-300">Ra ≥ 98</p>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">True Color Fidelity (R9 &gt; 94)</p>
              </CardContent>
            </Card>
            <Card className="border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md p-5 rounded-2xl hover:border-neutral-700 transition-colors shadow-xs">
              <CardContent className="p-0">
                <p className="text-3xl font-semibold font-mono text-sky-300">0.01%</p>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Deep Hybrid Dimming</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

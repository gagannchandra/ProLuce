"use client";

import { useState } from "react";
import Link from "next/link";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileSpreadsheet,
  Download,
  Box,
  Cpu,
  Ruler,
  ChevronRight,
  ClipboardList,
  FolderDown,
  CheckCircle2,
} from "lucide-react";

export default function SpecifierSuite() {
  const { totalFixturesCount, openDrawer, exportCsv, items } = useSpecSchedule();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const triggerMockDownload = (formatName: string) => {
    setDownloadSuccess(formatName);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <section className="relative bg-background text-foreground py-24 sm:py-32 border-t border-border overflow-hidden transition-colors duration-300">
      {/* Background architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#f4f0e6]/10 dark:bg-[#f4f0e6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-card text-foreground text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] font-medium mb-3 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-stone-400" />
              <span>Architectural Engineering Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight">
              Specifier &amp; <span className="font-serif italic text-muted-foreground">BIM Suite</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed font-light">
              Complete engineering infrastructure for lighting designers, MEP consultants, and specifiers. Download verified photometric packages, LOD 350 BIM models, and generate turnkey project schedules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={openDrawer}
              className="bg-card hover:bg-muted border border-border text-foreground font-mono text-xs uppercase tracking-wider py-5 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <ClipboardList className="w-4 h-4 text-stone-400" />
              <span>Spec Schedule ({totalFixturesCount})</span>
            </Button>
          </div>
        </div>

        {/* 3-Column Engineering Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {/* Card 1: Photometric Data Package */}
          <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 flex flex-col justify-between hover:border-stone-400 transition-all group backdrop-blur-sm shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-foreground dark:text-[#f4f0e6] mb-5 sm:mb-6 group-hover:scale-105 transition-transform">
                <FolderDown className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground dark:text-[#f4f0e6] font-medium">
                  CALCULATION READY
                </span>
                <Badge variant="outline" className="text-[10px] font-mono border-border text-muted-foreground">
                  IES / LDT
                </Badge>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">
                Photometric Data Bank
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed font-light mb-5">
                Laboratory-certified IESNA LM-63 and EULUMDAT (.ldt) polar intensity files for DIALux evo, Relux Pro, and AGi32 simulations.
              </p>

              <div className="space-y-2 font-mono text-xs text-muted-foreground bg-surface/80 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-border mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard:</span>
                  <span className="text-foreground font-medium">IESNA LM-79-19</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Formats:</span>
                  <span className="text-foreground font-medium">.IES · .LDT · .ULD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compatibility:</span>
                  <span className="text-foreground font-medium">DIALux evo / Relux</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => triggerMockDownload("IES Photometric Archive")}
              variant="outline"
              className="w-full border-border hover:border-stone-400 bg-card hover:bg-muted text-foreground font-mono text-xs uppercase tracking-wider py-4 flex items-center justify-center gap-2 cursor-pointer shadow-2xs rounded-full touch-manipulation"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              <span>Download Master IES Archive</span>
            </Button>
          </div>

          {/* Card 2: BIM & Revit LOD 350 */}
          <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 flex flex-col justify-between hover:border-stone-400 transition-all group backdrop-blur-sm shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-blue-500 dark:text-blue-400 mb-5 sm:mb-6 group-hover:scale-105 transition-transform">
                <Box className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-medium">
                  MEP INTEGRATION
                </span>
                <Badge variant="outline" className="text-[10px] font-mono border-border text-muted-foreground">
                  LOD 350
                </Badge>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">
                Revit &amp; CAD Models
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed font-light mb-5">
                Native Autodesk Revit .RFA families with embedded electrical connector loads, thermal parameters, clearance envelopes, and 3D DWG blocks.
              </p>

              <div className="space-y-2 font-mono text-xs text-muted-foreground bg-surface/80 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-border mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Detail Level:</span>
                  <span className="text-foreground font-medium">LOD 350 Parametric</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Formats:</span>
                  <span className="text-foreground font-medium">.RFA · .IFC · .DWG · .3DM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Electrical:</span>
                  <span className="text-foreground font-medium">DALI / Phase / 24V</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => triggerMockDownload("Revit LOD 350 BIM Library")}
              variant="outline"
              className="w-full border-border hover:border-blue-500/50 bg-card hover:bg-muted text-foreground font-mono text-xs uppercase tracking-wider py-4 flex items-center justify-center gap-2 cursor-pointer shadow-2xs rounded-full touch-manipulation"
            >
              <Download className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Download Revit BIM Families</span>
            </Button>
          </div>

          {/* Card 3: Custom Extrusion & Milling */}
          <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 flex flex-col justify-between hover:border-stone-400 transition-all group backdrop-blur-sm shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-5 sm:mb-6 group-hover:scale-105 transition-transform">
                <Ruler className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-medium">
                  FABRICATION DESK
                </span>
                <Badge variant="outline" className="text-[10px] font-mono border-border text-muted-foreground">
                  ±0.5mm CUT
                </Badge>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">
                Custom Linear Milling
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed font-light mb-5">
                Millimeter-accurate bespoke aluminum profile cuts, 90° mitered corners, continuous diffuser rolls up to 50m, and pre-wired harness assemblies.
              </p>

              <div className="space-y-2 font-mono text-xs text-muted-foreground bg-surface/80 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-border mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Miter Cuts:</span>
                  <span className="text-foreground font-medium">45° / 90° / Custom Angle</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Continuous Run:</span>
                  <span className="text-foreground font-medium">Up to 50m Seamless</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Finishes:</span>
                  <span className="text-foreground font-medium">Anodized / RAL Matched</span>
                </div>
              </div>
            </div>

            <Link href="/catalogue?category=Linear+Light" className="w-full">
              <Button
                variant="outline"
                className="w-full border-border hover:border-emerald-500/50 bg-card hover:bg-muted text-foreground font-mono text-xs uppercase tracking-wider py-4 flex items-center justify-center gap-2 cursor-pointer shadow-2xs rounded-full touch-manipulation"
              >
                <span>Explore Linear Profiles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Spec Schedule Banner / Callout */}
        <div className="bg-card border border-border rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#f4f0e6]/5 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#f4f0e6]/20 border border-[#e6dfd1]/50 flex items-center justify-center text-foreground dark:text-[#f4f0e6] shrink-0 shadow-lg shadow-black/5 dark:shadow-black/30">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                  Active Project Workspace
                </span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-foreground text-[10px] font-mono font-medium border border-border">
                  {totalFixturesCount} {totalFixturesCount === 1 ? "Fixture" : "Fixtures"} Staged
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-light text-foreground">
                Interactive Lighting Specification Schedule
              </h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl font-light">
                {items.length > 0
                  ? `You have staged ${items.length} unique luminaire configurations. Export clean CSV schedules or open the schedule drawer to refine project tags and quantities.`
                  : "Browse the catalogue, test photometrics in the Optical Lab, and stage fixtures with custom CCT, optics, and mounting options for your tender submittal."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 z-10 w-full md:w-auto">
            {items.length > 0 && (
              <Button
                onClick={exportCsv}
                variant="outline"
                className="flex-1 md:flex-none border-border hover:border-stone-400 bg-card text-foreground font-mono text-xs uppercase tracking-wider py-5 flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Export CSV</span>
              </Button>
            )}

            <Button
              onClick={openDrawer}
              className="flex-1 md:flex-none bg-[#f4f0e6] hover:bg-[#eae4d5] text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold py-5 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>{items.length > 0 ? "Open Schedule Drawer" : "Launch Schedule Desk"}</span>
            </Button>
          </div>
        </div>

        {/* Download Feedback Notification */}
        {downloadSuccess && (
          <div className="fixed bottom-8 right-8 z-50 bg-card border border-emerald-500/60 text-foreground px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-mono text-xs animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <div className="font-semibold text-emerald-600 dark:text-emerald-300">Package Ready</div>
              <div className="text-muted-foreground text-[11px]">{downloadSuccess} prepared for download.</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

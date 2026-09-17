"use client";

import type { ProductCategory, ProductEnvironment } from "@/lib/products";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, RotateCcw } from "lucide-react";

export interface FilterState {
  category: string;
  environment: string;
  cct: string;
  wattage: string;
  voltage: string;
  diameter: string;
  length: string;
  ipRating: string;
  beamAngle: string;
  search: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: "Spot Lights", value: "Spot Light" },
  { label: "Linear Profiles", value: "Linear Light" },
  { label: "Track Lights", value: "Track Light" },
  { label: "Pendant Lights", value: "Pendant Light" },
  { label: "48V Magnetic Series", value: "Magnetic Series" },
  { label: "Tube Magnetic (PTM)", value: "Tube Magnetic" },
  { label: "Outdoor Luminaires", value: "Outdoor Light" },
  { label: "Highbay Industrial", value: "Highbay Light" },
];

const ENVIRONMENTS: { label: string; value: ProductEnvironment }[] = [
  { label: "Indoor Standard", value: "Indoor" },
  { label: "Outdoor Architectural", value: "Outdoor" },
  { label: "Indoor / Outdoor (Wet)", value: "Indoor/Outdoor" },
];

const CCT_OPTIONS = [
  { label: "2700K", sub: "Warm Incandescent", color: "#ffb366" },
  { label: "3000K", sub: "Soft White", color: "#ffc58a" },
  { label: "4000K", sub: "Neutral Architectural", color: "#ffe4c4" },
  { label: "5000K", sub: "Cool Daylight", color: "#f0f4ff" },
  { label: "6000K", sub: "Crisp Daylight", color: "#dbeafe" },
  { label: "6500K", sub: "Cool Sky Daylight", color: "#cce0ff" },
  { label: "Tunable", sub: "Circadian Tunable", color: "linear-gradient(135deg, #ffc58a, #dbeafe)" },
];

const IP_OPTIONS = ["IP20", "IP40", "IP44", "IP65", "IP67", "IP68"];
const BEAM_OPTIONS = ["15°", "24°", "36°", "60°", "100°", "120°", "360°"];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  categoryCounts,
  totalCount,
}: FilterSidebarProps) {
  const hasActiveFilters = Boolean(
    filters.category ||
    filters.environment ||
    filters.cct ||
    filters.wattage ||
    filters.voltage ||
    filters.diameter ||
    filters.length ||
    filters.ipRating ||
    filters.beamAngle ||
    filters.search
  );

  return (
    <aside className="w-full space-y-4 text-xs font-sans select-none">
      {/* Search Input Box */}
      <Card className="p-4 shadow-2xs border border-border/80 bg-card/90 backdrop-blur-xs rounded-2xl">
        <label htmlFor="search-input" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-foreground mb-2">
          Search Fixture / Model
        </label>
        <div className="relative">
          <Input
            id="search-input"
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="e.g. RONA, LENA, HUD, PTM, FLOOD..."
            className="w-full pr-8 text-xs font-mono rounded-xl bg-surface/50 border-border/80 focus-visible:ring-2 focus-visible:ring-amber-500"
          />
          {filters.search ? (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onFilterChange("search", "")}
              className="absolute right-1.5 top-1.5 text-muted-foreground hover:text-foreground h-6 w-6 rounded-full"
              aria-label="Clear search query"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Search className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          )}
        </div>
      </Card>

      {/* Global Reset Bar if active */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between rounded-xl bg-muted/60 border border-border/80 px-3.5 py-2">
          <span className="text-[11px] font-mono text-muted-foreground">Active filter set</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={onReset}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 text-[11px] font-mono font-semibold gap-1 rounded-full px-2.5"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </Button>
        </div>
      )}

      {/* Accordion Filter Groups */}
      <Accordion type="multiple" defaultValue={["categories", "cct", "ip", "beam"]} className="space-y-3">
        {/* 1. Category Section */}
        <AccordionItem value="categories" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Category</span>
              {filters.category && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-1">
            <div
              onClick={() => onFilterChange("category", "")}
              className={`flex items-center justify-between py-1.5 px-3 rounded-full cursor-pointer transition-colors ${
                !filters.category
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              <span>All Categories</span>
              <span className={`text-[10px] font-mono ${!filters.category ? "text-background/80" : "text-muted-foreground"}`}>
                ({totalCount})
              </span>
            </div>

            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.value] || 0;
              const isSelected = filters.category === cat.value;
              return (
                <div
                  key={cat.value}
                  onClick={() => count > 0 && onFilterChange("category", cat.value)}
                  className={`flex items-center justify-between py-1.5 px-3 rounded-full transition-colors ${
                    isSelected
                      ? "bg-amber-500 text-neutral-950 font-semibold cursor-pointer shadow-xs"
                      : count === 0
                      ? "opacity-35 cursor-not-allowed text-muted-foreground"
                      : "text-foreground hover:bg-muted/70 cursor-pointer"
                  }`}
                >
                  <span className="truncate pr-2">{cat.label}</span>
                  <span className={`text-[10px] font-mono shrink-0 ${isSelected ? "text-neutral-900 font-bold" : "text-muted-foreground"}`}>
                    ({count})
                  </span>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        {/* 2. CCT Swatches Section */}
        <AccordionItem value="cct" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Color Temp (CCT)</span>
              {filters.cct && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="grid grid-cols-2 gap-2">
              {CCT_OPTIONS.map((c) => {
                const isSelected = filters.cct === c.label;
                return (
                  <Button
                    key={c.label}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFilterChange("cct", isSelected ? "" : c.label)}
                    className={`h-auto py-2 px-3 justify-start text-left gap-2 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-500 text-neutral-950 hover:bg-amber-600 font-semibold border-none shadow-xs"
                        : "border-border/80 hover:border-amber-500/40 hover:bg-accent"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0 border border-black/20 shadow-2xs"
                      style={{ background: c.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold font-mono leading-none">{c.label}</div>
                      <div className={`text-[9px] truncate mt-0.5 ${isSelected ? "text-neutral-900" : "text-muted-foreground"}`}>
                        {c.sub}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Ingress Protection (IP) Section */}
        <AccordionItem value="ip" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Ingress Protection (IP)</span>
              {filters.ipRating && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {IP_OPTIONS.map((ip) => {
                const isSelected = filters.ipRating === ip;
                return (
                  <Button
                    key={ip}
                    variant={isSelected ? "default" : "outline"}
                    size="xs"
                    onClick={() => onFilterChange("ipRating", isSelected ? "" : ip)}
                    className={`font-mono text-[11px] font-semibold rounded-full px-3.5 transition-all ${
                      isSelected
                        ? "bg-amber-500 text-neutral-950 hover:bg-amber-600 border-none shadow-xs"
                        : "border-border/80 hover:border-amber-500/40 hover:bg-accent"
                    }`}
                  >
                    {ip}
                  </Button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. Beam Angles Section */}
        <AccordionItem value="beam" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Beam Angles</span>
              {filters.beamAngle && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="grid grid-cols-2 gap-1.5">
              {BEAM_OPTIONS.map((b) => {
                const isSelected = filters.beamAngle === b;
                const deg = parseInt(b.replace("°", "")) || 36;
                const BEAM_SVG_ANGLES = [3, 5, 10, 15, 20, 22, 24, 30, 35, 36, 40, 48, 50, 60];
                const closest = BEAM_SVG_ANGLES.reduce((prev, cur) =>
                  Math.abs(cur - deg) < Math.abs(prev - deg) ? cur : prev
                );
                const padded = String(closest).padStart(2, "0");
                const iconSrc = `/images/beams/beam_${padded}deg_black.svg`;

                return (
                  <Button
                    key={b}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFilterChange("beamAngle", isSelected ? "" : b)}
                    className={`justify-start gap-2 h-9 px-3 rounded-full font-mono text-xs transition-all ${
                      isSelected
                        ? "bg-amber-500 text-neutral-950 hover:bg-amber-600 font-semibold border-none shadow-xs"
                        : "border-border/80 hover:border-amber-500/40 hover:bg-accent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={iconSrc}
                      alt=""
                      aria-hidden="true"
                      className={`h-5 w-5 object-contain shrink-0 ${isSelected ? "brightness-0" : "dark:invert"}`}
                    />
                    <span>{b}</span>
                  </Button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Environment Section */}
        <AccordionItem value="environment" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Environment</span>
              {filters.environment && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-1">
            <div
              onClick={() => onFilterChange("environment", "")}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-full cursor-pointer transition-colors ${
                !filters.environment ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              <span>All Environments</span>
            </div>

            {ENVIRONMENTS.map((env) => {
              const isSelected = filters.environment === env.value;
              return (
                <div
                  key={env.value}
                  onClick={() => onFilterChange("environment", env.value)}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-full cursor-pointer transition-colors ${
                    isSelected ? "bg-amber-500 text-neutral-950 font-semibold shadow-xs" : "text-foreground hover:bg-muted/70"
                  }`}
                >
                  <span>{env.label}</span>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        {/* 6. Electrical (Wattage & Voltage) */}
        <AccordionItem value="electrical" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Wattage & Voltage</span>
              {(filters.wattage || filters.voltage) && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-3">
            <div>
              <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground mb-1.5">
                Wattage Specification
              </label>
              <select
                value={filters.wattage}
                onChange={(e) => onFilterChange("wattage", e.target.value)}
                className="w-full text-xs font-mono rounded-xl border border-border/80 bg-surface/50 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <option value="">All Wattages</option>
                <option value="6W">6W Low Output</option>
                <option value="10W">10W Standard Spot</option>
                <option value="12W">12W High Output</option>
                <option value="15W">15W / 15W/m Continuous</option>
                <option value="20W">20W / 20W/m</option>
                <option value="24W">24W Commercial</option>
                <option value="36W">36W Projector</option>
                <option value="60W">60W High Power</option>
                <option value="100W">100W–200W Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground mb-1.5">
                Input Voltage System
              </label>
              <select
                value={filters.voltage}
                onChange={(e) => onFilterChange("voltage", e.target.value)}
                className="w-full text-xs font-mono rounded-xl border border-border/80 bg-surface/50 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <option value="">All Voltage Systems</option>
                <option value="AC">AC 220–240V Mains</option>
                <option value="48V">DC 48V Low Voltage (Magnetic)</option>
                <option value="24V">DC 24V Constant Voltage</option>
              </select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 7. Dimensions & Cutouts */}
        <AccordionItem value="dimensions" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center gap-2">
              <span>Dimensions & Cutout</span>
              {(filters.diameter || filters.length) && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-3">
            <div>
              <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground mb-1.5">
                Ceiling Cutout (mm)
              </label>
              <select
                value={filters.diameter}
                onChange={(e) => onFilterChange("diameter", e.target.value)}
                className="w-full text-xs font-mono rounded-xl border border-border/80 bg-surface/50 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <option value="">All Cutouts</option>
                <option value="75">Ø75mm Cutout (LENA75)</option>
                <option value="82">Ø82mm Cutout</option>
                <option value="83">Ø83mm Cutout</option>
                <option value="85">Ø85mm Outer</option>
                <option value="230">Ø230mm Flood</option>
                <option value="Customizable">Customizable Profile</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground mb-1.5">
                Profile Length (mm)
              </label>
              <select
                value={filters.length}
                onChange={(e) => onFilterChange("length", e.target.value)}
                className="w-full text-xs font-mono rounded-xl border border-border/80 bg-surface/50 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <option value="">All Lengths</option>
                <option value="1000">1000mm (1.0m)</option>
                <option value="1500">1500mm (1.5m)</option>
                <option value="2000">2000mm (2.0m)</option>
                <option value="Custom">Custom Architectural Cut</option>
              </select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

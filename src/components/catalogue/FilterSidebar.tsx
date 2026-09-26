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
import { Search, X, RotateCcw, Check } from "lucide-react";
import { BeamAngleIcon } from "@/components/ui/beam-angle-icon";

export interface FilterState {
  categories: string[];
  environments: string[];
  ccts: string[];
  wattages: string[];
  voltages: string[];
  diameters: string[];
  lengths: string[];
  ipRatings: string[];
  beamAngles: string[];
  search: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onToggleFilter: <K extends keyof FilterState>(key: K, value: string) => void;
  onClearFilterGroup: <K extends keyof FilterState>(key: K) => void;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  onCloseMobile?: () => void;
  filteredCount?: number;
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

const WATTAGE_OPTIONS = [
  { value: "6W", label: "6W Low Output" },
  { value: "10W", label: "10W Standard" },
  { value: "12W", label: "12W High Output" },
  { value: "15W", label: "15W / 15W/m Continuous" },
  { value: "20W", label: "20W / 20W/m" },
  { value: "24W", label: "24W Commercial" },
  { value: "36W", label: "36W Projector" },
  { value: "60W", label: "60W High Power" },
  { value: "100W", label: "100W–200W Industrial" },
];

const VOLTAGE_OPTIONS = [
  { value: "AC", label: "AC 220–240V Mains" },
  { value: "48V", label: "DC 48V Low Voltage (Magnetic)" },
  { value: "24V", label: "DC 24V Constant Voltage" },
];

const CUTOUT_OPTIONS = [
  { value: "75", label: "Ø75mm Cutout (LENA75)" },
  { value: "82", label: "Ø82mm Cutout" },
  { value: "83", label: "Ø83mm Cutout" },
  { value: "85", label: "Ø85mm Outer" },
  { value: "230", label: "Ø230mm Flood" },
  { value: "Customizable", label: "Customizable Profile" },
];

const LENGTH_OPTIONS = [
  { value: "1000", label: "1000mm (1.0m)" },
  { value: "1500", label: "1500mm (1.5m)" },
  { value: "2000", label: "2000mm (2.0m)" },
  { value: "Custom", label: "Custom Architectural Cut" },
];

export default function FilterSidebar({
  filters,
  onToggleFilter,
  onClearFilterGroup,
  onFilterChange,
  onReset,
  categoryCounts,
  totalCount,
  onCloseMobile,
  filteredCount,
}: FilterSidebarProps) {
  const hasActiveFilters = Boolean(
    filters.categories.length > 0 ||
    filters.environments.length > 0 ||
    filters.ccts.length > 0 ||
    filters.wattages.length > 0 ||
    filters.voltages.length > 0 ||
    filters.diameters.length > 0 ||
    filters.lengths.length > 0 ||
    filters.ipRatings.length > 0 ||
    filters.beamAngles.length > 0 ||
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
            className="w-full pr-8 text-xs font-mono rounded-xl bg-surface/50 border-border/80 focus-visible:ring-2 focus-visible:ring-stone-400"
          />
          {filters.search ? (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onFilterChange("search", "")}
              className="absolute right-1.5 top-1.5 text-muted-foreground hover:text-foreground h-6 w-6 rounded-full cursor-pointer"
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
            className="text-destructive hover:text-destructive hover:bg-destructive/10 text-[11px] font-mono font-semibold gap-1 rounded-full px-2.5 cursor-pointer"
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
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Category</span>
                {filters.categories.length > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.categories.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-1">
            {filters.categories.length > 0 && (
              <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-border/40">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filters.categories.length} category selected (Multi-select)
                </span>
                <button
                  type="button"
                  onClick={() => onClearFilterGroup("categories")}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => onClearFilterGroup("categories")}
              className={`w-full flex items-center justify-between py-2 px-3 rounded-full text-left cursor-pointer transition-all ${
                filters.categories.length === 0
                  ? "filter-item-selected font-bold"
                  : "filter-item-unselected"
              }`}
            >
              <span className="text-xs">All Categories</span>
              <span className={`text-[10px] font-mono ${filters.categories.length === 0 ? "text-zinc-950 font-bold" : "text-muted-foreground"}`}>
                ({totalCount})
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.value] || 0;
              const isSelected = filters.categories.includes(cat.value);
              return (
                <button
                  key={cat.value}
                  type="button"
                  disabled={count === 0}
                  onClick={() => count > 0 && onToggleFilter("categories", cat.value)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-full text-left transition-all ${
                    isSelected
                      ? "filter-item-selected cursor-pointer"
                      : count === 0
                      ? "opacity-35 cursor-not-allowed text-muted-foreground"
                      : "filter-item-unselected cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 stroke-[3] text-zinc-950" />}
                    <span className={`truncate text-xs ${isSelected ? "font-bold text-zinc-950" : "font-normal text-foreground"}`}>{cat.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono shrink-0 ${isSelected ? "text-zinc-950 font-bold" : "text-muted-foreground"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        {/* 2. CCT Swatches Section */}
        <AccordionItem value="cct" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Color Temp (CCT)</span>
                {filters.ccts.length > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.ccts.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            {filters.ccts.length > 0 && (
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filters.ccts.length} color temp selected (Multi-select)
                </span>
                <button
                  type="button"
                  onClick={() => onClearFilterGroup("ccts")}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                >
                  Clear ({filters.ccts.length})
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {CCT_OPTIONS.map((c) => {
                const isSelected = filters.ccts.includes(c.label);
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => onToggleFilter("ccts", c.label)}
                    className={`h-auto py-2 px-3 justify-start text-left flex items-center gap-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "filter-pill-selected"
                        : "filter-pill-unselected"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full shrink-0 border border-black/20 shadow-xs"
                      style={{ background: c.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-bold font-mono leading-none ${isSelected ? "text-zinc-950" : "text-foreground"}`}>{c.label}</span>
                        {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 ml-1 shrink-0" />}
                      </div>
                      <div className={`text-[9px] truncate mt-0.5 ${isSelected ? "text-zinc-800 font-medium" : "text-muted-foreground"}`}>
                        {c.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Ingress Protection (IP) Section */}
        <AccordionItem value="ip" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Ingress Protection (IP)</span>
                {filters.ipRatings.length > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.ipRatings.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            {filters.ipRatings.length > 0 && (
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filters.ipRatings.length} IP rating selected (Multi-select)
                </span>
                <button
                  type="button"
                  onClick={() => onClearFilterGroup("ipRatings")}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                >
                  Clear ({filters.ipRatings.length})
                </button>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {IP_OPTIONS.map((ip) => {
                const isSelected = filters.ipRatings.includes(ip);
                return (
                  <button
                    key={ip}
                    type="button"
                    onClick={() => onToggleFilter("ipRatings", ip)}
                    className={`font-mono text-xs rounded-full px-3.5 py-1.5 border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "filter-pill-selected"
                        : "filter-pill-unselected"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 shrink-0" />}
                    <span className={isSelected ? "text-zinc-950 font-bold" : "text-foreground"}>{ip}</span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. Beam Angles Section */}
        <AccordionItem value="beam" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Beam Angles</span>
                {filters.beamAngles.length > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.beamAngles.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            {filters.beamAngles.length > 0 && (
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filters.beamAngles.length} beam angle selected (Multi-select)
                </span>
                <button
                  type="button"
                  onClick={() => onClearFilterGroup("beamAngles")}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                >
                  Clear ({filters.beamAngles.length})
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-1.5">
              {BEAM_OPTIONS.map((b) => {
                const isSelected = filters.beamAngles.includes(b);

                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => onToggleFilter("beamAngles", b)}
                    className={`justify-start flex items-center gap-2 h-9 px-3 rounded-full font-mono text-xs border transition-all cursor-pointer ${
                      isSelected
                        ? "filter-pill-selected"
                        : "filter-pill-unselected"
                    }`}
                  >
                    <BeamAngleIcon
                      angle={b}
                      isSelected={isSelected}
                      className="h-4 w-4 shrink-0"
                    />
                    <span className={`flex-1 text-left ${isSelected ? "text-zinc-950 font-bold" : "text-foreground"}`}>{b}</span>
                    {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Environment Section */}
        <AccordionItem value="environment" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Environment</span>
                {filters.environments.length > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.environments.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-1">
            {filters.environments.length > 0 && (
              <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-border/40">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filters.environments.length} selected (Multi-select)
                </span>
                <button
                  type="button"
                  onClick={() => onClearFilterGroup("environments")}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => onClearFilterGroup("environments")}
              className={`w-full flex items-center justify-between py-2 px-3 rounded-full text-left cursor-pointer transition-all ${
                filters.environments.length === 0
                  ? "filter-item-selected font-bold"
                  : "filter-item-unselected"
              }`}
            >
              <span className="text-xs">All Environments</span>
            </button>

            {ENVIRONMENTS.map((env) => {
              const isSelected = filters.environments.includes(env.value);
              return (
                <button
                  key={env.value}
                  type="button"
                  onClick={() => onToggleFilter("environments", env.value)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-full text-left transition-all cursor-pointer ${
                    isSelected
                      ? "filter-item-selected"
                      : "filter-item-unselected"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3] text-zinc-950 shrink-0" />}
                    <span className={`text-xs ${isSelected ? "text-zinc-950 font-bold" : "text-foreground font-normal"}`}>{env.label}</span>
                  </div>
                </button>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        {/* 6. Electrical (Wattage & Voltage) */}
        <AccordionItem value="electrical" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Wattage & Voltage</span>
                {(filters.wattages.length > 0 || filters.voltages.length > 0) && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.wattages.length + filters.voltages.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground">
                  Wattage Specification
                </label>
                {filters.wattages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onClearFilterGroup("wattages")}
                    className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                  >
                    Clear ({filters.wattages.length})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {WATTAGE_OPTIONS.map((w) => {
                  const isSelected = filters.wattages.includes(w.value);
                  return (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => onToggleFilter("wattages", w.value)}
                      className={`font-mono text-xs rounded-lg px-2.5 py-1.5 h-auto border flex items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? "filter-pill-selected"
                          : "filter-pill-unselected"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 shrink-0" />}
                      <span className={isSelected ? "text-zinc-950 font-bold" : "text-foreground"}>{w.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground">
                  Input Voltage System
                </label>
                {filters.voltages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onClearFilterGroup("voltages")}
                    className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                  >
                    Clear ({filters.voltages.length})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VOLTAGE_OPTIONS.map((v) => {
                  const isSelected = filters.voltages.includes(v.value);
                  return (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => onToggleFilter("voltages", v.value)}
                      className={`font-mono text-xs rounded-lg px-2.5 py-1.5 h-auto border flex items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? "filter-pill-selected"
                          : "filter-pill-unselected"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 shrink-0" />}
                      <span className={isSelected ? "text-zinc-950 font-bold" : "text-foreground"}>{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 7. Dimensions & Cutouts */}
        <AccordionItem value="dimensions" className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs px-4 py-0 shadow-2xs">
          <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-foreground hover:no-underline py-3.5">
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span>Dimensions & Cutout</span>
                {(filters.diameters.length > 0 || filters.lengths.length > 0) && (
                  <span className="flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full bg-[#f4f0e6] text-neutral-950 font-mono text-[10px] font-bold shadow-xs">
                    {filters.diameters.length + filters.lengths.length}
                  </span>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground">
                  Ceiling Cutout (mm)
                </label>
                {filters.diameters.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onClearFilterGroup("diameters")}
                    className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                  >
                    Clear ({filters.diameters.length})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CUTOUT_OPTIONS.map((c) => {
                  const isSelected = filters.diameters.includes(c.value);
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => onToggleFilter("diameters", c.value)}
                      className={`font-mono text-xs rounded-lg px-2.5 py-1.5 h-auto border flex items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? "filter-pill-selected"
                          : "filter-pill-unselected"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 shrink-0" />}
                      <span className={isSelected ? "text-zinc-950 font-bold" : "text-foreground"}>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase font-semibold text-muted-foreground">
                  Profile Length (mm)
                </label>
                {filters.lengths.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onClearFilterGroup("lengths")}
                    className="text-[10px] font-mono text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                  >
                    Clear ({filters.lengths.length})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LENGTH_OPTIONS.map((l) => {
                  const isSelected = filters.lengths.includes(l.value);
                  return (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => onToggleFilter("lengths", l.value)}
                      className={`font-mono text-xs rounded-lg px-2.5 py-1.5 h-auto border flex items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? "filter-pill-selected"
                          : "filter-pill-unselected"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3] text-zinc-950 shrink-0" />}
                      <span className={isSelected ? "text-zinc-950 font-bold" : "text-foreground"}>{l.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sticky Mobile Apply / Reset Bar */}
      {onCloseMobile && (
        <div className="sticky bottom-0 inset-x-0 pt-4 pb-2 mt-6 bg-card border-t border-border flex items-center gap-2">
          <Button
            onClick={onCloseMobile}
            className="flex-1 font-sans text-xs uppercase tracking-[0.14em] rounded-full h-11 bg-[#f4f0e6] hover:bg-[#eae4d5] text-neutral-950 font-bold shadow-md cursor-pointer touch-manipulation border-none"
          >
            Apply Filters {filteredCount !== undefined ? `(${filteredCount} Fixtures)` : ""}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onReset}
              className="font-sans text-xs uppercase tracking-[0.14em] font-medium rounded-full h-11 px-5 cursor-pointer touch-manipulation border-border hover:bg-accent"
            >
              Reset
            </Button>
          )}
        </div>
      )}
    </aside>
  );
}

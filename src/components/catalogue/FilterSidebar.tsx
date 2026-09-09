"use client";

import { useState } from "react";
import type { ProductCategory, ProductEnvironment } from "@/lib/products";

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
  // Collapsible section state
  const [openSections, setOpenSections] = useState({
    categories: true,
    environment: true,
    cct: true,
    ip: true,
    beam: true,
    electrical: false,
    dimensions: false,
  });

  function toggleSection(sec: keyof typeof openSections) {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  }

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
      {/* Search Input Box with Focus State */}
      <div className="rounded-xl border border-border bg-white p-4 shadow-xs">
        <label htmlFor="search-input" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-900 mb-2">
          Search Fixture / Model
        </label>
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="e.g. RONA, LENA, HUD, PTM, FLOOD..."
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-neutral-900 outline-none transition-all placeholder:text-muted focus:border-neutral-950 focus:bg-white focus:ring-1 focus:ring-neutral-950"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange("search", "")}
              className="absolute right-2.5 top-2 text-muted hover:text-neutral-950"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Global Reset Bar if active */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between rounded-lg bg-neutral-100 border border-neutral-200 px-3.5 py-2">
          <span className="text-[11px] font-mono text-neutral-600">Filters applied</span>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-semibold text-red-600 hover:text-red-800 hover:underline"
          >
            Reset All
          </button>
        </div>
      )}

      {/* 1. Category Section */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("categories")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.categories}
        >
          <div className="flex items-center gap-2">
            <span>Category</span>
            {filters.category && (
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
            )}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.categories ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.categories && (
          <div className="px-4 pb-4 space-y-1 border-t border-border/50 pt-2">
            <label className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${!filters.category ? "bg-neutral-900 text-white font-medium" : "text-neutral-700 hover:bg-surface"}`}>
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category}
                  onChange={() => onFilterChange("category", "")}
                  className="sr-only"
                />
                <span>All Categories</span>
              </div>
              <span className={`text-[10px] font-mono ${!filters.category ? "text-neutral-300" : "text-muted"}`}>
                ({totalCount})
              </span>
            </label>

            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.value] || 0;
              const isSelected = filters.category === cat.value;
              return (
                <label
                  key={cat.value}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-neutral-900 text-white font-medium"
                      : count === 0
                      ? "opacity-35 cursor-not-allowed text-neutral-400"
                      : "text-neutral-700 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="category"
                      checked={isSelected}
                      onChange={() => onFilterChange("category", cat.value)}
                      disabled={count === 0}
                      className="sr-only"
                    />
                    <span>{cat.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-neutral-300" : "text-muted"}`}>
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. CCT Swatches Section */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("cct")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.cct}
        >
          <div className="flex items-center gap-2">
            <span>Color Temp (CCT)</span>
            {filters.cct && <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.cct ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.cct && (
          <div className="px-4 pb-4 border-t border-border/50 pt-3">
            <div className="grid grid-cols-2 gap-2">
              {CCT_OPTIONS.map((c) => {
                const isSelected = filters.cct === c.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => onFilterChange("cct", isSelected ? "" : c.label)}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                      isSelected
                        ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                        : "border-border bg-surface hover:border-neutral-300 text-neutral-800"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0 border border-black/20"
                      style={{ background: c.color }}
                    />
                    <div>
                      <div className="text-[11px] font-bold font-mono">{c.label}</div>
                      <div className={`text-[9px] truncate max-w-[85px] ${isSelected ? "text-neutral-300" : "text-muted"}`}>
                        {c.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. IP Rating Badge Section */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("ip")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.ip}
        >
          <div className="flex items-center gap-2">
            <span>Ingress Protection (IP)</span>
            {filters.ipRating && <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.ip ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.ip && (
          <div className="px-4 pb-4 border-t border-border/50 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {IP_OPTIONS.map((ip) => {
                const isSelected = filters.ipRating === ip;
                return (
                  <button
                    key={ip}
                    type="button"
                    onClick={() => onFilterChange("ipRating", isSelected ? "" : ip)}
                    className={`rounded-md px-3 py-1.5 text-[11px] font-mono font-semibold transition-all border ${
                      isSelected
                        ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                        : "border-border bg-surface text-neutral-700 hover:border-neutral-400 hover:bg-white"
                    }`}
                  >
                    {ip}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Beam Angles Section */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("beam")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.beam}
        >
          <div className="flex items-center gap-2">
            <span>Beam Angles</span>
            {filters.beamAngle && <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.beam ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.beam && (
          <div className="px-4 pb-4 border-t border-border/50 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {BEAM_OPTIONS.map((b) => {
                const isSelected = filters.beamAngle === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => onFilterChange("beamAngle", isSelected ? "" : b)}
                    className={`rounded-md px-2.5 py-1.5 text-[11px] font-mono font-medium transition-all border ${
                      isSelected
                        ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                        : "border-border bg-surface text-neutral-700 hover:border-neutral-400 hover:bg-white"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. Environment Section */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("environment")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.environment}
        >
          <div className="flex items-center gap-2">
            <span>Environment</span>
            {filters.environment && <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.environment ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.environment && (
          <div className="px-4 pb-4 border-t border-border/50 pt-2 space-y-1">
            <label className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${!filters.environment ? "bg-neutral-900 text-white font-medium" : "text-neutral-700 hover:bg-surface"}`}>
              <input
                type="radio"
                name="env"
                checked={!filters.environment}
                onChange={() => onFilterChange("environment", "")}
                className="sr-only"
              />
              <span>All Environments</span>
            </label>

            {ENVIRONMENTS.map((env) => {
              const isSelected = filters.environment === env.value;
              return (
                <label
                  key={env.value}
                  className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-neutral-900 text-white font-medium" : "text-neutral-700 hover:bg-surface"}`}
                >
                  <input
                    type="radio"
                    name="env"
                    checked={isSelected}
                    onChange={() => onFilterChange("environment", env.value)}
                    className="sr-only"
                  />
                  <span>{env.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Electrical & Control (Wattage & Voltage Dropdowns) */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("electrical")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.electrical}
        >
          <div className="flex items-center gap-2">
            <span>Wattage & Voltage</span>
            {(filters.wattage || filters.voltage) && <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.electrical ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.electrical && (
          <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                Wattage Specification
              </label>
              <select
                value={filters.wattage}
                onChange={(e) => onFilterChange("wattage", e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-neutral-900 focus:bg-white"
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
              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                Input Voltage System
              </label>
              <select
                value={filters.voltage}
                onChange={(e) => onFilterChange("voltage", e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-neutral-900 focus:bg-white"
              >
                <option value="">All Voltage Systems</option>
                <option value="AC">AC 220–240V Mains</option>
                <option value="48V">DC 48V Low Voltage (Magnetic)</option>
                <option value="24V">DC 24V Constant Voltage</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 7. Dimensions & Cutouts */}
      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("dimensions")}
          className="flex w-full items-center justify-between p-4 text-left font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:bg-surface/60 transition-colors"
          aria-expanded={openSections.dimensions}
        >
          <div className="flex items-center gap-2">
            <span>Dimensions & Cutout</span>
            {(filters.diameter || filters.length) && <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />}
          </div>
          <span className={`text-muted transition-transform duration-200 ${openSections.dimensions ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>

        {openSections.dimensions && (
          <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                Ceiling Cutout (mm)
              </label>
              <select
                value={filters.diameter}
                onChange={(e) => onFilterChange("diameter", e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-neutral-900 focus:bg-white"
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
              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                Profile Length (mm)
              </label>
              <select
                value={filters.length}
                onChange={(e) => onFilterChange("length", e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-neutral-900 focus:bg-white"
              >
                <option value="">All Lengths</option>
                <option value="1000">1000mm (1.0m)</option>
                <option value="1500">1500mm (1.5m)</option>
                <option value="2000">2000mm (2.0m)</option>
                <option value="Custom">Custom Architectural Cut</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

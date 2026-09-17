"use client";

import type { FilterState } from "./FilterSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveFilter: <K extends keyof FilterState>(key: K, value?: string) => void;
  onResetAll: () => void;
  filteredCount: number;
  totalCount: number;
}

export default function ActiveFilterChips({
  filters,
  onRemoveFilter,
  onResetAll,
  filteredCount,
  totalCount,
}: ActiveFilterChipsProps) {
  const activeChips: { id: string; key: keyof FilterState; label: string; value: string; rawValue: string }[] = [];

  filters.categories.forEach((cat) => {
    activeChips.push({ id: `cat-${cat}`, key: "categories", label: "Category", value: cat, rawValue: cat });
  });

  filters.environments.forEach((env) => {
    activeChips.push({ id: `env-${env}`, key: "environments", label: "Env", value: env, rawValue: env });
  });

  filters.ccts.forEach((cct) => {
    activeChips.push({ id: `cct-${cct}`, key: "ccts", label: "CCT", value: cct, rawValue: cct });
  });

  filters.ipRatings.forEach((ip) => {
    activeChips.push({ id: `ip-${ip}`, key: "ipRatings", label: "IP", value: ip, rawValue: ip });
  });

  filters.beamAngles.forEach((beam) => {
    activeChips.push({ id: `beam-${beam}`, key: "beamAngles", label: "Beam", value: beam, rawValue: beam });
  });

  filters.wattages.forEach((w) => {
    activeChips.push({ id: `watt-${w}`, key: "wattages", label: "Wattage", value: w, rawValue: w });
  });

  filters.voltages.forEach((v) => {
    const display = v === "AC" ? "AC 220–240V" : v === "48V" ? "DC 48V" : v === "24V" ? "DC 24V" : v;
    activeChips.push({ id: `volt-${v}`, key: "voltages", label: "Voltage", value: display, rawValue: v });
  });

  filters.diameters.forEach((d) => {
    const display = d === "Customizable" ? "Custom Cutout" : `Ø${d}mm`;
    activeChips.push({ id: `diam-${d}`, key: "diameters", label: "Cutout", value: display, rawValue: d });
  });

  filters.lengths.forEach((l) => {
    const display = l === "Custom" ? "Custom Length" : `${l}mm`;
    activeChips.push({ id: `len-${l}`, key: "lengths", label: "Length", value: display, rawValue: l });
  });

  if (filters.search) {
    activeChips.push({
      id: "search-q",
      key: "search",
      label: "Query",
      value: `"${filters.search}"`,
      rawValue: filters.search,
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground mr-1">
          Showing <strong className="text-foreground font-semibold">{filteredCount}</strong> of {totalCount} fixtures
        </span>

        {activeChips.map((chip) => (
          <Badge
            key={chip.id}
            variant="secondary"
            className="gap-1.5 py-1 px-3 font-mono text-xs rounded-full border border-border/80 bg-muted/80 text-foreground shadow-2xs hover:border-stone-400 transition-colors"
          >
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">{chip.label}:</span>
            <span className="text-foreground font-semibold">{chip.value}</span>
            <button
              type="button"
              onClick={() => onRemoveFilter(chip.key, chip.rawValue)}
              className="h-3.5 w-3.5 ml-0.5 inline-flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 cursor-pointer"
              aria-label={`Remove filter ${chip.label} ${chip.value}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {activeChips.length > 0 && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onResetAll}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 font-mono text-xs gap-1 rounded-full px-2.5 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all
          </Button>
        )}
      </div>
    </div>
  );
}

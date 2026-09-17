"use client";

import type { FilterState } from "./FilterSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveFilter: <K extends keyof FilterState>(key: K) => void;
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
  const activeChips: { key: keyof FilterState; label: string; value: string }[] = [];

  if (filters.category) activeChips.push({ key: "category", label: "Category", value: filters.category });
  if (filters.environment) activeChips.push({ key: "environment", label: "Env", value: filters.environment });
  if (filters.cct) activeChips.push({ key: "cct", label: "CCT", value: filters.cct });
  if (filters.wattage) activeChips.push({ key: "wattage", label: "Wattage", value: filters.wattage });
  if (filters.voltage) activeChips.push({ key: "voltage", label: "Voltage", value: filters.voltage });
  if (filters.diameter) activeChips.push({ key: "diameter", label: "Diameter", value: `Ø${filters.diameter}` });
  if (filters.length) activeChips.push({ key: "length", label: "Length", value: `${filters.length}mm` });
  if (filters.ipRating) activeChips.push({ key: "ipRating", label: "IP", value: filters.ipRating });
  if (filters.beamAngle) activeChips.push({ key: "beamAngle", label: "Beam", value: filters.beamAngle });
  if (filters.search) activeChips.push({ key: "search", label: "Query", value: `"${filters.search}"` });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground mr-1">
          Showing <strong className="text-foreground font-semibold">{filteredCount}</strong> of {totalCount} fixtures
        </span>

        {activeChips.map((chip) => (
          <Badge
            key={chip.key}
            variant="secondary"
            className="gap-1.5 py-1 px-3 font-mono text-xs rounded-full border border-border/80 bg-muted/80 text-foreground shadow-2xs hover:border-amber-500/40 transition-colors"
          >
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">{chip.label}:</span>
            <span className="text-foreground font-semibold">{chip.value}</span>
            <button
              type="button"
              onClick={() => onRemoveFilter(chip.key)}
              className="h-3.5 w-3.5 ml-0.5 inline-flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
              aria-label={`Remove filter ${chip.label}`}
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
            className="text-destructive hover:text-destructive hover:bg-destructive/10 font-mono text-xs gap-1 rounded-full px-2.5"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all
          </Button>
        )}
      </div>
    </div>
  );
}

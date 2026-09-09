"use client";

import type { FilterState } from "./FilterSidebar";

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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted mr-1">
          Showing <strong className="text-neutral-900 font-semibold">{filteredCount}</strong> of {totalCount} fixtures
        </span>

        {activeChips.map((chip) => (
          <span
            key={chip.key}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-800"
          >
            <span className="text-muted text-[10px] uppercase font-mono">{chip.label}:</span>
            <span>{chip.value}</span>
            <button
              type="button"
              onClick={() => onRemoveFilter(chip.key)}
              className="text-neutral-400 hover:text-neutral-900 ml-0.5"
              aria-label={`Remove filter ${chip.label}`}
            >
              ✕
            </button>
          </span>
        ))}

        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={onResetAll}
            className="text-xs font-medium text-red-600 hover:text-red-800 hover:underline ml-1"
          >
            Reset all
          </button>
        )}
      </div>
    </div>
  );
}

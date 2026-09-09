"use client";

interface ViewModeToggleProps {
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

export default function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-surface p-1 text-xs">
      <button
        type="button"
        onClick={() => onViewModeChange("grid")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${
          viewMode === "grid"
            ? "bg-white text-neutral-950 shadow-xs border border-border/60"
            : "text-muted hover:text-foreground"
        }`}
        aria-label="Switch to Gallery Grid View"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        <span className="hidden sm:inline">Gallery Grid</span>
      </button>

      <button
        type="button"
        onClick={() => onViewModeChange("table")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${
          viewMode === "table"
            ? "bg-white text-neutral-950 shadow-xs border border-border/60"
            : "text-muted hover:text-foreground"
        }`}
        aria-label="Switch to Comparison Table View"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
          <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">Engineering Matrix</span>
      </button>
    </div>
  );
}

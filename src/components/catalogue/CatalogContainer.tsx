"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Product } from "@/lib/products";
import FilterSidebar, { type FilterState } from "./FilterSidebar";
import ActiveFilterChips from "./ActiveFilterChips";
import ViewModeToggle from "./ViewModeToggle";
import CatalogTable from "./CatalogTable";
import ProductCard from "@/components/product/ProductCard";
import QuoteModal from "@/components/product/QuoteModal";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, SearchX, RotateCcw } from "lucide-react";

interface CatalogContainerProps {
  initialProducts: Product[];
}

function extractNumericPower(powerStr?: string): number {
  if (!powerStr) return 0;
  const match = powerStr.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function parseList(param: string | null): string[] {
  if (!param) return [];
  return param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const QUICK_CATEGORIES: { label: string; value: string }[] = [
  { label: "All (99)", value: "" },
  { label: "Spot Lights", value: "Spot Light" },
  { label: "Linear Profiles", value: "Linear Light" },
  { label: "48V Magnetic", value: "Magnetic Series" },
  { label: "Tube Magnetic", value: "Tube Magnetic" },
  { label: "Outdoor IP65/67", value: "Outdoor Light" },
  { label: "Highbay", value: "Highbay Light" },
];

export default function CatalogContainer({ initialProducts }: CatalogContainerProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Read initial filter values from URL supporting multi-value comma lists
  const [filters, setFilters] = useState<FilterState>(() => ({
    categories: parseList(searchParams.get("category") || searchParams.get("categories")),
    environments: parseList(searchParams.get("environment") || searchParams.get("env")),
    ccts: parseList(searchParams.get("cct")),
    wattages: parseList(searchParams.get("wattage")),
    voltages: parseList(searchParams.get("voltage")),
    diameters: parseList(searchParams.get("diameter") || searchParams.get("cutout")),
    lengths: parseList(searchParams.get("length")),
    ipRatings: parseList(searchParams.get("ip") || searchParams.get("ipRating")),
    beamAngles: parseList(searchParams.get("beam") || searchParams.get("beamAngle")),
    search: searchParams.get("q") || searchParams.get("search") || "",
  }));

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortBy, setSortBy] = useState<"catalog" | "name" | "power-asc" | "power-desc">("catalog");
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Debounce search query
  const debouncedSearch = useDebounce(filters.search, 250);

  // Sync state to URL search parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length) params.set("category", filters.categories.join(","));
    if (filters.environments.length) params.set("environment", filters.environments.join(","));
    if (filters.ccts.length) params.set("cct", filters.ccts.join(","));
    if (filters.wattages.length) params.set("wattage", filters.wattages.join(","));
    if (filters.voltages.length) params.set("voltage", filters.voltages.join(","));
    if (filters.diameters.length) params.set("diameter", filters.diameters.join(","));
    if (filters.lengths.length) params.set("length", filters.lengths.join(","));
    if (filters.ipRatings.length) params.set("ip", filters.ipRatings.join(","));
    if (filters.beamAngles.length) params.set("beam", filters.beamAngles.join(","));
    if (debouncedSearch) params.set("q", debouncedSearch);

    const query = params.toString();
    const target = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, "", target);
  }, [filters, debouncedSearch, pathname]);

  function handleToggleFilter<K extends keyof FilterState>(key: K, value: string) {
    if (key === "search") {
      setFilters((prev) => ({ ...prev, search: value }));
      return;
    }
    setFilters((prev) => {
      const list = prev[key] as string[];
      const exists = list.includes(value);
      const updated = exists ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [key]: updated };
    });
  }

  function handleClearFilterGroup<K extends keyof FilterState>(key: K) {
    if (key === "search") {
      setFilters((prev) => ({ ...prev, search: "" }));
      return;
    }
    setFilters((prev) => ({ ...prev, [key]: [] }));
  }

  function handleFilterChange<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleRemoveFilter<K extends keyof FilterState>(key: K, value?: string) {
    if (key === "search" || !value) {
      setFilters((prev) => ({ ...prev, [key]: key === "search" ? "" : [] }));
      return;
    }
    setFilters((prev) => {
      const list = prev[key] as string[];
      return { ...prev, [key]: list.filter((item) => item !== value) };
    });
  }

  function handleResetAll() {
    setFilters({
      categories: [],
      environments: [],
      ccts: [],
      wattages: [],
      voltages: [],
      diameters: [],
      lengths: [],
      ipRatings: [],
      beamAngles: [],
      search: "",
    });
  }

  // Calculate live category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  // Comprehensive multi-selection filtering logic (OR within facets, AND across facets)
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // 1. Categories (OR within categories)
        if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
          return false;
        }

        // 2. Environments (OR within environments)
        if (filters.environments.length > 0 && !filters.environments.includes(p.environment)) {
          return false;
        }

        // 3. CCT (OR within CCTs)
        if (filters.ccts.length > 0) {
          const matchCCT = filters.ccts.some((selectedCct) => {
            if (selectedCct === "Tunable") {
              return p.cct.some(
                (c) =>
                  c.toLowerCase().includes("tunable") ||
                  c.toLowerCase().includes("rgb") ||
                  c.toLowerCase().includes("cct")
              );
            }
            return p.cct.some((c) => c.includes(selectedCct));
          });
          if (!matchCCT) return false;
        }

        // 4. Ingress Protection / IP Rating (OR within IP ratings)
        if (filters.ipRatings.length > 0) {
          const matchIp = filters.ipRatings.some((selectedIp) => p.ipRating.includes(selectedIp));
          if (!matchIp) return false;
        }

        // 5. Beam Angle (OR within beam angles)
        if (filters.beamAngles.length > 0) {
          const matchBeam = filters.beamAngles.some((selectedBeam) =>
            p.beamAngles.some((b) => b.includes(selectedBeam))
          );
          if (!matchBeam) return false;
        }

        // 6. Wattage (OR within wattages)
        if (filters.wattages.length > 0) {
          const matchWatt = filters.wattages.some((w) => {
            const wNum = parseInt(w);
            const pWatt = extractNumericPower(p.power);
            if (pWatt > 0 && !isNaN(wNum) && Math.abs(pWatt - wNum) <= 2) {
              return true;
            }
            return p.power.toLowerCase().includes(w.toLowerCase());
          });
          if (!matchWatt) return false;
        }

        // 7. Input Voltage (OR within voltages)
        if (filters.voltages.length > 0) {
          const matchVolt = filters.voltages.some((v) =>
            p.inputVoltage.toUpperCase().includes(v.toUpperCase())
          );
          if (!matchVolt) return false;
        }

        // 8. Diameter / Cutout (OR within diameters)
        if (filters.diameters.length > 0) {
          const matchDiam = filters.diameters.some((d) => {
            if (p.cutout && p.cutout.includes(d)) return true;
            if (p.dimensions && p.dimensions.includes(d)) return true;
            return false;
          });
          if (!matchDiam) return false;
        }

        // 9. Length (OR within lengths)
        if (filters.lengths.length > 0) {
          const matchLen = filters.lengths.some((l) => p.dimensions && p.dimensions.includes(l));
          if (!matchLen) return false;
        }

        // 10. Free-text search
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase().trim();
          const matchModel = p.model.toLowerCase().includes(q);
          const matchSub = p.subseries ? p.subseries.toLowerCase().includes(q) : false;
          const matchCat = p.category.toLowerCase().includes(q);
          const matchPower = p.power.toLowerCase().includes(q);
          const matchIp = p.ipRating.toLowerCase().includes(q);
          const matchPage =
            `p.${p.catalogPage}`.includes(q) ||
            `page ${p.catalogPage}`.includes(q) ||
            String(p.catalogPage) === q;
          const matchBeam = p.beamAngles.some((b) => b.toLowerCase().includes(q));

          if (!matchModel && !matchSub && !matchCat && !matchPower && !matchIp && !matchPage && !matchBeam) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.model.localeCompare(b.model);
        }
        if (sortBy === "power-asc") {
          const aP = extractNumericPower(a.power);
          const bP = extractNumericPower(b.power);
          return aP - bP;
        }
        if (sortBy === "power-desc") {
          const aP = extractNumericPower(a.power);
          const bP = extractNumericPower(b.power);
          return bP - aP;
        }
        return a.catalogPage - b.catalogPage;
      });
  }, [initialProducts, filters, debouncedSearch, sortBy]);

  return (
    <div className="container-site py-10 md:py-16">
      {/* Glassmorphism Header Title Block */}
      <div className="relative mb-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-6 sm:p-8 overflow-hidden shadow-xs">
        {/* Soft Ambient Light Beam Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4f0e6]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f4f0e6] shadow-[0_0_6px_rgba(244,240,230,0.6)]" />
                Pro-Luce
              </span>
              <span>/</span>
              <span className="text-foreground font-semibold">Architectural Specifier Catalogue</span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-foreground font-display leading-[1.08]">
              Architectural Product Catalogue
            </h1>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed font-sans font-light">
              99 precision luminaires engineered for architectural integration: trimless spotlights, continuous profile extrusions, 48V magnetic rails, and IP67 facade luminaires.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />

            {/* Mobile Sheet Filter Trigger */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden gap-1.5 font-mono text-xs rounded-full cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-xs p-6 overflow-y-auto">
                <SheetHeader className="text-left pb-4 border-b border-border">
                  <SheetTitle className="font-display text-lg uppercase tracking-wider">
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterSidebar
                    filters={filters}
                    onToggleFilter={handleToggleFilter}
                    onClearFilterGroup={handleClearFilterGroup}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetAll}
                    categoryCounts={categoryCounts}
                    totalCount={initialProducts.length}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Quick Category Ribbon */}
      <div className="mb-6 flex items-center justify-between gap-4 overflow-x-auto pb-2 border-b border-border/60 no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          {QUICK_CATEGORIES.map((qc) => {
            const isAll = qc.value === "";
            const isSelected = isAll
              ? filters.categories.length === 0
              : filters.categories.includes(qc.value);

            return (
              <button
                key={qc.label}
                type="button"
                onClick={() => {
                  if (isAll) {
                    handleClearFilterGroup("categories");
                  } else {
                    handleToggleFilter("categories", qc.value);
                  }
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? "filter-pill-selected"
                    : "filter-pill-unselected"
                }`}
              >
                {qc.label}
              </button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono uppercase text-muted-foreground">
            Sort:
          </span>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="h-8 text-xs font-mono w-[180px] rounded-full border-border/80 bg-card/80 backdrop-blur-xs cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="catalog">Catalogue Page Order</SelectItem>
              <SelectItem value="name">Model Name (A–Z)</SelectItem>
              <SelectItem value="power-asc">Wattage (Low to High)</SelectItem>
              <SelectItem value="power-desc">Wattage (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Layout: Sticky Left Sidebar + Product View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <FilterSidebar
            filters={filters}
            onToggleFilter={handleToggleFilter}
            onClearFilterGroup={handleClearFilterGroup}
            onFilterChange={handleFilterChange}
            onReset={handleResetAll}
            categoryCounts={categoryCounts}
            totalCount={initialProducts.length}
          />
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          <ActiveFilterChips
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onResetAll={handleResetAll}
            filteredCount={filteredProducts.length}
            totalCount={initialProducts.length}
          />

          {filteredProducts.length === 0 ? (
            <Card className="border-dashed border-border p-16 text-center bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center space-y-3">
                <SearchX className="h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="text-base font-semibold text-foreground font-display">No architectural fixtures match</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  No products found matching your current filter combination. Try resetting the IP rating or wattage filter.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetAll}
                  className="mt-2 font-mono text-xs uppercase cursor-pointer"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Reset all filters
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpenQuote={setQuoteProduct} />
              ))}
            </div>
          ) : (
            <CatalogTable products={filteredProducts} onOpenQuote={setQuoteProduct} />
          )}
        </div>
      </div>

      {/* Single Product Quote Modal */}
      <QuoteModal
        product={quoteProduct}
        isOpen={Boolean(quoteProduct)}
        onClose={() => setQuoteProduct(null)}
      />
    </div>
  );
}

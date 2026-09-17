"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Product, ProductCategory } from "@/lib/products";
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

  // Read initial filter values from URL
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: searchParams.get("category") || "",
    environment: searchParams.get("environment") || "",
    cct: searchParams.get("cct") || "",
    wattage: searchParams.get("wattage") || "",
    voltage: searchParams.get("voltage") || "",
    diameter: searchParams.get("diameter") || "",
    length: searchParams.get("length") || "",
    ipRating: searchParams.get("ip") || "",
    beamAngle: searchParams.get("beam") || "",
    search: searchParams.get("q") || "",
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
    if (filters.category) params.set("category", filters.category);
    if (filters.environment) params.set("environment", filters.environment);
    if (filters.cct) params.set("cct", filters.cct);
    if (filters.wattage) params.set("wattage", filters.wattage);
    if (filters.voltage) params.set("voltage", filters.voltage);
    if (filters.diameter) params.set("diameter", filters.diameter);
    if (filters.length) params.set("length", filters.length);
    if (filters.ipRating) params.set("ip", filters.ipRating);
    if (filters.beamAngle) params.set("beam", filters.beamAngle);
    if (debouncedSearch) params.set("q", debouncedSearch);

    const query = params.toString();
    const target = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, "", target);
  }, [filters, debouncedSearch, pathname]);

  function handleFilterChange<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleRemoveFilter<K extends keyof FilterState>(key: K) {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  }

  function handleResetAll() {
    setFilters({
      category: "",
      environment: "",
      cct: "",
      wattage: "",
      voltage: "",
      diameter: "",
      length: "",
      ipRating: "",
      beamAngle: "",
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

  // Comprehensive multi-field filtering logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // 1. Category
        if (filters.category && p.category !== filters.category) return false;

        // 2. Environment
        if (filters.environment && p.environment !== filters.environment) return false;

        // 3. CCT
        if (filters.cct && !p.cct.includes(filters.cct)) return false;

        // 4. Ingress Protection (IP Rating)
        if (filters.ipRating && !p.ipRating.includes(filters.ipRating)) return false;

        // 5. Beam Angle
        if (filters.beamAngle && !p.beamAngles.some((b) => b.includes(filters.beamAngle))) return false;

        // 6. Wattage match
        if (filters.wattage) {
          const wNum = parseInt(filters.wattage);
          const pWatt = extractNumericPower(p.power);
          if (pWatt > 0 && Math.abs(pWatt - wNum) > 2) {
            if (!p.power.toLowerCase().includes(filters.wattage.toLowerCase())) {
              return false;
            }
          }
        }

        // 7. Input Voltage
        if (filters.voltage) {
          if (!p.inputVoltage.toUpperCase().includes(filters.voltage.toUpperCase())) {
            return false;
          }
        }

        // 8. Diameter / Cutout
        if (filters.diameter) {
          if (!p.cutout || !p.cutout.includes(filters.diameter)) {
            if (!p.dimensions || !p.dimensions.includes(filters.diameter)) {
              return false;
            }
          }
        }

        // 9. Length
        if (filters.length) {
          if (!p.dimensions || !p.dimensions.includes(filters.length)) {
            return false;
          }
        }

        // 10. Free-text search
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase().trim();
          const matchModel = p.model.toLowerCase().includes(q);
          const matchSub = p.subseries ? p.subseries.toLowerCase().includes(q) : false;
          const matchCat = p.category.toLowerCase().includes(q);
          const matchPower = p.power.toLowerCase().includes(q);
          const matchIp = p.ipRating.toLowerCase().includes(q);
          const matchPage = `p.${p.catalogPage}`.includes(q) || `page ${p.catalogPage}`.includes(q) || String(p.catalogPage) === q;
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
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
                  className="lg:hidden gap-1.5 font-mono text-xs rounded-full"
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
            const isSelected = filters.category === qc.value;
            return (
              <Button
                key={qc.label}
                variant={isSelected ? "default" : "secondary"}
                size="xs"
                onClick={() => handleFilterChange("category", qc.value as ProductCategory)}
                className={`rounded-full px-4 py-1 text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "shadow-sm"
                    : "bg-secondary/60 hover:bg-secondary hover:border-border border border-transparent"
                }`}
              >
                {qc.label}
              </Button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono uppercase text-muted-foreground">
            Sort:
          </span>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="h-8 text-xs font-mono w-[180px] rounded-full border-border/80 bg-card/80 backdrop-blur-xs">
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
                  className="mt-2 font-mono text-xs uppercase"
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

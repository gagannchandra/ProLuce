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

interface CatalogContainerProps {
  initialProducts: Product[];
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

  // Debounce search query to prevent unnecessary re-computations
  const debouncedSearch = useDebounce(filters.search, 250);

  // Sync state to URL search parameters without full page reload
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

  // Apply all parametric filters
  const filteredProducts = useMemo(() => {
    const results = initialProducts.filter((product) => {
      // Debounced Search Query
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase().trim();
        const matchesQuery =
          product.model.toLowerCase().includes(q) ||
          (product.subseries && product.subseries.toLowerCase().includes(q)) ||
          product.category.toLowerCase().includes(q) ||
          product.power.toLowerCase().includes(q) ||
          product.dimensions.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Environment
      if (filters.environment && product.environment !== filters.environment) {
        return false;
      }

      // CCT
      if (filters.cct) {
        const hasCct = product.cct.some((c) =>
          c.toLowerCase().includes(filters.cct.toLowerCase())
        );
        if (!hasCct) return false;
      }

      // Wattage
      if (filters.wattage) {
        const w = filters.wattage.toLowerCase().replace("w", "");
        if (!product.power.toLowerCase().includes(w)) return false;
      }

      // Voltage
      if (filters.voltage) {
        if (filters.voltage === "48V" && !product.inputVoltage.includes("48V")) return false;
        if (filters.voltage === "24V" && !product.inputVoltage.includes("24V")) return false;
        if (filters.voltage === "AC" && !product.inputVoltage.includes("AC") && !product.inputVoltage.includes("220")) return false;
      }

      // Diameter
      if (filters.diameter) {
        const diaMatch =
          (product.cutout && product.cutout.includes(filters.diameter)) ||
          product.dimensions.includes(filters.diameter);
        if (!diaMatch) return false;
      }

      // Length
      if (filters.length) {
        if (!product.dimensions.includes(filters.length)) return false;
      }

      // IP Rating
      if (filters.ipRating && product.ipRating !== filters.ipRating) {
        return false;
      }

      // Beam Angle
      if (filters.beamAngle) {
        const hasBeam = product.beamAngles.some((b) => b.includes(filters.beamAngle));
        if (!hasBeam) return false;
      }

      return true;
    });

    // Sorting logic
    if (sortBy === "name") {
      results.sort((a, b) => a.model.localeCompare(b.model));
    } else if (sortBy === "power-asc" || sortBy === "power-desc") {
      results.sort((a, b) => {
        const pA = parseInt(a.power.replace(/[^0-9]/g, "")) || 0;
        const pB = parseInt(b.power.replace(/[^0-9]/g, "")) || 0;
        return sortBy === "power-asc" ? pA - pB : pB - pA;
      });
    } else {
      // Default: Catalog Page Order
      results.sort((a, b) => a.catalogPage - b.catalogPage);
    }

    return results;
  }, [initialProducts, filters, debouncedSearch, sortBy]);

  return (
    <div className="container-site py-8 md:py-12">
      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted">
            <span>Pro-Luce</span>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Architectural Specifier Catalogue</span>
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-display">
            Architectural Product Catalogue
          </h1>
          <p className="mt-2 text-xs md:text-sm text-muted max-w-2xl leading-relaxed">
            99 precision luminaires engineered for architectural integration: trimless spotlights, continuous profile extrusions, 48V magnetic rails, and IP67 facade luminaires.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-2 text-xs font-semibold text-neutral-900 shadow-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Quick Category Ribbon along the top for 1-click switching */}
      <div className="mb-6 flex items-center justify-between gap-4 overflow-x-auto pb-2 border-b border-border/60 no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          {QUICK_CATEGORIES.map((qc) => {
            const isSelected = filters.category === qc.value;
            return (
              <button
                key={qc.label}
                type="button"
                onClick={() => handleFilterChange("category", qc.value as ProductCategory)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "bg-surface text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {qc.label}
              </button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-[11px] font-mono uppercase text-muted">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "catalog" | "name" | "power-asc" | "power-desc")}
            className="rounded-md border border-border bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 outline-none focus:border-neutral-900"
          >
            <option value="catalog">Catalogue Page Order</option>
            <option value="name">Model Name (A–Z)</option>
            <option value="power-asc">Wattage (Low to High)</option>
            <option value="power-desc">Wattage (High to Low)</option>
          </select>
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
            <div className="rounded-xl border border-dashed border-border p-16 text-center bg-surface">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-900 font-display">No architectural fixtures match</h3>
              <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
                No products found matching your current filter combination. Try resetting the IP rating or wattage filter.
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
              >
                Reset all filters
              </button>
            </div>
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

      {/* Mobile Slide-Over Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 font-display">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-500 hover:text-neutral-900"
              >
                ✕
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetAll}
              categoryCounts={categoryCounts}
              totalCount={initialProducts.length}
            />

            <div className="sticky bottom-0 bg-white pt-4 border-t border-border mt-6">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-md bg-neutral-900 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
              >
                Show {filteredProducts.length} Fixtures
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Product Quote Modal */}
      <QuoteModal
        product={quoteProduct}
        isOpen={Boolean(quoteProduct)}
        onClose={() => setQuoteProduct(null)}
      />
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { products, type Product } from "@/lib/products";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Global shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent state or trigger
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Filter products by search term
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return featured 8 luminaires when query is empty
      return products.slice(0, 8);
    }

    return products
      .filter((p) => {
        const matchModel = p.model.toLowerCase().includes(q);
        const matchSub = p.subseries ? p.subseries.toLowerCase().includes(q) : false;
        const matchCat = p.category.toLowerCase().includes(q);
        const matchPower = p.power.toLowerCase().includes(q);
        const matchIp = p.ipRating.toLowerCase().includes(q);
        const matchPage = `p.${p.catalogPage}`.includes(q) || `page ${p.catalogPage}`.includes(q) || String(p.catalogPage) === q;
        const matchBeam = p.beamAngles.some((b) => b.toLowerCase().includes(q));

        return matchModel || matchSub || matchCat || matchPower || matchIp || matchPage || matchBeam;
      })
      .slice(0, 12);
  }, [query]);

  const navigateToProduct = useCallback(
    (product: Product) => {
      onClose();
      router.push(`/products/${product.slug}`);
    },
    [onClose, router]
  );

  // Keyboard navigation within list
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProducts.length - 1));
      } else if (e.key === "Enter" && filteredProducts[selectedIndex]) {
        e.preventDefault();
        navigateToProduct(filteredProducts[selectedIndex]);
      }
    },
    [filteredProducts, selectedIndex, navigateToProduct]
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search architectural fixtures"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-neutral-200 px-4 py-3.5">
          <svg
            className="h-5 w-5 text-neutral-400 shrink-0 mr-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search fixtures, models (RONA, LEO, HUD...), wattages, or page #..."
            className="w-full bg-transparent text-sm md:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 uppercase">
            <kbd className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50 text-neutral-500 shadow-2xs">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            {query ? `Found ${filteredProducts.length} Results` : "Suggested Architectural Fixtures"}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-neutral-900">No matching fixtures found</p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching by series name (e.g. &ldquo;LENA75&rdquo;), profile (e.g. &ldquo;HUD&rdquo;), or wattage (e.g. &ldquo;12W&rdquo;)
              </p>
            </div>
          ) : (
            <ul ref={listRef} className="space-y-1">
              {filteredProducts.map((p, idx) => {
                const isSelected = idx === selectedIndex;
                const thumb = p.images[0] || "/images/products/rona.png";

                return (
                  <li
                    key={p.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => navigateToProduct(p)}
                    className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      isSelected ? "bg-neutral-100 text-neutral-900" : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {/* Fixture Thumbnail */}
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-surface p-1">
                      <Image
                        src={thumb}
                        alt={p.model}
                        fill
                        sizes="44px"
                        className="object-contain p-0.5"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-neutral-900 truncate">
                          {p.model}
                        </span>
                        {p.subseries && (
                          <span className="text-xs text-neutral-500 truncate hidden sm:inline">
                            · {p.subseries}
                          </span>
                        )}
                        <span className="ml-auto inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-200/70 text-neutral-800">
                          P.{p.catalogPage}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                        <span className="truncate">{p.category}</span>
                        <span>•</span>
                        <span>{p.power}</span>
                        <span>•</span>
                        <span className="font-mono text-[11px]">{p.ipRating}</span>
                        {p.cutout && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[11px]">{p.cutout}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Enter Hint */}
                    {isSelected && (
                      <span className="text-[11px] font-mono text-neutral-400 shrink-0 hidden sm:inline">
                        ↵ View
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-2 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-white border border-neutral-200">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white border border-neutral-200">↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-white border border-neutral-200">↵</kbd> Select</span>
          </div>
          <span>Pro-Luce Architectural Collection</span>
        </div>
      </div>
    </div>
  );
}

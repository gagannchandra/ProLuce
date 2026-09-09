"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSpecSchedule } from "@/context/SpecScheduleContext";

interface SpecScheduleDrawerProps {
  onRequestQuote: () => void;
}

export default function SpecScheduleDrawer({ onRequestQuote }: SpecScheduleDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    updateItem,
    clearSchedule,
    totalFixturesCount,
    isDrawerOpen,
    closeDrawer,
    exportCsv,
  } = useSpecSchedule();

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-neutral-900/50 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDrawer();
      }}
    >
      <div className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 id="schedule-drawer-title" className="font-display text-lg font-semibold text-neutral-900">
                Architectural Spec Schedule
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-neutral-100 text-neutral-800 border border-neutral-200">
                {items.length} {items.length === 1 ? "Fixture" : "Fixtures"} ({totalFixturesCount} Units)
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Project luminaire schedule for tender & technical specifications
            </p>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close schedule drawer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 border border-neutral-200">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold text-neutral-900">
                Specification Schedule Empty
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mt-1 mb-6">
                Explore the architectural catalogue and click &ldquo;+ Schedule&rdquo; on any luminaire to construct your project specification list.
              </p>
              <Link
                href="/catalogue"
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors"
              >
                Browse Catalogue
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
                <span>Shortlisted Project Luminaires</span>
                <button
                  type="button"
                  onClick={clearSchedule}
                  className="text-neutral-400 hover:text-red-600 transition-colors underline"
                >
                  Clear Schedule
                </button>
              </div>

              {items.map((item) => {
                const p = item.product;
                const thumb = p.images[0] || "/images/products/rona.png";

                return (
                  <div
                    key={p.id}
                    className="relative flex gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs transition-shadow hover:shadow-xs"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-1">
                      <Image
                        src={thumb}
                        alt={p.model}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${p.slug}`}
                            onClick={closeDrawer}
                            className="font-display font-semibold text-sm text-neutral-900 hover:text-neutral-600 transition-colors"
                          >
                            {p.model}
                          </Link>
                          <p className="text-xs text-neutral-500">
                            {p.category} · P.{p.catalogPage}
                          </p>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() => removeItem(p.id)}
                          className="text-neutral-400 hover:text-neutral-700 p-1"
                          aria-label={`Remove ${p.model} from schedule`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Specs Row */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {p.power}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {p.ipRating}
                        </span>
                        {p.cutout && (
                          <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                            Cut: {p.cutout}
                          </span>
                        )}
                      </div>

                      {/* Configurable Details */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-mono text-neutral-400 uppercase">
                            Project Tag
                          </label>
                          <input
                            type="text"
                            value={item.projectTag || ""}
                            onChange={(e) => updateItem(p.id, { projectTag: e.target.value })}
                            placeholder="e.g. L-01"
                            className="w-full mt-0.5 rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-neutral-400 uppercase">
                            CCT Variant
                          </label>
                          <select
                            value={item.selectedCct || p.cct[0]}
                            onChange={(e) => updateItem(p.id, { selectedCct: e.target.value })}
                            className="w-full mt-0.5 rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-900 bg-white focus:outline-none focus:border-neutral-900"
                          >
                            {p.cct.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-100">
                        <span className="text-xs text-neutral-500 font-medium">Quantity</span>
                        <div className="flex items-center gap-2 border border-neutral-200 rounded-md bg-neutral-50 px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(p.id, item.quantity - 1)}
                            className="text-neutral-500 hover:text-neutral-900 px-1 font-mono font-bold"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-semibold w-6 text-center text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(p.id, item.quantity + 1)}
                            className="text-neutral-500 hover:text-neutral-900 px-1 font-mono font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 bg-neutral-50 p-6 space-y-3">
            <button
              type="button"
              onClick={() => {
                closeDrawer();
                onRequestQuote();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-neutral-900 py-3 text-xs font-medium uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Request Schedule Specification (RFQ)</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 text-white">
                {totalFixturesCount} units
              </span>
            </button>

            <button
              type="button"
              onClick={exportCsv}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export Luminaire Schedule (.CSV)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

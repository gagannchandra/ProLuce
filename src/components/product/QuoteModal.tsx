"use client";

import { useState, useEffect, type FormEvent } from "react";
import type { Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";

interface QuoteModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isScheduleMode?: boolean;
}

export default function QuoteModal({ product, isOpen, onClose, isScheduleMode = false }: QuoteModalProps) {
  const { items, totalFixturesCount } = useSpecSchedule();

  const [selectedCct, setSelectedCct] = useState<string>(product?.cct[0] || "3000K");
  const [selectedFinish, setSelectedFinish] = useState<string>(product?.finishes[0] || "Matte White");
  const [selectedDriver, setSelectedDriver] = useState<string>(product?.driverOptions[0] || "DALI-2");
  const [quantity, setQuantity] = useState<string>("10");
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [prevProduct, setPrevProduct] = useState(product);
  if (product !== prevProduct) {
    setPrevProduct(product);
    if (product) {
      setSelectedCct(product.cct[0] || "3000K");
      setSelectedFinish(product.finishes[0] || "Matte White");
      setSelectedDriver(product.driverOptions[0] || "DALI-2");
    }
  }

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSubmitted(false);
    }
  }

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (!isScheduleMode && !product) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 sm:p-8 shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-surface transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 font-display">Specification Transmitted</h2>
            <p className="text-sm text-muted max-w-md mx-auto">
              {isScheduleMode ? (
                <>Your project schedule request for <strong className="text-neutral-900">{items.length} luminaires ({totalFixturesCount} total units)</strong> has been logged. Our commercial specification engineering team will prepare your project tender documentation within 24 hours.</>
              ) : (
                <>Your architectural specification request for <strong className="text-neutral-900">{product?.model}</strong> has been logged. Our commercial engineering team will prepare your project quotation and schedule within 24 hours.</>
              )}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-neutral-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-border pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted">
                <span>{isScheduleMode ? "Project Schedule RFQ" : product?.category}</span>
                <span>•</span>
                <span>Architectural Collection</span>
              </div>
              <h2 id="quote-modal-title" className="text-2xl font-bold tracking-tight text-neutral-900 font-display mt-1">
                {isScheduleMode
                  ? `Project Specification: ${items.length} Luminaires`
                  : `Request Quote: ${product?.model}`}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isScheduleMode
                  ? `${totalFixturesCount} total luminaire units compiled from project shortlist`
                  : `${product?.power} · ${product?.ipRating} · ${product?.dimensions}`}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Variant Options (Single Item Mode) */}
              {!isScheduleMode && product && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-surface p-3.5 rounded-lg border border-border/80">
                  {/* CCT */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      CCT Color Temp
                    </label>
                    <select
                      value={selectedCct}
                      onChange={(e) => setSelectedCct(e.target.value)}
                      className="w-full text-xs rounded border border-border bg-white px-2.5 py-1.5 font-medium outline-none focus:border-neutral-900"
                    >
                      {product.cct.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Finish */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Body Finish
                    </label>
                    <select
                      value={selectedFinish}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                      className="w-full text-xs rounded border border-border bg-white px-2.5 py-1.5 font-medium outline-none focus:border-neutral-900"
                    >
                      {product.finishes.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Driver */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Driver / Control
                    </label>
                    <select
                      value={selectedDriver}
                      onChange={(e) => setSelectedDriver(e.target.value)}
                      className="w-full text-xs rounded border border-border bg-white px-2.5 py-1.5 font-medium outline-none focus:border-neutral-900"
                    >
                      {product.driverOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Schedule Summary (Multi-Item Mode) */}
              {isScheduleMode && (
                <div className="max-h-40 overflow-y-auto rounded-lg border border-border bg-surface p-3 divide-y divide-border/60">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-neutral-900">{item.product.model}</span>
                        <span className="text-neutral-500 text-[11px] ml-2 font-mono">
                          [{item.projectTag || "Tag"}] · {item.selectedCct || item.product.cct[0]} · {item.product.power}
                        </span>
                      </div>
                      <span className="font-mono font-medium text-neutral-800 bg-white border border-border px-2 py-0.5 rounded">
                        {item.quantity} pcs
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marco Rossi"
                    className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Studio / Architecture Firm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Studio Design Associates"
                    className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="specifications@studio.com"
                    className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 02 1234 5678"
                    className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Project Name & City
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Milan Flagship Boutique"
                    className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    {isScheduleMode ? "Delivery Schedule / Phase" : "Estimated Quantity"}
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={isScheduleMode ? "e.g. Phase 1: Q3 Delivery" : "e.g. 50 units / 120 meters"}
                    className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Project Notes & Mounting Requirements
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention ceiling types, dimming systems (DALI/Casambi), or required delivery schedules..."
                  className="w-full text-xs rounded-md border border-border px-3 py-2 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-neutral-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  {isScheduleMode ? "Transmit Luminaire Schedule RFQ" : "Submit Quote Request"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

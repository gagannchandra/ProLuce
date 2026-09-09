"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import QuoteModal from "@/components/product/QuoteModal";

interface FeaturedShowcaseProps {
  products: Product[];
}

export default function FeaturedShowcase({ products }: FeaturedShowcaseProps) {
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  const families = [
    { label: "All Flagships", value: "all" },
    { label: "Spot Lights", value: "Spot Light" },
    { label: "Linear Profiles", value: "Linear Light" },
    { label: "48V Magnetic Tracks", value: "Magnetic Series" },
    { label: "Outdoor Projectors", value: "Outdoor Light" },
  ];

  const displayed = selectedFamily === "all"
    ? products.slice(0, 8)
    : products.filter((p) => p.category === selectedFamily).slice(0, 8);

  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="featured-fixtures-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted">
            Architectural Engineering Highlights
          </p>
          <h2 id="featured-fixtures-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-display">
            Flagship Architectural Systems
          </h2>
        </div>

        {/* Family Pill Switcher */}
        <div className="flex flex-wrap gap-2">
          {families.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setSelectedFamily(f.value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedFamily === f.value
                  ? "bg-neutral-900 text-white"
                  : "bg-surface text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayed.map((p) => (
          <ProductCard key={p.id} product={p} onOpenQuote={setQuoteProduct} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <span>Open Full 99-Fixture Catalogue</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <QuoteModal
        product={quoteProduct}
        isOpen={Boolean(quoteProduct)}
        onClose={() => setQuoteProduct(null)}
      />
    </section>
  );
}

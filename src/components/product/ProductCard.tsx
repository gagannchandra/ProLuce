"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";

interface ProductCardProps {
  product: Product;
  onOpenQuote?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenQuote }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInSchedule, addItem, removeItem } = useSpecSchedule();
  const inSchedule = isInSchedule(product.id);

  const primaryImage = product.images[0] || "/images/products/rona.png";
  const hoverImage = product.dimensionDiagram || primaryImage;

  return (
    <div
      className="group relative flex flex-col rounded-xl border border-border/80 bg-white p-4 transition-all duration-300 hover:border-neutral-400 hover:shadow-lg hover:shadow-black/4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container with strict aspect ratio */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square overflow-hidden rounded-lg bg-surface/70 border border-border/60 p-4 transition-colors group-hover:bg-neutral-50"
      >
        <Image
          src={isHovered && product.dimensionDiagram ? hoverImage : primaryImage}
          alt={product.model}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />

        {/* IP Rating Tag */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-white/95 text-neutral-800 border border-neutral-200/80 backdrop-blur-xs shadow-2xs">
            {product.ipRating}
          </span>
        </div>

        {/* Environment Tag */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/95 text-muted border border-neutral-200/80 backdrop-blur-xs shadow-2xs">
            {product.environment}
          </span>
        </div>

        {/* Diagram Peek Indicator on hover */}
        {product.dimensionDiagram && (
          <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-neutral-900/80 text-white backdrop-blur-xs">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <span>CAD Schematics</span>
            </span>
          </div>
        )}
      </Link>

      {/* Fixture Metadata */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-muted uppercase tracking-wider">
            <span>{product.category}</span>
            <span className="text-neutral-500 font-semibold">P.{product.catalogPage}</span>
          </div>

          <Link href={`/products/${product.slug}`} className="block mt-1">
            <h3 className="font-display text-lg font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
              {product.model}
            </h3>
          </Link>

          {product.subseries && (
            <p className="text-xs text-muted font-medium mt-0.5">
              {product.subseries}
            </p>
          )}

          {/* Quick Technical Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface text-[10px] font-mono font-medium text-neutral-700 border border-border">
              {product.power}
            </span>
            {product.cutout && (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface text-[10px] font-mono text-neutral-700 border border-border">
                {product.cutout}
              </span>
            )}
            {product.beamAngles[0] && (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface text-[10px] font-mono text-neutral-700 border border-border">
                {product.beamAngles.join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
          {/* Schedule Shortlist Toggle */}
          <button
            type="button"
            onClick={() => {
              if (inSchedule) {
                removeItem(product.id);
              } else {
                addItem(product);
              }
            }}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-mono font-medium transition-colors ${
              inSchedule
                ? "bg-neutral-900 text-white"
                : "bg-surface text-neutral-700 hover:bg-neutral-200/80 border border-border"
            }`}
            aria-label={inSchedule ? `Remove ${product.model} from schedule` : `Add ${product.model} to schedule`}
          >
            {inSchedule ? "✓ In Schedule" : "+ Schedule"}
          </button>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 transition-colors hidden sm:inline"
            >
              Datasheet →
            </Link>

            {onOpenQuote && (
              <button
                type="button"
                onClick={() => onOpenQuote(product)}
                className="rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                RFQ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Plus, ArrowRight, Layers, FileText } from "lucide-react";

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
    <Card
      className="group relative flex flex-col rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs p-4 transition-all duration-300 hover:border-stone-400 dark:hover:border-[#e6dfd1]/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:bg-card transform-gpu focus-within:ring-2 focus-within:ring-stone-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 flex flex-1 flex-col justify-between">
        {/* Visual Image Container */}
        <Link
          href={`/products/${product.slug}`}
          style={{ viewTransitionName: `product-image-${product.slug}` } as React.CSSProperties}
          className="relative block w-full aspect-square overflow-hidden rounded-xl bg-surface/60 border border-border/60 p-4 transition-all duration-300 ease-out group-hover:bg-muted/30 group-hover:border-border transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
        >
          <Image
            src={isHovered && product.dimensionDiagram ? hoverImage : primaryImage}
            alt={product.model}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
          />

          {/* Top Right: IP Rating Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="font-mono text-[10px] font-medium tracking-wider bg-background/90 text-foreground backdrop-blur-xs border border-border/80 shadow-2xs rounded-full px-2.5 py-0.5">
              {product.ipRating}
            </Badge>
          </div>

          {/* Top Left: Environment Badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="outline" className="font-mono text-[10px] tracking-wider bg-background/90 text-muted-foreground backdrop-blur-xs border-border/80 shadow-2xs rounded-full px-2.5 py-0.5">
              {product.environment}
            </Badge>
          </div>

          {/* Schematics Peek Indicator on hover */}
          {product.dimensionDiagram && (
            <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
              <Badge variant="secondary" className="font-mono text-[9px] bg-foreground text-background gap-1 rounded-full px-2.5 py-0.5 shadow-sm">
                <Layers className="h-3 w-3" />
                <span>CAD View</span>
              </Badge>
            </div>
          )}
        </Link>

        {/* Fixture Metadata */}
        <div className="mt-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              <span className="truncate max-w-[160px]">{product.category}</span>
              <span className="text-[10px] font-mono text-muted-foreground/80 font-medium shrink-0">
                P.{product.catalogPage}
              </span>
            </div>

            <Link href={`/products/${product.slug}`} className="block mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-xs touch-manipulation">
              <h3
                style={{ viewTransitionName: `product-title-${product.slug}` } as React.CSSProperties}
                className="font-display text-xl font-normal tracking-tight text-foreground group-hover:text-primary dark:group-hover:text-[#f4f0e6] transition-colors duration-200"
              >
                {product.model}
              </h3>
            </Link>

            {product.subseries && (
              <p className="text-xs text-muted-foreground font-medium mt-0.5 truncate">
                {product.subseries}
              </p>
            )}

            {/* Technical Specifications Pills */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-md font-mono text-[10px] bg-muted/60 text-foreground px-2 py-0.5 border border-border/60">
                {product.power}
              </span>
              {product.cutout && (
                <span className="inline-flex items-center rounded-md font-mono text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 border border-border/60">
                  {product.cutout}
                </span>
              )}
              {product.beamAngles[0] && (
                <span className="inline-flex items-center rounded-md font-mono text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 border border-border/60">
                  {product.beamAngles[0]}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between gap-2">
            {/* Schedule Shortlist Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={inSchedule ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (inSchedule) {
                      removeItem(product.id);
                    } else {
                      addItem(product);
                    }
                  }}
                  className={`font-sans text-[11px] uppercase tracking-[0.12em] font-medium h-8 px-3.5 gap-1.5 rounded-full transition-all duration-200 touch-manipulation cursor-pointer ${
                    inSchedule
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border-none shadow-xs"
                      : "border-border/90 text-foreground hover:bg-accent shadow-2xs"
                  }`}
                  aria-label={inSchedule ? `Remove ${product.model} from schedule` : `Add ${product.model} to schedule`}
                >
                  {inSchedule ? (
                    <>
                      <Check className="h-3 w-3 stroke-[3]" />
                      <span>Scheduled</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" />
                      <span>Schedule</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{inSchedule ? "Remove from project schedule" : "Add fixture to project spec schedule"}</TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-1.5">
              <Button asChild variant="ghost" size="sm" className="font-sans text-xs uppercase tracking-[0.12em] font-medium h-8 px-3 rounded-full text-foreground hover:bg-accent touch-manipulation">
                <Link href={`/products/${product.slug}`} aria-label={`View specs for ${product.model}`} className="flex items-center gap-1">
                  <span className="hidden sm:inline">Spec</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>

              {onOpenQuote && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenQuote(product)}
                  className="font-sans text-[11px] uppercase tracking-[0.12em] font-medium h-8 px-3 gap-1.5 rounded-full border-border hover:border-foreground/30 touch-manipulation cursor-pointer"
                >
                  <FileText className="h-3 w-3 text-stone-300" />
                  <span>RFQ</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

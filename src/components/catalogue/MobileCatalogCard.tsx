"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Check, FileText, ChevronRight } from "lucide-react";

interface MobileCatalogCardProps {
  product: Product;
  onOpenQuote: (product: Product) => void;
}

export default function MobileCatalogCard({ product, onOpenQuote }: MobileCatalogCardProps) {
  const { isInSchedule, addItem, removeItem } = useSpecSchedule();
  const inSchedule = isInSchedule(product.id);
  const primaryImage = product.images[0] || "/images/products/rona.png";

  return (
    <div className="flex flex-col p-4 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs shadow-xs transition-all hover:border-stone-400">
      <div className="flex items-start gap-3.5">
        {/* Thumbnail link */}
        <Link
          href={`/products/${product.slug}`}
          className="relative h-20 w-20 shrink-0 rounded-xl border border-border/80 bg-surface/80 overflow-hidden flex items-center justify-center p-1.5 touch-manipulation"
        >
          <Image
            src={primaryImage}
            alt={product.model}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        </Link>

        {/* Fixture Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-mono uppercase text-muted-foreground truncate">
              {product.category}
            </span>
            <Badge variant="outline" className="font-mono text-[9px] px-1.5 py-0 h-4 shrink-0">
              P.{product.catalogPage}
            </Badge>
          </div>

          <Link href={`/products/${product.slug}`} className="block mt-0.5">
            <h3 className="font-display text-base font-semibold text-foreground truncate hover:underline">
              {product.model}
            </h3>
          </Link>

          {product.subseries && (
            <p className="text-[11px] text-muted-foreground truncate">
              {product.subseries}
            </p>
          )}

          {/* Quick Technical Specs */}
          <div className="mt-2 flex flex-wrap gap-1 text-[10px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-muted text-foreground font-medium border border-border/60">
              {product.power}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-muted text-foreground font-medium border border-border/60">
              {product.ipRating}
            </span>
            {product.cutout && (
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/60">
                Cut: {product.cutout}
              </span>
            )}
            {product.beamAngles[0] && (
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/60">
                {product.beamAngles[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-3.5 pt-3 border-t border-border/80 flex items-center justify-between gap-2">
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
          className={`h-8 font-mono text-[11px] rounded-full px-3.5 transition-all touch-manipulation cursor-pointer ${
            inSchedule
              ? "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border-none shadow-xs"
              : "border-border/90 text-foreground hover:bg-accent font-medium shadow-2xs"
          }`}
        >
          {inSchedule ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              Scheduled
            </>
          ) : (
            <>
              <Plus className="mr-1 h-3 w-3" />
              Schedule
            </>
          )}
        </Button>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenQuote(product)}
            className="h-8 font-mono text-[11px] uppercase tracking-wider rounded-full px-3 border-border hover:border-foreground/40 touch-manipulation cursor-pointer"
          >
            <FileText className="mr-1 h-3 w-3 text-stone-300" />
            RFQ
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 font-mono text-xs rounded-full text-foreground hover:bg-accent touch-manipulation"
          >
            <Link href={`/products/${product.slug}`} aria-label={`View ${product.model} datasheet`}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

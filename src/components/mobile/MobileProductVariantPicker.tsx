"use client";

import type { ProductVariant } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface MobileProductVariantPickerProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export default function MobileProductVariantPicker({
  variants,
  selectedVariant,
  onSelectVariant,
}: MobileProductVariantPickerProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-3 sm:hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans uppercase tracking-[0.14em] font-medium text-foreground">
          Select Series Variant ({variants.length})
        </span>
        {selectedVariant && (
          <Badge variant="outline" className="font-mono text-[10px] bg-[#f4f0e6] text-neutral-950 border-[#e6dfd1] font-semibold">
            {selectedVariant.model} Active
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {variants.map((v) => {
          const isSelected = selectedVariant?.model === v.model;
          return (
            <button
              key={v.model}
              type="button"
              onClick={() => onSelectVariant(v)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 touch-manipulation cursor-pointer ${
                isSelected
                  ? "bg-muted/80 border-[#e6dfd1] shadow-md ring-1 ring-[#e6dfd1]"
                  : "bg-card/60 border-border hover:bg-card text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isSelected
                        ? "bg-[#f4f0e6] text-neutral-950 border border-[#e6dfd1] shadow-xs"
                        : "border border-border bg-muted/60 text-transparent"
                    }`}
                  >
                    {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </div>
                  <span className={`font-mono text-xs font-bold ${isSelected ? "text-foreground" : "text-foreground/90"}`}>
                    {v.model}
                  </span>
                </div>
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  className={`font-mono text-[10px] ${
                    isSelected ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1]" : "text-muted-foreground"
                  }`}
                >
                  {v.power}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-[11px] font-mono">
                <div>
                  <span className="text-[9px] uppercase text-muted-foreground block">Output</span>
                  <span className={isSelected ? "text-foreground font-semibold" : "text-muted-foreground"}>
                    {v.lumens}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-muted-foreground block">Cutout</span>
                  <span className={isSelected ? "text-foreground font-semibold" : "text-muted-foreground"}>
                    {v.cutout || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-muted-foreground block">Profile</span>
                  <span className={`truncate block ${isSelected ? "text-foreground font-semibold" : "text-muted-foreground"}`} title={v.dimensions}>
                    {v.dimensions}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { products, type Product } from "@/lib/products";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navigateToProduct = useCallback(
    (product: Product) => {
      onClose();
      router.push(`/products/${product.slug}`);
    },
    [onClose, router]
  );

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="Search Architectural Luminaires"
      description="Quickly jump to any architectural luminaire, series, or technical specification"
      className="max-w-2xl border-border bg-popover shadow-2xl"
    >
      <CommandInput
        placeholder="Type to search luminaires (RONA, LEO, HUD...), wattage, optics, or page..."
        className="h-12 text-sm"
      />
      <CommandList className="max-h-[60vh] p-2">
        <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
          No matching architectural luminaires found. Try searching by series (e.g. &ldquo;LENA75&rdquo;), wattage (e.g. &ldquo;12W&rdquo;), or optic.
        </CommandEmpty>

        <CommandGroup heading="Flagship Architectural Luminaires">
          {products.slice(0, 16).map((product) => {
            const thumb = product.images[0] || "/images/products/rona.png";

            return (
              <CommandItem
                key={product.id}
                value={`${product.model} ${product.subseries || ""} ${product.category} ${product.power} ${product.ipRating} page ${product.catalogPage}`}
                onSelect={() => navigateToProduct(product)}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-full cursor-pointer transition-colors"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-border bg-surface p-1">
                  <Image
                    src={thumb}
                    alt={product.model}
                    fill
                    sizes="40px"
                    className="object-contain p-0.5"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {product.model}
                    </span>
                    {product.subseries && (
                      <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                        · {product.subseries}
                      </span>
                    )}
                    <Badge variant="outline" className="ml-auto font-mono text-[10px] uppercase rounded-full px-2.5">
                      P.{product.catalogPage}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span className="truncate">{product.category}</span>
                    <span>•</span>
                    <span className="font-medium">{product.power}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">{product.ipRating}</span>
                    {product.cutout && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-[11px]">{product.cutout}</span>
                      </>
                    )}
                  </div>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator className="my-2" />

        <CommandGroup heading="Architectural Categories">
          <CommandItem
            value="Downlights recessed architectural trimless"
            onSelect={() => {
              onClose();
              router.push("/catalogue?category=Downlights");
            }}
            className="cursor-pointer"
          >
            <span>Explore Recessed Downlights & Baffles</span>
          </CommandItem>
          <CommandItem
            value="Track magnetic linear spots 48V"
            onSelect={() => {
              onClose();
              router.push("/catalogue?category=Track");
            }}
            className="cursor-pointer"
          >
            <span>Explore 48V Magnetic & Low-Voltage Track</span>
          </CommandItem>
          <CommandItem
            value="Linear architectural recessed surface pendant"
            onSelect={() => {
              onClose();
              router.push("/catalogue?category=Linear");
            }}
            className="cursor-pointer"
          >
            <span>Explore Architectural Continuous Linear</span>
          </CommandItem>
          <CommandItem
            value="Outdoor IP65 IP67 ingress protected exterior"
            onSelect={() => {
              onClose();
              router.push("/catalogue?category=Outdoor");
            }}
            className="cursor-pointer"
          >
            <span>Explore IP65+ High-Ingress Exterior Luminaires</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      <div className="border-t border-border bg-muted/30 px-4 py-2 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <div className="flex items-center gap-3">
          <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↓</kbd> Navigate</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↵</kbd> Select</span>
        </div>
        <span>Pro-Luce Precision Optics</span>
      </div>
    </CommandDialog>
  );
}

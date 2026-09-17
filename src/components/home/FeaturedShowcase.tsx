"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import QuoteModal from "@/components/product/QuoteModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet } from "lucide-react";

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
    { label: "48V Magnetic", value: "Magnetic Series" },
    { label: "Outdoor Projectors", value: "Outdoor Light" },
  ];

  const displayed = selectedFamily === "all"
    ? products.slice(0, 8)
    : products.filter((p) => p.category === selectedFamily).slice(0, 8);

  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="featured-fixtures-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
            <span>Specification Standards</span>
          </div>
          <h2 id="featured-fixtures-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-light tracking-tight text-foreground font-display leading-tight">
            Flagship Architectural Systems
          </h2>
        </div>

        {/* Family Tabs Switcher */}
        <Tabs value={selectedFamily} onValueChange={setSelectedFamily} className="w-auto">
          <TabsList className="bg-muted/80 p-1 h-auto flex-wrap rounded-full border border-border/80 shadow-2xs gap-1">
            {families.map((f) => (
              <TabsTrigger
                key={f.value}
                value={f.value}
                className="font-mono text-xs px-4 py-1.5 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-xs transition-all cursor-pointer"
              >
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayed.map((p) => (
          <ProductCard key={p.id} product={p} onOpenQuote={setQuoteProduct} />
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="font-mono text-xs uppercase tracking-widest px-8 h-12 rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
          <Link href="/catalogue">
            <span>Open Full 99-Fixture Catalogue</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="font-mono text-xs uppercase tracking-widest px-8 h-12 rounded-full border-border/80 hover:bg-accent text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
          <Link href="/catalogue">
            <FileSpreadsheet className="mr-2 h-4 w-4 text-amber-500" />
            <span>View Spec Schedule</span>
          </Link>
        </Button>
      </div>

      <QuoteModal
        product={quoteProduct}
        isOpen={Boolean(quoteProduct)}
        onClose={() => setQuoteProduct(null)}
      />
    </section>
  );
}

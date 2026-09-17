import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX } from "lucide-react";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <Card className="py-16 text-center border-dashed border-border bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center space-y-3">
          <SearchX className="h-10 w-10 text-muted-foreground opacity-50" />
          <p className="text-sm font-medium text-foreground">No architectural luminaires found in this category.</p>
          <p className="text-xs text-muted-foreground">Try adjusting your active filters or search terms.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

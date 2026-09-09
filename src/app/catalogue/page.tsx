import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import CatalogContainer from "@/components/catalogue/CatalogContainer";

export const metadata: Metadata = {
  title: "Architectural Catalogue | Pro-Luce",
  description:
    "Explore the complete Pro-Luce architectural lighting collection: precision trimless downlights, continuous linear profiles, 48V magnetic tracks, and outdoor luminaires.",
  alternates: { canonical: "/catalogue" },
};

export default function CataloguePage() {
  return (
    <Suspense fallback={
      <div className="container-site py-16 text-center text-sm text-muted">
        Loading architectural catalogue...
      </div>
    }>
      <CatalogContainer initialProducts={products} />
    </Suspense>
  );
}

import Hero from "@/components/Hero";
import PhotometricLab from "@/components/home/PhotometricLab";
import ArchitecturalSystems from "@/components/home/ArchitecturalSystems";
import FlagshipShowcase from "@/components/home/FlagshipShowcase";
import CatalogueDownloadBanner from "@/components/home/CatalogueDownloadBanner";
import { products } from "@/lib/products";

export default function HomePage() {
  const heroProduct = products.find((p) => p.slug === "rona") ?? products[0];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* 1. Kinetic Hero with Video Intro & Luminaire Reveal */}
      <Hero product={heroProduct} />

      {/* 2. Flagship Architectural Luminaire Masterworks Showcase */}
      <FlagshipShowcase />

      {/* 3. Interactive Photometric Lab & Beam Optical Simulator */}
      <PhotometricLab />

      {/* 4. Architectural Systems Taxonomy & 6-Category Matrix */}
      <ArchitecturalSystems />

      {/* 5. Tender Documentation & Complete Architectural Catalogue Download */}
      <CatalogueDownloadBanner />
    </main>
  );
}

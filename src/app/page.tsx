import Hero from "@/components/Hero";
import PhotometricLab from "@/components/home/PhotometricLab";
import ArchitecturalSystems from "@/components/home/ArchitecturalSystems";
import FlagshipShowcase from "@/components/home/FlagshipShowcase";
import SpatialApplications from "@/components/home/SpatialApplications";
import SpecifierSuite from "@/components/home/SpecifierSuite";
import { products } from "@/lib/products";

export default function HomePage() {
  const heroProduct = products.find((p) => p.slug === "rona") ?? products[0];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* 1. Kinetic Hero with Video Intro & Luminaire Reveal */}
      <Hero product={heroProduct} />

      {/* 2. Interactive Photometric Lab & Beam Optical Simulator */}
      <PhotometricLab />

      {/* 3. Architectural Systems Taxonomy & 6-Category Matrix */}
      <ArchitecturalSystems />

      {/* 4. Flagship Architectural Luminaire Masterworks Showcase */}
      <FlagshipShowcase />

      {/* 5. Spatial Applications & High-Resolution Project Photography with Hotspots */}
      <SpatialApplications />

      {/* 6. Specifier, BIM LOD 350 & Engineering Schedule Suite */}
      <SpecifierSuite />
    </main>
  );
}

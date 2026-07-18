import { HeroSection } from "@/components/sections/hero-section";
import { CollectionsSection } from "@/components/sections/collections-section";
import { BrandStorySection } from "@/components/sections/brand-story-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CollectionsSection />
      <BrandStorySection />
      <FeaturedProductsSection />
    </>
  );
}

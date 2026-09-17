import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedShowcase from "@/components/home/FeaturedShowcase";
import OpticalComparisonFlow from "@/components/home/OpticalComparisonFlow";
import ArchitectBanner from "@/components/home/ArchitectBanner";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { products } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const heroProduct = products.find((p) => p.slug === "rona") ?? products[0];
  const posts = getAllPosts();

  return (
    <>
      {/* 1. ProLuce Cinematic Luminaire Video Hero */}
      <Hero product={heroProduct} />

      {/* 2. Architectural Category Taxonomy Grid */}
      <CategoryGrid />

      {/* 3. Interactive Optical Glare & Dark-Light Cutoff Flow */}
      <OpticalComparisonFlow />

      {/* 4. Flagship Architectural Systems Showcase */}
      <FeaturedShowcase products={products} />

      {/* 5. Architect & Engineering Specification Consultation */}
      <ArchitectBanner />

      {/* 6. Studio Journal on Space, Optics & Light */}
      <section className="container-site py-16 md:py-24 border-t border-border" aria-labelledby="journal-heading">
        <SectionHeading
          eyebrow="Architectural Lighting Notes"
          title="Insights on Space, Material & Light"
          cta="Read All Notes"
          href="/blog"
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}

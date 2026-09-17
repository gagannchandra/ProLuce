import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Architectural Lighting Journal & Notes | Pro-Luce",
  description:
    "Engineering essays, optical physics, spatial design philosophy, and technical notes from the Pro-Luce lighting studio.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container-site py-12 md:py-20">
      <div className="mb-12 max-w-2xl border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="outline" className="gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] border-border/80 text-muted-foreground">
            <BookOpen className="h-3 w-3 text-amber-500" />
            <span>Studio Journal</span>
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-light tracking-tight text-foreground leading-[1.08]">
          Space, Optics & Material
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans font-light">
          Explorations in glare suppression, circadian photometrics, dark-light cutoff, and architectural luminaire engineering.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

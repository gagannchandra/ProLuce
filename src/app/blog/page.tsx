import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Lighting guides, design notes, and interiors thinking from the Lunexa team.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Journal</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Our Blog</h1>
        <p className="mt-3 text-muted">Notes on lighting, design, and living with fewer, better things.</p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

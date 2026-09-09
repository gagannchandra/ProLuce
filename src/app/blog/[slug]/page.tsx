import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date);

  return (
    <article className="container-site py-12 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          image: `${siteConfig.url}${post.image}`,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{post.category}</p>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">{post.title}</h1>
        <time dateTime={post.date} className="mt-3 block text-sm text-muted">
          {date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        </time>

        <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden bg-surface">
          <Image src={post.image} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>

        <div className="prose-content mt-10 flex flex-col gap-5 text-foreground/90">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <Link href="/blog" className="border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-wide">
            Back to the blog
          </Link>
        </div>
      </div>
    </article>
  );
}

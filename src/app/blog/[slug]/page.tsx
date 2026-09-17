import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";

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
    title: `${post.title} | Pro-Luce Journal`,
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
    <article className="container-site py-10 md:py-16">
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

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Studio
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          </li>
          <li>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Journal
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          </li>
          <li aria-current="page" className="text-foreground truncate max-w-xs font-medium">
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
            {post.category}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.date}>
              {date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-[46px] font-light tracking-tight text-foreground leading-[1.12]">
          {post.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-sans font-light">
          {post.excerpt}
        </p>

        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 flex flex-col gap-6 text-foreground/90 font-sans leading-relaxed text-base font-light">
          {post.content.map((paragraph, i) => (
            <p key={i} className="leading-relaxed">{paragraph}</p>
          ))}
        </div>

        <Separator className="mt-12 mb-8" />

        <div className="flex items-center justify-between">
          <Button asChild variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider gap-2">
            <Link href="/blog">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Journal</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="font-mono text-xs uppercase tracking-wider">
            <Link href="/catalogue">
              Explore Luminaires
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

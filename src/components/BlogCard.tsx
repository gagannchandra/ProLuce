import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date);
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" });

  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex h-14 w-14 flex-col items-center justify-center bg-background text-center leading-none">
          <span className="text-lg font-semibold">{day}</span>
          <span className="text-xs uppercase text-muted">{month}</span>
        </div>
      </Link>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-accent">{post.category}</p>
      <h3 className="mt-1 font-display text-xl leading-snug">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-3 w-fit border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-wide"
      >
        Read more
      </Link>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xs transition-all duration-300 hover:border-[#e6dfd1]/40 hover:shadow-xl hover:shadow-black/40">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-3/2 overflow-hidden bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-xs font-mono text-[10px] uppercase tracking-wider shadow-2xs border border-border/80">
            <Calendar className="mr-1 h-3 w-3 text-stone-300" />
            {formattedDate}
          </Badge>
        </div>
      </Link>

      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="font-sans text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground border-border/80">
            {post.category}
          </Badge>
        </div>
        <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm">
          <h3 className="font-display text-2xl lg:text-[25px] font-light leading-snug mt-2.5 text-foreground group-hover:text-[#f4f0e6] transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 font-sans font-light mb-5">
          {post.excerpt}
        </p>

        <Button asChild variant="outline" size="sm" className="w-fit font-sans text-xs uppercase tracking-[0.14em] font-medium rounded-full px-4 h-8 gap-1.5 group/btn border-border/80 hover:border-[#e6dfd1]/40 hover:bg-accent transition-all">
          <Link href={`/blog/${post.slug}`}>
            <span>Read Architectural Note</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

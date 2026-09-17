import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  cta,
  href,
}: {
  eyebrow?: string;
  title: string;
  cta?: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6">
      <div>
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-1.5">
            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-border/80">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
              {eyebrow}
            </Badge>
          </div>
        )}
        <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-[42px] text-foreground font-light tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {cta && href && (
        <Button asChild variant="ghost" className="font-mono text-xs uppercase tracking-wider group p-0 hover:bg-transparent text-foreground">
          <Link href={href}>
            <span>{cta}</span>
            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

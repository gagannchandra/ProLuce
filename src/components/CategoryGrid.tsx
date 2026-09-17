import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface CategoryCardItem {
  number: string;
  title: string;
  tagline: string;
  href: string;
  image: string;
  count: string;
  highlight: string;
}

const categories: CategoryCardItem[] = [
  {
    number: "01",
    title: "Spot Lights",
    tagline: "LENA75 trimless plaster-in and surface downlights with Ra≥98 optics",
    href: "/catalogue?category=Spot+Light",
    image: "/images/products/rona.png",
    count: "11 Systems",
    highlight: "UGR < 12 Certified",
  },
  {
    number: "02",
    title: "Linear Profiles",
    tagline: "Continuous architectural lines, suspended geometries & micro-slot recessed profiles",
    href: "/catalogue?category=Linear+Light",
    image: "/images/products/lena-20-linear.png",
    count: "33 Systems",
    highlight: "Seamless Joins",
  },
  {
    number: "03",
    title: "Track & Pendant",
    tagline: "High-output architectural track projectors and minimal suspended pendants",
    href: "/catalogue?category=Track+Light",
    image: "/images/products/c44.png",
    count: "6 Systems",
    highlight: "3-Circuit Global Track",
  },
  {
    number: "04",
    title: "48V Magnetic Series",
    tagline: "Ultra-low-voltage magnetic track channels with tool-free interchangeable modules",
    href: "/catalogue?category=Magnetic+Series",
    image: "/images/products/mega-surface.png",
    count: "12 Systems",
    highlight: "Tool-Free Hot Swap",
  },
  {
    number: "05",
    title: "Tube Magnetic (PTM)",
    tagline: "PTM modular tubular luminaires for gallerias, high ceilings, and retail flagships",
    href: "/catalogue?category=Tube+Magnetic",
    image: "/images/products/tube-magnetic-ptm01.png",
    count: "13 Systems",
    highlight: "360° Rotatable",
  },
  {
    number: "06",
    title: "Outdoor & Landscapes",
    tagline: "IP65/IP67 architectural projectors, in-ground drive-over fixtures & wall-washers",
    href: "/catalogue?category=Outdoor+Light",
    image: "/images/products/flood18.png",
    count: "15 Systems",
    highlight: "Marine-Grade IP67",
  },
];

export default function CategoryGrid() {
  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
            <span>Taxonomy</span>
          </div>
          <h2 id="categories-heading" className="font-display text-3xl sm:text-4xl lg:text-[42px] text-foreground font-light tracking-tight leading-tight">
            Architectural Luminaire Categories
          </h2>
        </div>
        <Button asChild variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider rounded-full px-5 h-9 gap-2 border-border/80 hover:border-amber-500/40 hover:bg-accent transition-all">
          <Link href="/catalogue">
            <span>View Master Catalogue (99 Fixtures)</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group block outline-none transform-gpu transition-all duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl"
          >
            <Card className="h-full transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 border-border/80 bg-card/95 backdrop-blur-xs transform-gpu rounded-2xl overflow-hidden">
              <CardHeader className="p-6 pb-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="font-mono text-xs font-semibold text-foreground tracking-widest">{cat.number}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-muted/80 text-foreground border border-border/60">
                      {cat.highlight}
                    </Badge>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {cat.count}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-2 flex flex-col justify-between">
                {/* Luminaire Frame with subtle radial lighting */}
                <div className="relative aspect-4/3 w-full rounded-xl bg-surface/80 border border-border/60 p-4 mb-5 overflow-hidden flex items-center justify-center transform-gpu group-hover:border-border transition-colors">
                  <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                  />
                </div>

                {/* Metadata & Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl lg:text-[26px] font-normal text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                      {cat.title}
                    </h3>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/60 text-muted-foreground group-hover:bg-amber-500 group-hover:text-neutral-950 transition-all duration-300">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed font-sans font-light">
                    {cat.tagline}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

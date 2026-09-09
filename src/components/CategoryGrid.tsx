import Image from "next/image";
import Link from "next/link";

interface CategoryCardItem {
  title: string;
  tagline: string;
  href: string;
  image: string;
  count: string;
}

const categories: CategoryCardItem[] = [
  {
    title: "Spot Lights",
    tagline: "LENA75 trimless plaster-in downlights with Ra≥90 precision optics",
    href: "/catalogue?category=Spot+Light",
    image: "/images/products/rona.png",
    count: "11 Models",
  },
  {
    title: "Linear Profiles",
    tagline: "Continuous architectural lines, triangles, squares, and HUD profiles",
    href: "/catalogue?category=Linear+Light",
    image: "/images/products/lena-20-linear.png",
    count: "33 Models",
  },
  {
    title: "Track & Pendant",
    tagline: "High-output architectural spotlights and minimal suspended pendants",
    href: "/catalogue?category=Track+Light",
    image: "/images/products/c44.png",
    count: "6 Models",
  },
  {
    title: "48V Magnetic Series",
    tagline: "Low-voltage magnetic track systems with tool-free optical modules",
    href: "/catalogue?category=Magnetic+Series",
    image: "/images/products/mega-surface.png",
    count: "12 Models",
  },
  {
    title: "Tube Magnetic (PTM)",
    tagline: "PTM modular tubular fixtures for retail, hospitality, and gallerias",
    href: "/catalogue?category=Tube+Magnetic",
    image: "/images/products/tube-magnetic-ptm01.png",
    count: "13 Models",
  },
  {
    title: "Outdoor & Landscapes",
    tagline: "IP65/IP67 flood projectors, in-ground drive-over fixtures & wall-washers",
    href: "/catalogue?category=Outdoor+Light",
    image: "/images/products/flood18.png",
    count: "15 Models",
  },
];

export default function CategoryGrid() {
  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end border-b border-border pb-6">
        <div>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted">
            Architectural System Taxonomy
          </p>
          <h2 id="categories-heading" className="mt-2 font-display text-3xl md:text-4xl text-neutral-900 font-bold">
            Explore Fixture Categories
          </h2>
        </div>
        <Link
          href="/catalogue"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          <span>View Master Catalogue (99 Fixtures)</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:border-neutral-400 hover:shadow-lg"
          >
            {/* Image Box */}
            <div className="relative aspect-4/3 w-full rounded-lg bg-surface border border-border/40 p-4 mb-5 overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute top-2.5 right-2.5">
                <span className="rounded bg-white/90 px-2 py-0.5 text-[10px] font-mono text-neutral-700 border border-neutral-200 backdrop-blur-xs">
                  {cat.count}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-neutral-900 group-hover:text-neutral-700">
                  {cat.title}
                </h3>
                <span className="text-xs font-medium text-neutral-900 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                {cat.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

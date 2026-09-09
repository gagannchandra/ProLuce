import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Pro-Luce | Architectural Lighting Systems",
  description: "Pro-Luce engineers precision architectural luminaires for commercial, cultural, and hospitality spaces.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        <div className="max-w-3xl space-y-4 border-b border-border pb-10">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted">
            About Pro-Luce
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 font-display">
            Precision Optics & Architectural Integrity
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Founded with an uncompromising focus on optical precision and thermal engineering, Pro-Luce manufactures architectural lighting fixtures that integrate seamlessly into modern built environments.
          </p>
        </div>

        {/* Engineering Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900 font-display">
              Light as an Architectural Material
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              We believe true architectural illumination should reveal spaces rather than call attention to itself. Our fixtures are designed with zero-bezel trimless housings, deep anti-glare baffles (UGR &lt; 19), and minimalist profiles that disappear into ceiling planes and facades.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Every luminaire in our architectural portfolio is crafted from CNC-machined and extruded 6063-T5 aluminum, maximizing thermal conductivity for a true 50,000-hour operational lifespan.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 font-mono">
                Optical Fidelity (CRI ≥ 90 / R9 &gt; 50)
              </h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Color fidelity is paramount in galleries, luxury retail, and hospitality. Pro-Luce specifies premium LED emitters with consistent 2-step MacAdam ellipse binning.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 font-mono">
                48V Modular Intelligence
              </h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Low-voltage magnetic track platforms provide total freedom of repositioning and field adaptability without specialized tools or rewiring.
              </p>
            </div>
          </div>
        </div>

        {/* Master PDF Catalogue Callout */}
        <div className="rounded-2xl border border-neutral-900 bg-neutral-900 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-display">Download the Complete Architectural Catalogue</h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Access all 119 pages of technical datasheets, dimensional line drawings, and photometric tables in high-resolution PDF format.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={siteConfig.catalogPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Pro-Luce-Catalogue.pdf"
              className="rounded-lg bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:bg-neutral-100 transition-colors shadow-sm"
            >
              Download PDF (140MB)
            </a>
            <Link
              href="/catalogue"
              className="rounded-lg border border-neutral-700 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
            >
              Browse Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

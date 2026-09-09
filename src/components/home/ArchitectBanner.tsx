import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function ArchitectBanner() {
  return (
    <section className="container-site py-12 md:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 px-6 py-12 sm:px-12 md:py-16 text-white border border-neutral-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-neutral-800/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
            <span>Commercial & Trade Consultation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Comprehensive Specification Support for Architects & Engineers
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            From DIALux calculation schedules and customized profile cuts to DALI-2 dimming coordination and certified photometric test data, our engineering team works alongside your studio through every construction milestone.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:bg-neutral-100 transition-colors"
            >
              Contact Specification Team
            </Link>

            <a
              href={siteConfig.catalogPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Pro-Luce-Catalogue.pdf"
              className="rounded-lg border border-neutral-700 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            >
              Download Catalogue (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

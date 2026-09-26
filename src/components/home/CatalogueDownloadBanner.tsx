import Link from "next/link";
import { Download, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CatalogueDownloadBanner() {
  return (
    <section
      className="w-full py-10 lg:py-14 bg-background text-foreground transition-colors duration-300"
      aria-label="Download Architectural Catalogue"
    >
      <div className="container-site">
        <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden">
          {/* Grain texture overlay for analogue depth */}
          <div className="grain-overlay absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

          {/* Warm ambient glow — light: amber, dark: verde */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#f0ece0]/30 dark:bg-[#008C45]/6 blur-[80px] pointer-events-none z-0" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#f0ece0]/20 dark:bg-[#f0ece0]/3 blur-[60px] pointer-events-none z-0" />

          {/* Subtle top border accent */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f0ece0]/60 dark:via-[#f0ece0]/15 to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10">
            {/* Left: Content */}
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <FileText className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                <span className="text-[11px] font-sans uppercase tracking-[0.10em] font-medium text-muted-foreground">
                  Tender Documentation
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-light font-display tracking-tight text-foreground leading-[1.12] text-balance">
                Download the Complete Architectural Catalogue
              </h2>
              <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] text-muted-foreground font-sans font-light leading-[1.75] text-pretty max-w-xl">
                Access all 119 pages of technical datasheets, dimensional line drawings,
                polar candlepower curves, and photometric schedules in high-resolution PDF.
              </p>

              {/* Meta details */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] font-mono text-muted-foreground/70">
                <span>119 pages</span>
                <span className="text-border" aria-hidden="true">·</span>
                <span>High-res PDF</span>
                <span className="text-border" aria-hidden="true">·</span>
                <span>Updated 2026</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                asChild
                className="rounded-full bg-[#f0ece0] hover:bg-[#e6e0d0] text-zinc-950 border border-[#ddd6c6] hover:border-[#cec5b3] font-sans text-[12.5px] tracking-[0.06em] uppercase font-semibold h-11 sm:h-12 px-6 sm:px-7 shadow-sm cursor-pointer transition-all hover:shadow-md active:scale-[0.98] touch-manipulation"
              >
                <a
                  href="/pdf/Pro-Luce-Catalogue.pdf"
                  download="Pro-Luce-Architectural-Catalogue.pdf"
                  className="flex items-center gap-2.5"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  <span>Download PDF</span>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/60 bg-transparent text-foreground hover:bg-accent/70 font-sans text-[12.5px] tracking-[0.06em] uppercase font-semibold h-11 sm:h-12 px-6 sm:px-7 cursor-pointer transition-all active:scale-[0.98] touch-manipulation"
              >
                <Link href="/catalogue" className="flex items-center gap-2.5">
                  <span>Browse Online</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Download, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CatalogueDownloadBanner() {
  return (
    <section
      className="w-full py-12 lg:py-16 bg-background text-foreground transition-colors duration-300"
      aria-label="Download Architectural Catalogue"
    >
      <div className="container-site">
        <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-lg backdrop-blur-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 overflow-hidden">
          {/* Subtle Ambient Light Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#f4f0e6]/20 blur-3xl pointer-events-none -z-0 dark:bg-white/5" />

          {/* Left Text Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 dark:bg-zinc-800/60 px-3 py-1 text-foreground shadow-2xs">
              <FileText className="h-3 w-3 text-stone-400 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] font-medium text-muted-foreground">
                Tender Documentation
              </span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-light font-display tracking-tight text-foreground">
              Download the Complete Architectural Catalogue
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-sans font-light leading-relaxed">
              Access all 119 pages of technical datasheets, dimensional line drawings, polar candlepower curves, and photometric schedules in high-resolution PDF format.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            <Button
              asChild
              className="rounded-full bg-[#f4f0e6] text-zinc-950 hover:bg-[#eae4d5] font-mono text-xs uppercase tracking-wider font-semibold h-11 sm:h-12 px-5 sm:px-7 shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
            >
              <a
                href="/pdf/Pro-Luce-Catalogue.pdf"
                download="Pro-Luce-Architectural-Catalogue.pdf"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF Spec</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-border bg-card text-foreground hover:bg-muted font-mono text-xs uppercase tracking-wider font-semibold h-11 sm:h-12 px-5 sm:px-7 shadow-2xs cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
            >
              <Link href="/catalogue" className="flex items-center gap-2">
                <span>Browse Catalogue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import BrandLogo from "@/components/BrandLogo";
import Newsletter from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 border-t border-border/60 bg-surface pb-28 md:pb-0">
      <div className="container-site pt-12 sm:pt-16 pb-8 sm:pb-12">
        <Newsletter />

        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 sm:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm"
              aria-label={`${siteConfig.name} Home`}
            >
              <BrandLogo size="lg" align="left" theme="auto" />
            </Link>
            <p className="mt-4 max-w-sm text-[13px] text-muted-foreground leading-[1.7] font-sans font-light text-pretty">
              {siteConfig.description}
            </p>

            {/* Location — editorial badge treatment */}
            <div className="mt-5 inline-flex items-center gap-2">
              <span className="flex items-center gap-0.5 shrink-0" aria-hidden="true">
                <span className="h-[10px] w-[5px] rounded-[1.5px] bg-[#008C45]" />
                <span className="h-[10px] w-[5px] rounded-[1.5px] bg-foreground/30 dark:bg-[#f0ece0]/40" />
                <span className="h-[10px] w-[5px] rounded-[1.5px] bg-[#CD212A]" />
              </span>
              <span className="text-[12px] font-sans text-muted-foreground tracking-[0.03em]">
                Firenze · Sesto Fiorentino, Italia
              </span>
            </div>
          </div>

          <FooterColumn title="Categories" links={footerNav.categories} />
          <FooterColumn title="Engineering & Specs" links={footerNav.engineering} />
          <FooterColumn title="Studio & Company" links={footerNav.company} />
        </div>

        <Separator className="mt-10 sm:mt-12 mb-6 bg-border/70" />

        {/* Bottom bar — human typography, not pure monospace */}
        <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 text-[12px] text-muted-foreground lg:flex-row">
          <p className="text-center sm:text-left tracking-[0.02em]">
            &copy; {new Date().getFullYear()} {siteConfig.name} &mdash; {siteConfig.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-5 gap-y-2 text-center">
            <span className="tracking-[0.01em]">{siteConfig.contact.address}</span>
            <span className="text-border/80">·</span>
            <span>{siteConfig.contact.phone}</span>
            <span className="text-border/80">·</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-foreground transition-colors underline-offset-3 hover:underline font-medium text-foreground/70"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      {/* Column header — subtle rule instead of all-caps tracking */}
      <h3 className="text-[11.5px] font-sans font-semibold text-foreground/80 tracking-[0.08em] uppercase">
        {title}
      </h3>
      <div className="mt-1 mb-3.5 h-px w-6 bg-foreground/15" aria-hidden="true" />
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link
              href={link.href}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-light tracking-[0.01em] underline-offset-3 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

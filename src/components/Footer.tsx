import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import BrandLogo from "@/components/BrandLogo";
import Newsletter from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="mt-20 sm:mt-24 border-t border-border bg-surface pb-28 md:pb-0">
      <div className="container-site py-12 sm:py-16">
        <Newsletter />

        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
              aria-label={`${siteConfig.name} Home`}
            >
              <BrandLogo size="lg" align="center" theme="auto" />
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed font-sans font-light">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[11px] sm:text-xs gap-1.5 border-border bg-card/80 text-muted-foreground py-0.5 px-2.5 shadow-2xs">
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  <span className="h-2 w-1.5 rounded-[1px] bg-[#008C45]" />
                  <span className="h-2 w-1.5 rounded-[1px] bg-neutral-100 dark:bg-[#f4f0e6]" />
                  <span className="h-2 w-1.5 rounded-[1px] bg-[#CD212A]" />
                </span>
                Firenze &bull; Sesto Fiorentino, Italia
              </Badge>
            </div>
          </div>

          <FooterColumn title="Categories" links={footerNav.categories} />
          <FooterColumn title="Engineering & Specs" links={footerNav.engineering} />
          <FooterColumn title="Studio & Company" links={footerNav.company} />
        </div>

        <Separator className="mt-10 sm:mt-12 mb-6 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs sm:text-[13px] text-muted-foreground lg:flex-row font-mono">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name} &bull; {siteConfig.tagline}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-2 text-center lg:text-right">
            <span>{siteConfig.contact.address}</span>
            <span>{siteConfig.contact.phone}</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-foreground transition-colors underline-offset-4 hover:underline font-medium text-foreground"
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
      <h3 className="text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-3.5 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link href={link.href} className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground transition-colors font-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

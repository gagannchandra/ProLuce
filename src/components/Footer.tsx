import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import Newsletter from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-site py-16">
        <Newsletter />

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="font-display text-2xl tracking-[0.16em] uppercase font-light text-foreground">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans font-light">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px] gap-1.5 border-border/80 bg-background text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                Architectural Collection Live & Verified
              </Badge>
            </div>
          </div>

          <FooterColumn title="Categories" links={footerNav.categories} />
          <FooterColumn title="Engineering & Specs" links={footerNav.engineering} />
          <FooterColumn title="Studio & Company" links={footerNav.company} />
        </div>

        <Separator className="mt-14 mb-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row font-mono">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name} Architectural Lighting Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>{siteConfig.contact.phone}</span>
            <span>{siteConfig.contact.email}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

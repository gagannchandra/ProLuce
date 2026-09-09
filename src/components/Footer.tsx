import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import Newsletter from "@/components/Newsletter";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-site py-16">
        <Newsletter />

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="font-display text-2xl tracking-wider uppercase font-semibold text-neutral-900">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-muted">Architectural Collection Live & Verified</span>
            </div>
          </div>

          <FooterColumn title="Categories" links={footerNav.categories} />
          <FooterColumn title="Engineering & Specs" links={footerNav.engineering} />
          <FooterColumn title="Studio & Company" links={footerNav.company} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted md:flex-row">
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
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-xs text-muted hover:text-neutral-900 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

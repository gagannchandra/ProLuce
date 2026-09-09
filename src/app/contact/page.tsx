import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact & Specification Inquiries | Pro-Luce",
  description: "Connect with the Pro-Luce engineering team for architectural project schedules, DIALux simulations, or factory quotation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Pro-Luce Architectural Lighting",
          url: `${siteConfig.url}/contact`,
        }}
      />

      <div className="max-w-2xl border-b border-border pb-8">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted">
          Commercial Project Inquiries
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
          Architectural Specification Support
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Submit your project bill of materials (BOM), request customized extrusion lengths, or consult our engineering team on DALI-2 dimming protocols and photometric schedules.
        </p>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <div className="flex flex-col gap-6 text-sm bg-surface p-6 rounded-xl border border-border">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 font-mono">
              Specification Email
            </h2>
            <a href={`mailto:${siteConfig.contact.email}`} className="mt-1 block text-sm font-medium text-neutral-700 hover:text-neutral-950 underline">
              {siteConfig.contact.email}
            </a>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 font-mono">
              Commercial Phone
            </h2>
            <p className="mt-1 text-sm text-neutral-700">{siteConfig.contact.phone}</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 font-mono">
              Engineering Studio
            </h2>
            <p className="mt-1 text-sm text-muted leading-relaxed">{siteConfig.contact.address}</p>
          </div>

          <div className="pt-4 border-t border-border">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 font-mono">
              Master Architectural Catalogue
            </h2>
            <p className="mt-1 text-xs text-muted mb-3">119 pages of high-resolution datasheets & polar curves.</p>
            <a
              href={siteConfig.catalogPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Pro-Luce-Catalogue.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 underline"
            >
              <span>Download PDF (140MB)</span>
              <span>&darr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

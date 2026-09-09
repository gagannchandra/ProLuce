import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of the Pro-Luce website and architectural specification tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-site max-w-3xl py-12 md:py-16">
      <h1 className="font-display text-4xl">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-muted">Last updated: Current Specification Release</p>

      <div className="mt-8 flex flex-col gap-6 text-foreground/90">
        <section>
          <h2 className="font-display text-xl">Using this site</h2>
          <p className="mt-2 text-muted">
            By browsing or requesting specifications from Pro-Luce, you agree to use the site lawfully and not to misrepresent
            your identity, interfere with the site&apos;s operation, or reproduce our content without
            permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl">Specifications & availability</h2>
          <p className="mt-2 text-muted">
            All photometrics, dimensions, and technical specifications are subject to engineering revision. Quotations
            and project schedules are provided upon verified commercial RFQ.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl">Intellectual property</h2>
          <p className="mt-2 text-muted">
            All product technical drawings, text, and design on this site belong to Pro-Luce or its licensors and may
            not be reused without written permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl">Limitation of liability</h2>
          <p className="mt-2 text-muted">
            Pro-Luce is not liable for indirect or consequential losses arising from use of this site, to the
            extent permitted by law.
          </p>
        </section>
      </div>
    </div>
  );
}

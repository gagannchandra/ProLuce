import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-site max-w-3xl py-12 md:py-16">
      <h1 className="font-display text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: Current Specification Release</p>

      <div className="prose-content mt-8 flex flex-col gap-6 text-foreground/90">
        <section>
          <h2 className="font-display text-xl">Information we collect</h2>
          <p className="mt-2 text-muted">
            When you place an order, subscribe to our newsletter, or contact us, we collect the information you
            provide directly — such as your name, email address, shipping address, and order details. We also
            collect basic analytics data (pages visited, device type) to understand how our site is used.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl">How we use it</h2>
          <p className="mt-2 text-muted">
            We use your information to fulfil orders, respond to enquiries, send the newsletter you signed up
            for, and improve our products and site. We do not sell your personal information to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl">Your choices</h2>
          <p className="mt-2 text-muted">
            You can unsubscribe from marketing emails at any time using the link in any newsletter, or by
            contacting us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="underline">
              {siteConfig.contact.email}
            </a>
            . You may also request a copy of the data we hold about you, or ask us to delete it.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl">Contact</h2>
          <p className="mt-2 text-muted">
            Questions about this policy can be sent to {siteConfig.contact.email}.
          </p>
        </section>
      </div>
    </div>
  );
}

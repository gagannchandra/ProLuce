import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about Lunexa orders, shipping, materials, and installation.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "Do your fixtures come with bulbs included?",
    answer:
      "Most fixtures ship without bulbs so you can choose the color temperature and brightness you prefer. The product page for each item lists the bulb base and wattage it takes.",
  },
  {
    question: "Can I install these fixtures myself?",
    answer:
      "Table and floor lamps plug straight in. Pendants, chandeliers, and hardwired wall lights should be installed by a licensed electrician, especially if you're replacing an existing fixture.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the United States and Canada. We're working on expanding shipping options — join our newsletter for updates.",
  },
  {
    question: "What if a part breaks after the return window?",
    answer:
      "Many of our fixtures use standard, swappable parts. Contact us with your order number and we'll help you source a replacement shade, switch, or cord where possible.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-site max-w-3xl py-12 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <h1 className="font-display text-4xl">Frequently Asked Questions</h1>

      <div className="mt-8 flex flex-col divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
              {faq.question}
              <span className="ml-4 shrink-0 text-muted group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

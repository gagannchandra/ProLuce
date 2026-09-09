import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  cta,
  href,
}: {
  eyebrow?: string;
  title: string;
  cta?: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
        <h2 className="mt-2 font-display text-3xl md:text-4xl">{title}</h2>
      </div>
      {cta && href && (
        <Link href={href} className="hidden shrink-0 border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-wide md:block">
          {cta}
        </Link>
      )}
    </div>
  );
}

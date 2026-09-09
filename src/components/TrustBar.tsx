export default function TrustBar() {
  const features = [
    {
      title: "Architectural Grade Engineering",
      description: "Extruded 6063-T5 aluminum alloy housing with advanced thermal dissipation.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Optical Glare Control (UGR < 19)",
      description: "Ra ≥ 90 high-CRI color rendering with micro-prismatic and deep anti-glare optics.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ),
    },
    {
      title: "50,000h Commercial Lifespan",
      description: "50,000h L80/B10 performance with certified DALI-2, 0-10V, and Phase dimming drivers.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: "Project Specification Support",
      description: "Tailored photometric schedules, CAD/IES files, and direct factory project quotes.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-y border-border bg-surface/50" aria-label="Engineering standards and guarantees">
      <div className="container-site py-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`flex items-start gap-4 ${
                idx !== 0 ? "lg:border-l lg:border-border/60 lg:pl-8" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-border text-neutral-900 shadow-xs">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

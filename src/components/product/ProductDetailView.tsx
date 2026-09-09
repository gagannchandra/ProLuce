"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import QuoteModal from "./QuoteModal";
import { useSpecSchedule } from "@/context/SpecScheduleContext";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [activeMedia, setActiveMedia] = useState<"photo" | "diagram">("photo");
  const [activeSpecTab, setActiveSpecTab] = useState<"optical" | "electrical" | "mechanical" | "downloads">("optical");
  const [selectedCct, setSelectedCct] = useState<string>(product.cct[0] || "3000K");
  const [selectedBeam, setSelectedBeam] = useState<string>(product.beamAngles[0] || "24°");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const { isInSchedule, addItem, removeItem, openDrawer } = useSpecSchedule();
  const inSchedule = isInSchedule(product.id);

  const photoSrc = product.images[0] || "/images/products/rona.png";
  const diagramSrc = product.dimensionDiagram || photoSrc;

  // CCT temperature color simulation
  const cctColorMap: Record<string, string> = {
    "2700K": "#ffb366",
    "3000K": "#ffc58a",
    "4000K": "#ffe4c4",
    "5000K": "#f0f4ff",
    "6000K": "#dbeafe",
    "Tunable White": "linear-gradient(135deg, #ffc58a, #dbeafe)",
    "RGB / RGBW": "linear-gradient(135deg, #f43f5e, #3b82f6)",
  };
  const activeLightColor = cctColorMap[selectedCct] || "#ffe4c4";

  // Beam angle degrees for visualizer cone
  const beamAngleNum = parseInt(selectedBeam.replace("°", "")) || 36;
  const coneWidth = Math.min(Math.max(beamAngleNum * 1.6, 28), 160);

  return (
    <div className="space-y-12 pb-16">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted">
            <Link href="/catalogue" className="hover:underline">Catalogue</Link>
            <span>/</span>
            <Link href={`/catalogue?category=${encodeURIComponent(product.category)}`} className="hover:underline">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">{product.model}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 font-display">
              {product.model}
            </h1>
            {product.subseries && (
              <span className="rounded-full bg-surface border border-border px-3 py-1 text-xs font-mono font-medium text-neutral-700">
                {product.subseries}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted font-mono">
            Source: Pro-Luce Master Catalogue · Page {product.catalogPage}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:bg-surface hover:text-neutral-950 transition-colors shadow-2xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print Spec</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (inSchedule) {
                removeItem(product.id);
              } else {
                addItem(product, {
                  selectedCct,
                  selectedBeamAngle: selectedBeam,
                });
                openDrawer();
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs ${
              inSchedule
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            <span>{inSchedule ? "✓ In Schedule" : "+ Spec Schedule"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQuoteOpen(true)}
            className="rounded-lg bg-neutral-900 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Request RFQ
          </button>
        </div>
      </div>

      {/* Main Two-Column Architectural Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Fixture Media & Optical Atmosphere Simulator */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Visual Box */}
          <div className="relative aspect-square w-full rounded-2xl border border-border bg-gradient-to-b from-surface to-white p-8 flex items-center justify-center overflow-hidden shadow-xs">
            {/* Dynamic Ambient Kelvin Glow */}
            <div
              className="absolute top-0 inset-x-0 h-48 pointer-events-none opacity-40 blur-3xl transition-all duration-700"
              style={{
                background: activeLightColor.startsWith("linear")
                  ? activeLightColor
                  : `radial-gradient(circle at 50% 0%, ${activeLightColor} 0%, transparent 70%)`,
              }}
            />

            <Image
              src={activeMedia === "photo" ? photoSrc : diagramSrc}
              alt={`${product.model} architectural view`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 transition-all duration-500 hover:scale-105"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-neutral-900 border border-neutral-200 backdrop-blur-sm shadow-xs">
                {product.ipRating}
              </span>
              <span className="rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-mono tracking-wider text-neutral-600 border border-neutral-200 backdrop-blur-sm shadow-xs">
                {product.environment}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-10 text-[11px] font-mono text-muted bg-white/90 px-2.5 py-1 rounded-md border border-border shadow-xs">
              Catalogue P.{product.catalogPage}
            </div>
          </div>

          {/* Media Switcher: Fixture vs Dimensions */}
          <div className="flex gap-3 no-print">
            <button
              type="button"
              onClick={() => setActiveMedia("photo")}
              className={`flex-1 rounded-lg border py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeMedia === "photo"
                  ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                  : "border-border bg-white text-muted hover:text-neutral-900 hover:border-neutral-400"
              }`}
            >
              Fixture Photography
            </button>
            <button
              type="button"
              onClick={() => setActiveMedia("diagram")}
              className={`flex-1 rounded-lg border py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeMedia === "diagram"
                  ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                  : "border-border bg-white text-muted hover:text-neutral-900 hover:border-neutral-400"
              }`}
            >
              Cutout & Dimensions Schematic
            </button>
          </div>

          {/* Interactive Optical Simulators */}
          <div className="rounded-2xl border border-border bg-white p-6 space-y-6 no-print shadow-xs">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
                Interactive Photometric Studio
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Live Simulator
              </span>
            </div>

            {/* CCT Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-neutral-700">Correlated Color Temperature:</span>
                <span className="font-mono font-bold text-neutral-950 px-2 py-0.5 rounded bg-surface border border-border">
                  {selectedCct}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.cct.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCct(c)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all flex items-center gap-2 ${
                      selectedCct === c
                        ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                        : "border-border bg-surface text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full inline-block border border-black/20 shrink-0"
                      style={{ background: cctColorMap[c] || "#ffe4c4" }}
                    />
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Beam Angle Cone Visualizer */}
            {product.beamAngles.length > 0 && (
              <div className="border-t border-border/80 pt-5">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-semibold text-neutral-700">Optical Beam Distribution:</span>
                  <span className="font-mono font-bold text-neutral-950 px-2 py-0.5 rounded bg-surface border border-border">
                    {selectedBeam}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.beamAngles.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBeam(b)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold border transition-all ${
                        selectedBeam === b
                          ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                          : "border-border bg-surface text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                {/* Visual Cone SVG */}
                <div className="relative h-32 w-full rounded-xl bg-neutral-950 flex flex-col items-center justify-start pt-3 overflow-hidden shadow-inner">
                  <div className="h-2 w-10 rounded-full bg-neutral-100 shadow-[0_0_16px_#ffffff] z-10" />
                  <svg
                    className="w-full h-28 overflow-visible"
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points={`100,0 ${100 - coneWidth / 2},100 ${100 + coneWidth / 2},100`}
                      fill={activeLightColor.startsWith("linear") ? "#ffe4c4" : activeLightColor}
                      opacity="0.4"
                    />
                  </svg>
                  <span className="absolute bottom-2 font-mono text-[10px] text-neutral-400">
                    {selectedBeam} cone spread simulation ({selectedCct})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Tabbed Specifications & Engineering Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Engineering Tabs */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
            <div className="flex border-b border-border pb-3 mb-6 gap-2 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: "optical", label: "Optics & Performance" },
                  { id: "electrical", label: "Electrical & Driver" },
                  { id: "mechanical", label: "Cutouts & Mechanical" },
                  { id: "downloads", label: "Downloads & Specs" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSpecTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeSpecTab === tab.id
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "text-muted hover:text-neutral-900 hover:bg-surface"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Optical */}
            {activeSpecTab === "optical" && (
              <dl className="divide-y divide-border/80 text-xs">
                <SpecRow label="Power Rating" value={product.power} isHighlight isMono />
                <SpecRow label="Luminous Efficacy" value={product.lumens} isHighlight isMono />
                <SpecRow label="Color Rendering Index (CRI)" value={product.cri} isMono />
                <SpecRow label="Color Temperatures Available" value={product.cct.join(" · ")} />
                <SpecRow label="Optical Beam Angles" value={product.beamAngles.join(", ")} isMono />
                <SpecRow label="Glare Control Standard" value="UGR < 19 Low-Glare Anti-Dazzle" />
                <SpecRow label="Operational Lifespan" value={product.lifeHours} isMono />
              </dl>
            )}

            {/* Tab 2: Electrical */}
            {activeSpecTab === "electrical" && (
              <dl className="divide-y divide-border/80 text-xs">
                <SpecRow label="Input Voltage" value={product.inputVoltage} isHighlight isMono />
                <SpecRow label="Driver & Control Protocols" value={product.driverOptions.join(", ")} isHighlight />
                <SpecRow label="Power Factor" value="> 0.95 High-Efficiency" isMono />
                <SpecRow label="Frequency Range" value="50–60Hz" isMono />
                <SpecRow label="Dimming Compatibility" value="DALI-2, 0-10V, Phase Dimming (Triac)" />
                <SpecRow label="Smart Control Option" value="Casambi / Tuya Wireless on request" />
              </dl>
            )}

            {/* Tab 3: Mechanical */}
            {activeSpecTab === "mechanical" && (
              <dl className="divide-y divide-border/80 text-xs">
                <SpecRow label="Installation / Mounting" value={product.installationMethod} isHighlight />
                {product.cutout && <SpecRow label="Ceiling Cutout Required" value={product.cutout} isHighlight isMono />}
                <SpecRow label="Overall Dimensions / Profile" value={product.dimensions} isMono />
                <SpecRow label="Housing Construction" value={product.material} />
                <SpecRow label="Ingress Protection (IP Rating)" value={product.ipRating} isHighlight isMono />
                <SpecRow label="Standard Powder-Coat Finishes" value={product.finishes.join(" / ")} />
              </dl>
            )}

            {/* Tab 4: Downloads */}
            {activeSpecTab === "downloads" && (
              <div className="space-y-4 py-2">
                <p className="text-xs text-muted leading-relaxed">
                  Download certified photometric files, dimensional CAD drawings, and the official catalogue datasheet for {product.model}.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="/pdf/Pro-Luce-Catalogue.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Pro-Luce-Catalogue.pdf"
                    className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-surface transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900 text-white font-mono text-xs font-bold shrink-0">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Catalogue Datasheet</div>
                      <div className="text-[10px] font-mono text-muted">Page {product.catalogPage} · Verified</div>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(true)}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-surface transition-colors text-left"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 font-mono text-xs font-bold shrink-0">
                      IES
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Request Photometrics</div>
                      <div className="text-[10px] font-mono text-muted">DIALux / CAD files</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Architectural Notes */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono mb-2">
              Architectural Application & Engineering Highlights
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Direct Project RFQ Banner */}
          <div className="rounded-2xl border border-neutral-900 bg-neutral-900 p-6 sm:p-8 text-white no-print shadow-lg">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Ready to specify {product.model}?
            </h3>
            <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
              Connect with our project engineering team for formal trade pricing, lead times, and tailored photometric schedules.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="rounded-lg bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:bg-neutral-100 transition-colors shadow-sm"
              >
                Request Project Quote
              </button>
              <a
                href="/pdf/Pro-Luce-Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Pro-Luce-Catalogue.pdf"
                className="rounded-lg border border-neutral-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
              >
                Open Master Catalogue
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Fixtures from the Same Category */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border pt-12 no-print">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-neutral-900">
                Related {product.category} Systems
              </h3>
              <p className="text-xs text-muted mt-0.5">Explore complementary luminaires from the collection</p>
            </div>
            <Link
              href={`/catalogue?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:underline"
            >
              View all {product.category}s &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group block rounded-xl border border-border bg-white p-4 hover:border-neutral-400 hover:shadow-md transition-all"
              >
                <div className="relative aspect-square w-full rounded-lg bg-surface overflow-hidden mb-3">
                  <Image
                    src={rel.images[0] || "/images/products/rona.png"}
                    alt={rel.model}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-3 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-xs font-semibold text-neutral-900 group-hover:underline truncate">
                  {rel.model}
                </div>
                <div className="text-[10px] font-mono text-muted mt-0.5">
                  {rel.power} · {rel.ipRating}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Specifier Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-white/95 backdrop-blur-md p-3 sm:hidden flex items-center justify-between shadow-lg no-print">
        <div>
          <div className="text-xs font-bold text-neutral-900 truncate max-w-[140px]">{product.model}</div>
          <div className="text-[10px] font-mono text-muted">{product.power} · {product.ipRating}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (inSchedule) {
                removeItem(product.id);
              } else {
                addItem(product, {
                  selectedCct,
                  selectedBeamAngle: selectedBeam,
                });
                openDrawer();
              }
            }}
            className={`rounded-lg px-2.5 py-1.5 text-[11px] font-mono font-medium transition-colors ${
              inSchedule
                ? "bg-neutral-900 text-white"
                : "border border-neutral-300 bg-white text-neutral-800"
            }`}
          >
            {inSchedule ? "✓ In List" : "+ Schedule"}
          </button>
          <button
            type="button"
            onClick={() => setIsQuoteOpen(true)}
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white"
          >
            RFQ
          </button>
        </div>
      </div>

      {/* Quote Dialog */}
      <QuoteModal
        product={product}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}

function SpecRow({
  label,
  value,
  isMono,
  isHighlight,
}: {
  label: string;
  value: string;
  isMono?: boolean;
  isHighlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between py-2.5">
      <dt className="text-muted font-medium pr-4">{label}</dt>
      <dd
        className={`text-right font-semibold ${
          isHighlight ? "text-neutral-950 font-bold" : "text-neutral-800"
        } ${isMono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface CatalogTableProps {
  products: Product[];
  onOpenQuote: (product: Product) => void;
}

export default function CatalogTable({ products, onOpenQuote }: CatalogTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-surface">
        <p className="text-sm font-medium text-neutral-900">No architectural fixtures match these criteria.</p>
        <p className="text-xs text-muted mt-1">Try relaxing some of the parametric filters in the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-white shadow-xs">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-border bg-surface text-[11px] font-mono uppercase tracking-wider text-muted">
            <th className="py-3 px-4 font-semibold">Fixture</th>
            <th className="py-3 px-4 font-semibold">Model & Series</th>
            <th className="py-3 px-4 font-semibold">Mounting</th>
            <th className="py-3 px-4 font-semibold">Power & Efficacy</th>
            <th className="py-3 px-4 font-semibold">Beam Angle</th>
            <th className="py-3 px-4 font-semibold">CCT</th>
            <th className="py-3 px-4 font-semibold">Cutout / Size</th>
            <th className="py-3 px-4 font-semibold">IP Rating</th>
            <th className="py-3 px-4 font-semibold">Voltage</th>
            <th className="py-3 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-surface/60 transition-colors">
              <td className="py-2.5 px-4 w-16">
                <Link href={`/products/${p.slug}`} className="block relative h-12 w-12 rounded border border-border/80 bg-surface overflow-hidden">
                  <Image
                    src={p.images[0] || "/images/products/rona.png"}
                    alt={p.model}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </Link>
              </td>

              <td className="py-2.5 px-4">
                <Link href={`/products/${p.slug}`} className="font-semibold text-neutral-900 hover:underline">
                  {p.model}
                </Link>
                {p.subseries && (
                  <span className="block text-[10px] text-muted">{p.subseries}</span>
                )}
                <span className="text-[10px] font-mono text-muted-light">P.{p.catalogPage}</span>
              </td>

              <td className="py-2.5 px-4 text-neutral-700">
                {p.installationMethod}
              </td>

              <td className="py-2.5 px-4">
                <span className="font-medium text-neutral-900">{p.power}</span>
                <span className="block text-[10px] font-mono text-muted">{p.lumens}</span>
              </td>

              <td className="py-2.5 px-4 font-mono text-neutral-700">
                {p.beamAngles.join(", ")}
              </td>

              <td className="py-2.5 px-4 text-[11px] text-neutral-700">
                {p.cct.slice(0, 3).join(", ")}
              </td>

              <td className="py-2.5 px-4 font-mono text-neutral-700">
                {p.cutout ? (
                  <span className="font-semibold text-neutral-900">{p.cutout}</span>
                ) : (
                  <span className="text-[11px]">{p.dimensions}</span>
                )}
              </td>

              <td className="py-2.5 px-4">
                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-surface border border-border text-neutral-800">
                  {p.ipRating}
                </span>
              </td>

              <td className="py-2.5 px-4 text-[11px] text-muted">
                {p.inputVoltage.includes("48V") ? "DC 48V" : p.inputVoltage.includes("24V") ? "DC 24V" : "AC 220V"}
              </td>

              <td className="py-2.5 px-4 text-right space-x-2 whitespace-nowrap">
                <Link
                  href={`/products/${p.slug}`}
                  className="inline-block text-[11px] font-semibold text-neutral-700 hover:text-neutral-950 underline"
                >
                  Specs
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenQuote(p)}
                  className="rounded bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold uppercase text-white hover:bg-neutral-800"
                >
                  Quote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

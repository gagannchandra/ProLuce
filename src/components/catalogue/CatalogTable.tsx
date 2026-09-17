"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX, ArrowRight, FileText } from "lucide-react";

interface CatalogTableProps {
  products: Product[];
  onOpenQuote: (product: Product) => void;
}

export default function CatalogTable({ products, onOpenQuote }: CatalogTableProps) {
  if (products.length === 0) {
    return (
      <Card className="border-dashed border-border p-12 text-center bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center space-y-3">
          <SearchX className="h-10 w-10 text-muted-foreground opacity-50" />
          <p className="text-sm font-medium text-foreground">No architectural fixtures match these criteria.</p>
          <p className="text-xs text-muted-foreground">Try relaxing some of the parametric filters in the sidebar.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden border-border bg-card shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/90 backdrop-blur-md">
            <TableRow className="border-b border-border/80 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              <TableHead className="w-16">Fixture</TableHead>
              <TableHead>Model & Series</TableHead>
              <TableHead>Mounting</TableHead>
              <TableHead>Power & Efficacy</TableHead>
              <TableHead>Beam Angle</TableHead>
              <TableHead>CCT</TableHead>
              <TableHead>Cutout / Size</TableHead>
              <TableHead>IP Rating</TableHead>
              <TableHead>Voltage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/60">
            {products.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="py-2.5 px-4 w-16">
                  <Link href={`/products/${p.slug}`} className="block relative h-12 w-12 rounded-md border border-border bg-surface overflow-hidden group">
                    <Image
                      src={p.images[0] || "/images/products/rona.png"}
                      alt={p.model}
                      fill
                      sizes="48px"
                      className="object-contain p-1 transition-transform group-hover:scale-105"
                    />
                  </Link>
                </TableCell>

                <TableCell className="py-2.5 px-4">
                  <Link href={`/products/${p.slug}`} className="font-semibold text-foreground hover:underline block text-sm">
                    {p.model}
                  </Link>
                  {p.subseries && (
                    <span className="block text-[10px] text-muted-foreground">{p.subseries}</span>
                  )}
                  <Badge variant="outline" className="text-[10px] font-mono mt-0.5">
                    P.{p.catalogPage}
                  </Badge>
                </TableCell>

                <TableCell className="py-2.5 px-4 text-muted-foreground text-xs">
                  {p.installationMethod}
                </TableCell>

                <TableCell className="py-2.5 px-4">
                  <span className="font-medium text-foreground">{p.power}</span>
                  <span className="block text-[10px] font-mono text-muted-foreground">{p.lumens}</span>
                </TableCell>

                <TableCell className="py-2.5 px-4 font-mono text-muted-foreground text-xs">
                  {p.beamAngles.join(", ")}
                </TableCell>

                <TableCell className="py-2.5 px-4 text-[11px] text-muted-foreground">
                  {p.cct.slice(0, 3).join(", ")}
                </TableCell>

                <TableCell className="py-2.5 px-4 font-mono text-foreground text-xs">
                  {p.cutout ? (
                    <span className="font-semibold">{p.cutout}</span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">{p.dimensions}</span>
                  )}
                </TableCell>

                <TableCell className="py-2.5 px-4">
                  <Badge variant="secondary" className="font-mono text-[10px] font-semibold">
                    {p.ipRating}
                  </Badge>
                </TableCell>

                <TableCell className="py-2.5 px-4 text-[11px] text-muted-foreground font-mono">
                  {p.inputVoltage.includes("48V") ? "DC 48V" : p.inputVoltage.includes("24V") ? "DC 24V" : "AC 220V"}
                </TableCell>

                <TableCell className="py-2.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                  <Button asChild variant="ghost" size="xs" className="font-mono text-xs text-foreground">
                    <Link href={`/products/${p.slug}`}>
                      Specs
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => onOpenQuote(p)}
                    className="font-mono text-[10px] uppercase font-semibold"
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    Quote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

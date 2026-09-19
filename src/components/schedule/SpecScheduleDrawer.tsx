"use client";

import Image from "next/image";
import Link from "next/link";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Trash2,
  Plus,
  Minus,
  FileSpreadsheet,
  X,
  FileText,
} from "lucide-react";

interface SpecScheduleDrawerProps {
  onRequestQuote: () => void;
}

export default function SpecScheduleDrawer({ onRequestQuote }: SpecScheduleDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    updateItem,
    clearSchedule,
    totalFixturesCount,
    isDrawerOpen,
    closeDrawer,
    exportCsv,
  } = useSpecSchedule();

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl p-0 flex flex-col bg-background border-border shadow-2xl"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-6 pb-4 border-b border-border text-left">
          <div className="flex items-center gap-2.5">
            <SheetTitle className="font-display text-xl font-normal text-foreground">
              Architectural Spec Schedule
            </SheetTitle>
            <Badge variant="secondary" className="font-mono text-xs">
              {items.length} {items.length === 1 ? "Fixture" : "Fixtures"} ({totalFixturesCount} Units)
            </Badge>
          </div>
          <SheetDescription className="text-xs text-muted-foreground mt-0.5">
            Project luminaire schedule for tender & technical specifications
          </SheetDescription>
        </SheetHeader>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground mb-4 border border-border">
                <FileSpreadsheet className="h-8 w-8" />
              </div>
              <h3 className="font-display text-lg font-normal text-foreground">
                Specification Schedule Empty
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6 font-light">
                Explore the architectural catalogue and click &ldquo;+ Schedule&rdquo; on any luminaire to construct your project specification list.
              </p>
              <Button asChild size="sm" className="font-mono text-xs uppercase tracking-wider">
                <Link href="/catalogue" onClick={closeDrawer}>
                  Browse Catalogue
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border">
                <span className="font-mono uppercase text-[11px]">Shortlisted Project Luminaires</span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={clearSchedule}
                  className="text-destructive hover:text-destructive text-xs gap-1 font-mono"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </Button>
              </div>

              {items.map((item) => {
                const p = item.product;
                const thumb = p.images[0] || "/images/products/rona.png";

                return (
                  <Card
                    key={p.id}
                    className="p-4 shadow-xs border-border bg-card transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-0 flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-surface p-1">
                        <Image
                          src={thumb}
                          alt={p.model}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${p.slug}`}
                              onClick={closeDrawer}
                              className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              {p.model}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {p.category} · P.{p.catalogPage}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeItem(p.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground touch-manipulation cursor-pointer"
                            aria-label={`Remove ${p.model} from schedule`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Specs Row */}
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge variant="outline" className="font-mono text-[10px]">
                            {p.power}
                          </Badge>
                          <Badge variant="outline" className="font-mono text-[10px]">
                            {p.ipRating}
                          </Badge>
                          {p.cutout && (
                            <Badge variant="outline" className="font-mono text-[10px]">
                              Cut: {p.cutout}
                            </Badge>
                          )}
                        </div>

                        {/* Configurable Details */}
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                          <div>
                            <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">
                              Project Tag
                            </label>
                            <Input
                              type="text"
                              value={item.projectTag || ""}
                              onChange={(e) => updateItem(p.id, { projectTag: e.target.value })}
                              placeholder="e.g. L-01"
                              className="h-8 text-xs font-mono touch-manipulation"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">
                              CCT Variant
                            </label>
                            <select
                              value={item.selectedCct || p.cct[0]}
                              onChange={(e) => updateItem(p.id, { selectedCct: e.target.value })}
                              className="w-full h-8 rounded-md border border-border bg-background px-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground touch-manipulation"
                            >
                              {p.cct.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-border">
                          <span className="text-xs text-muted-foreground font-medium">Quantity</span>
                          <div className="flex items-center gap-1.5 border border-border rounded-full bg-muted/40 px-2 py-1">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => updateQuantity(p.id, item.quantity - 1)}
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground rounded-full touch-manipulation cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="text-xs font-mono font-semibold w-8 text-center text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => updateQuantity(p.id, item.quantity + 1)}
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground rounded-full touch-manipulation cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-border/80 bg-muted/30 p-5 sm:p-6 pb-8 sm:pb-6 flex flex-col gap-2.5 sm:flex-col">
            <Button
              size="lg"
              onClick={() => {
                closeDrawer();
                onRequestQuote();
              }}
              className="w-full font-mono text-xs uppercase tracking-wider h-11 justify-between shadow-sm rounded-full px-5 bg-[#f4f0e6] hover:bg-[#eae4d5] text-neutral-950 font-bold border-none touch-manipulation cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Request Project Quotation
              </span>
              <Badge className="font-mono text-[10px] rounded-full px-2.5 bg-neutral-950 text-[#f4f0e6] font-bold border-none">
                {totalFixturesCount} units
              </Badge>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={exportCsv}
              className="w-full font-mono text-xs uppercase tracking-wider h-9 gap-1.5 rounded-full border-border hover:bg-accent touch-manipulation cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-stone-300" />
              Download Spec Schedule (.CSV)
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

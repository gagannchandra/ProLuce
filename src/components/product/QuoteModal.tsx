"use client";

import { useState, type FormEvent } from "react";
import type { Product } from "@/lib/products";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Send } from "lucide-react";

interface QuoteModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isScheduleMode?: boolean;
}

export default function QuoteModal({ product, isOpen, onClose, isScheduleMode = false }: QuoteModalProps) {
  const { items, totalFixturesCount } = useSpecSchedule();

  const [selectedCct, setSelectedCct] = useState<string>(product?.cct[0] || "3000K");
  const [selectedFinish, setSelectedFinish] = useState<string>(product?.finishes[0] || "Matte White");
  const [selectedDriver, setSelectedDriver] = useState<string>(product?.driverOptions[0] || "DALI-2");
  const [quantity, setQuantity] = useState<string>("10");
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [prevProduct, setPrevProduct] = useState(product);
  if (product !== prevProduct) {
    setPrevProduct(product);
    if (product) {
      setSelectedCct(product.cct[0] || "3000K");
      setSelectedFinish(product.finishes[0] || "Matte White");
      setSelectedDriver(product.driverOptions[0] || "DALI-2");
    }
  }

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSubmitted(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (!isScheduleMode && !product && !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-background border-border shadow-2xl">
        <DialogHeader className="border-b border-border pb-4 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
            <span>{isScheduleMode ? "Project Schedule RFQ" : product?.category}</span>
            <span>•</span>
            <span>Architectural Collection</span>
          </div>
          <DialogTitle className="text-2xl font-normal tracking-tight text-foreground font-display mt-1">
            {isScheduleMode
              ? `Project Specification: ${items.length} Luminaires`
              : `Request Quote: ${product?.model}`}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            {isScheduleMode
              ? `${totalFixturesCount} total luminaire units compiled from project shortlist`
              : `${product?.power} · ${product?.ipRating} · ${product?.dimensions}`}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground font-display">Specification Transmitted</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {isScheduleMode ? (
                <>Your project schedule request for <strong className="text-foreground">{items.length} luminaires ({totalFixturesCount} total units)</strong> has been logged. Our commercial specification engineering team will prepare your project tender documentation within 24 hours.</>
              ) : (
                <>Your architectural specification request for <strong className="text-foreground">{product?.model}</strong> has been logged. Our commercial engineering team will prepare your project quotation and schedule within 24 hours.</>
              )}
            </p>
            <div className="pt-4">
              <Button
                onClick={onClose}
                className="font-mono text-xs uppercase tracking-wider px-8 rounded-full"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Product Variant Options (Single Item Mode) */}
            {!isScheduleMode && product && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-muted/50 p-4 rounded-2xl border border-border/80">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    CCT Color Temp
                  </label>
                  <select
                    value={selectedCct}
                    onChange={(e) => setSelectedCct(e.target.value)}
                    className="w-full text-xs font-mono rounded-xl border border-border/80 bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {product.cct.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Body Finish
                  </label>
                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="w-full text-xs font-mono rounded-xl border border-border/80 bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {product.finishes.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Driver / Control
                  </label>
                  <select
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    className="w-full text-xs font-mono rounded-xl border border-border/80 bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {product.driverOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Schedule Summary (Multi-Item Mode) */}
            {isScheduleMode && (
              <div className="max-h-44 overflow-y-auto rounded-2xl border border-border/80 bg-muted/30 p-3 divide-y divide-border/60">
                {items.map((item) => (
                  <div key={item.product.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-foreground">{item.product.model}</span>
                      <span className="text-muted-foreground text-[11px] ml-2 font-mono">
                        [{item.projectTag || "Tag"}] · {item.selectedCct || item.product.cct[0]} · {item.product.power}
                      </span>
                    </div>
                    <Badge variant="secondary" className="font-mono rounded-full px-2.5 text-[10px] bg-muted/80">
                      {item.quantity} pcs
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                  Your Name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marco Rossi"
                  className="text-xs font-mono rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                  Studio / Firm <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Studio Design Associates"
                  className="text-xs font-mono rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                  Business Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="specifications@studio.com"
                  className="text-xs font-mono rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                  Phone / WhatsApp
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+39 02 1234 5678"
                  className="text-xs font-mono rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                  Project Name & City
                </label>
                <Input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Milan Flagship Galleria"
                  className="text-xs font-mono rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                  {isScheduleMode ? "Delivery Schedule / Phase" : "Estimated Quantity"}
                </label>
                <Input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={isScheduleMode ? "e.g. Phase 1: Q3 Delivery" : "e.g. 50 units / 120 meters"}
                  className="text-xs font-mono rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-1.5">
                Project Notes & Dimming Requirements
              </label>
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify ceiling types (trimless plaster-in / acoustic tile), dimming protocols (DALI-2 DT8 / Casambi), or delivery phases..."
                className="text-xs resize-none rounded-2xl p-3 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/80">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="font-mono text-xs uppercase rounded-full px-5 hover:bg-accent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="font-mono text-xs uppercase tracking-wider px-6 shadow-sm gap-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold border-none"
              >
                <Send className="h-3.5 w-3.5" />
                {isScheduleMode ? "Transmit Project RFQ" : "Submit Quote Request"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

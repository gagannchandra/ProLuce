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
                    className="w-full text-xs font-mono rounded-xl border border-border/80 bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
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
                    className="w-full text-xs font-mono rounded-xl border border-border/80 bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
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
                    className="w-full text-xs font-mono rounded-xl border border-border/80 bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Your Name *
                </label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Architect / Specifier Name"
                  className="font-mono text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Firm / Studio *
                </label>
                <Input
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Studio / Practice Name"
                  className="font-mono text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Corporate Email *
                </label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="specifier@firm.com"
                  className="font-mono text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Contact Phone
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="font-mono text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Project Name / Site
                </label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Zurich Luxury Villa"
                  className="font-mono text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Estimated Quantity
                </label>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g., 25 units"
                  className="font-mono text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                Technical Notes / Project Schedule Scope
              </label>
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify special mounting accessories, emergency battery packs, wireless mesh protocols, or custom mitered lengths..."
                className="font-mono text-xs rounded-xl resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/80">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="font-sans text-xs uppercase tracking-[0.14em] font-medium rounded-full px-5 h-10 hover:bg-accent cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="font-sans text-xs uppercase tracking-[0.14em] font-bold px-6 h-10 shadow-sm gap-2 rounded-full bg-[#f4f0e6] hover:bg-[#eae4d5] text-neutral-950 border-none cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isScheduleMode ? "Transmit Project RFQ" : "Submit Quote Request"}</span>
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

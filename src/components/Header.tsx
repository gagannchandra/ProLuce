"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import BrandLogo from "@/components/BrandLogo";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  FileSpreadsheet,
  Menu,
  ArrowRight,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items, openDrawer } = useSpecSchedule();
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Header shell — frosted glass, no heavy border ── */}
      <header className="sticky top-0 z-40 w-full bg-background/92 backdrop-blur-xl transition-colors duration-300 text-foreground">
        {/* Very fine separator — warm tint, not clinical */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-foreground/[0.07] dark:bg-foreground/[0.09]" />

        <div className="container-site flex h-[62px] sm:h-[68px] items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm group transition-transform active:scale-[0.98]"
              aria-label={`${siteConfig.name} Home`}
            >
              <BrandLogo size="md" theme="auto" />
            </Link>
          </div>

          {/* Desktop Nav — editorial letter-spacing, not military */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 text-[12.5px] font-sans tracking-[0.06em] transition-colors duration-200 ${
                    active
                      ? "text-foreground font-semibold after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1.5px] after:bg-foreground/70 after:rounded-full"
                      : "text-muted-foreground hover:text-foreground font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Search */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search luminaires and specifications"
                  className="rounded-full gap-2 px-3.5 h-9 sm:h-10 font-sans text-[12.5px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/70 cursor-pointer transition-colors"
                >
                  <Search className="h-[15px] w-[15px] sm:h-4 sm:w-4 shrink-0" />
                  <span className="hidden lg:inline">Search</span>
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-muted/80 border border-border text-muted-foreground/80 leading-none">
                    ⌘K
                  </kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-sans text-xs">
                Search catalogue & photometrics
              </TooltipContent>
            </Tooltip>

            {/* Spec Schedule */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={items.length > 0 ? "default" : "outline"}
                  size="sm"
                  onClick={openDrawer}
                  aria-label="Open project luminaire schedule"
                  className={`rounded-full gap-2 px-4 h-9 sm:h-10 font-sans text-[12px] tracking-[0.06em] font-semibold transition-all duration-200 cursor-pointer ${
                    items.length > 0
                      ? "bg-[#f0ece0] hover:bg-[#e6e0d0] text-neutral-950 border border-[#ddd6c6] shadow-sm"
                      : "border-border/70 bg-transparent text-foreground hover:bg-accent/70 shadow-none"
                  }`}
                >
                  <FileSpreadsheet className="h-[15px] w-[15px] sm:h-4 sm:w-4 text-current shrink-0" />
                  <span className="hidden sm:inline">Schedule</span>
                  {items.length > 0 && (
                    <Badge className="px-1.5 h-[18px] min-w-[18px] rounded-full text-[10.5px] font-mono bg-neutral-950 text-[#f0ece0] font-bold border-none leading-none">
                      {items.length}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-sans text-xs">
                {items.length > 0
                  ? `${items.length} fixture ${items.length === 1 ? "family" : "families"} in spec schedule`
                  : "Project schedule is empty"}
              </TooltipContent>
            </Tooltip>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Sheet Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-lg h-9 w-9 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground hover:bg-accent/70"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[82vw] max-w-xs p-0 flex flex-col bg-background text-foreground border-l border-border/60"
              >
                <SheetHeader className="px-6 py-5 border-b border-border/50 bg-surface/60">
                  <SheetTitle className="sr-only">{siteConfig.name}</SheetTitle>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="inline-block outline-none"
                    aria-label={`${siteConfig.name} Home`}
                  >
                    <BrandLogo size="md" theme="auto" />
                  </Link>
                  <SheetDescription className="sr-only">
                    {siteConfig.tagline}
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col justify-between">
                  <nav className="flex flex-col gap-0.5">
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-[13px] font-sans tracking-[0.04em] font-medium transition-colors ${
                        pathname === "/"
                          ? "bg-accent text-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      }`}
                    >
                      <span>Home</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                    </Link>

                    {NAV_LINKS.map((link) => {
                      const active = isLinkActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl text-[13px] font-sans tracking-[0.04em] font-medium transition-colors ${
                            active
                              ? "bg-accent text-foreground font-semibold"
                              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="flex flex-col gap-2.5 pt-5 mt-4 border-t border-border/50">
                    <ThemeToggle showLabel className="w-full justify-between font-sans tracking-[0.05em] text-[13px] font-medium" />

                    <Button
                      variant="outline"
                      className="justify-between h-11 text-[12.5px] font-sans tracking-[0.04em] font-medium rounded-xl px-4 border-border/60 bg-card text-foreground hover:bg-accent/70"
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        Search Catalogue
                      </span>
                      <kbd className="px-1.5 py-0.5 text-[11px] font-mono bg-muted text-muted-foreground rounded-md border border-border">⌘K</kbd>
                    </Button>

                    <Button
                      className="justify-between h-11 text-[12.5px] font-sans tracking-[0.04em] font-semibold rounded-xl px-4 bg-[#f0ece0] hover:bg-[#e6e0d0] text-neutral-950 border border-[#ddd6c6]"
                      onClick={() => {
                        setMobileOpen(false);
                        openDrawer();
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        Project Schedule
                      </span>
                      <Badge className="font-mono text-[11px] px-2 py-0.5 bg-neutral-950 text-[#f0ece0] font-bold border-none rounded-full">
                        {items.length}
                      </Badge>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

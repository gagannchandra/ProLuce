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
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors duration-200 text-foreground">
        <div className="container-site flex h-16 sm:h-[70px] items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm group transition-transform active:scale-[0.98]"
              aria-label={`${siteConfig.name} Home`}
            >
              <BrandLogo size="md" theme="auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active
                      ? "text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-foreground"
                      : "text-muted-foreground hover:text-foreground font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Search Trigger */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search luminaires and specifications"
                  className="rounded-full gap-2 px-4 h-9 sm:h-10 font-sans text-xs sm:text-[13px] font-medium text-foreground border-border/80 bg-background/80 hover:bg-accent cursor-pointer shadow-2xs"
                >
                  <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  <span className="hidden lg:inline">Search</span>
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border text-muted-foreground">
                    ⌘K
                  </kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Search catalogue & photometrics (Cmd+K)
              </TooltipContent>
            </Tooltip>

            {/* Spec Schedule Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={items.length > 0 ? "default" : "outline"}
                  size="sm"
                  onClick={openDrawer}
                  aria-label="Open project luminaire schedule"
                  className={`rounded-full gap-2 px-4 h-9 sm:h-10 font-sans text-xs sm:text-[13px] uppercase tracking-[0.12em] font-semibold transition-all duration-200 cursor-pointer ${
                    items.length > 0
                      ? "bg-[#f4f0e6] hover:bg-[#eae4d5] text-neutral-950 border border-[#e6dfd1] shadow-xs"
                      : "border-border/80 bg-background/80 text-foreground hover:bg-accent shadow-2xs"
                  }`}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-current" />
                  <span className="hidden sm:inline">
                    Schedule
                  </span>
                  {items.length > 0 && (
                    <Badge className="px-1.5 h-4.5 min-w-[18px] rounded-full text-[11px] font-mono bg-neutral-950 text-[#f4f0e6] font-bold border-none">
                      {items.length}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {items.length > 0
                  ? `${items.length} fixture family(ies) in spec schedule`
                  : "Project schedule is empty"}
              </TooltipContent>
            </Tooltip>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Sheet Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-lg h-9 w-9 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground hover:bg-accent"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm p-0 flex flex-col bg-background text-foreground border-l border-border"
              >
                <SheetHeader className="p-6 text-center border-b border-border bg-muted/30">
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

                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-xs sm:text-sm font-sans uppercase tracking-[0.14em] font-medium transition-colors ${
                        pathname === "/"
                          ? "bg-accent text-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      }`}
                    >
                      <span>Home</span>
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </Link>

                    {NAV_LINKS.map((link) => {
                      const active = isLinkActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl text-xs sm:text-sm font-sans uppercase tracking-[0.14em] font-medium transition-colors ${
                            active
                              ? "bg-accent text-foreground font-semibold"
                              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4 opacity-50" />
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="flex flex-col gap-3 pt-6 border-t border-border">
                    {/* Mobile Theme Switcher */}
                    <ThemeToggle showLabel className="w-full justify-between font-sans uppercase tracking-[0.14em] text-xs font-medium" />

                    <Button
                      variant="outline"
                      className="justify-between h-11 text-xs font-sans uppercase tracking-[0.14em] font-medium rounded-xl px-4 border-border bg-card text-foreground hover:bg-accent"
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        Search Catalogue
                      </span>
                      <kbd className="px-1.5 py-0.5 text-[11px] font-mono bg-muted text-muted-foreground rounded border border-border">⌘K</kbd>
                    </Button>

                    <Button
                      className="justify-between h-11 text-xs font-sans uppercase tracking-[0.14em] font-bold rounded-xl px-4 bg-[#f4f0e6] hover:bg-[#eae4d5] text-neutral-950 border border-[#e6dfd1]"
                      onClick={() => {
                        setMobileOpen(false);
                        openDrawer();
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        Project Schedule
                      </span>
                      <Badge className="font-mono text-[11px] px-2 py-0.5 bg-neutral-950 text-[#f4f0e6] font-bold border-none rounded-full">
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

      {/* Global Command Palette Dialog */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

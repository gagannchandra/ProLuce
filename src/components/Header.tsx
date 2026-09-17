"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import CommandPalette from "@/components/CommandPalette";
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
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors duration-200">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm group transition-transform active:scale-[0.98]"
              aria-label={`${siteConfig.name} Home`}
            >
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] transition-transform duration-300 group-hover:scale-125" />
              <div className="flex flex-col">
                <span className="text-xl font-medium tracking-[0.18em] uppercase font-display leading-none text-foreground">
                  {siteConfig.name}
                </span>
                <span className="text-[9px] tracking-[0.22em] uppercase font-mono text-muted-foreground hidden sm:block mt-0.5">
                  {siteConfig.tagline}
                </span>
              </div>
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
                  className={`relative py-1 text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                    active
                      ? "text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-500"
                      : "text-muted-foreground hover:text-foreground font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search luminaires and specifications"
                  className="rounded-full gap-2 px-3.5 h-9 font-mono text-xs text-muted-foreground hover:text-foreground border-border/80 bg-surface/50 hover:bg-accent"
                >
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="hidden lg:inline text-[11px]">Search</span>
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono rounded bg-muted border border-border text-muted-foreground">
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
                  className={`rounded-full gap-2 px-3.5 h-9 font-mono text-xs transition-all duration-200 ${
                    items.length > 0
                      ? "bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold border-none shadow-xs"
                      : "border-border/80 text-foreground hover:bg-accent"
                  }`}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-current" />
                  <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                    Schedule
                  </span>
                  {items.length > 0 && (
                    <Badge className="px-1.5 h-4 min-w-[18px] rounded-full text-[9px] font-mono bg-neutral-950 text-amber-400 font-bold border-none">
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

            {/* Mobile Sheet Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-lg h-9 w-9 text-foreground hover:bg-accent"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm p-0 flex flex-col bg-background border-l border-border"
              >
                <SheetHeader className="p-6 text-left border-b border-border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    <SheetTitle className="text-xl font-display uppercase tracking-widest font-bold">
                      {siteConfig.name}
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-0.5">
                    {siteConfig.tagline}
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                        pathname === "/"
                          ? "bg-accent text-foreground font-bold"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      }`}
                    >
                      <span>Home</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>

                    {NAV_LINKS.map((link) => {
                      const active = isLinkActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                            active
                              ? "bg-accent text-foreground font-bold"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="flex flex-col gap-3 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      className="justify-between h-11 text-xs font-mono uppercase tracking-wider rounded-xl px-4"
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        Search Catalogue
                      </span>
                      <kbd className="px-1.5 py-0.5 text-[10px] bg-muted rounded border border-border">⌘K</kbd>
                    </Button>

                    <Button
                      className="justify-between h-11 text-xs font-mono uppercase tracking-wider rounded-xl px-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold"
                      onClick={() => {
                        setMobileOpen(false);
                        openDrawer();
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        Project Schedule
                      </span>
                      <Badge className="font-mono text-[10px] px-2 py-0.5 bg-neutral-950 text-amber-400 font-bold border-none rounded-full">
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

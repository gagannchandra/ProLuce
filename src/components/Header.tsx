"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, mainNav } from "@/lib/site";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import CommandPalette from "@/components/CommandPalette";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalFixturesCount, items, openDrawer } = useSpecSchedule();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur-md transition-all">
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex flex-col gap-1.5 md:hidden p-2 -ml-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className={`block h-0.5 w-5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            <Link href="/" className="flex flex-col group">
              <span className="text-xl md:text-2xl font-semibold tracking-wider uppercase text-neutral-900 font-display">
                PRO-LUCE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block -mt-1">
                Architectural Lighting Systems
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-7">
            {mainNav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="py-2 text-xs font-medium uppercase tracking-widest text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-md border border-border bg-white py-2 shadow-lg ring-1 ring-black/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-surface transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Specifier Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search with Cmd+K */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-surface/80 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
              aria-label="Search fixtures (Cmd+K)"
            >
              <SearchIcon />
              <span className="hidden lg:inline text-xs font-medium">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-white border border-neutral-200 text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Specifier Schedule Shortlist */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-800 hover:border-neutral-900 transition-colors shadow-2xs"
              aria-label="Open project luminaire schedule"
            >
              <ScheduleIcon />
              <span className="hidden sm:inline">Schedule</span>
              {items.length > 0 && (
                <span className="inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full bg-neutral-900 text-[10px] font-mono font-semibold text-white">
                  {items.length}
                </span>
              )}
            </button>

            {/* PDF Catalogue Download */}
            <a
              href={siteConfig.catalogPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Pro-Luce-Catalogue.pdf"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-2xs"
            >
              <DownloadIcon />
              <span>PDF Catalogue</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="border-t border-border bg-white md:hidden animate-in slide-in-from-top-2 duration-150">
            <div className="container-site py-4 space-y-3">
              <div className="pb-3 border-b border-border/50">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-2 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600"
                >
                  <SearchIcon />
                  <span>Search 99 luminaires...</span>
                </button>
              </div>

              {mainNav.map((item) => (
                <div key={item.href} className="border-b border-border/50 pb-2">
                  <Link
                    href={item.href}
                    className="block text-sm font-semibold uppercase tracking-wider text-neutral-900 py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-3 pt-1 space-y-1">
                      {item.children.slice(1).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block text-xs text-muted hover:text-foreground py-1"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openDrawer();
                  }}
                  className="flex items-center justify-center gap-2 w-full rounded-md border border-neutral-300 bg-white py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900"
                >
                  <ScheduleIcon />
                  <span>Project Schedule ({items.length} fixtures, {totalFixturesCount} units)</span>
                </button>

                <a
                  href={siteConfig.catalogPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Pro-Luce-Catalogue.pdf"
                  className="flex items-center justify-center gap-2 w-full rounded-md bg-neutral-900 py-2.5 text-xs font-medium uppercase tracking-wider text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  <DownloadIcon />
                  <span>Download Catalogue (PDF)</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" strokeLinecap="round" />
    </svg>
  );
}

function ScheduleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

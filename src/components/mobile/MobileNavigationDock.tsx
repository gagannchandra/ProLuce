"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSpecSchedule } from "@/context/SpecScheduleContext";
import CommandPalette from "@/components/CommandPalette";
import {
  Compass,
  FileSpreadsheet,
  Search,
  Sparkles,
  Mail,
} from "lucide-react";

export default function MobileNavigationDock() {
  const pathname = usePathname();
  const { items, totalFixturesCount, openDrawer } = useSpecSchedule();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide slightly when scrolling fast down, reveal on scroll up for cleaner view
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Listen for global custom search trigger event if dispatched
  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    window.addEventListener("open-mobile-search", handleOpenSearch);
    return () => window.removeEventListener("open-mobile-search", handleOpenSearch);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        aria-label="Mobile Bottom Navigation Dock"
        className={`fixed bottom-3 inset-x-3 z-40 md:hidden max-w-sm mx-auto transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-24"
        }`}
      >
        <div className="relative rounded-full border border-border/90 bg-background/92 backdrop-blur-2xl shadow-2xl p-1.5 flex items-center justify-between gap-1 text-foreground transition-all duration-300">
          
          {/* 1. Home Link */}
          <Link
            href="/"
            aria-label="ProLuce Home"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all touch-manipulation cursor-pointer ${
              pathname === "/"
                ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-wider mt-0.5 font-medium">Home</span>
          </Link>

          {/* 2. Catalogue Link */}
          <Link
            href="/catalogue"
            aria-label="Architectural Catalogue"
            aria-current={isLinkActive("/catalogue") ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all touch-manipulation cursor-pointer ${
              isLinkActive("/catalogue")
                ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-wider mt-0.5 font-medium">Catalogue</span>
          </Link>

          {/* 3. Search Trigger Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search luminaires and specifications"
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all touch-manipulation cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-wider mt-0.5 font-medium">Search</span>
          </button>

          {/* 4. Spec Schedule Drawer Trigger with Live Badge */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open Spec Schedule (${totalFixturesCount} fixtures)`}
            className={`flex-1 relative flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all touch-manipulation cursor-pointer ${
              items.length > 0
                ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <div className="relative">
              <FileSpreadsheet className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 h-3.5 min-w-3.5 px-1 flex items-center justify-center rounded-full bg-neutral-950 text-[#f4f0e6] text-[8px] font-mono font-bold">
                  {items.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider mt-0.5">Schedule</span>
          </button>

          {/* 5. Contact / RFQ */}
          <Link
            href="/contact"
            aria-label="Contact ProLuce"
            aria-current={isLinkActive("/contact") ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all touch-manipulation cursor-pointer ${
              isLinkActive("/contact")
                ? "bg-[#f4f0e6] text-neutral-950 font-bold border border-[#e6dfd1] shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-wider mt-0.5 font-medium">RFQ</span>
          </Link>

        </div>
      </nav>

      {/* Global Search Palette for Mobile */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

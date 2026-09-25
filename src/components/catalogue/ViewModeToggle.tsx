"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Table } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

export default function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <Tabs
      value={viewMode}
      onValueChange={(val) => onViewModeChange(val as "grid" | "table")}
      className="w-auto"
    >
      <TabsList className="bg-muted/70 p-1 h-9 rounded-full border border-border/40 gap-1 flex items-center">
        <TabsTrigger
          value="grid"
          className="h-full gap-1.5 font-mono text-xs px-3.5 rounded-full data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:font-semibold data-[state=active]:shadow-xs cursor-pointer transition-all flex items-center justify-center"
          aria-label="Switch to Gallery Grid View"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Gallery Grid</span>
        </TabsTrigger>

        <TabsTrigger
          value="table"
          className="h-full gap-1.5 font-mono text-xs px-3.5 rounded-full data-[state=active]:bg-[#f4f0e6] data-[state=active]:text-neutral-950 data-[state=active]:border data-[state=active]:border-[#e6dfd1] data-[state=active]:font-semibold data-[state=active]:shadow-xs cursor-pointer transition-all flex items-center justify-center"
          aria-label="Switch to Engineering Matrix Table View"
        >
          <Table className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Engineering Matrix</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

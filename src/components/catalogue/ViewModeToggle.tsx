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
      <TabsList className="bg-muted/70 p-1 h-9 rounded-full border border-border/40">
        <TabsTrigger
          value="grid"
          className="gap-1.5 font-mono text-xs px-3.5 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
          aria-label="Switch to Gallery Grid View"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Gallery Grid</span>
        </TabsTrigger>

        <TabsTrigger
          value="table"
          className="gap-1.5 font-mono text-xs px-3.5 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
          aria-label="Switch to Engineering Matrix Table View"
        >
          <Table className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Engineering Matrix</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

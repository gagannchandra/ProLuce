"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Product } from "@/lib/products";

export interface ScheduleItem {
  product: Product;
  quantity: number;
  selectedCct?: string;
  selectedBeamAngle?: string;
  selectedFinish?: string;
  projectTag?: string; // e.g., "L-01", "Lobby Downlight", "Corridor Linear"
}

interface SpecScheduleContextType {
  items: ScheduleItem[];
  addItem: (product: Product, options?: Partial<ScheduleItem>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItem: (productId: string, updates: Partial<ScheduleItem>) => void;
  clearSchedule: () => void;
  isInSchedule: (productId: string) => boolean;
  getItem: (productId: string) => ScheduleItem | undefined;
  totalFixturesCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  exportCsv: () => void;
}

const STORAGE_KEY = "proluce_spec_schedule";

const SpecScheduleContext = createContext<SpecScheduleContextType | undefined>(undefined);

export function SpecScheduleProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch {
        // ignore storage access errors
      }
      setHasHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync to localStorage on state change (after hydration)
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage access errors
    }
  }, [items, hasHydrated]);

  const addItem = useCallback((product: Product, options?: Partial<ScheduleItem>) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          quantity: current.quantity + (options?.quantity || 1),
          selectedCct: options?.selectedCct || current.selectedCct,
          selectedBeamAngle: options?.selectedBeamAngle || current.selectedBeamAngle,
          selectedFinish: options?.selectedFinish || current.selectedFinish,
          projectTag: options?.projectTag || current.projectTag,
        };
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity: options?.quantity || 1,
          selectedCct: options?.selectedCct || product.cct[0] || "3000K",
          selectedBeamAngle: options?.selectedBeamAngle || product.beamAngles[0] || "24°",
          selectedFinish: options?.selectedFinish || product.finishes[0] || "Matte White",
          projectTag: options?.projectTag || `LT-${String(prev.length + 1).padStart(2, "0")}`,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const updateItem = useCallback((productId: string, updates: Partial<ScheduleItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, ...updates } : item
      )
    );
  }, []);

  const clearSchedule = useCallback(() => {
    setItems([]);
  }, []);

  const isInSchedule = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items]
  );

  const getItem = useCallback(
    (productId: string) => items.find((item) => item.product.id === productId),
    [items]
  );

  const totalFixturesCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((v) => !v), []);

  const exportCsv = useCallback(() => {
    if (items.length === 0) return;

    const headers = [
      "Project Tag",
      "Model",
      "Category",
      "Subseries",
      "Power",
      "Lumens",
      "Selected CCT",
      "Selected Beam",
      "Selected Finish",
      "IP Rating",
      "Input Voltage",
      "Dimensions",
      "Cutout",
      "Quantity",
      "Catalogue Page",
    ];

    const rows = items.map((item) => [
      `"${item.projectTag || ""}"`,
      `"${item.product.model}"`,
      `"${item.product.category}"`,
      `"${item.product.subseries || ""}"`,
      `"${item.product.power}"`,
      `"${item.product.lumens}"`,
      `"${item.selectedCct || item.product.cct.join(", ")}"`,
      `"${item.selectedBeamAngle || item.product.beamAngles.join(", ")}"`,
      `"${item.selectedFinish || item.product.finishes.join(", ")}"`,
      `"${item.product.ipRating}"`,
      `"${item.product.inputVoltage}"`,
      `"${item.product.dimensions}"`,
      `"${item.product.cutout || "N/A"}"`,
      item.quantity,
      `P.${item.product.catalogPage}`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Pro-Luce-Luminaire-Schedule-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [items]);

  return (
    <SpecScheduleContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateItem,
        clearSchedule,
        isInSchedule,
        getItem,
        totalFixturesCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        exportCsv,
      }}
    >
      {children}
    </SpecScheduleContext.Provider>
  );
}

export function useSpecSchedule() {
  const context = useContext(SpecScheduleContext);
  if (!context) {
    throw new Error("useSpecSchedule must be used within a SpecScheduleProvider");
  }
  return context;
}

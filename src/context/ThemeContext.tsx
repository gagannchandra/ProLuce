"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "proluce-theme";

function applyThemeToDOM(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", resolved === "dark" ? "#0d0f0d" : "#faf9f6");
  }
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSavedTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const val = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return val === "light" || val === "dark" || val === "system" ? val : "dark";
  } catch {
    return "dark";
  }
}

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);

  const mediaQuery = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const handleMediaChange = () => {
    callback();
  };

  mediaQuery?.addEventListener("change", handleMediaChange);

  return () => {
    listeners = listeners.filter((cb) => cb !== callback);
    mediaQuery?.removeEventListener("change", handleMediaChange);
  };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getSavedTheme,
    () => "dark" as Theme
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? getSystemTheme() : theme;

  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
    const nextResolved = newTheme === "system" ? getSystemTheme() : newTheme;
    applyThemeToDOM(nextResolved);
    emitChange();
  };

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

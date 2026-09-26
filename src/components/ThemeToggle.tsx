"use client";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={showLabel ? "sm" : "icon-sm"}
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`rounded-full transition-all duration-300 cursor-pointer border border-border/80 bg-background/80 hover:bg-accent text-foreground hover:text-foreground shadow-2xs ${
            showLabel ? "px-3.5 gap-2 h-9 font-mono text-xs" : "h-9 w-9 sm:h-10 sm:w-10"
          } ${className}`}
        >
          <div className="relative flex items-center justify-center">
            <Sun
              className={`h-4 w-4 transition-all duration-300 ${
                isDark
                  ? "scale-0 rotate-90 opacity-0 absolute"
                  : "scale-100 rotate-0 opacity-100 text-amber-500"
              }`}
            />
            <Moon
              className={`h-4 w-4 transition-all duration-300 ${
                isDark
                  ? "scale-100 rotate-0 opacity-100 text-[#f4f0e6]"
                  : "scale-0 -rotate-90 opacity-0 absolute"
              }`}
            />
          </div>
          {showLabel && (
            <span className="font-sans uppercase tracking-[0.14em] text-xs font-medium">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="font-mono text-xs">
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </TooltipContent>
    </Tooltip>
  );
}

export default ThemeToggle;

"use client";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SunMedium, MoonStar } from "lucide-react";

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
          variant="ghost"
          size={showLabel ? "sm" : "icon"}
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`rounded-full cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent/70 transition-all duration-200 ${
            showLabel
              ? "px-3.5 gap-2.5 h-9 font-sans text-[13px] tracking-[0.04em] justify-between w-full"
              : "h-9 w-9 sm:h-10 sm:w-10"
          } ${className}`}
        >
          <div className="relative flex items-center justify-center w-4 h-4">
            <SunMedium
              className={`absolute h-[17px] w-[17px] transition-all duration-300 ${
                isDark
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100 text-amber-500/90"
              }`}
            />
            <MoonStar
              className={`absolute h-[15px] w-[15px] transition-all duration-300 ${
                isDark
                  ? "scale-100 rotate-0 opacity-100 text-[#f0ece0]/90"
                  : "scale-0 -rotate-90 opacity-0"
              }`}
            />
          </div>
          {showLabel && (
            <span className="font-medium text-foreground">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="font-sans text-xs">
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </TooltipContent>
    </Tooltip>
  );
}

export default ThemeToggle;

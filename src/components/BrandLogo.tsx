import { siteConfig } from "@/lib/site";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
  align?: "left" | "center";
  theme?: "dark" | "light" | "auto";
}

export default function BrandLogo({
  size = "md",
  className = "",
  showTagline = true,
  align = "center",
  theme = "auto",
}: BrandLogoProps) {
  const isLeft = align === "left";

  const sizeConfig = {
    sm: {
      title: "text-lg sm:text-xl tracking-[0.22em]",
      tagline: "text-[13px] sm:text-sm",
      barWidth: "w-3.5 sm:w-4",
      barHeight: "h-[1.5px]",
      gap: "gap-1.5",
      spacing: "mt-0.5",
    },
    md: {
      title: "text-xl sm:text-[23px] tracking-[0.22em]",
      tagline: "text-[15px] sm:text-[17px] md:text-[18px]",
      barWidth: "w-4 sm:w-6",
      barHeight: "h-[1.5px]",
      gap: "gap-2",
      spacing: "mt-0.5",
    },
    lg: {
      title: "text-2xl sm:text-[28px] tracking-[0.24em]",
      tagline: "text-base sm:text-[18px] md:text-[19px]",
      barWidth: "w-6 sm:w-8",
      barHeight: "h-[2px]",
      gap: "gap-2.5",
      spacing: "mt-1",
    },
    xl: {
      title: "text-3xl sm:text-4xl tracking-[0.25em]",
      tagline: "text-lg sm:text-[22px]",
      barWidth: "w-8 sm:w-11",
      barHeight: "h-[2px]",
      gap: "gap-3",
      spacing: "mt-1.5",
    },
  }[size];

  const titleColor =
    theme === "dark"
      ? "text-[#fbfaf7] group-hover:text-[#fbfaf7]"
      : theme === "light"
      ? "text-neutral-900 group-hover:text-neutral-900"
      : "text-foreground group-hover:text-foreground";

  const taglineColor =
    theme === "dark"
      ? "text-[#d1d8cf] group-hover:text-[#fbfaf7]"
      : theme === "light"
      ? "text-neutral-600 group-hover:text-neutral-900"
      : "text-muted-foreground group-hover:text-foreground";

  return (
    <div
      className={`inline-flex flex-col select-none group transition-opacity duration-200 hover:opacity-95 ${
        isLeft ? "items-start text-left" : "items-center justify-center text-center"
      } ${className}`}
    >
      {/* Brand Title: PRO-LUCE */}
      <span
        className={`font-display uppercase font-semibold leading-none ${titleColor} tracking-[0.22em] transition-colors ${sizeConfig.title}`}
      >
        {siteConfig.name}
      </span>

      {/* Italian Flag Themed Tagline: Green Line + Script Tagline + Red Line */}
      {showTagline && (
        <div
          className={`flex items-center ${
            isLeft ? "justify-start" : "justify-center"
          } ${sizeConfig.gap} ${sizeConfig.spacing}`}
        >
          {/* Italian Green Bar */}
          <span
            className={`bg-[#008C45] rounded-full shrink-0 ${sizeConfig.barHeight} ${sizeConfig.barWidth} transition-all duration-300 group-hover:opacity-90`}
            aria-hidden="true"
          />

          {/* Script Tagline */}
          <span
            className={`font-script font-normal ${taglineColor} transition-colors leading-none whitespace-nowrap ${sizeConfig.tagline}`}
          >
            {siteConfig.tagline}
          </span>

          {/* Italian Red Bar */}
          <span
            className={`bg-[#CD212A] rounded-full shrink-0 ${sizeConfig.barHeight} ${sizeConfig.barWidth} transition-all duration-300 group-hover:opacity-90`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

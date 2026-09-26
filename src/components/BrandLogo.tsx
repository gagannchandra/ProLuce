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
      title: "text-[17px] sm:text-[19px] tracking-[0.17em]",
      tagline: "text-[12.5px] sm:text-[13.5px]",
      barWidth: "w-3 sm:w-3.5",
      barHeight: "h-[1px]",
      gap: "gap-1.5",
      spacing: "mt-0.5",
    },
    md: {
      title: "text-[19px] sm:text-[22px] tracking-[0.17em]",
      tagline: "text-[14px] sm:text-[16px] md:text-[17px]",
      barWidth: "w-3.5 sm:w-5",
      barHeight: "h-[1px]",
      gap: "gap-2",
      spacing: "mt-0.5",
    },
    lg: {
      title: "text-[22px] sm:text-[26px] tracking-[0.18em]",
      tagline: "text-[14.5px] sm:text-[17px] md:text-[18px]",
      barWidth: "w-5 sm:w-7",
      barHeight: "h-[1.5px]",
      gap: "gap-2.5",
      spacing: "mt-1",
    },
    xl: {
      title: "text-[28px] sm:text-[34px] tracking-[0.19em]",
      tagline: "text-[17px] sm:text-[20px]",
      barWidth: "w-7 sm:w-10",
      barHeight: "h-[1.5px]",
      gap: "gap-3",
      spacing: "mt-1.5",
    },
  }[size];

  const titleColor =
    theme === "dark"
      ? "text-[#f5f3ee]"
      : theme === "light"
      ? "text-neutral-900"
      : "text-foreground";

  const taglineColor =
    theme === "dark"
      ? "text-[#b8c4b4]/90"
      : theme === "light"
      ? "text-neutral-500"
      : "text-muted-foreground";

  return (
    <div
      className={`inline-flex flex-col select-none transition-opacity duration-200 hover:opacity-90 ${
        isLeft ? "items-start text-left" : "items-center justify-center text-center"
      } ${className}`}
    >
      {/* Logotype — refined tracking */}
      <span
        className={`font-display uppercase font-semibold leading-none ${titleColor} transition-colors ${sizeConfig.title}`}
        style={{ fontFeatureSettings: '"kern" 1, "liga" 1' }}
      >
        {siteConfig.name}
      </span>

      {/* Tagline with Italian tricolore accent lines */}
      {showTagline && (
        <div
          className={`flex items-center ${
            isLeft ? "justify-start" : "justify-center"
          } ${sizeConfig.gap} ${sizeConfig.spacing}`}
        >
          {/* Verde */}
          <span
            className={`bg-[#008C45] rounded-full shrink-0 opacity-90 ${sizeConfig.barHeight} ${sizeConfig.barWidth}`}
            aria-hidden="true"
          />

          {/* Script tagline */}
          <span
            className={`font-script font-normal ${taglineColor} transition-colors leading-none whitespace-nowrap ${sizeConfig.tagline}`}
          >
            {siteConfig.tagline}
          </span>

          {/* Rosso */}
          <span
            className={`bg-[#CD212A] rounded-full shrink-0 opacity-90 ${sizeConfig.barHeight} ${sizeConfig.barWidth}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

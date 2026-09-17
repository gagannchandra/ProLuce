"use client";

import React from "react";

export interface BeamAngleIconProps extends React.SVGProps<SVGSVGElement> {
  angle: number | string;
  isSelected?: boolean;
}

/**
 * High-performance, parametric vector icon for optical beam angles.
 * Replaces raster/boxy SVGs with pure vector geometry that scales crisply
 * and dynamically respects text colors (currentColor) and dark/light themes.
 */
export function BeamAngleIcon({
  angle,
  isSelected = false,
  className = "h-5 w-5",
  ...props
}: BeamAngleIconProps) {
  const deg =
    typeof angle === "number"
      ? angle
      : parseInt(String(angle).replace(/[^0-9]/g, ""), 10) || 36;

  // ViewBox: 0 0 24 24
  // Emitter apex at (12, 4.5)
  // Floor level at y = 19.5
  const rad = (deg * Math.PI) / 360;
  // Calculate spread width at base (clamped between 2.2 and 9.5 for icon aesthetic balance)
  const spread = Math.min(9.5, Math.max(2.2, Math.tan(rad) * 14));
  const xLeft = (12 - spread).toFixed(2);
  const xRight = (12 + spread).toFixed(2);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible transition-transform duration-200 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Luminaire Emitter Housing & Optical Aperture at Top */}
      <rect
        x="9"
        y="2.5"
        width="6"
        height="2"
        rx="0.5"
        fill="currentColor"
        className={isSelected ? "opacity-95" : "opacity-75"}
      />

      {/* Optical Cone Fill */}
      <polygon
        points={`12,4.5 ${xLeft},19.5 ${xRight},19.5`}
        fill="currentColor"
        className={isSelected ? "opacity-25" : "opacity-15"}
      />

      {/* Boundary Ray Lines */}
      <line
        x1="12"
        y1="4.5"
        x2={xLeft}
        y2="19.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className={isSelected ? "opacity-90" : "opacity-60"}
      />
      <line
        x1="12"
        y1="4.5"
        x2={xRight}
        y2="19.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className={isSelected ? "opacity-90" : "opacity-60"}
      />

      {/* Floor Footprint Arc */}
      <path
        d={`M ${xLeft} 19.5 Q 12 21 ${xRight} 19.5`}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className={isSelected ? "opacity-80" : "opacity-50"}
      />

      {/* Centerline Ray (for narrow spots) */}
      {deg <= 24 && (
        <line
          x1="12"
          y1="4.5"
          x2="12"
          y2="17.5"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          className={isSelected ? "opacity-50" : "opacity-30"}
        />
      )}
    </svg>
  );
}

export default BeamAngleIcon;

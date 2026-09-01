"use client";

import { useId, useState } from "react";
import { HoverPlayLogo } from "@/components/HoverPlayLogo";

const RING_TEXT = "UX/UI & PRODUCT DESIGNER";
/** Midpoint between inner (45.3682) and outer (73.2444) ring radii */
const TEXT_RING_RADIUS = (45.3682 + 73.2444) / 2;
const TEXT_RING_CIRCUMFERENCE = 2 * Math.PI * TEXT_RING_RADIUS;

export function CircleWidget({ className = "" }: { className?: string }) {
  const textPathId = useId();
  const [hovered, setHovered] = useState(false);
  const ringLabel = `${RING_TEXT}  •  `.repeat(2);

  return (
    <div
      className={`absolute left-[-278px] top-[136px] aspect-square w-[clamp(140px,22vmin,249px)] ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Rotating designer badge"
    >
      {/* Rotating rings from Circle.svg */}
      <div className="animate-spin-slow pointer-events-none absolute inset-0">
        <svg
          viewBox="0 0 208 208"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g>
            <circle
              cx="103.541"
              cy="103.541"
              r="73.2444"
              transform="rotate(39.9996 103.541 103.541)"
              stroke="#E9DFCE"
              strokeWidth="0.5"
            />
            <circle
              cx="103.541"
              cy="103.541"
              r="45.3682"
              transform="rotate(39.9996 103.541 103.541)"
              stroke="#E9DFCE"
              strokeWidth="0.470183"
            />
          </g>
        </svg>
      </div>

      {/* Rotating text ring between the two circles */}
      <div className="animate-spin-slow pointer-events-none absolute inset-0">
        <svg viewBox="0 0 208 208" className="h-full w-full" aria-hidden>
          <defs>
            <path
              id={textPathId}
              d={`M 104,104 m -${TEXT_RING_RADIUS},0 a ${TEXT_RING_RADIUS},${TEXT_RING_RADIUS} 0 1,1 ${TEXT_RING_RADIUS * 2},0 a ${TEXT_RING_RADIUS},${TEXT_RING_RADIUS} 0 1,1 -${TEXT_RING_RADIUS * 2},0`}
            />
          </defs>
          <text
            fill="#E9DFCE"
            fontSize="10"
            fontWeight="400"
            letterSpacing="1.4"
            dominantBaseline="central"
            fontFamily="var(--font-sans), system-ui, sans-serif"
          >
            <textPath
              href={`#${textPathId}`}
              startOffset="0%"
              textLength={Math.round(TEXT_RING_CIRCUMFERENCE * 0.97)}
              lengthAdjust="spacing"
            >
              {ringLabel}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center logo — static; animates only while pointer is over the widget */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <HoverPlayLogo
          active={hovered}
          className="relative z-10 size-[clamp(28px,20%,50px)]"
          alt="Dineshkumar logo"
        />
      </div>
    </div>
  );
}

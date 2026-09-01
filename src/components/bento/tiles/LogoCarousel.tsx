"use client";

import Image from "next/image";
import type { Logo } from "@/lib/portfolio-data";

type LogoCarouselProps = {
  logos: Logo[];
  durationMs?: number;
};

export function LogoCarousel({ logos, durationMs = 7000 }: LogoCarouselProps) {
  const track = [...logos, ...logos];

  return (
    <div
      className="logo-carousel-mask group relative mt-4 w-full overflow-hidden"
      aria-label="Companies I've collaborated with"
    >
      <div
        className="logo-carousel-track flex w-max items-center gap-10"
        style={{ animationDuration: `${durationMs}ms` }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="relative h-7 w-24 shrink-0 opacity-70 transition-opacity hover:opacity-100"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { LetterSlideText } from "@/components/LetterSlideText";

type NavLabelHoverProps = {
  label: string;
};

export function NavLabelHover({ label }: NavLabelHoverProps) {
  return (
    <span className="letter-slide-label mt-1 block h-5 overflow-hidden text-sm font-semibold leading-none tracking-tight text-[var(--foreground)] opacity-80 transition-opacity duration-200 group-hover:opacity-100">
      <LetterSlideText text={label} />
    </span>
  );
}

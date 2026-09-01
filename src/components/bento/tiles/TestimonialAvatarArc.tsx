"use client";

import Image from "next/image";
import type { Testimonial } from "@/lib/portfolio-data";

type TestimonialAvatarArcProps = {
  testimonials: Testimonial[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function TestimonialAvatarArc({
  testimonials,
  activeId,
  onSelect,
}: TestimonialAvatarArcProps) {
  return (
    <div className="flex flex-col gap-2">
      {testimonials.map((testimonial, i) => {
        const isActive = testimonial.id === activeId;
        const offset = i === 0 || i === testimonials.length - 1 ? "translate-x-1" : "";
        return (
          <button
            key={testimonial.id}
            type="button"
            aria-label={`Show testimonial from ${testimonial.name}`}
            aria-pressed={isActive}
            onClick={() => onSelect(testimonial.id)}
            className={`relative size-8 overflow-hidden rounded-full transition-all duration-200 ${offset} ${
              isActive
                ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--background)]"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}

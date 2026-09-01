"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BentoTile } from "@/components/bento/BentoTile";
import { TestimonialAvatarArc } from "@/components/bento/tiles/TestimonialAvatarArc";
import { testimonials } from "@/lib/portfolio-data";

export function TestimonyTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  const [activeId, setActiveId] = useState(testimonials[0]?.id ?? "");
  const active =
    testimonials.find((t) => t.id === activeId) ?? testimonials[0];

  return (
    <BentoTile label="Testimony" className={className} index={index}>
      <div className="flex h-full min-h-0 items-center gap-3 p-4 sm:gap-4 sm:p-5">
        <div className="flex shrink-0 items-center gap-2">
          <TestimonialAvatarArc
            testimonials={testimonials}
            activeId={activeId}
            onSelect={setActiveId}
          />
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full sm:size-16">
            <Image
              src={active.avatar}
              alt={active.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <span className="font-script text-3xl leading-none text-white/80">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="line-clamp-3 text-xs leading-relaxed text-[var(--muted)]">
                {active.quote}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {active.name}
              </p>
              <span className="mt-1 inline-block rounded-full bg-[rgba(255,255,255,0.08)] px-2 py-0.5 text-xs text-[var(--muted)]">
                {active.company}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BentoTile>
  );
}

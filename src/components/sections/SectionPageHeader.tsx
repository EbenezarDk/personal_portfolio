"use client";

import { motion } from "framer-motion";

type SectionPageHeaderProps = {
  kicker: string;
  title: string;
  className?: string;
};

export function SectionPageHeader({
  kicker,
  title,
  className = "",
}: SectionPageHeaderProps) {
  return (
    <motion.div
      className={`relative mb-[60px] flex w-full flex-col gap-5 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[clamp(12px,1.4vw,16px)] font-medium tracking-tight text-white">
        {kicker}
      </p>

      <h2 className="flex w-full select-none justify-between font-display text-[clamp(44px,12vw,160px)] font-bold uppercase leading-[0.85] text-[rgba(255,255,255,0.05)]">
        {[...title.toUpperCase()].map((char, index) => (
          <span key={`${char}-${index}`}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    </motion.div>
  );
}

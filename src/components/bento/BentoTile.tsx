"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BentoTileProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  index?: number;
};

export function BentoTile({
  children,
  className = "",
  label,
  index = 0,
}: BentoTileProps) {
  return (
    <motion.article
      aria-label={label}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: Math.min(index * 0.06, 0.5),
      }}
    >
      {children}
    </motion.article>
  );
}

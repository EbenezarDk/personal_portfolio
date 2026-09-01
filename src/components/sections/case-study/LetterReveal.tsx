"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotateX: -92,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.95,
      delay: i * 0.05,
      ease,
    },
  }),
};

type LetterRevealProps = {
  text: string;
  className?: string;
};

export function LetterReveal({ text, className }: LetterRevealProps) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {[...text].map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={ch === " " ? "ltr space" : "ltr"}
          variants={letterVariants}
          custom={i}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

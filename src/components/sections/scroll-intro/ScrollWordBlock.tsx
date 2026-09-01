"use client";

import { motion } from "framer-motion";

type ScrollWordBlockProps = {
  words: string[];
  revealProgress: number;
  className?: string;
  reducedMotion?: boolean;
};

const EASE = [0, 0, 0.15, 1] as const;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ScrollWordBlock({
  words,
  revealProgress,
  className = "",
  reducedMotion = false,
}: ScrollWordBlockProps) {
  return (
    <div className={`scroll-intro-block ${className}`.trim()}>
      {words.map((word, i) => {
        const localProgress = revealProgress - i;
        const revealed = reducedMotion || localProgress >= 1;
        const linearT = reducedMotion
          ? 1
          : Math.min(1, Math.max(0, localProgress));
        const t = easeOutCubic(linearT);

        return (
          <motion.span
            key={`${word}-${i}`}
            initial={false}
            animate={{
              opacity: revealed ? 1 : t,
              y: revealed ? 0 : 32 * (1 - t),
            }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{
              display: "inline-block",
              marginRight: "0.32em",
              willChange: "transform, opacity",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

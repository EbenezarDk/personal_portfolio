"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

import { KINETIC_LETTER_CLASSNAME } from "@/components/ui/kinetic-text";
import { cn } from "@/lib/utils";

const motionElements = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;

const slideLeftItemVariants: Variants = {
  hidden: { x: 20, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

type KineticTextAnimateProps = {
  text: string;
  as?: MotionElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  startOnView?: boolean;
  once?: boolean;
  accessible?: boolean;
};

export function KineticTextAnimate({
  text,
  as: Component = "p",
  className,
  delay = 0,
  duration = 0.3,
  startOnView = false,
  once = true,
  accessible = false,
  style,
}: KineticTextAnimateProps) {
  const letters = text.split("");
  const MotionComponent = motionElements[Component];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: duration / letters.length,
      },
    },
  };

  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      animate={startOnView ? undefined : "show"}
      whileInView={startOnView ? "show" : undefined}
      viewport={{ once }}
      className={cn("flex flex-wrap font-[300]", className)}
      style={mergedStyle}
      aria-label={accessible ? text : undefined}
    >
      {accessible ? <span className="sr-only">{text}</span> : null}
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          variants={slideLeftItemVariants}
          aria-hidden={accessible ? true : undefined}
          className={KINETIC_LETTER_CLASSNAME}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      {!accessible ? <span className="sr-only">{text}</span> : null}
    </MotionComponent>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type CaseStudySectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function CaseStudySectionReveal({
  children,
  className = "",
  delay = 0,
  id,
}: CaseStudySectionRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </motion.section>
  );
}

export function CaseStudyKicker({ children }: { children: ReactNode }) {
  return <p className="cs-kicker">{children}</p>;
}

export function CaseStudyLinkPill({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className="cs-link-pill"
      whileHover={reducedMotion ? undefined : { x: 4 }}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <span>{label}</span>
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <path
          d="M6 14L14 6M14 6H7M14 6V13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}

export function CaseStudyCta({
  href,
  label,
  accent = false,
}: {
  href: string;
  label: string;
  accent?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`cs-cta ${accent ? "cs-cta--accent" : ""}`.trim()}
      whileHover={reducedMotion ? undefined : { scale: 1.03 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      <span>{label}</span>
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path
          d="M6 14L14 6M14 6H7M14 6V13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}

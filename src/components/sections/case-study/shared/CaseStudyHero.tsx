"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyHero } from "@/lib/case-studies/types";
import { CaseStudyCta } from "./CaseStudySectionReveal";

const ease = [0.16, 1, 0.3, 1] as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  }),
};

type CaseStudyHeroSectionProps = {
  hero: CaseStudyHero;
};

export function CaseStudyHeroSection({ hero }: CaseStudyHeroSectionProps) {
  const reducedMotion = useReducedMotion();

  const isBanner = hero.layout === "banner";

  return (
    <header
      className={`cs-hero${isBanner ? " cs-hero--banner" : ""}`}
    >
      <motion.div
        className="cs-hero__inner"
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.img
          custom={0}
          variants={item}
          src={hero.logoSrc}
          alt={hero.logoAlt}
          className="cs-hero__logo"
          width={210}
          height={69}
        />
        <motion.p custom={1} variants={item} className="cs-hero__tagline">
          {hero.tagline}
        </motion.p>
        <motion.div custom={2} variants={item} className="cs-hero__art-wrap">
          <img
            src={hero.illustrationSrc}
            alt={hero.illustrationAlt}
            className="cs-hero__art"
            width={312}
            height={355}
          />
        </motion.div>
        {hero.ctaLabel && hero.ctaHref ? (
          <motion.div custom={3} variants={item}>
            <CaseStudyCta
              href={hero.ctaHref}
              label={hero.ctaLabel}
              accent
            />
          </motion.div>
        ) : null}
      </motion.div>
    </header>
  );
}

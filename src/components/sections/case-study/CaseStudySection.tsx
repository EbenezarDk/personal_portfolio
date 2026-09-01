"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaygroundCarousel } from "@/hooks/usePlaygroundCarousel";
import { PlaygroundIndicators } from "./PlaygroundIndicators";
import { PlaygroundProjectOverlay } from "./PlaygroundProjectOverlay";
import { AnimatedCtaButton } from "./AnimatedCtaButton";
import { LetterReveal } from "./LetterReveal";
import {
  getProjectLabel,
  type PlaygroundProject,
} from "@/lib/playground-projects";
import { SITE_MAX_WIDTH_CLASSES } from "@/lib/layout";
import { cn } from "@/lib/utils";
import "./case-study.css";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16, transition: { duration: 0.35, ease, delay: 0.05 } },
  transition: { duration: 0.45, ease, delay: 0.15 },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease },
};

export function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [overlayProject, setOverlayProject] = useState<PlaygroundProject | null>(
    null,
  );

  const { activeIndex, activeProject, goTo, setIsPaused } =
    usePlaygroundCarousel(sectionRef);

  useEffect(() => {
    setIsPaused(overlayProject !== null);
  }, [overlayProject, setIsPaused]);

  return (
    <section
      id="playground"
      ref={sectionRef}
      className={cn("case mx-auto w-full scroll-mt-28", SITE_MAX_WIDTH_CLASSES)}
      aria-label="My playground"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {getProjectLabel(activeProject)}
      </div>

      <PlaygroundIndicators
        activeIndex={activeIndex}
        onSelect={goTo}
        onActiveClick={() => setOverlayProject(activeProject)}
      />

      <PlaygroundProjectOverlay
        project={overlayProject}
        onClose={() => setOverlayProject(null)}
      />

      <div className="wrap">
        <motion.div className="kicker" {...fadeUp}>
          My playground
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.span
            key={activeProject.id + "-title"}
            {...fadeLeft}
            className="case-title"
            style={{ display: "block" }}
          >
            <LetterReveal text={activeProject.title} className="title" />
            {activeProject.titleLine2 ? (
              <LetterReveal
                text={activeProject.titleLine2}
                className="title title-line-2"
              />
            ) : null}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeProject.id + "-lede"}
            className="lede"
            {...fadeLeft}
            transition={{ ...fadeLeft.transition, delay: 0.23 }}
          >
            {activeProject.lede}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id + "-cta"}
            className="case-cta"
            {...fadeLeft}
            transition={{ ...fadeLeft.transition, delay: 0.31 }}
          >
            <AnimatedCtaButton
              href={activeProject.ctaHref}
              label={activeProject.ctaLabel}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

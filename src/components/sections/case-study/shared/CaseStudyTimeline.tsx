"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyDesignProgress } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyTimelineProps = {
  designProgress: CaseStudyDesignProgress;
};

export function CaseStudyTimeline({
  designProgress,
}: CaseStudyTimelineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <CaseStudySectionReveal className="cs-timeline cs-section">
      <div className="cs-timeline__sticky">
        <CaseStudyKicker>{designProgress.kicker}</CaseStudyKicker>
        <h3 className="cs-heading">{designProgress.heading}</h3>
        <div className="cs-timeline__months" aria-hidden="true">
          {designProgress.months.map((month, i) => (
            <motion.div
              key={`${month}-${i}`}
              className="cs-timeline__month"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.45 }}
            >
              <span>{month}</span>
              <motion.span
                className="cs-timeline__tick"
                initial={reducedMotion ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="cs-timeline__phases">
        {designProgress.phases.map((phase, phaseIndex) => (
          <motion.div
            key={phase.label}
            className="cs-timeline__phase"
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: phaseIndex * 0.08, duration: 0.55 }}
          >
            <span className="cs-timeline__phase-label">{phase.label}</span>
            <div className="cs-timeline__phase-track">
              {phase.milestones.map((milestone, mi) => (
                <span key={milestone} className="cs-timeline__phase-item">
                  <motion.span
                    className="cs-chip"
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={
                      reducedMotion ? false : { opacity: 0.4, scale: 0.92 }
                    }
                    viewport={{ once: true }}
                    transition={{ delay: phaseIndex * 0.08 + mi * 0.05 }}
                    whileHover={
                      reducedMotion ? undefined : { y: -3, scale: 1.02 }
                    }
                  >
                    {milestone}
                  </motion.span>
                  {mi < phase.milestones.length - 1 ? (
                    <span className="cs-timeline__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </CaseStudySectionReveal>
  );
}

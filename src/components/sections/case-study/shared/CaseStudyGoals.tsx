"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyGoals } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyGoalsSectionProps = {
  goals: CaseStudyGoals;
};

export function CaseStudyGoalsSection({ goals }: CaseStudyGoalsSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{goals.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{goals.heading}</h3>
      <ul className="cs-goal-list">
        {goals.items.map((goal, i) => (
          <motion.li
            key={goal.label}
            initial={reducedMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <span className="cs-goal-list__label">{goal.label}</span>
            <p>{goal.text}</p>
          </motion.li>
        ))}
      </ul>
    </CaseStudySectionReveal>
  );
}

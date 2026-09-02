"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyResearch } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyResearchSectionProps = {
  research: CaseStudyResearch;
};

export function CaseStudyResearchSection({
  research,
}: CaseStudyResearchSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{research.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{research.heading}</h3>
      <p className="cs-body">{research.paragraph}</p>
      <CaseStudyKicker>{research.opportunitiesKicker}</CaseStudyKicker>
      <ul className="cs-opportunity-list">
        {research.opportunities.map((item, i) => (
          <motion.li
            key={item}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </CaseStudySectionReveal>
  );
}

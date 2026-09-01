"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyDiagramSection } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudyLinkPill,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyDiagramProps = {
  section: CaseStudyDiagramSection;
};

export function CaseStudyIASection({ section }: CaseStudyDiagramProps) {
  const reducedMotion = useReducedMotion();

  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{section.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{section.heading}</h3>
      <p className="cs-body">{section.paragraph}</p>
      {section.imageSrc ? (
        <motion.figure
          className="cs-diagram__figure"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={section.imageSrc}
            alt={section.imageAlt ?? section.heading}
            className="cs-diagram__img"
            loading="lazy"
          />
        </motion.figure>
      ) : null}
      {section.link ? (
        <CaseStudyLinkPill
          href={section.link.href}
          label={section.link.label}
        />
      ) : null}
    </CaseStudySectionReveal>
  );
}

export function CaseStudyUserFlowSection({ section }: CaseStudyDiagramProps) {
  const reducedMotion = useReducedMotion();

  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{section.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{section.heading}</h3>
      <p className="cs-body">{section.paragraph}</p>
      {section.imageSrc ? (
        <motion.figure
          className="cs-diagram__figure"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={section.imageSrc}
            alt={section.imageAlt ?? section.heading}
            className="cs-diagram__img"
            loading="lazy"
          />
        </motion.figure>
      ) : null}
      {section.link ? (
        <div className="cs-showcase__actions">
          <CaseStudyLinkPill
            href={section.link.href}
            label={section.link.label}
          />
        </div>
      ) : null}
    </CaseStudySectionReveal>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type {
  CaseStudyProblemBrief,
  CaseStudyTextBlock,
} from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyBriefProps = {
  projectBrief: CaseStudyTextBlock;
  problemBrief: CaseStudyProblemBrief;
};

export function CaseStudyBrief({
  projectBrief,
  problemBrief,
}: CaseStudyBriefProps) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(problemBrief.painPoints[0]?.id ?? "");

  return (
    <div className="cs-briefs cs-section">
      <CaseStudySectionReveal>
        <CaseStudyKicker>{projectBrief.kicker}</CaseStudyKicker>
        <h3 className="cs-heading">{projectBrief.heading}</h3>
        {projectBrief.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="cs-body">
            {paragraph}
          </p>
        ))}
      </CaseStudySectionReveal>

      <CaseStudySectionReveal delay={0.05}>
        <h3 className="cs-heading" id="problem-brief">
          {problemBrief.heading}
        </h3>
        {problemBrief.intro ? (
          <p className="cs-problem__intro">{problemBrief.intro}</p>
        ) : null}
        <div
          className="cs-problem__grid"
          role="list"
          aria-labelledby="problem-brief"
        >
          {problemBrief.painPoints.map((point, i) => {
            const isActive = activeId === point.id;
            return (
              <motion.button
                key={point.id}
                type="button"
                role="listitem"
                className={`cs-problem__chip ${isActive ? "cs-problem__chip--active" : ""}`.trim()}
                onClick={() => setActiveId(point.id)}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                aria-expanded={isActive}
              >
                <p className="cs-problem__chip-title">{point.title}</p>
                {isActive ? (
                  <motion.p
                    className="cs-problem__chip-detail"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {point.detail}
                  </motion.p>
                ) : null}
              </motion.button>
            );
          })}
        </div>
      </CaseStudySectionReveal>
    </div>
  );
}

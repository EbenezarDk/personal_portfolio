"use client";

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
      </CaseStudySectionReveal>
    </div>
  );
}

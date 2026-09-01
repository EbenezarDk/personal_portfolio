"use client";

import type { CaseStudyOutcomes } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyOutcomesSectionProps = {
  outcomes: CaseStudyOutcomes;
};

export function CaseStudyOutcomesSection({
  outcomes,
}: CaseStudyOutcomesSectionProps) {
  return (
    <CaseStudySectionReveal className="cs-section cs-outcomes">
      <div>
        <CaseStudyKicker>{outcomes.kicker}</CaseStudyKicker>
        <h3 className="cs-subheading">{outcomes.achievedHeading}</h3>
        <p className="cs-body">{outcomes.achievedText}</p>
      </div>
      <div>
        <h3 className="cs-subheading">{outcomes.lessonsHeading}</h3>
        <p className="cs-body">{outcomes.lessonsText}</p>
      </div>
    </CaseStudySectionReveal>
  );
}

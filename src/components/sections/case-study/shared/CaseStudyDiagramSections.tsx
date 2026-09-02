"use client";

import type { CaseStudyDiagramSection } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

type CaseStudyDiagramProps = {
  section: CaseStudyDiagramSection;
};

export function CaseStudyIASection({ section }: CaseStudyDiagramProps) {
  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{section.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{section.heading}</h3>
      <p className="cs-body">{section.paragraph}</p>
    </CaseStudySectionReveal>
  );
}

export function CaseStudyUserFlowSection({ section }: CaseStudyDiagramProps) {
  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{section.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{section.heading}</h3>
      <p className="cs-body">{section.paragraph}</p>
    </CaseStudySectionReveal>
  );
}

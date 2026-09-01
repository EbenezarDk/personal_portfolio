import type { CaseStudyContent } from "./types";
import { agilusCaseStudy } from "./agilus-case-study";

const caseStudyRegistry: Record<string, CaseStudyContent> = {
  agilus: agilusCaseStudy,
};

export function getCaseStudy(projectId: string): CaseStudyContent | null {
  return caseStudyRegistry[projectId] ?? null;
}

export function hasCaseStudy(projectId: string): boolean {
  return projectId in caseStudyRegistry;
}

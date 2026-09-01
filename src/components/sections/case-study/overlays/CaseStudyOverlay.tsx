"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { CaseStudyContent } from "@/lib/case-studies/types";
import type { PlaygroundProject } from "@/lib/playground-projects";
import { PlaygroundOverlayShell } from "./PlaygroundOverlayShell";
import { CaseStudyHeroSection } from "../shared/CaseStudyHero";
import { CaseStudyBrief } from "../shared/CaseStudyBrief";
import { CaseStudyTimeline } from "../shared/CaseStudyTimeline";
import { CaseStudyAudienceSection } from "../shared/CaseStudyAudience";
import { CaseStudyGoalsSection } from "../shared/CaseStudyGoals";
import { CaseStudyResearchSection } from "../shared/CaseStudyResearch";
import {
  CaseStudyIASection,
  CaseStudyUserFlowSection,
} from "../shared/CaseStudyDiagramSections";
import { CaseStudyShowcaseSection } from "../shared/CaseStudyShowcase";
import { CaseStudyOutcomesSection } from "../shared/CaseStudyOutcomes";
import { CaseStudyFooterSection } from "../shared/CaseStudyFooter";
import { useOverlayScrollProgress } from "../shared/useOverlayScrollTrigger";
import "../case-study-page.css";

type CaseStudyOverlayProps = {
  project: PlaygroundProject;
  content: CaseStudyContent;
  onClose: () => void;
  onOpenProject?: (project: PlaygroundProject) => void;
  nextProject?: PlaygroundProject | null;
};

export function CaseStudyOverlay({
  project,
  content,
  onClose,
  onOpenProject,
  nextProject,
}: CaseStudyOverlayProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const scrollRef = bodyRef as RefObject<HTMLElement | null>;

  useOverlayScrollProgress(scrollRef, progressRef);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const handleNextProject = () => {
    if (nextProject && onOpenProject) {
      onOpenProject(nextProject);
    }
  };

  return (
    <PlaygroundOverlayShell
      project={project}
      onClose={onClose}
      bodyClassName="playground-overlay__body--flush"
      headerTitle={project.title}
      bodyRef={bodyRef}
    >
      <div className="cs-page">
        <div className="cs-progress" aria-hidden="true">
          <span ref={progressRef} className="cs-progress__bar" />
        </div>

        <CaseStudyHeroSection hero={content.hero} />
        <CaseStudyBrief
          projectBrief={content.projectBrief}
          problemBrief={content.problemBrief}
        />
        <CaseStudyTimeline designProgress={content.designProgress} />
        <CaseStudyAudienceSection audience={content.audience} />
        <CaseStudyGoalsSection goals={content.goals} />
        <CaseStudyResearchSection research={content.research} />
        <CaseStudyIASection section={content.informationArchitecture} />
        <CaseStudyUserFlowSection section={content.userFlow} />

        {content.showcases.map((showcase) => (
          <CaseStudyShowcaseSection
            key={showcase.id}
            showcase={showcase}
            scrollRef={scrollRef}
          />
        ))}

        <CaseStudyOutcomesSection outcomes={content.outcomes} />
        <CaseStudyFooterSection
          footer={content.footer}
          onNextProject={
            nextProject && onOpenProject ? handleNextProject : undefined
          }
        />
      </div>
    </PlaygroundOverlayShell>
  );
}

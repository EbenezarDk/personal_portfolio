"use client";

import { useEffect, useRef } from "react";
import type { CaseStudyContent } from "@/lib/case-studies/types";
import type { PlaygroundProject } from "@/lib/playground-projects";
import { PlaygroundOverlayShell } from "./PlaygroundOverlayShell";
import { CaseStudyHeroSection } from "../shared/CaseStudyHero";
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
}: CaseStudyOverlayProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  return (
    <PlaygroundOverlayShell
      project={project}
      onClose={onClose}
      bodyClassName="playground-overlay__body--flush"
      headerTitle={project.title}
      bodyRef={bodyRef}
    >
      <div className="cs-page">
        <CaseStudyHeroSection
          projectId={project.id}
          hero={content.hero}
          projectBrief={content.projectBrief}
        />
      </div>
    </PlaygroundOverlayShell>
  );
}

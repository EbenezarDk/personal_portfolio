"use client";

import type { PlaygroundProject } from "@/lib/playground-projects";
import { playgroundProjects } from "@/lib/playground-projects";
import { getCaseStudy } from "@/lib/case-studies/registry";
import { CaseStudyOverlay } from "./overlays/CaseStudyOverlay";
import { GenericPlaygroundOverlay } from "./overlays/GenericPlaygroundOverlay";
import { PlaygroundOverlayPresence } from "./overlays/PlaygroundOverlayShell";

type PlaygroundProjectOverlayProps = {
  project: PlaygroundProject | null;
  onClose: () => void;
  onOpenProject?: (project: PlaygroundProject) => void;
};

function getNextProject(current: PlaygroundProject): PlaygroundProject | null {
  const index = playgroundProjects.findIndex((p) => p.id === current.id);
  if (index === -1 || index >= playgroundProjects.length - 1) return null;
  return playgroundProjects[index + 1] ?? null;
}

export function PlaygroundProjectOverlay({
  project,
  onClose,
  onOpenProject,
}: PlaygroundProjectOverlayProps) {
  return (
    <PlaygroundOverlayPresence project={project}>
      {(activeProject) => {
        const content = getCaseStudy(activeProject.id);
        if (content) {
          return (
            <CaseStudyOverlay
              project={activeProject}
              content={content}
              onClose={onClose}
              onOpenProject={onOpenProject}
              nextProject={getNextProject(activeProject)}
            />
          );
        }
        return (
          <GenericPlaygroundOverlay
            project={activeProject}
            onClose={onClose}
          />
        );
      }}
    </PlaygroundOverlayPresence>
  );
}

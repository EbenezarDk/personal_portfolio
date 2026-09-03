"use client";

import type { PlaygroundProject } from "@/lib/playground-projects";
import {
  getOverlayDummyMedia,
  overlayDummyOverviewParagraphs,
} from "@/lib/overlay-dummy-content";
import { OverlaySplitIntro } from "../shared/OverlaySplitIntro";
import { PlaygroundOverlayShell } from "./PlaygroundOverlayShell";

type GenericPlaygroundOverlayProps = {
  project: PlaygroundProject;
  onClose: () => void;
};

export function GenericPlaygroundOverlay({
  project,
  onClose,
}: GenericPlaygroundOverlayProps) {
  return (
    <PlaygroundOverlayShell
      project={project}
      onClose={onClose}
      bodyClassName="playground-overlay__body--flush"
      headerTitle={
        <>
          {project.title}
          {project.titleLine2 ? (
            <span className="playground-overlay__title-line-2">
              {project.titleLine2}
            </span>
          ) : null}
        </>
      }
    >
      <OverlaySplitIntro
        heading={project.featuredName}
        subheading={project.lede}
        body={overlayDummyOverviewParagraphs[0] ?? ""}
        media={getOverlayDummyMedia(project.id)}
      />
    </PlaygroundOverlayShell>
  );
}

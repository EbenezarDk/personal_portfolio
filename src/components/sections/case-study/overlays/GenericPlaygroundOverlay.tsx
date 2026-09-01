"use client";

import type { PlaygroundProject } from "@/lib/playground-projects";
import {
  overlayDummyDetailsParagraphs,
  overlayDummyHeroImage,
  overlayDummyInlineImage,
  overlayDummyMidScrollParagraphs,
  overlayDummyOverviewParagraphs,
} from "@/lib/overlay-dummy-content";
import { PlaygroundOverlayShell } from "./PlaygroundOverlayShell";

type GenericPlaygroundOverlayProps = {
  project: PlaygroundProject;
  onClose: () => void;
};

function getCoverBackground(project: PlaygroundProject): string {
  if (project.coverSrc) {
    return `url(${project.coverSrc})`;
  }
  return `url(${overlayDummyHeroImage})`;
}

export function GenericPlaygroundOverlay({
  project,
  onClose,
}: GenericPlaygroundOverlayProps) {
  return (
    <PlaygroundOverlayShell
      project={project}
      onClose={onClose}
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
      <div
        className="playground-overlay__cover"
        style={{ backgroundImage: getCoverBackground(project) }}
      />

      <div className="playground-overlay__content">
        <p className="playground-overlay__lede">{project.lede}</p>
        <p className="playground-overlay__featured">
          Featured: {project.featuredName}
        </p>
      </div>

      <h3 className="playground-overlay__section-title">Overview</h3>
      {overlayDummyOverviewParagraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="playground-overlay__text">
          {paragraph}
        </p>
      ))}

      <figure className="playground-overlay__figure">
        <img
          src={overlayDummyInlineImage}
          alt=""
          loading="lazy"
          width={1280}
          height={853}
        />
      </figure>

      {overlayDummyMidScrollParagraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="playground-overlay__text">
          {paragraph}
        </p>
      ))}

      <h3 className="playground-overlay__section-title">Details</h3>
      {overlayDummyDetailsParagraphs.map((paragraph) => (
        <p
          key={`details-${paragraph.slice(0, 32)}`}
          className="playground-overlay__text"
        >
          {paragraph}
        </p>
      ))}
    </PlaygroundOverlayShell>
  );
}

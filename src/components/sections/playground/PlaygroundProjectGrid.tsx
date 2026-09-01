"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { PlaygroundProjectOverlay } from "@/components/sections/case-study/PlaygroundProjectOverlay";
import {
  playgroundProjects,
  type PlaygroundProject,
} from "@/lib/playground-projects";
import {
  PlaygroundGridCard,
  expandClasses,
  type CardExpandDirection,
} from "./PlaygroundGridCard";

const TOP_ROW_COUNT = 3;

/** Top row: 3 cards. At md (2-col) positions differ from xl (3-col). */
function topRowExpandClass(index: number): string {
  switch (index) {
    case 0:
      // Always left edge — expand right only
      return expandClasses.start;
    case 1:
      // md: right of pair; xl: middle of three (both sides)
      return [
        expandClasses.end,
        "xl:hover:-ml-5 xl:hover:-mr-5 xl:hover:w-[calc(100%+40px)]",
      ].join(" ");
    case 2:
      // md: alone on next row (left); xl: right edge
      return [
        expandClasses.start,
        "xl:hover:-ml-5 xl:hover:w-[calc(100%+20px)]",
      ].join(" ");
    default:
      return expandClasses.both;
  }
}

function bottomRowExpandDirection(
  index: number,
  total: number,
): CardExpandDirection {
  if (total === 1) return "start";
  if (index === 0) return "start";
  if (index === total - 1) return "end";
  return "both";
}

export function PlaygroundProjectGrid() {
  const [overlayProject, setOverlayProject] =
    useState<PlaygroundProject | null>(null);

  const topRow = playgroundProjects.slice(0, TOP_ROW_COUNT);
  const bottomProjects = playgroundProjects.slice(TOP_ROW_COUNT);

  return (
    <>
      <PlaygroundProjectOverlay
        project={overlayProject}
        onClose={() => setOverlayProject(null)}
        onOpenProject={setOverlayProject}
      />

      <Container className="pb-16 pt-8 lg:pb-24 lg:pt-12">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-10 overflow-visible md:grid-cols-2 xl:grid-cols-3">
            {topRow.map((project, index) => (
              <PlaygroundGridCard
                key={project.id}
                project={project}
                expandClassName={topRowExpandClass(index)}
                onOpen={() => setOverlayProject(project)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-10 overflow-visible md:grid-cols-2">
            {bottomProjects.map((project, index) => (
              <PlaygroundGridCard
                key={project.id}
                project={project}
                expandDirection={bottomRowExpandDirection(
                  index,
                  bottomProjects.length,
                )}
                onOpen={() => setOverlayProject(project)}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

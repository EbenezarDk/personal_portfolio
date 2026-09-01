"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";
import { playgroundProjects, getProjectLabel } from "@/lib/playground-projects";

type PlaygroundIndicatorsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  onActiveClick?: () => void;
};

function usePillDimensions() {
  const [dims, setDims] = useState({ width: 160, height: 100 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        setDims({ width: 72, height: 48 });
      } else if (w <= 768) {
        setDims({ width: 112, height: 72 });
      } else if (w <= 1200) {
        setDims({ width: 140, height: 88 });
      } else {
        setDims({ width: 160, height: 100 });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

export function PlaygroundIndicators({
  activeIndex,
  onSelect,
  onActiveClick,
}: PlaygroundIndicatorsProps) {
  const { width: pillWidth, height: pillHeight } = usePillDimensions();

  return (
    <div
      className="case-indicators"
      role="tablist"
      aria-label="Project navigation"
    >
      <Dock direction="middle" className="case-dock">
        {playgroundProjects.map((project, i) => {
          const isActive = i === activeIndex;
          return (
            <DockIcon
              key={project.id}
              className="case-dock-icon"
              pill
              disableMagnification
              pillWidth={pillWidth}
              pillHeight={pillHeight}
              size={pillHeight}
            >
              <motion.button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={
                  isActive
                    ? `Open ${getProjectLabel(project)}`
                    : `View ${getProjectLabel(project)}`
                }
                className={`case-indicator${isActive ? " case-indicator--active" : ""}`}
                onClick={() => {
                  if (isActive) {
                    onActiveClick?.();
                  } else {
                    onSelect(i);
                  }
                }}
                animate={{
                  borderColor: isActive
                    ? "rgba(45, 255, 87, 1)"
                    : "rgba(233, 223, 206, 0.15)",
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {project.coverSrc ? (
                  <img
                    src={project.coverSrc}
                    alt=""
                    className="case-indicator__thumb"
                    loading={isActive ? "eager" : "lazy"}
                  />
                ) : (
                  <span
                    className="case-indicator__thumb case-indicator__thumb--gradient"
                    style={{ background: project.coverGradient }}
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}

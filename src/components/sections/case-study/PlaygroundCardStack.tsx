"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { playgroundProjects, getProjectLabel } from "@/lib/playground-projects";
import type { PlaygroundProject } from "@/lib/playground-projects";

const TOTAL = playgroundProjects.length;

const CARD_STACK_GAP_VH = 3; // visible air between card edges; flank y tuned to preserve gap

type RelativeOffset = -2 | -1 | 0 | 1 | 2;

const stackSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

const centerScaleSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 22,
  mass: 0.85,
};

const reducedTransition = {
  duration: 0.2,
  ease: "linear" as const,
};

type SlotLayout = {
  y: string;
  scale: number;
  rotate: number;
  skewY: number;
  opacity: number;
  zIndex: number;
};

function getRelativeOffset(
  projectIndex: number,
  activeIndex: number,
): RelativeOffset {
  let diff = projectIndex - activeIndex;
  if (diff > Math.floor(TOTAL / 2)) diff -= TOTAL;
  if (diff < -Math.floor(TOTAL / 2)) diff += TOTAL;
  return Math.max(-2, Math.min(2, diff)) as RelativeOffset;
}

function getSlotLayout(offset: RelativeOffset): SlotLayout {
  switch (offset) {
    case -2:
      return {
        y: "-38vh",
        scale: 0.5,
        rotate: -4,
        skewY: -3,
        opacity: 0,
        zIndex: 0,
      };
    case -1:
      return {
        y: "-26vh",
        scale: 0.68,
        rotate: -3,
        skewY: -3,
        opacity: 0.85,
        zIndex: 1,
      };
    case 0:
      return {
        y: "0vh",
        scale: 1,
        rotate: 2.5,
        skewY: 2,
        opacity: 1,
        zIndex: 3,
      };
    case 1:
      return {
        y: "26vh",
        scale: 0.68,
        rotate: -2,
        skewY: -2.5,
        opacity: 0.85,
        zIndex: 2,
      };
    case 2:
      return {
        y: "38vh",
        scale: 0.5,
        rotate: 3,
        skewY: 2,
        opacity: 0,
        zIndex: 0,
      };
  }
}

type PlaygroundCardStackProps = {
  activeIndex: number;
  direction: 1 | -1;
  stackRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd?: (dir: 1 | -1) => void;
  onSelect?: (index: number) => void;
  onActiveCardClick?: () => void;
};

type ProjectCardProps = {
  project: PlaygroundProject;
  projectIndex: number;
  offset: RelativeOffset;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reducedMotion: boolean;
  onSelect?: (index: number) => void;
  onActiveCardClick?: () => void;
};

function ProjectCard({
  project,
  projectIndex,
  offset,
  mouseX,
  mouseY,
  reducedMotion,
  onSelect,
  onActiveCardClick,
}: ProjectCardProps) {
  const isActive = offset === 0;
  const isFlank = offset === -1 || offset === 1;
  const layout = getSlotLayout(offset);
  const transition = reducedMotion ? reducedTransition : stackSpring;
  const scaleTransition = reducedMotion
    ? reducedTransition
    : isActive
      ? centerScaleSpring
      : stackSpring;

  const parallaxFactor = isActive && !reducedMotion ? 15 : 0;
  const px = useTransform(mouseX, (v) => v * parallaxFactor);
  const py = useTransform(mouseY, (v) => v * parallaxFactor);

  const handleClick = () => {
    if (isActive) {
      onActiveCardClick?.();
    } else {
      onSelect?.(projectIndex);
    }
  };

  return (
    <motion.button
      type="button"
      className="playground-card"
      aria-label={
        isActive
          ? `Open ${getProjectLabel(project)}`
          : `View ${getProjectLabel(project)}`
      }
      aria-current={isActive ? "true" : undefined}
      style={{
        x: isActive ? px : 0,
        pointerEvents: layout.opacity === 0 ? "none" : "auto",
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={handleClick}
      whileHover={
        !reducedMotion && isFlank && layout.opacity > 0
          ? { scale: layout.scale * 1.06 }
          : undefined
      }
      whileTap={
        reducedMotion || layout.opacity === 0
          ? undefined
          : { scale: layout.scale * 0.96 }
      }
      animate={{
        y: layout.y,
        scale: layout.scale,
        rotate: layout.rotate,
        skewY: layout.skewY,
        opacity: layout.opacity,
        zIndex: layout.zIndex,
        boxShadow: isActive
          ? "0 48px 96px -28px rgba(0,0,0,0.55)"
          : "0 20px 40px -20px rgba(0,0,0,0.35)",
      }}
      transition={{
        y: transition,
        rotate: transition,
        skewY: transition,
        opacity: transition,
        zIndex: { duration: 0 },
        boxShadow: transition,
        scale: scaleTransition,
      }}
    >
      <motion.div
        className="playground-card__cover"
        style={
          project.coverSrc
            ? { backgroundImage: `url(${project.coverSrc})` }
            : { background: project.coverGradient }
        }
        animate={{
          filter: "saturate(1) brightness(1)",
        }}
        transition={transition}
      />

      <motion.div
        className="playground-card__grey-overlay"
        aria-hidden="true"
        animate={{ opacity: 0 }}
        transition={transition}
      />

      <div className="playground-card__noise" aria-hidden="true" />
    </motion.button>
  );
}

export function PlaygroundCardStack({
  activeIndex,
  stackRef,
  onDragEnd,
  onSelect,
  onActiveCardClick,
}: PlaygroundCardStackProps) {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  const dragY = useMotionValue(0);
  const handleDragEnd = (
    _: unknown,
    info: { offset: { y: number }; velocity: { y: number } },
  ) => {
    const { offset, velocity } = info;
    const threshold = 60;
    const velThreshold = 300;
    if (offset.y < -threshold || velocity.y < -velThreshold) {
      onDragEnd?.(1);
    } else if (offset.y > threshold || velocity.y > velThreshold) {
      onDragEnd?.(-1);
    }
  };

  return (
    <motion.div
      ref={stackRef}
      className="cards cards--normal"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.12}
      style={{ y: dragY }}
      onDragEnd={handleDragEnd}
    >
      {playgroundProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          projectIndex={index}
          offset={getRelativeOffset(index, activeIndex)}
          mouseX={mouseX}
          mouseY={mouseY}
          reducedMotion={reducedMotion ?? false}
          onSelect={onSelect}
          onActiveCardClick={onActiveCardClick}
        />
      ))}
    </motion.div>
  );
}

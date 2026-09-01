import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  playgroundProjects,
  type PlaygroundProject,
} from "@/lib/playground-projects";

const TOTAL = playgroundProjects.length;
const AUTO_DURATION_MS = 10_000;
const ANIM_LOCK_MS = 900;

function getShortestDirection(from: number, to: number): 1 | -1 {
  const forward = (to - from + TOTAL) % TOTAL;
  const backward = (from - to + TOTAL) % TOTAL;
  return forward <= backward ? 1 : -1;
}

export type PlaygroundCarouselState = {
  activeIndex: number;
  activeProject: PlaygroundProject;
  direction: 1 | -1;
  progress: number;
  isAnimating: boolean;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  setIsPaused: (paused: boolean) => void;
};

export function usePlaygroundCarousel(
  sectionRef: React.RefObject<HTMLElement | null>,
): PlaygroundCarouselState {
  const reducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const progressRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const isInViewRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const advance = useCallback(
    (dir: 1 | -1, idx?: number) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setIsAnimating(true);
      const next =
        idx !== undefined
          ? idx
          : (activeIndex + dir + TOTAL) % TOTAL;
      setDirection(dir);
      setActiveIndex(next);
      progressRef.current = 0;
      startTimeRef.current = null;
      setProgress(0);
      setTimeout(() => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, ANIM_LOCK_MS);
    },
    [activeIndex],
  );

  const goNext = useCallback(() => advance(1), [advance]);
  const goPrev = useCallback(() => advance(-1), [advance]);
  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      const dir = getShortestDirection(activeIndex, index);
      advance(dir, index);
    },
    [activeIndex, advance],
  );

  // Auto-advance RAF loop
  useEffect(() => {
    if (reducedMotion || isPaused) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (ts: number) => {
      if (!isInViewRef.current || document.hidden || isAnimatingRef.current) {
        startTimeRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = ts;
      }

      const elapsed = ts - startTimeRef.current;
      const p = Math.min(elapsed / AUTO_DURATION_MS, 1);
      progressRef.current = p;
      setProgress(p);

      if (p >= 1) {
        startTimeRef.current = null;
        isAnimatingRef.current = true;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % TOTAL);
        setDirection(1);
        setProgress(0);
        setTimeout(() => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        }, ANIM_LOCK_MS);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion, isPaused]);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          startTimeRef.current = null;
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [sectionRef]);

  return {
    activeIndex,
    activeProject: playgroundProjects[activeIndex],
    direction,
    progress,
    isAnimating,
    goTo,
    goNext,
    goPrev,
    setIsPaused,
  };
}

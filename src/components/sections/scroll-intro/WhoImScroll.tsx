"use client";

import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { usePinnedWheelProgress } from "@/hooks/usePinnedWheelProgress";
import { FixedStage } from "./FixedStage";

const DEFAULT_NAME = "I'm Dineshkumar Selvam";
const DEFAULT_TAGLINE =
  "Skilled UI/UX and Product Designer creating intuitive, high-quality designs that enhance user experience and engagement.";

type WhoImScrollProps = {
  name?: string;
  tagline?: string;
};

export function WhoImScroll({
  name = DEFAULT_NAME,
  tagline = DEFAULT_TAGLINE,
}: WhoImScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const progress = usePinnedWheelProgress({
    sectionRef,
    disabled: reducedMotion ?? false,
  });

  const nameWords = name.split(" ");
  const taglineWords = tagline.split(" ");
  const totalWords = nameWords.length + taglineWords.length;

  const wordProgress = progress * totalWords;
  const nameWordProgress = reducedMotion
    ? nameWords.length
    : Math.min(nameWords.length, wordProgress);
  const taglineWordProgress = reducedMotion
    ? taglineWords.length
    : Math.max(0, wordProgress - nameWords.length);

  return (
    <section
      id="who-im"
      ref={sectionRef}
      aria-label="Who I'm"
      className="scroll-intro-section page-max scroll-mt-28 bg-grain bg-[var(--background)] text-[var(--foreground)]"
    >
      <div
        className={reducedMotion ? "scroll-intro-static" : "scroll-intro-panel"}
      >
        <FixedStage
          nameWords={nameWords}
          taglineWords={taglineWords}
          nameWordProgress={nameWordProgress}
          taglineWordProgress={taglineWordProgress}
          reducedMotion={reducedMotion ?? false}
        />
      </div>
    </section>
  );
}

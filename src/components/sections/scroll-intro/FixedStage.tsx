"use client";

import { ScrollWordBlock } from "./ScrollWordBlock";

type FixedStageProps = {
  nameWords: string[];
  taglineWords: string[];
  nameWordProgress: number;
  taglineWordProgress: number;
  reducedMotion?: boolean;
};

export function FixedStage({
  nameWords,
  taglineWords,
  nameWordProgress,
  taglineWordProgress,
  reducedMotion = false,
}: FixedStageProps) {
  return (
    <div className="scroll-intro-stage">
      <ScrollWordBlock
        words={nameWords}
        revealProgress={nameWordProgress}
        className="scroll-intro-name"
        reducedMotion={reducedMotion}
      />

      <ScrollWordBlock
        words={taglineWords}
        revealProgress={taglineWordProgress}
        className="scroll-intro-tagline"
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

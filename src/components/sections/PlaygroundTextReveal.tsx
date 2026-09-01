"use client";

import { HeroStorySequence } from "@/components/ui/hero-story-sequence";
import { PlaygroundProjectGrid } from "@/components/sections/playground/PlaygroundProjectGrid";

const HEADLINE =
  "Skilled UX/UI and Product Designer creating intuitive, high-quality designs that enhance user experience and engagement.";

export function PlaygroundTextReveal() {
  return (
    <section
      id="playground"
      aria-label="My playground"
      className="scroll-mt-28 bg-[var(--background)]"
    >
      <HeroStorySequence
        eyebrow="I'm Dineshkumar Selvam"
        stickyTop={80}
        videoSrc="/videos/intro-video.mp4"
        videoAriaLabel="Portfolio introduction video"
        className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
      >
        {HEADLINE}
      </HeroStorySequence>

      <PlaygroundProjectGrid />
    </section>
  );
}

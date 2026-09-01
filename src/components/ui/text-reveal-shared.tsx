import type { MutableRefObject, ReactNode } from "react";

export const DEFAULT_SCRUB = 0.5;
export const SCROLL_PER_WORD_VH = 0.14;
export const WORDS_PER_REVEAL_STEP = 3;
export const SCROLL_RELEASE_BUFFER_VH = 0.2;
export const VIDEO_REVEAL_UNITS = 1.25;
export const VIDEO_REVEAL_VH = 0.9;
export const PLAYBACK_UNITS_PER_SECOND = 0.5;
export const PLAYBACK_VH_PER_SEC = 0.15;
export const TEXT_VIDEO_GAP = 48;
export const VIDEO_PEEK_RATIO = 0.1;
export const VIEWPORT_VERTICAL_INSET = 32;
export const LAST_FRAME_FREEZE_BEFORE_END = 1;
export const LAST_FRAME_HOLD_UNITS = 0.75;
export const LAST_FRAME_HOLD_VH = 0.15;

export function getRevealStepCount(wordCount: number): number {
  return Math.ceil(wordCount / WORDS_PER_REVEAL_STEP);
}

export function getTextScrollDistance(wordCount: number): number {
  return window.innerHeight * (1 + wordCount * SCROLL_PER_WORD_VH + SCROLL_RELEASE_BUFFER_VH);
}

export function getHeroScrollDistance(
  wordCount: number,
  videoDuration: number,
): number {
  const revealSteps = getRevealStepCount(wordCount);
  const playableDuration = Math.max(0, videoDuration - LAST_FRAME_FREEZE_BEFORE_END);
  const holdScrollVh = LAST_FRAME_HOLD_VH;

  return (
    window.innerHeight *
    (revealSteps * SCROLL_PER_WORD_VH +
      playableDuration * PLAYBACK_VH_PER_SEC +
      holdScrollVh)
  );
}

export function renderRevealWords(
  words: string[],
  startIndex: number,
  keyPrefix: string,
  wordRevealRefs: MutableRefObject<(HTMLSpanElement | null)[]>,
  reducedMotion: boolean,
): ReactNode {
  return words.map((word, index) => {
    const globalIndex = startIndex + index;

    return (
      <span
        key={`${keyPrefix}-${word}-${index}`}
        className="relative me-2 inline-block last:me-0 sm:me-2.5"
      >
        <span className="text-[var(--foreground)]/15" aria-hidden>
          {word}
        </span>
        <span
          ref={(el) => {
            wordRevealRefs.current[globalIndex] = el;
          }}
          className="absolute inset-0 text-[var(--foreground)]"
          style={{ opacity: reducedMotion ? 1 : 0 }}
          aria-hidden
        >
          {word}
        </span>
      </span>
    );
  });
}

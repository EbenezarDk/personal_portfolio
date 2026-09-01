"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type IntroPhase = "video" | "titleText" | "bioText" | "complete";

const PHASE_ORDER: IntroPhase[] = [
  "video",
  "titleText",
  "bioText",
  "complete",
];

function phaseIndex(phase: IntroPhase): number {
  return PHASE_ORDER.indexOf(phase);
}

export function isIntroAtLeast(
  phase: IntroPhase,
  target: IntroPhase,
): boolean {
  return phaseIndex(phase) >= phaseIndex(target);
}

type IntroContextValue = {
  introPhase: IntroPhase;
  introComplete: boolean;
  revealTitleText: () => void;
  revealBioText: () => void;
  setIntroComplete: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

const FALLBACK_MS = 15000;

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("video");

  const advanceTo = useCallback((target: IntroPhase) => {
    setIntroPhase((current) =>
      phaseIndex(current) >= phaseIndex(target) ? current : target,
    );
  }, []);

  const revealTitleText = useCallback(() => {
    advanceTo("titleText");
  }, [advanceTo]);

  const revealBioText = useCallback(() => {
    advanceTo("bioText");
  }, [advanceTo]);

  const setIntroComplete = useCallback(() => {
    setIntroPhase("complete");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (introPhase === "complete") return;
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setIntroPhase("complete");
      return;
    }

    const timer = window.setTimeout(() => {
      setIntroPhase("complete");
    }, FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [introPhase]);

  const introComplete = introPhase === "complete";

  const value = useMemo(
    () => ({
      introPhase,
      introComplete,
      revealTitleText,
      revealBioText,
      setIntroComplete,
    }),
    [
      introPhase,
      introComplete,
      revealTitleText,
      revealBioText,
      setIntroComplete,
    ],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroContextValue {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return ctx;
}

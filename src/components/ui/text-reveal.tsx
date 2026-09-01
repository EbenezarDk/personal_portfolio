"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { cn } from "@/lib/utils";
import { SITE_GUTTER_CLASSES, SITE_MAX_WIDTH_CLASSES } from "@/lib/layout";

import {
  DEFAULT_SCRUB,
  getTextScrollDistance,
  renderRevealWords,
} from "./text-reveal-shared";

export {
  DEFAULT_SCRUB,
  getHeroScrollDistance,
  getTextScrollDistance,
  PLAYBACK_UNITS_PER_SECOND,
  PLAYBACK_VH_PER_SEC,
  renderRevealWords,
  SCROLL_PER_WORD_VH,
  SCROLL_RELEASE_BUFFER_VH,
  TEXT_VIDEO_GAP,
  VIDEO_PEEK_RATIO,
  VIDEO_REVEAL_UNITS,
  VIDEO_REVEAL_VH,
} from "./text-reveal-shared";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children: string;
  eyebrow?: string;
  stickyTop?: number;
  scrub?: number | boolean;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  eyebrow,
  className,
  stickyTop = 140,
  scrub = DEFAULT_SCRUB,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const wordRevealRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const eyebrowWords = eyebrow?.split(" ") ?? [];
  const headlineWords = children.split(" ");
  const allWords = [...eyebrowWords, ...headlineWords];

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReducedMotion = () => {
      setReducedMotion(mq.matches);
    };

    applyReducedMotion();
    mq.addEventListener("change", applyReducedMotion);

    return () => {
      mq.removeEventListener("change", applyReducedMotion);
    };
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    const revealEls = wordRevealRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null,
    );

    if (!trigger || !pin || revealEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(revealEls, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger,
          pin,
          start: "top top",
          end: () => `+=${getTextScrollDistance(allWords.length)}`,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      revealEls.forEach((el, index) => {
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1 }, index);
      });
    }, trigger);

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [allWords.length, children, eyebrow, reducedMotion, scrub]);

  return (
    <div ref={triggerRef} className="relative z-0">
      <div
        ref={pinRef}
        className="flex h-[100dvh] w-full items-start justify-start bg-[var(--background)]"
        style={stickyTop ? { paddingTop: stickyTop } : undefined}
      >
        <div
          className={cn(
            "mx-auto flex h-full w-full flex-col",
            SITE_GUTTER_CLASSES,
            SITE_MAX_WIDTH_CLASSES,
          )}
        >
          {eyebrow ? (
            <p className="mb-4 flex w-full flex-wrap text-left text-base font-medium text-[var(--foreground)]/15">
              {renderRevealWords(
                eyebrowWords,
                0,
                "eyebrow",
                wordRevealRefs,
                reducedMotion,
              )}
              <span className="sr-only">{eyebrow}</span>
            </p>
          ) : null}
          <p
            className={cn(
              "flex w-full flex-wrap text-left text-[var(--foreground)]/15",
              className,
            )}
          >
            {renderRevealWords(
              headlineWords,
              eyebrowWords.length,
              "headline",
              wordRevealRefs,
              reducedMotion,
            )}
            <span className="sr-only">{children}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

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
import { SITE_GUTTER_CLASSES, SITE_GUTTER_INSET_CLASSES, SITE_MAX_WIDTH_CLASSES } from "@/lib/layout";

import {
  DEFAULT_SCRUB,
  getHeroScrollDistance,
  LAST_FRAME_FREEZE_BEFORE_END,
  LAST_FRAME_HOLD_UNITS,
  PLAYBACK_UNITS_PER_SECOND,
  renderRevealWords,
  TEXT_VIDEO_GAP,
  VIDEO_PEEK_RATIO,
  VIEWPORT_VERTICAL_INSET,
  WORDS_PER_REVEAL_STEP,
  getRevealStepCount,
} from "./text-reveal-shared";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_VIDEO_DURATION = 8;

export interface HeroStorySequenceProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children: string;
  eyebrow?: string;
  videoSrc: string;
  videoAriaLabel?: string;
  stickyTop?: number;
  scrub?: number | boolean;
}

interface VideoLayout {
  endTop: number;
  startY: number;
  maxHeight: number;
  boxHeight: number;
}

function measureVideoLayout(
  pin: HTMLElement,
  contentInner: HTMLElement,
  textBlock: HTMLElement,
): VideoLayout | null {
  const pinRect = pin.getBoundingClientRect();
  const contentRect = contentInner.getBoundingClientRect();
  const textRect = textBlock.getBoundingClientRect();
  const pinHeight = pin.clientHeight;
  const contentWidth = textBlock.clientWidth;
  const contentOffsetTop = contentRect.top - pinRect.top;

  const maxHeight = Math.max(
    0,
    pinRect.bottom - textRect.bottom - TEXT_VIDEO_GAP - VIEWPORT_VERTICAL_INSET,
  );
  const naturalHeight = contentWidth * (10 / 16);
  const boxHeight = Math.min(maxHeight, naturalHeight);

  if (boxHeight <= 0 || contentWidth <= 0) return null;

  const textBottomInPin = textRect.bottom - pinRect.top;
  const topBound = textBottomInPin + TEXT_VIDEO_GAP;
  const bottomBound = pinHeight - VIEWPORT_VERTICAL_INSET;
  const availableHeight = Math.max(0, bottomBound - topBound);

  const endTop =
    availableHeight >= boxHeight
      ? topBound + (availableHeight - boxHeight) / 2 - contentOffsetTop
      : topBound - contentOffsetTop;

  const peekTop = pinHeight - VIDEO_PEEK_RATIO * boxHeight - contentOffsetTop;
  const startY = peekTop - endTop;

  return { endTop, startY, maxHeight, boxHeight };
}

function holdLastFrame(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
  const lastFrameTime = Math.max(0, video.duration - 0.05);
  video.currentTime = lastFrameTime;
  video.pause();
}

export const HeroStorySequence: FC<HeroStorySequenceProps> = ({
  children,
  eyebrow,
  videoSrc,
  videoAriaLabel = "Introductory portfolio video",
  className,
  stickyTop = 140,
  scrub = DEFAULT_SCRUB,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const textBlockRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const videoBoxRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wordRevealRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasStartedPlayback = useRef(false);
  const hasFinishedPlayback = useRef(false);
  const clampedNearEnd = useRef(false);
  const layoutRef = useRef<VideoLayout | null>(null);

  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [videoDuration, setVideoDuration] = useState(DEFAULT_VIDEO_DURATION);
  const [videoLayout, setVideoLayout] = useState<VideoLayout | null>(null);

  if (typeof children !== "string") {
    throw new Error("HeroStorySequence: children must be a string");
  }

  const eyebrowWords = eyebrow?.split(" ") ?? [];
  const headlineWords = children.split(" ");
  const allWords = [...eyebrowWords, ...headlineWords];
  const revealStepCount = getRevealStepCount(allWords.length);
  const textPhaseEnd = revealStepCount;
  const playableDuration = Math.max(0, videoDuration - LAST_FRAME_FREEZE_BEFORE_END);
  const playbackUnits =
    playableDuration * PLAYBACK_UNITS_PER_SECOND + LAST_FRAME_HOLD_UNITS;
  const totalTimelineUnits = textPhaseEnd + playbackUnits;

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
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
      }
    };

    const onLoadedData = () => {
      if (hasFinishedPlayback.current) return;
      video.pause();
      video.currentTime = 0;
    };

    const onEnded = () => {
      hasFinishedPlayback.current = true;
      holdLastFrame(video);
    };

    const onTimeUpdate = () => {
      if (
        !clampedNearEnd.current &&
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        video.currentTime >= video.duration - LAST_FRAME_FREEZE_BEFORE_END
      ) {
        clampedNearEnd.current = true;
        holdLastFrame(video);
        hasFinishedPlayback.current = true;
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [videoSrc]);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const contentInner = contentRef.current;
    const textBlock = textBlockRef.current;
    const videoBox = videoBoxRef.current;
    const videoWrap = videoWrapRef.current;

    if (!pin || !contentInner || !textBlock || !videoBox || !videoWrap) return;

    const layout = measureVideoLayout(pin, contentInner, textBlock);
    if (!layout) return;

    layoutRef.current = layout;
    setVideoLayout(layout);

    if (reducedMotion) {
      gsap.set(videoWrap, { top: layout.endTop, y: 0, opacity: 1 });
    }
  }, [reducedMotion, videoDuration, children, eyebrow]);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    const contentInner = contentRef.current;
    const textBlock = textBlockRef.current;
    const videoBox = videoBoxRef.current;
    const videoWrap = videoWrapRef.current;
    const video = videoRef.current;
    const revealEls = wordRevealRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null,
    );

    if (
      !trigger ||
      !pin ||
      !contentInner ||
      !textBlock ||
      !videoBox ||
      !videoWrap ||
      !video ||
      revealEls.length === 0
    ) {
      return;
    }

    const getLayout = () => {
      const measured = measureVideoLayout(pin, contentInner, textBlock);
      if (measured) {
        layoutRef.current = measured;
      }
      return layoutRef.current;
    };

    const initialLayout = getLayout();
    if (!initialLayout) return;

    hasStartedPlayback.current = false;
    hasFinishedPlayback.current = false;
    clampedNearEnd.current = false;

    const ctx = gsap.context(() => {
      gsap.set(revealEls, { opacity: 0 });
      gsap.set(videoWrap, {
        opacity: 1,
        top: () => getLayout()?.endTop ?? initialLayout.endTop,
        y: () => getLayout()?.startY ?? initialLayout.startY,
        pointerEvents: "none",
      });

      const textRevealComplete = textPhaseEnd / totalTimelineUnits;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger,
          pin,
          start: "top top",
          end: () => `+=${getHeroScrollDistance(allWords.length, videoDuration)}`,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress < textRevealComplete) {
              if (hasStartedPlayback.current) {
                hasStartedPlayback.current = false;
                hasFinishedPlayback.current = false;
                clampedNearEnd.current = false;
                video.pause();
                video.currentTime = 0;
              }
              return;
            }

            if (!hasStartedPlayback.current) {
              hasStartedPlayback.current = true;
              if (!hasFinishedPlayback.current) {
                video.currentTime = 0;
                void video.play().catch(() => {
                  hasStartedPlayback.current = false;
                });
              }
            }
          },
        },
      });

      for (let step = 0; step < revealStepCount; step++) {
        const startIndex = step * WORDS_PER_REVEAL_STEP;
        const endIndex = Math.min(
          startIndex + WORDS_PER_REVEAL_STEP,
          revealEls.length,
        );

        for (let i = startIndex; i < endIndex; i++) {
          tl.fromTo(revealEls[i], { opacity: 0 }, { opacity: 1, duration: 1 }, step);
        }
      }

      tl.fromTo(
        videoWrap,
        {
          y: () => getLayout()?.startY ?? initialLayout.startY,
        },
        {
          y: 0,
          duration: textPhaseEnd,
        },
        0,
      );

      tl.set(videoWrap, { pointerEvents: "auto" }, textPhaseEnd);

      tl.to({}, { duration: playbackUnits }, textPhaseEnd);
    }, trigger);

    const onResize = () => {
      const measured = measureVideoLayout(pin, contentInner, textBlock);
      if (measured) {
        layoutRef.current = measured;
        setVideoLayout(measured);
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      hasStartedPlayback.current = false;
      hasFinishedPlayback.current = false;
      clampedNearEnd.current = false;
      video.pause();
      ctx.revert();
    };
  }, [
    allWords.length,
    children,
    eyebrow,
    playbackUnits,
    reducedMotion,
    revealStepCount,
    scrub,
    totalTimelineUnits,
    videoDuration,
    textPhaseEnd,
  ]);

  const showVideoAtRest = reducedMotion && videoLayout;

  return (
    <div ref={triggerRef} className="relative z-0">
      <div
        ref={pinRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-[var(--background)]"
        style={stickyTop ? { paddingTop: stickyTop } : undefined}
      >
        <div className={cn("relative mx-auto h-full w-full", SITE_MAX_WIDTH_CLASSES)}>
          <div ref={contentRef} className="relative h-full w-full">
            <div
              ref={textBlockRef}
              className={cn(
                "relative z-20 flex w-full flex-col",
                SITE_GUTTER_CLASSES,
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

          <div
            ref={videoWrapRef}
            className={cn(
              "absolute z-10 box-content will-change-transform",
              SITE_GUTTER_INSET_CLASSES,
              reducedMotion ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
            style={
              videoLayout
                ? {
                    height: `${videoLayout.boxHeight}px`,
                    ...(showVideoAtRest
                      ? { top: videoLayout.endTop, transform: "translate3d(0, 0, 0)" }
                      : {}),
                  }
                : undefined
            }
          >
            <div
              ref={videoBoxRef}
              className="relative box-content h-full w-full overflow-hidden rounded-[22px] border border-[var(--border)] bg-black"
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover object-center"
                src={videoSrc}
                preload="auto"
                muted
                playsInline
                aria-label={videoAriaLabel}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

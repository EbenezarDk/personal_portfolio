import { useEffect, useRef, useState } from "react";

const SCROLL_SENSITIVITY = 0.00045;
const LERP_FACTOR = 0.05;

type UsePinnedWheelProgressOptions = {
  sectionRef: React.RefObject<HTMLElement | null>;
  disabled?: boolean;
};

export function usePinnedWheelProgress({
  sectionRef,
  disabled = false,
}: UsePinnedWheelProgressOptions) {
  const [displayProgress, setDisplayProgress] = useState(disabled ? 1 : 0);
  const targetRef = useRef(disabled ? 1 : 0);
  const displayRef = useRef(disabled ? 1 : 0);

  useEffect(() => {
    if (disabled) {
      targetRef.current = 1;
      displayRef.current = 1;
      setDisplayProgress(1);
      return;
    }

    let rafId = 0;

    const tick = () => {
      const target = targetRef.current;
      const current = displayRef.current;

      if (Math.abs(target - current) >= 0.0001) {
        const next = current + (target - current) * LERP_FACTOR;
        displayRef.current = next;
        setDisplayProgress(next);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [disabled]);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const isInViewport = () => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const isPinned = () => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 1 && rect.bottom >= window.innerHeight * 0.5;
    };

    const applyDelta = (deltaY: number) => {
      if (!isPinned()) return false;

      const current = targetRef.current;
      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;

      if ((scrollingDown && current < 1) || (scrollingUp && current > 0)) {
        window.scrollTo({ top: section.offsetTop, behavior: "instant" });
        targetRef.current = Math.min(
          1,
          Math.max(0, current + deltaY * SCROLL_SENSITIVITY),
        );
        return true;
      }

      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInViewport()) return;

      const current = targetRef.current;
      const canAdvance =
        (e.deltaY > 0 && current < 1) || (e.deltaY < 0 && current > 0);

      if (canAdvance && isPinned()) {
        e.preventDefault();
        applyDelta(e.deltaY);
      }

      if (Math.abs(e.deltaX) > 0 && isInViewport()) {
        e.preventDefault();
      }
    };

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = touchStartY - y;
      touchStartY = y;

      if (applyDelta(delta)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [disabled, sectionRef]);

  return displayProgress;
}

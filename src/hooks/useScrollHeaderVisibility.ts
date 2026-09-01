import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 5;
const TOP_THRESHOLD = 80;
const MOUSE_LEAVE_DELAY_MS = 200;

type UseScrollHeaderVisibilityOptions = {
  enabled?: boolean;
};

export function useScrollHeaderVisibility({
  enabled = true,
}: UseScrollHeaderVisibilityOptions = {}) {
  const [isAtPageTop, setIsAtPageTop] = useState(true);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [isMouseActive, setIsMouseActive] = useState(false);

  const lastScrollY = useRef(0);
  const isTriggerHovered = useRef(false);
  const isHeaderHovered = useRef(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleMouseLeave = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }

    leaveTimer.current = setTimeout(() => {
      if (!isTriggerHovered.current && !isHeaderHovered.current) {
        setIsMouseActive(false);
      }
    }, MOUSE_LEAVE_DELAY_MS);
  }, []);

  const onTriggerEnter = useCallback(() => {
    isTriggerHovered.current = true;
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }
    setIsMouseActive(true);
  }, []);

  const onTriggerLeave = useCallback(() => {
    isTriggerHovered.current = false;
    scheduleMouseLeave();
  }, [scheduleMouseLeave]);

  const onHeaderEnter = useCallback(() => {
    isHeaderHovered.current = true;
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }
    setIsMouseActive(true);
  }, []);

  const onHeaderLeave = useCallback(() => {
    isHeaderHovered.current = false;
    scheduleMouseLeave();
  }, [scheduleMouseLeave]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    lastScrollY.current = window.scrollY;
    setIsAtPageTop(window.scrollY < TOP_THRESHOLD);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const atTop = currentY < TOP_THRESHOLD;

      setIsAtPageTop(atTop);

      if (atTop) {
        setScrollHidden(false);
      } else if (delta > SCROLL_THRESHOLD) {
        setScrollHidden(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, [enabled]);

  const isVisible =
    !enabled || isAtPageTop || isMouseActive || !scrollHidden;

  return {
    isVisible,
    onTriggerEnter,
    onTriggerLeave,
    onHeaderEnter,
    onHeaderLeave,
  };
}

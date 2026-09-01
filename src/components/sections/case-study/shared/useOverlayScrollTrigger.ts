"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export function useOverlayScrollProgress(
  scrollRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<HTMLElement | null>,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scroller = scrollRef.current;
    const bar = progressRef.current;
    if (!scroller || !bar) return;

    const update = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const progress = max > 0 ? scroller.scrollTop / max : 0;
      bar.style.width = `${progress * 100}%`;
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });

    const onResize = () => update();
    window.addEventListener("resize", onResize);

    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, [scrollRef, progressRef, reducedMotion]);
}

export function useOverlayParallax(
  scrollRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  amount = 40,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scroller = scrollRef.current;
    const target = targetRef.current;
    if (!scroller || !target || reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: target,
      scroller,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8,
      onUpdate: (self) => {
        const y = (self.progress - 0.5) * amount;
        gsap.set(target, { y });
      },
    });

    return () => {
      trigger.kill();
      gsap.set(target, { y: 0 });
    };
  }, [scrollRef, targetRef, amount, reducedMotion]);
}

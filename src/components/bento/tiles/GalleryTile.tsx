"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BentoTile } from "@/components/bento/BentoTile";
import { CarouselDots } from "@/components/bento/tiles/CarouselDots";
import { galleryImages } from "@/lib/portfolio-data";

const INTERVAL_MS = 8000;

export function GalleryTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = galleryImages.length;

  const goToSlide = useCallback((next: number) => {
    setActiveIndex((next + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (reduceMotion || isHovered || total <= 1) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isHovered, reduceMotion, total]);

  const active = galleryImages[activeIndex];

  return (
    <BentoTile label="My gallery" className={className} index={index}>
      <div
        className="relative h-full min-h-[220px] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-roledescription="carousel"
        aria-label={`Photo gallery, slide ${activeIndex + 1} of ${total}`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <CarouselDots
          count={total}
          activeIndex={activeIndex}
          onSelect={goToSlide}
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
        />
      </div>
    </BentoTile>
  );
}

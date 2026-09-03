"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { OverlayDummyMedia } from "@/lib/overlay-dummy-content";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

type OverlaySplitIntroProps = {
  heading: string;
  subheading: string;
  body: string;
  media: OverlayDummyMedia;
  cta?: ReactNode;
};

export function OverlaySplitIntro({
  heading,
  subheading,
  body,
  media,
  cta,
}: OverlaySplitIntroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className="overlay-split"
      variants={container}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
    >
      <motion.div variants={item} className="overlay-split__media-col">
        <div className="overlay-split__media">
          {media.type === "video" ? (
            <video
              src={media.src}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              controls={false}
              aria-label={media.alt}
            />
          ) : (
            <img src={media.src} alt={media.alt} />
          )}
        </div>
      </motion.div>

      <motion.div variants={item} className="overlay-split__copy">
        <h3 className="overlay-split__heading">{heading}</h3>
        <h4 className="overlay-split__subheading">{subheading}</h4>
        <p className="overlay-split__body">{body}</p>
        {cta}
      </motion.div>
    </motion.section>
  );
}

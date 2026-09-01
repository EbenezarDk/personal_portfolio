"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/lib/portfolio-data";

const BUBBLE_DELAY = 1.5;

export function ProfileChatBubbles({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className={`flex flex-col items-start gap-2 ${className}`}>
      {profile.chatMessages.map((message, i) => {
        const delay = reduceMotion ? 0 : i * BUBBLE_DELAY;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ delay, duration: 0.4, ease: "easeOut" }}
            className="max-w-[85%] rounded-2xl bg-black/70 px-3.5 py-2 text-xs text-white backdrop-blur-sm sm:text-sm"
          >
            {typeof message === "string" ? (
              message
            ) : (
              <>
                {message.prefix}
                <a
                  href={`mailto:${profile.email}`}
                  aria-label={`Email Dineshkumar at ${profile.email}`}
                  className="underline transition-colors hover:text-[var(--accent)]"
                >
                  {message.linkText}
                </a>
                {message.suffix}
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

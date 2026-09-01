"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PlaygroundProject } from "@/lib/playground-projects";
import "../case-study.css";

const ease = [0.16, 1, 0.3, 1] as const;

type PlaygroundOverlayShellProps = {
  project: PlaygroundProject;
  onClose: () => void;
  titleId?: string;
  headerTitle: ReactNode;
  panelClassName?: string;
  bodyClassName?: string;
  bodyRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export function PlaygroundOverlayShell({
  project,
  onClose,
  titleId = "playground-overlay-title",
  headerTitle,
  panelClassName = "",
  bodyClassName = "",
  bodyRef,
  children,
}: PlaygroundOverlayShellProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.classList.add("playground-overlay-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.classList.remove("playground-overlay-open");
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      body.style.paddingRight = prevBodyPaddingRight;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="playground-overlay"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
      onClick={onClose}
    >
      <motion.div
        className={`playground-overlay__panel ${panelClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.45, ease }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="playground-overlay__header">
          <h2 id={titleId} className="playground-overlay__title">
            {headerTitle}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="playground-overlay__close"
            aria-label={`Close ${project.title}`}
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div
          ref={bodyRef}
          className={`playground-overlay__body ${bodyClassName}`.trim()}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PlaygroundOverlayPresence({
  project,
  children,
}: {
  project: PlaygroundProject | null;
  children: (project: PlaygroundProject) => ReactNode;
}) {
  return (
    <AnimatePresence>
      {project ? children(project) : null}
    </AnimatePresence>
  );
}

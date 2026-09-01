"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import type { CaseStudyShowcase } from "@/lib/case-studies/types";
import {
  CaseStudyCta,
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";
import { useOverlayParallax } from "./useOverlayScrollTrigger";

type CaseStudyShowcaseSectionProps = {
  showcase: CaseStudyShowcase;
  scrollRef: RefObject<HTMLElement | null>;
};

export function CaseStudyShowcaseSection({
  showcase,
  scrollRef,
}: CaseStudyShowcaseSectionProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useOverlayParallax(scrollRef, imageRef);

  return (
    <CaseStudySectionReveal
      className={`cs-showcase ${showcase.tall ? "cs-showcase--tall" : ""}`.trim()}
    >
      <div className="cs-showcase__header">
        {showcase.kicker ? (
          <CaseStudyKicker>{showcase.kicker}</CaseStudyKicker>
        ) : null}
        <h3 className="cs-heading">{showcase.heading}</h3>
        {showcase.paragraph ? (
          <p className="cs-body">{showcase.paragraph}</p>
        ) : null}
      </div>
      <figure className="cs-showcase__figure">
        <img
          ref={imageRef}
          src={showcase.src}
          alt={showcase.alt}
          className="cs-showcase__img"
          loading="lazy"
        />
      </figure>
      {showcase.link ? (
        <div className="cs-showcase__actions">
          <CaseStudyCta
            href={showcase.link.href}
            label={showcase.link.label}
            accent
          />
        </div>
      ) : null}
    </CaseStudySectionReveal>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyFooter } from "@/lib/case-studies/types";
import { CaseStudySectionReveal } from "./CaseStudySectionReveal";

type CaseStudyFooterSectionProps = {
  footer: CaseStudyFooter;
  onNextProject?: () => void;
};

export function CaseStudyFooterSection({
  footer,
  onNextProject,
}: CaseStudyFooterSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <CaseStudySectionReveal className="cs-footer">
      <h3 className="cs-footer__heading">{footer.heading}</h3>

      <div className="cs-footer__profile">
        <img
          src={footer.avatarSrc}
          alt=""
          className="cs-footer__avatar"
          width={52}
          height={52}
        />
        <div>
          <p className="cs-footer__name">{footer.name}</p>
          <p className="cs-footer__role">{footer.role}</p>
        </div>
      </div>

      <div className="cs-footer__contact">
        <a href={`mailto:${footer.email}`}>{footer.email}</a>
        {footer.phone ? <span>{footer.phone}</span> : null}
      </div>

      {onNextProject ? (
        <motion.button
          type="button"
          className="cs-cta cs-cta--accent"
          onClick={onNextProject}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        >
          <span>{footer.nextProjectLabel}</span>
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <path
              d="M6 14L14 6M14 6H7M14 6V13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      ) : null}
    </CaseStudySectionReveal>
  );
}

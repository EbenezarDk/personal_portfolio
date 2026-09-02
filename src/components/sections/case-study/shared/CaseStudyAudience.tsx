"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CaseStudyAudience } from "@/lib/case-studies/types";
import {
  CaseStudyKicker,
  CaseStudySectionReveal,
} from "./CaseStudySectionReveal";

function useCountUp(target: number, active: boolean, duration = 1.2) {
  const [value, setValue] = useState(active ? target : 0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const tick = () => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      setValue(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
}

function TierRow({
  tier,
  segment,
  percentage,
  active,
}: {
  tier: string;
  segment: string;
  percentage: number;
  active: boolean;
}) {
  const count = useCountUp(percentage, active);

  return (
    <div className="cs-audience__tier">
      <span className="cs-audience__tier-label">{tier}</span>
      <span className="cs-audience__tier-segment">{segment}</span>
      <span className="cs-audience__tier-pct">{count}%</span>
    </div>
  );
}

type CaseStudyAudienceSectionProps = {
  audience: CaseStudyAudience;
};

export function CaseStudyAudienceSection({
  audience,
}: CaseStudyAudienceSectionProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const active = reducedMotion ? true : inView;

  return (
    <CaseStudySectionReveal className="cs-section">
      <CaseStudyKicker>{audience.kicker}</CaseStudyKicker>
      <h3 className="cs-heading">{audience.heading}</h3>
      <p className="cs-subheading">{audience.subheading}</p>
      <p className="cs-body">{audience.intro}</p>

      <div ref={ref} className="cs-audience__layout">
        <div>
          <p className="cs-subheading">Design Target Audience</p>
          <p className="cs-audience__age">{audience.ageRange}</p>
          <div className="cs-audience__tiers">
            {audience.tiers.map((tier) => (
              <TierRow
                key={`${tier.tier}-${tier.segment}`}
                tier={tier.tier}
                segment={tier.segment}
                percentage={tier.percentage}
                active={active}
              />
            ))}
          </div>
        </div>

        <div className="cs-audience__bubbles" aria-hidden="true">
          {audience.personas.map((persona, i) => (
            <motion.div
              key={persona.label}
              className={`cs-audience__bubble cs-audience__bubble--${persona.size}`}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            >
              <span className="cs-audience__bubble-tier">{persona.tier}</span>
              <span className="cs-audience__bubble-age">{persona.ageRange}</span>
              <span className="cs-audience__bubble-label">{persona.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </CaseStudySectionReveal>
  );
}

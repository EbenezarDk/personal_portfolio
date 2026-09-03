"use client";

import type { CaseStudyHero, CaseStudyTextBlock } from "@/lib/case-studies/types";
import { getOverlayDummyMedia } from "@/lib/overlay-dummy-content";
import { OverlaySplitIntro } from "./OverlaySplitIntro";
import { CaseStudyCta } from "./CaseStudySectionReveal";

type CaseStudyHeroSectionProps = {
  projectId: string;
  hero: CaseStudyHero;
  projectBrief: CaseStudyTextBlock;
};

export function CaseStudyHeroSection({
  projectId,
  hero,
  projectBrief,
}: CaseStudyHeroSectionProps) {
  const media = hero.media ?? getOverlayDummyMedia(projectId);
  const heading = hero.tagline;
  const subheading = projectBrief.heading;
  const body = projectBrief.paragraphs[0] ?? "";

  return (
    <header className="cs-hero cs-hero--split">
      <OverlaySplitIntro
        heading={heading}
        subheading={subheading}
        body={body}
        media={media}
        cta={
          hero.ctaLabel && hero.ctaHref ? (
            <CaseStudyCta
              href={hero.ctaHref}
              label={hero.ctaLabel}
              accent
            />
          ) : undefined
        }
      />
    </header>
  );
}

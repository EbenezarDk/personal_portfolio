"use client";

import { BentoTile } from "@/components/bento/BentoTile";
import { TimelineRow } from "@/components/bento/TimelineRow";
import { LogoCarousel } from "@/components/bento/tiles/LogoCarousel";
import { collaboratorLogos, experience } from "@/lib/portfolio-data";

export function ExperienceTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <BentoTile label="Experience" className={className} index={index}>
      <div className="flex flex-col p-5 sm:p-6">
        <h3 className="text-xs font-bold tracking-widest text-white">
          EXPERIENCE
        </h3>

        <ul className="mt-5 space-y-4">
          {experience.map((job) => (
            <TimelineRow
              key={`${job.start}-${job.company}`}
              dates={`(${job.start}) - (${job.end})`}
              title={`${job.role} /`}
              subtitle={`${job.company}, ${job.location}.`}
            />
          ))}
        </ul>

        <div className="mt-5 border-t border-[var(--border)] pt-4">
          <p className="text-center text-xs text-[var(--muted)]">
            Companies I&apos;ve collaborated with
          </p>
          <LogoCarousel logos={collaboratorLogos} durationMs={7000} />
        </div>
      </div>
    </BentoTile>
  );
}

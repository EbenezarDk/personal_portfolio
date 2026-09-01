"use client";

import { BentoTile } from "@/components/bento/BentoTile";
import { TimelineRow } from "@/components/bento/TimelineRow";
import { education } from "@/lib/portfolio-data";

export function EducationTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <BentoTile label="Education" className={className} index={index}>
      <div className="flex flex-col p-5 sm:p-6">
        <h3 className="text-xs font-bold tracking-widest text-white">
          EDUCATION
        </h3>

        <ul className="mt-4 space-y-4">
          {education.map((entry) => (
            <TimelineRow
              key={entry.years}
              dates={entry.years}
              title={`${entry.title}/`}
              subtitle={`${entry.institution}.`}
            />
          ))}
        </ul>
      </div>
    </BentoTile>
  );
}

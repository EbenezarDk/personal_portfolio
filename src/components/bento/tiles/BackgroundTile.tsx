"use client";

import { BentoTile } from "@/components/bento/BentoTile";
import { RichTextParagraph } from "@/components/bento/RichTextParagraph";
import { background } from "@/lib/portfolio-data";

export function BackgroundTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <BentoTile label="My background" className={className} index={index}>
      <div className="flex flex-col p-5 sm:p-6">
        <h3 className="text-xs font-bold tracking-widest text-white">
          MY BACKGROUND
        </h3>

        <div className="mt-4 space-y-3 text-xs leading-6 text-[var(--muted)] sm:text-sm sm:leading-7">
          {background.paragraphs.map((block, i) =>
            block.type === "callout" ? (
              <p key={i} className="font-semibold italic text-white">
                {block.text}
              </p>
            ) : (
              <RichTextParagraph key={i} segments={block.segments} />
            ),
          )}
        </div>

        <p className="mt-3 font-script text-xl text-white">
          {background.signature}
        </p>
      </div>
    </BentoTile>
  );
}

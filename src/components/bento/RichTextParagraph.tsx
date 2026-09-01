import type { TextSegment } from "@/lib/portfolio-data";

export function RichTextParagraph({ segments }: { segments: TextSegment[] }) {
  return (
    <p>
      {segments.map((segment, i) => {
        if (segment.type === "underline") {
          return (
            <span
              key={i}
              className="underline decoration-[var(--muted)] underline-offset-4"
            >
              {segment.text}
            </span>
          );
        }
        if (segment.type === "bold") {
          return (
            <span key={i} className="font-semibold text-white">
              {segment.text}
            </span>
          );
        }
        return <span key={i}>{segment.text}</span>;
      })}
    </p>
  );
}

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type {
  PlaygroundHoverTheme,
  PlaygroundProject,
} from "@/lib/playground-projects";
import { getProjectLabel } from "@/lib/playground-projects";
import { cn } from "@/lib/utils";

export type CardExpandDirection = "start" | "end" | "both";

type PlaygroundGridCardProps = {
  project?: PlaygroundProject;
  placeholder?: boolean;
  className?: string;
  onOpen?: () => void;
  /** How the card grows on hover relative to its row position. */
  expandDirection?: CardExpandDirection;
  /** Optional override for responsive expand classes (e.g. md vs xl). */
  expandClassName?: string;
  hoverTheme?: PlaygroundHoverTheme;
};

export const expandClasses: Record<CardExpandDirection, string> = {
  // Left edge fixed — grow 20px to the right
  start: "md:hover:z-10 md:hover:w-[calc(100%+20px)]",
  // Right edge fixed — grow 20px to the left
  end: "md:hover:z-10 md:hover:-ml-5 md:hover:w-[calc(100%+20px)]",
  // Middle — grow 20px on both sides
  both: "md:hover:z-10 md:hover:-mx-5 md:hover:w-[calc(100%+40px)]",
};

export function PlaygroundGridCard({
  project,
  placeholder = false,
  className,
  onOpen,
  expandDirection = "both",
  expandClassName,
  hoverTheme,
}: PlaygroundGridCardProps) {
  const brandName = placeholder
    ? "Brand name"
    : (project?.featuredName ?? "Brand name");
  const projectName = placeholder ? "Project Name" : getProjectLabel(project!);
  const subtitle = placeholder ? "Casestudy" : "Casestudy";
  const theme = hoverTheme ?? project?.hoverTheme!;

  const themeVars = {
    "--hover-header-bg": theme.headerBg,
    "--hover-header-border": theme.headerBorder,
    "--hover-body-bg": theme.bodyBg,
    "--hover-body-border": theme.bodyBorder,
  } as CSSProperties;

  return (
    <article
      style={themeVars}
      className={cn(
        "relative z-0 flex w-full flex-col gap-3 rounded-[32px] border border-[#1a1a1a] bg-[#141414] p-3 transition-[width,margin,z-index] duration-300 ease-in-out",
        !placeholder && "group",
        !placeholder && (expandClassName ?? expandClasses[expandDirection]),
        className,
      )}
    >
      <div className="flex items-center rounded-bl-[12px] rounded-br-[12px] rounded-tl-[22px] rounded-tr-[22px] border border-[#1a1a1a] bg-[#171717] p-5 transition-colors duration-300 ease-in-out group-hover:border-[var(--hover-header-border)] group-hover:bg-[var(--hover-header-bg)]">
        <p className="text-base text-[#484848] transition-colors duration-300 ease-in-out group-hover:text-white">
          {brandName}
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-bl-[22px] rounded-br-[22px] rounded-tl-[12px] rounded-tr-[12px] border border-[#1a1a1a] bg-[#171717] p-5 transition-colors duration-300 ease-in-out group-hover:border-[var(--hover-body-border)] group-hover:bg-[var(--hover-body-bg)]">
        <button
          type="button"
          onClick={onOpen}
          disabled={placeholder}
          className={cn(
            "relative h-[min(310px,52vw)] w-full overflow-hidden rounded-[20px] bg-[#1b1b1b]",
            !placeholder && "cursor-pointer",
            placeholder && "cursor-default",
          )}
          aria-label={
            placeholder
              ? "Project media placeholder"
              : `Open ${projectName} case study`
          }
        >
          {project?.coverSrc ? (
            <Image
              src={project.coverSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[22px] font-semibold text-white">
              Image or Video
            </span>
          )}
        </button>

        <div className="flex items-start gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="text-[22px] font-semibold leading-tight text-[#e9dfce] transition-colors duration-300 ease-in-out group-hover:text-white">
              {projectName}
            </p>
            <p className="text-base text-[#484848] transition-colors duration-300 ease-in-out group-hover:text-[#b5b5b5]">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            disabled={placeholder}
            aria-label={
              placeholder ? "Project action placeholder" : `View ${projectName}`
            }
            className={cn(
              "h-[51px] w-[76px] shrink-0 rounded-[12px] bg-[#1b1b1b]",
              !placeholder &&
                "cursor-pointer transition-colors hover:bg-[#242424]",
              placeholder && "cursor-default",
            )}
          />
        </div>
      </div>
    </article>
  );
}

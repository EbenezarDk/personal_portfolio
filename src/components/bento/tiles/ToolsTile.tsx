"use client";

import Image from "next/image";
import { useState } from "react";
import { BentoTile } from "@/components/bento/BentoTile";
import { tools } from "@/lib/portfolio-data";

export function ToolsTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  const [activeTool, setActiveTool] = useState(tools[0]?.name ?? "");

  return (
    <BentoTile label="Tool stack" className={className} index={index}>
      <div className="flex h-full min-h-0 flex-col p-5 sm:p-6">
        <h3 className="text-xs font-bold tracking-widest text-white">
          TOOL STACK
        </h3>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-[var(--muted)]">
          {activeTool}
        </p>

        <div className="mt-4 grid grid-cols-6 gap-2 sm:gap-3">
          {tools.map((tool) => (
            <button
              key={tool.name}
              type="button"
              aria-label={tool.name}
              onMouseEnter={() => setActiveTool(tool.name)}
              onFocus={() => setActiveTool(tool.name)}
              onMouseLeave={() => setActiveTool(tools[0]?.name ?? "")}
              onBlur={() => setActiveTool(tools[0]?.name ?? "")}
              className="group relative aspect-square w-full overflow-hidden rounded-2xl transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Image
                src={tool.src}
                alt={tool.name}
                fill
                sizes="56px"
                className="object-contain transition-[filter] duration-200 group-hover:brightness-110"
              />
            </button>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}

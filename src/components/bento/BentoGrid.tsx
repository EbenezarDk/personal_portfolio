"use client";

import { BackgroundTile } from "@/components/bento/tiles/BackgroundTile";
import { EducationTile } from "@/components/bento/tiles/EducationTile";
import { ExperienceTile } from "@/components/bento/tiles/ExperienceTile";
import { GalleryTile } from "@/components/bento/tiles/GalleryTile";
import { HangoutTile } from "@/components/bento/tiles/HangoutTile";
import { ProfileTile } from "@/components/bento/tiles/ProfileTile";
import { ResumeTile } from "@/components/bento/tiles/ResumeTile";
import { TestimonyTile } from "@/components/bento/tiles/TestimonyTile";
import { ToolsTile } from "@/components/bento/tiles/ToolsTile";

export function BentoGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start lg:gap-5 ${className}`}
    >
      {/* Left column */}
      <div className="flex flex-col gap-4 lg:gap-5">
        <ResumeTile index={0} className="min-h-[150px]" />
        <BackgroundTile index={1} className="min-h-[260px]" />
        <GalleryTile index={2} className="min-h-[260px]" />
      </div>

      {/* Center column */}
      <div className="flex flex-col gap-4 lg:gap-5">
        <ProfileTile index={3} className="min-h-[360px]" />
        <EducationTile index={4} className="min-h-[200px]" />
        <HangoutTile index={5} className="min-h-[260px]" />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-4 lg:gap-5">
        <ExperienceTile index={6} className="min-h-[420px]" />
        <TestimonyTile index={7} className="min-h-[160px]" />
        <ToolsTile index={8} className="min-h-[160px]" />
      </div>
    </div>
  );
}

"use client";

import { BentoTile } from "@/components/bento/BentoTile";
import { SongRow } from "@/components/bento/tiles/SongRow";
import { usePreviewPlayer } from "@/components/bento/tiles/usePreviewPlayer";
import { favoriteJams } from "@/lib/portfolio-data";

export function HangoutTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  const { activeId, toggle } = usePreviewPlayer();

  return (
    <BentoTile label="Hangout junction" className={className} index={index}>
      <div className="flex flex-col p-5 sm:p-6">
        <h3 className="text-xs font-bold tracking-widest text-white">
          {favoriteJams.title}
        </h3>

        <ul className="mt-4 space-y-2.5">
          {favoriteJams.tracks.map((track) => (
            <SongRow
              key={track.index}
              track={track}
              isPlaying={activeId === track.index}
              onToggle={() => toggle(track)}
            />
          ))}
        </ul>
      </div>
    </BentoTile>
  );
}

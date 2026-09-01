"use client";

import type { Track } from "@/lib/portfolio-data";

function PlayIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SpotifyIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.56-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.51-.59 11.67 1.34.36.22.47.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.16-2.56-11.98-1.4a.94.94 0 1 1-.55-1.8c4.37-1.33 9.8-.68 13.51 1.6.44.27.58.85.31 1.29zm.13-3.4C15.73 8.28 8.36 8.04 4.6 9.18a1.13 1.13 0 1 1-.65-2.16c4.32-1.31 12.46-1.06 16.55 1.37a1.13 1.13 0 0 1-1.16 1.94z" />
    </svg>
  );
}

type SongRowProps = {
  track: Track;
  isPlaying: boolean;
  onToggle: () => void;
};

export function SongRow({ track, isPlaying, onToggle }: SongRowProps) {
  const hasPreview = Boolean(track.previewUrl);

  return (
    <li className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 select-none text-5xl font-black leading-none text-white/5"
      >
        {track.index}
      </span>

      <span
        aria-hidden="true"
        className="size-11 shrink-0 rounded-lg"
        style={{ backgroundImage: track.gradient }}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {track.title}
        </p>
        <p className="truncate text-xs text-[var(--muted)]">{track.artist}</p>
      </div>

      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${track.title} on Spotify`}
        className="z-10 shrink-0 text-[#1DB954] transition-opacity hover:opacity-80"
      >
        <SpotifyIcon className="size-4" />
      </a>

      <button
        type="button"
        onClick={onToggle}
        disabled={!hasPreview}
        aria-label={
          hasPreview
            ? `Play preview of ${track.title} by ${track.artist}`
            : "Preview unavailable"
        }
        title={hasPreview ? undefined : "Preview unavailable"}
        className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <PlayIcon playing={isPlaying} />
      </button>
    </li>
  );
}

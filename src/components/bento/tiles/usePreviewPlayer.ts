"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/portfolio-data";

export function usePreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const handleEnded = () => setActiveId(null);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio || !track.previewUrl) return;

      if (activeId === track.index) {
        audio.pause();
        setActiveId(null);
        return;
      }

      audio.src = track.previewUrl;
      void audio.play().catch(() => setActiveId(null));
      setActiveId(track.index);
    },
    [activeId],
  );

  return { activeId, toggle };
}

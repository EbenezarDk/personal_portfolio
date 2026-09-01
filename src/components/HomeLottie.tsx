"use client";

import { LANDING_LOTTIE_SRC } from "@/lib/landing-animation";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

type HomeLottieProps = {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
};

export function HomeLottie({
  className = "size-full",
  autoplay = true,
  loop = false,
  onProgress,
  onComplete,
}: HomeLottieProps) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (!dotLottie) return;

    const handleComplete = () => onComplete?.();

    const handleFrame = (event: { currentFrame: number }) => {
      if (!onProgress) return;
      const totalFrames = dotLottie.totalFrames;
      if (totalFrames <= 0) return;
      onProgress(event.currentFrame / totalFrames);
    };

    if (onComplete) {
      dotLottie.addEventListener("complete", handleComplete);
    }
    if (onProgress) {
      dotLottie.addEventListener("frame", handleFrame);
    }

    return () => {
      if (onComplete) {
        dotLottie.removeEventListener("complete", handleComplete);
      }
      if (onProgress) {
        dotLottie.removeEventListener("frame", handleFrame);
      }
    };
  }, [dotLottie, onComplete, onProgress]);

  return (
    <DotLottieReact
      src={LANDING_LOTTIE_SRC}
      autoplay={autoplay}
      loop={loop}
      dotLottieRefCallback={setDotLottie}
      className={`home-lottie ${className}`}
    />
  );
}

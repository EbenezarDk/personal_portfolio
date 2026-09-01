"use client";

import { useEffect, useMemo, useState } from "react";

const ASSET_VERSION = 7;

type HoverPlayLogoProps = {
  className?: string;
  alt?: string;
  /** When set, parent controls hover (e.g. whole widget area). */
  active?: boolean;
};

export function HoverPlayLogo({
  className = "size-[45px]",
  alt = "Logo",
  active,
}: HoverPlayLogoProps) {
  const staticSrc = `/logo.png?v=${ASSET_VERSION}`;
  const gifSrc = "/logo-hover.gif";
  const controlled = active !== undefined;
  const [internalHover, setInternalHover] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  const isActive = controlled ? active : internalHover;

  useEffect(() => {
    if (controlled && active) {
      setGifKey((k) => k + 1);
    }
  }, [active, controlled]);

  const imgSrc = useMemo(() => {
    if (isActive) return `${gifSrc}?v=${gifKey}`;
    return staticSrc;
  }, [gifSrc, gifKey, isActive, staticSrc]);

  return (
    <div
      className={className}
      onMouseEnter={
        controlled
          ? undefined
          : () => {
              setGifKey((k) => k + 1);
              setInternalHover(true);
            }
      }
      onMouseLeave={controlled ? undefined : () => setInternalHover(false)}
    >
      <img
        src={imgSrc}
        alt={alt}
        className="block size-full select-none object-contain"
        draggable={false}
      />
    </div>
  );
}

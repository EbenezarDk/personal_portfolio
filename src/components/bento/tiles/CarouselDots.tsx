"use client";

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function CarouselDots({
  count,
  activeIndex,
  onSelect,
  className = "",
}: CarouselDotsProps) {
  return (
    <div
      role="tablist"
      aria-label="Gallery navigation"
      className={`flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur-sm ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`size-2 rounded-full transition-colors ${
            i === activeIndex ? "bg-white" : "bg-white/30 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
}

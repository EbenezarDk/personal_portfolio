"use client";

import { LetterSlideText } from "@/components/LetterSlideText";

type AnimatedCtaButtonProps = {
  label?: string;
  href?: string;
  onClick?: () => void;
};

function ChevronIcon() {
  return (
    <svg className="btn-chevron" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AnimatedCtaButton({
  label = "View project",
  href,
  onClick,
}: AnimatedCtaButtonProps) {
  const content = (
    <>
      <span className="btn-label letter-slide-label block h-5 overflow-hidden leading-none">
        <LetterSlideText text={label} />
      </span>
      <ChevronIcon />
    </>
  );

  return (
    <div className="btn-wrapper">
      {href ? (
        <a className="btn letter-slide-trigger is-active" href={href}>
          {content}
        </a>
      ) : (
        <button
          className="btn letter-slide-trigger is-active"
          type="button"
          onClick={onClick}
        >
          {content}
        </button>
      )}
    </div>
  );
}

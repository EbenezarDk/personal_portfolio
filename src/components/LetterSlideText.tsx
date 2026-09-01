type LetterSlideTextProps = {
  text: string;
};

const MIN_TOTAL_S = 1.0;
const BASE_S = 0.25;

function charTransition(index: number, total: number) {
  const step = Math.max(0.04, (MIN_TOTAL_S - BASE_S) / total);
  return { transition: `transform ${BASE_S + index * step}s ease` };
}

export function LetterSlideText({ text }: LetterSlideTextProps) {
  const chars = [...text];

  return (
    <>
      <span className="span-mother">
        {chars.map((char, i) => (
          <span key={`a-${i}`} style={charTransition(i, chars.length)}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="span-mother2">
        {chars.map((char, i) => (
          <span key={`b-${i}`} style={charTransition(i, chars.length)}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </>
  );
}

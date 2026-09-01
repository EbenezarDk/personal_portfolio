"use client";

import { HomeLottie } from "@/components/HomeLottie";
import { KineticTextAnimate } from "@/components/ui/kinetic-text-animate";
import { isIntroAtLeast, useIntro } from "@/context/IntroContext";
import { SITE_GUTTER_CLASSES, SITE_MAX_WIDTH_CLASSES } from "@/lib/layout";
import { cn } from "@/lib/utils";

const TITLE_TEXT_PROGRESS = 0.75;
const BIO_TEXT_PROGRESS = 0.85;

const BIO_TEXT =
  "Combining creativity and technology, I create digital experiences that mesmerize audiences with their elegant design and practicality. Each pixel tells a story, engaging users deeply. With my focus on innovation and precision, I earn recognition across the industry. My dedication to pushing limits guarantees memorable experiences for everyone involved.";

export function LandingHero() {
  const {
    introPhase,
    revealTitleText,
    revealBioText,
    setIntroComplete,
  } = useIntro();

  const showTitleText = isIntroAtLeast(introPhase, "titleText");
  const showBioText = isIntroAtLeast(introPhase, "bioText");

  return (
    <section
      id="landing"
      aria-label="Landing"
      className="relative flex min-h-[calc(100dvh-100px)] w-full scroll-mt-28 overflow-hidden bg-[var(--background)]"
    >
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[calc(100dvh-100px)] w-full flex-col items-center justify-center gap-0 py-12 text-center min-[970px]:py-16",
          SITE_GUTTER_CLASSES,
          SITE_MAX_WIDTH_CLASSES,
        )}
      >
        {showTitleText ? (
          <div className="relative z-20 flex w-fit flex-col items-center justify-start gap-3 text-center">
            <KineticTextAnimate
              as="p"
              text="Hey I'm Dineshkuamr, Jus call me DK, Previously at Lollypop Design Studio"
              startOnView={false}
              once
              accessible={false}
              duration={2.8}
              className="w-[900px] justify-center font-script text-[clamp(12px,2.2vw,20px)] tracking-[2.5px] text-[var(--foreground)]"
            />
            <KineticTextAnimate
              as="p"
              text="UX/UI & PRODUCT DESIGNER"
              startOnView={false}
              once
              accessible={false}
              duration={1.8}
              delay={0.4}
              className="justify-center text-[clamp(12px,1.8vw,20px)] font-semibold tracking-[0.28em] text-[var(--foreground)]"
            />
          </div>
        ) : null}

        <div className="relative z-10 flex h-[322px] w-full max-w-[1217px] shrink-0 flex-col items-center justify-end overflow-hidden">
          <HomeLottie
            className="pointer-events-none absolute left-1/2 top-1/2 flex h-[min(60vh,580px)] w-[min(94vw,1150px)] -translate-x-1/2 -translate-y-1/2 scale-110 flex-col items-center justify-end"
            autoplay
            loop={false}
            onProgress={(progress) => {
              if (progress >= TITLE_TEXT_PROGRESS) revealTitleText();
              if (progress >= BIO_TEXT_PROGRESS) revealBioText();
            }}
            onComplete={setIntroComplete}
          />
        </div>

        {showBioText ? (
          <KineticTextAnimate
            as="p"
            text={BIO_TEXT}
            startOnView={false}
            once
            accessible={false}
            duration={7}
            className="relative z-20 mx-[300px] w-[904px] justify-center text-center text-[clamp(12px,1.4vw,14px)] leading-6 text-[rgba(233,223,206,0.5)] max-md:mx-auto max-md:max-w-2xl min-[700px]:leading-7"
          />
        ) : null}
      </div>
    </section>
  );
}

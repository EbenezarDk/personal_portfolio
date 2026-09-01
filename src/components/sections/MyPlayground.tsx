"use client";

import { LogoCarousel } from "@/components/bento/tiles/LogoCarousel";
import { Container } from "@/components/Container";
import { collaboratorLogos } from "@/lib/portfolio-data";
import {
  getProjectLabel,
  playgroundProjects,
} from "@/lib/playground-projects";

export function MyPlayground() {
  return (
    <section
      id="playground"
      className="scroll-mt-28 bg-[var(--background)]"
      aria-label="My playground"
    >
      <Container className="py-16 lg:py-24">
        <p className="text-sm text-[var(--muted)]">I&apos;m Dineshkumar Selvam</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          Skilled UX/UI and Product Designer creating intuitive, high-quality
          designs that enhance user experience and engagement.
        </h2>

        <div className="mt-12 w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex h-full w-max gap-5 pr-6 sm:pr-10 lg:pr-[100px]">
            {playgroundProjects.map((project) => (
              <article
                key={project.id}
                aria-label={getProjectLabel(project)}
                className="relative aspect-[16/10] w-[min(78vw,920px)] shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-white/20"
              />
            ))}
          </div>
        </div>

        <p className="mt-12 text-sm text-[var(--muted)]">
          I have contributed more than four companies and deliver high-quality
          designs.
        </p>
        <LogoCarousel logos={collaboratorLogos} />
      </Container>
    </section>
  );
}

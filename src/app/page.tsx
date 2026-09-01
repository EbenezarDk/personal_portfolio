import { LandingHero } from "@/components/sections/LandingHero";
import { PlaygroundTextReveal } from "@/components/sections/PlaygroundTextReveal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { Container } from "@/components/Container";

export default function Home() {
  return (
    <main>
      <LandingHero />
      <PlaygroundTextReveal />
      <section id="about" className="scroll-mt-28 py-16 lg:py-24">
        <Container>
          <BentoGrid />
        </Container>
      </section>
      <SiteFooter />
    </main>
  );
}

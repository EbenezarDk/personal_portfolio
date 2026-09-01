"use client";

import { Container } from "@/components/Container";
import { motion } from "framer-motion";

const experience = [
  {
    years: "2025 — Now",
    role: "Front-end Developer",
    company: "Company Name",
    location: "Remote",
  },
  {
    years: "2023 — 2025",
    role: "UI/UX Designer",
    company: "Company Name",
    location: "On-site",
  },
];

const education = [
  { years: "2020 — 2023", title: "B.Sc. / Diploma", org: "Your Institute" },
  { years: "2018", title: "Bootcamp / Course", org: "Your Program" },
];

const tools = [
  "Figma",
  "Photoshop",
  "Framer",
  "Webflow",
  "Notion",
  "Linear",
  "VS Code",
];

export function KnowAboutMe() {
  return (
    <section id="about" className="scroll-mt-28">
      <Container>
        <div className="border-t border-[var(--border)] py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm text-[var(--muted)]">03</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Know about me
            </h2>
            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              This section will become your full resume + creative story. For now,
              it’s structured placeholders so swapping your real content is easy.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            >
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                <h3 className="text-sm font-semibold tracking-tight">
                  My background (creative)
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Write a short story here: how you started, what you love
                  building, and what makes your work feel “you”. Keep it personal,
                  concise, and memorable.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { k: "Focus", v: "Design systems · Front-end" },
                    { k: "Strength", v: "Detail-oriented execution" },
                    { k: "Style", v: "Bold, clean, minimal" },
                    { k: "Currently", v: "Open to opportunities" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4"
                    >
                      <div className="text-xs text-[var(--muted)]">{x.k}</div>
                      <div className="mt-1 text-sm font-semibold">{x.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.aside
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            >
              <div className="space-y-6">
                <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                  <h3 className="text-sm font-semibold tracking-tight">
                    Experience
                  </h3>
                  <div className="mt-4 space-y-4">
                    {experience.map((e) => (
                      <div key={`${e.years}-${e.role}`} className="space-y-1">
                        <div className="text-xs text-[var(--muted)]">
                          {e.years}
                        </div>
                        <div className="text-sm font-semibold">{e.role}</div>
                        <div className="text-xs text-[var(--muted)]">
                          {e.company} · {e.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                  <h3 className="text-sm font-semibold tracking-tight">
                    Education
                  </h3>
                  <div className="mt-4 space-y-4">
                    {education.map((e) => (
                      <div key={`${e.years}-${e.title}`} className="space-y-1">
                        <div className="text-xs text-[var(--muted)]">
                          {e.years}
                        </div>
                        <div className="text-sm font-semibold">{e.title}</div>
                        <div className="text-xs text-[var(--muted)]">{e.org}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                  <h3 className="text-sm font-semibold tracking-tight">
                    Tool stack
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-1 text-xs text-[var(--muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </Container>
    </section>
  );
}


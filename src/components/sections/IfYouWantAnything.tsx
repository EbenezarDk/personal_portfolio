"use client";

import { Container } from "@/components/Container";
import { motion } from "framer-motion";

export function IfYouWantAnything() {
  return (
    <section id="contact" className="scroll-mt-28">
      <Container>
        <div className="border-t border-[var(--border)] py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm text-[var(--muted)]">04</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              If you want anything
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Drop a message anytime. Replace these placeholders with your real
              email and socials.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            >
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                <div className="text-xs text-[var(--muted)]">Email</div>
                <a
                  href="mailto:you@example.com"
                  className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
                >
                  you@example.com <span className="text-[var(--muted)]">↗</span>
                </a>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "LinkedIn", href: "#" },
                    { label: "GitHub", href: "#" },
                    { label: "Dribbble", href: "#" },
                    { label: "Twitter / X", href: "#" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--foreground)]"
                    >
                      <span>{s.label}</span>
                      <span className="translate-x-0 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
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
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                <div className="text-xs text-[var(--muted)]">Quick note</div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Tell me what you’re building, timelines, and what “great” looks
                  like for you. I’ll reply with next steps.
                </p>
                <a
                  href="mailto:you@example.com?subject=Portfolio%20Inquiry"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-[var(--background)] transition-transform hover:-translate-y-0.5"
                >
                  Email me
                </a>
              </div>
            </motion.aside>
          </div>

          <div className="mt-12 text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} · Ebenezar DK
          </div>
        </div>
      </Container>
    </section>
  );
}


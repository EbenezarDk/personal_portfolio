"use client";

import Link from "next/link";
import { navItems } from "@/lib/nav";
import { Container } from "@/components/Container";
import { LogoHoverGif } from "@/components/LogoHoverGif";
import { NavLabelHover } from "@/components/NavLabelHover";
import { useIntro } from "@/context/IntroContext";
import { useScrollHeaderVisibility } from "@/hooks/useScrollHeaderVisibility";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

const headerEase = [0.16, 1, 0.3, 1] as const;
const NAV_ENABLE_DELAY_MS = 850;

export function Header() {
  const { introComplete } = useIntro();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [navEnabled, setNavEnabled] = useState(false);
  const drawerId = useId();

  const {
    isVisible: isHeaderVisible,
    onTriggerEnter,
    onTriggerLeave,
    onHeaderEnter,
    onHeaderLeave,
  } = useScrollHeaderVisibility({
    enabled: scrollEnabled && !isMenuOpen,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!introComplete) {
      setScrollEnabled(false);
      setNavEnabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setScrollEnabled(true);
      setNavEnabled(true);
    }, NAV_ENABLE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [introComplete]);

  return (
    <div className="h-[100px] shrink-0">
      <AnimatePresence>
        {introComplete ? (
          <>
          <div
            aria-hidden
            className="fixed top-0 left-0 right-0 z-[49] h-10"
            onMouseEnter={onTriggerEnter}
            onMouseLeave={onTriggerLeave}
          />

          <motion.header
            className="site-header fixed top-0 left-0 right-0 z-50 w-full"
            initial={{ opacity: 0, y: -18 }}
            animate={{
              opacity: 1,
              y: scrollEnabled ? (isHeaderVisible ? 0 : "-100%") : 0,
            }}
            transition={{
              duration: scrollEnabled ? 0.55 : 0.8,
              ease: headerEase,
            }}
            onMouseEnter={onHeaderEnter}
            onMouseLeave={onHeaderLeave}
          >
            <div className="site-header__blur" aria-hidden="true" />

            <div className="relative z-10">
            <Container>
              <div className="flex h-[100px] items-center justify-between">
                <div className="flex items-center gap-3">
                  <LogoHoverGif />
                </div>

                <nav
                  className="hidden items-start gap-10 min-[841px]:flex"
                  aria-hidden={!navEnabled}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={
                        navEnabled
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0.35, y: 8 }
                      }
                      transition={{
                        duration: 0.55,
                        ease: headerEase,
                        delay: navEnabled ? index * 0.08 : 0,
                      }}
                    >
                      <Link
                        href={item.href ?? `#${item.id}`}
                        tabIndex={navEnabled ? undefined : -1}
                        aria-disabled={!navEnabled}
                        className={`group relative block -mt-0.5 pt-3 ${
                          navEnabled
                            ? "letter-slide-trigger is-active pointer-events-auto"
                            : "pointer-events-none cursor-default"
                        }`}
                        onClick={(event) => {
                          if (!navEnabled) event.preventDefault();
                        }}
                      >
                        <span className="flex w-full items-center gap-0.5 text-xs text-[#303030] transition-colors duration-[800ms] ease-in-out group-hover:text-[var(--accent)]">
                          {item.index}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none h-px min-w-0 flex-1 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[800ms] ease-in-out group-hover:scale-x-100"
                          />
                        </span>
                        <NavLabelHover label={item.label} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <button
                  type="button"
                  className={`inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--foreground)] min-[841px]:hidden ${
                    navEnabled
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-35"
                  }`}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  aria-controls={drawerId}
                  aria-disabled={!navEnabled}
                  tabIndex={navEnabled ? undefined : -1}
                  onClick={() => {
                    if (navEnabled) setIsMenuOpen(true);
                  }}
                >
                  Menu
                </button>
              </div>
            </Container>
            </div>

            <AnimatePresence>
              {isMenuOpen ? (
                <>
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/60 min-[841px]:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <motion.aside
                    id={drawerId}
                    role="dialog"
                    aria-modal="true"
                    className="fixed right-0 top-0 z-[60] h-dvh w-[min(340px,90vw)] border-l border-[var(--border)] bg-[var(--background)] p-6 min-[841px]:hidden"
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 24, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold tracking-tight">
                        Navigation
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--foreground)]"
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        X
                      </button>
                    </div>

                    <div className="mt-8 grid gap-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href ?? `#${item.id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="group relative block pt-3"
                        >
                          <span className="pointer-events-none absolute left-0 top-0 h-px w-16 bg-[var(--accent)] opacity-0 transition-opacity duration-[800ms] ease-in-out group-hover:opacity-100" />
                          <span className="block text-xs text-[#303030] transition-colors duration-[800ms] ease-in-out group-hover:text-[var(--accent)]">
                            {item.index}
                          </span>
                          <span className="mt-1 block text-base font-semibold tracking-tight text-[var(--foreground)]">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.aside>
                </>
              ) : null}
            </AnimatePresence>
          </motion.header>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

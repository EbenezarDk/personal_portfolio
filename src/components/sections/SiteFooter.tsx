"use client";

import { Container } from "@/components/Container";
import { LogoHoverGif } from "@/components/LogoHoverGif";
import { SocialIcon } from "@/components/bento/SocialIcon";
import { resume } from "@/lib/portfolio-data";

const emailSocial = resume.socials.find((s) => s.icon === "mail");
const emailHref = emailSocial?.href ?? "mailto:ebenezarjosh@gmail.com";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and footer"
      className="relative scroll-mt-28 overflow-hidden bg-[var(--background)]"
    >
      <Container className="mt-0 mb-[40px] h-[188px]">
        <div className="border-t border-[var(--border)]">
          <div className="relative z-10 flex flex-col gap-8 py-10 lg:gap-10 lg:py-12">
            <div className="grid w-full grid-cols-3 items-center">
              <div className="justify-self-start">
                <LogoHoverGif />
              </div>

              <div className="flex items-center justify-center gap-3 text-white">
                {resume.socials.map((social) => {
                  const isMail = social.href.startsWith("mailto:");
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      aria-label={social.name}
                      className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.06)] text-white transition-colors hover:bg-[rgba(255,255,255,0.12)] hover:text-[var(--accent)]"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  );
                })}
              </div>

              <div className="justify-self-end">
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                  className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.06)] text-white transition-colors hover:bg-[rgba(255,255,255,0.12)] hover:text-[var(--accent)]"
                >
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 19V5" />
                    <path d="m5 12 7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 text-[12px] text-white sm:flex-row sm:items-end sm:justify-between">
              <a
                href={emailHref}
                className="group sm:max-w-[30%] sm:whitespace-nowrap transition-opacity hover:opacity-80"
              >
                <span>Grab</span>
                {" my email, and get in touch"}
              </a>

              <p className="sm:max-w-[30%] sm:whitespace-nowrap sm:text-right">
                Created with ❤️ in Chennai &middot; Made by DK
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

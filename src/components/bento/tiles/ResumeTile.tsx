"use client";

import { BentoTile } from "@/components/bento/BentoTile";
import { DownloadIcon, SocialIcon } from "@/components/bento/SocialIcon";
import { resume } from "@/lib/portfolio-data";

export function ResumeTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <BentoTile label="Resume and contact" className={className} index={index}>
      <div className="flex h-full min-h-0 flex-col justify-between p-5 sm:p-6">
        <p className="max-w-[92%] text-sm font-semibold leading-relaxed text-white">
          {resume.note}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {resume.socials.map((social) => {
              const isMail = social.href.startsWith("mailto:");
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  aria-label={social.name}
                  className="flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.06)] text-white transition-colors hover:bg-[rgba(255,255,255,0.12)] hover:text-[var(--accent)]"
                >
                  <SocialIcon name={social.icon} />
                </a>
              );
            })}
          </div>

          <a
            href={resume.downloadHref}
            download
            aria-label="Download resume PDF"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[rgba(255,255,255,0.12)]"
          >
            <DownloadIcon className="size-4" />
            {resume.downloadLabel}
          </a>
        </div>
      </div>
    </BentoTile>
  );
}

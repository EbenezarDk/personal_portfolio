"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProfileChatBubbles } from "@/components/bento/tiles/ProfileChatBubbles";
import { profile } from "@/lib/portfolio-data";

export function ProfileTile({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <motion.article
      aria-label="Profile"
      className={`relative overflow-hidden rounded-2xl border border-[var(--border)] ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: Math.min(index * 0.06, 0.5),
      }}
    >
      <Image
        src={profile.imageSrc}
        alt="Dineshkumar Selvam (DK)"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <ProfileChatBubbles className="pointer-events-auto absolute bottom-4 left-4 right-4 z-10" />
    </motion.article>
  );
}

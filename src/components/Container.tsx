import type { ReactNode } from "react";
import { SITE_CONTAINER_CLASSES } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(SITE_CONTAINER_CLASSES, className)}
      style={{
        backgroundClip: "unset",
        WebkitBackgroundClip: "unset",
        color: "rgba(237, 237, 237, 1)",
      }}
    >
      {children}
    </div>
  );
}


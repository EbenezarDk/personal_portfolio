"use client";

import React, { createContext, useContext, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const DEFAULT_DISABLE_MAGNIFICATION = false;

const DockContext = createContext<MotionValue<number> | null>(null);

export interface DockProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      direction = "middle",
      children,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <DockContext.Provider value={mouseX}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseEnter={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(
            "flex w-max items-end gap-[12px]",
            direction === "top" && "items-start",
            direction === "middle" && "items-center",
            direction === "bottom" && "items-end",
            className,
          )}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  pill?: boolean;
  pillWidth?: number;
  pillHeight?: number;
}

function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification = DEFAULT_DISABLE_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX: mouseXProp,
  className,
  children,
  pill = false,
  pillWidth = 58,
  pillHeight = 32,
  ...props
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contextMouseX = useContext(DockContext);
  const defaultMouseX = useMotionValue(Infinity);
  const mouseX = mouseXProp ?? contextMouseX ?? defaultMouseX;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = disableMagnification ? size : magnification;
  const magnifyRatio = targetSize / size;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size],
  );

  const pillWidthTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [pillWidth, pillWidth * magnifyRatio, pillWidth],
  );

  const pillHeightTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [pillHeight, pillHeight * magnifyRatio, pillHeight],
  );

  const springSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const springPillWidth = useSpring(pillWidthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const springPillHeight = useSpring(pillHeightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  if (pill) {
    return (
      <motion.div
        ref={ref}
        style={{
          width: springPillWidth,
          height: springPillHeight,
        }}
        className={cn(
          "flex shrink-0 cursor-pointer items-end justify-center",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const padding = Math.max(6, size * 0.2);

  return (
    <motion.div
      ref={ref}
      style={{ width: springSize, height: springSize, padding }}
      className={cn(
        "flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "transition-colors hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };

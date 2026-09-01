export type PlaygroundHoverTheme = {
  headerBg: string;
  headerBorder: string;
  bodyBg: string;
  bodyBorder: string;
};

export type PlaygroundProject = {
  id: string;
  title: string;
  titleLine2?: string;
  lede: string;
  featuredName: string;
  ctaLabel: string;
  ctaHref: string;
  coverSrc?: string;
  coverGradient: string;
  hoverTheme: PlaygroundHoverTheme;
};

export function getProjectLabel(project: PlaygroundProject): string {
  return project.titleLine2
    ? `${project.title} ${project.titleLine2}`
    : project.title;
}

export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "agilus",
    title: "Agilus Diagnostics",
    featuredName: "Agilus Diagnostics",
    lede: "A health data platform that transforms dense diagnostics into clear, actionable visual stories.",
    ctaLabel: "View Project",
    ctaHref: "#",
    coverSrc: "/images/playground/agilus.png",
    coverGradient: "linear-gradient(150deg, #0a0a0a, #1c2d3a 50%, #2e5266)",
    hoverTheme: {
      headerBg: "#0a7b21",
      headerBorder: "#0dc934",
      bodyBg: "#034510",
      bodyBorder: "#09751e",
    },
  },
  {
    id: "royal-sundaram",
    title: "Royal sundaram",
    featuredName: "Royal sundaram",
    lede: "An insurance experience redesigned for clarity, trust, and minimal friction across key journeys.",
    ctaLabel: "View Project",
    ctaHref: "#",
    coverSrc: "/images/playground/royal-sundaram.png",
    coverGradient: "linear-gradient(135deg, #1a1a2e, #16213e 50%, #0f3460)",
    hoverTheme: {
      headerBg: "#611bf7",
      headerBorder: "#8d62ea",
      bodyBg: "#4908d4",
      bodyBorder: "#6421f4",
    },
  },
  {
    id: "crypto-io-design-system",
    title: "Crypto.io",
    titleLine2: "Design System",
    featuredName: "crypto.io Design System",
    lede: "A crypto product design system built for clarity, speed, and zero cognitive overhead.",
    ctaLabel: "View Project",
    ctaHref: "#",
    coverSrc: "/images/playground/crypto-io-design-system.png",
    coverGradient: "linear-gradient(150deg, #ff2e3c, #7a0f18 60%, #2a2a35)",
    hoverTheme: {
      headerBg: "#0191de",
      headerBorder: "#65c5f9",
      bodyBg: "#005d8f",
      bodyBorder: "#0e76ae",
    },
  },
  {
    id: "banglalink",
    title: "Banglalink",
    featuredName: "Banglalink",
    lede: "A telecom app concept with expressive visuals and a component-first design system.",
    ctaLabel: "View Project",
    ctaHref: "#",
    coverSrc: "/images/playground/banglalink.png",
    coverGradient: "linear-gradient(135deg, #2d1b69, #11998e 80%, #38ef7d)",
    hoverTheme: {
      headerBg: "#bc0000",
      headerBorder: "#fa5555",
      bodyBg: "#6c0000",
      bodyBorder: "#ba0303",
    },
  },
  {
    id: "flytbase",
    title: "Flytbase",
    featuredName: "Flytbase",
    lede: "A drone operations platform with clear spatial workflows and mission-ready interface patterns.",
    ctaLabel: "View Project",
    ctaHref: "#",
    coverSrc: "/images/playground/flyt-base.png",
    coverGradient: "linear-gradient(135deg, #2a0a1a, #800042 50%, #cd026b)",
    hoverTheme: {
      headerBg: "#cd026b",
      headerBorder: "#fb57ac",
      bodyBg: "#800042",
      bodyBorder: "#d70b75",
    },
  },
];

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudyHero = {
  logoSrc: string;
  logoAlt: string;
  tagline: string;
  illustrationSrc: string;
  illustrationAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Full-viewport centered banner (logo, tagline, illustration). */
  layout?: "default" | "banner";
};

export type CaseStudyTextBlock = {
  kicker?: string;
  heading: string;
  paragraphs: string[];
};

export type CaseStudyProblemBrief = {
  heading: string;
  intro?: string;
};

export type CaseStudyTimelinePhase = {
  label: string;
  milestones: string[];
};

export type CaseStudyDesignProgress = {
  kicker: string;
  heading: string;
  months: string[];
  phases: CaseStudyTimelinePhase[];
};

export type CaseStudyAudienceTier = {
  tier: string;
  segment: string;
  percentage: number;
};

export type CaseStudyPersonaBubble = {
  tier: string;
  ageRange: string;
  label: string;
  size: "lg" | "md" | "sm";
};

export type CaseStudyAudience = {
  kicker: string;
  heading: string;
  subheading: string;
  intro: string;
  ageRange: string;
  tiers: CaseStudyAudienceTier[];
  personas: CaseStudyPersonaBubble[];
};

export type CaseStudyGoalItem = {
  label: string;
  text: string;
};

export type CaseStudyGoals = {
  kicker: string;
  heading: string;
  items: CaseStudyGoalItem[];
};

export type CaseStudyResearch = {
  kicker: string;
  heading: string;
  paragraph: string;
  opportunitiesKicker: string;
  opportunities: string[];
};

export type CaseStudyDiagramSection = {
  kicker: string;
  heading: string;
  paragraph: string;
};

export type CaseStudyOutcomes = {
  kicker: string;
  achievedHeading: string;
  achievedText: string;
  lessonsHeading: string;
  lessonsText: string;
};

export type CaseStudyFooter = {
  heading: string;
  name: string;
  role: string;
  avatarSrc: string;
  email: string;
  phone?: string;
  nextProjectLabel: string;
};

export type CaseStudyContent = {
  hero: CaseStudyHero;
  projectBrief: CaseStudyTextBlock;
  problemBrief: CaseStudyProblemBrief;
  designProgress: CaseStudyDesignProgress;
  audience: CaseStudyAudience;
  goals: CaseStudyGoals;
  research: CaseStudyResearch;
  informationArchitecture: CaseStudyDiagramSection;
  userFlow: CaseStudyDiagramSection;
  outcomes: CaseStudyOutcomes;
  footer: CaseStudyFooter;
};

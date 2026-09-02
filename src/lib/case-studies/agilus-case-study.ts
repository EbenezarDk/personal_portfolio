import type { CaseStudyContent } from "./types";

export const agilusCaseStudy: CaseStudyContent = {
  hero: {
    logoSrc: "/images/case-studies/agilus/logo.svg",
    logoAlt: "Agilus Diagnostics",
    tagline: "Largest clinical examination company of India",
    illustrationSrc: "/images/case-studies/agilus/banner.svg",
    illustrationAlt: "Agilus home collection and diagnostics illustration",
    layout: "banner",
  },
  projectBrief: {
    kicker: "Project Brief",
    heading: "About Agilus Diagnostic",
    paragraphs: [
      "Agilus Diagnostics, a prominent diagnostic laboratory chain in India and a part of the Fortis Group, operates across 25 states with 400+ laboratories. In addition to this extensive network, Agilus Diagnostics provides a wide range of services, including home collection services, specialized diagnostic tests, and wellness packages.",
      "The objective is to build lasting relationship by using cutting edge technology and users' data to provide users with an exceptional digital experience that stands apart from the competitors.",
    ],
  },
  problemBrief: {
    heading: "Problem Brief",
    intro:
      "Users face difficulties in selecting and scheduling tests for multiple people at once, with a complex and time-consuming process. There is a lack of real-time updates for home sample collection and report generation, leading to prolonged waiting times at the lab. Navigation during lab test is confusing, and there's limited visibility of doctor availability. The rescheduling process is complicated, online consultations are challenging, and managing health reports and data is inconvenient.",
  },
  designProgress: {
    kicker: "Design Progress",
    heading: "Design Progress",
    months: [
      "Kick Start",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    phases: [
      {
        label: "Phase 1",
        milestones: ["Research Data", "Discovery", "Design Direction"],
      },
      {
        label: "Phase 2",
        milestones: ["User Research", "Journey Map", "Competitive Analyse"],
      },
      {
        label: "Phase 3",
        milestones: ["Information Architecture", "User Flow"],
      },
      {
        label: "Phase 4",
        milestones: ["Paper Sketch", "Low Fidelity Wireframes", "UX Prototype"],
      },
      {
        label: "Phase 5",
        milestones: ["Mood Board", "High Fidelity UI Designs", "Design System"],
      },
      {
        label: "Phase 6",
        milestones: ["Feedback", "Dev Handover", "Files Handover"],
      },
    ],
  },
  audience: {
    kicker: "Audience Analysis",
    heading: "Audience Analysis",
    subheading: "Knowing our Target Audience",
    intro:
      "The process of gathering, analyzing, and comprehending data about your target audience is known as audience analysis.",
    ageRange: "Age 25–60",
    tiers: [
      { tier: "Tier 1", segment: "Aged People", percentage: 70 },
      { tier: "Tier 1", segment: "Pregnant women", percentage: 20 },
      { tier: "Tier 1", segment: "Working Professionals", percentage: 10 },
    ],
    personas: [
      { tier: "Tier 1", ageRange: "45 – 60", label: "Aged people", size: "lg" },
      { tier: "Tier 2", ageRange: "25 – 45", label: "Pregnant women", size: "md" },
      {
        tier: "Tier 3",
        ageRange: "25 – 35",
        label: "Working Professionals",
        size: "sm",
      },
    ],
  },
  goals: {
    kicker: "Design Direction",
    heading: "Goals",
    items: [
      {
        label: "Primary Goal",
        text: "Create a seamless end-to-end diagnostic booking experience with real-time tracking and simplified family test management.",
      },
      {
        label: "Secondary Goal",
        text: "Build trust through transparent report delivery, loyalty engagement, and intuitive health data management.",
      },
    ],
  },
  research: {
    kicker: "Research",
    heading: "Competitive Analysis",
    paragraph:
      "A deep competitive review informed feature priorities across sign-up, booking, order tracking, family management, loyalty, and engagement.",
    opportunitiesKicker: "Value Proportion and Opportunities",
    opportunities: [
      "Essential Sign-up/Sign-in Procedures",
      "Comprehensive End-to-End Test Booking Process for All Scenarios",
      "Order Tracking and Management",
      "Family Member Management",
      "Loyalty Points and Premium Plan Subscriptions",
      "User Engagement and Gamification",
    ],
  },
  informationArchitecture: {
    kicker: "Information Architecture",
    heading: "Agilus Diagnosis",
    paragraph:
      "You can view the information architecture here. I decided to go ahead with this features. This Information Architecture helps everyone to understand the Agilus Diagnostics Application.",
  },
  userFlow: {
    kicker: "User Flow",
    heading: "User flow",
    paragraph:
      "You can see the user flow here. I decided to go ahead with designing the home visit & lab visit and doctor consulting flow.",
  },
  outcomes: {
    kicker: "Conclusion",
    achievedHeading: "What was achieved",
    achievedText:
      "Enhance user experience by offering a simplified scheduling process for home sample collection with real-time updates and tracking, while in-lab visits feature online check-ins, digital queue management, and interactive maps. Streamline report management with real-time notifications and secure access, integrate with health apps, and simplify doctor consultations with intuitive booking, real-time availability, and easy rescheduling. Advanced search, clear availability, and reminders for in-lab consulting, combined with gamified loyalty programs and seamless membership management, ensure an engaging and user-friendly platform.",
    lessonsHeading: "Lessons learned",
    lessonsText:
      "In designing the Agilus Diagnostics app, I learned the importance of creating an intuitive and user-friendly interface that simplifies the booking of home sample collections, in-lab tests, and doctor appointments. I recognized the need for a seamless end-to-end test booking process, real-time notifications, and comprehensive health report management. Additionally, features like family member management, loyalty programs, and gamification are crucial for enhancing user engagement and satisfaction. The goal is to address common issues found in competitor apps and ensure the app fits seamlessly into users' daily lives while providing reliable and secure health management.",
  },
  footer: {
    heading: "Let's collaborate and solve your problem",
    name: "Dineshkumar",
    role: "Sr. UX/UI and Product Designer",
    avatarSrc: "/images/dk.png",
    email: "ebenezarjosh@gmail.com",
    phone: "96000 20595",
    nextProjectLabel: "Next Project",
  },
};

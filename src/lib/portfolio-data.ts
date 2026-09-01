export type Experience = {
  start: string;
  end: string;
  role: string;
  company: string;
  location: string;
};

export const experience: Experience[] = [
  {
    start: "01/2020",
    end: "02/2021",
    role: "UI/UX Designer",
    company: "Blackmount Technology",
    location: "Chennai",
  },
  {
    start: "03/2021",
    end: "08/2023",
    role: "Senior UI/UX Designer",
    company: "Swipewire Technology",
    location: "Chennai",
  },
  {
    start: "08/2023",
    end: "07/2024",
    role: "UI/UX Designer",
    company: "Lollypop Design Studio",
    location: "Chennai",
  },
  {
    start: "08/2024",
    end: "10/2024",
    role: "Sr. Product Designer",
    company: "J&F Project India Pvt Ltd",
    location: "Chennai",
  },
  {
    start: "03/2025",
    end: "Present",
    role: "Sr. Product Designer",
    company: "Eurolandcom IR",
    location: "Chennai",
  },
];

export type Logo = { name: string; src: string };

export const collaboratorLogos: Logo[] = [
  { name: "Agilus Diagnostics", src: "/logos/agilus.png" },
  { name: "Blackmount Technology", src: "/logos/blackmount.png" },
  { name: "Frame", src: "/logos/frame.png" },
  { name: "J&F Project India", src: "/logos/j-f.png" },
  { name: "Lollypop Design Studio", src: "/logos/lollypop.png" },
  { name: "Royal Sundaram", src: "/logos/rs.png" },
  { name: "Swipewire Technology", src: "/logos/swipewire.png" },
];

export type Education = {
  years: string;
  title: string;
  institution: string;
};

export const education: Education[] = [
  {
    years: "2017 – 2020",
    title: "Bachelor of Science (B.Sc) in Media Technology",
    institution: "Chennai. Icat Design and Media College (Bharathiyar University)",
  },
  {
    years: "2016 – 2017",
    title: "Higher School Certificate",
    institution: "Chennai. Kesari. Hr. Sec. School",
  },
  {
    years: "2014 – 2015",
    title: "Secondary School Certificate",
    institution: "Chennai. CSI Kellett. Hr. Sec. School",
  },
];

export type TextSegment = {
  text: string;
  type: "text" | "underline" | "bold";
};

export type BackgroundBlock =
  | { type?: undefined; segments: TextSegment[] }
  | { type: "callout"; text: string };

export const background: {
  paragraphs: BackgroundBlock[];
  signature: string;
} = {
  paragraphs: [
    {
      segments: [
        { text: "Lorem ipsum dolor sit amet, ", type: "text" },
        { text: "consectetur adipiscing elit", type: "underline" },
        {
          text: ", sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. This ",
          type: "text",
        },
        { text: "unique blend", type: "bold" },
        { text: " has deeply shaped my perspective.", type: "text" },
      ],
    },
    {
      segments: [
        { text: "My ", type: "text" },
        { text: "fascination with design", type: "underline" },
        {
          text: " began early, sparked by curiosity and craft. Although I pursued a degree in ",
          type: "text",
        },
        { text: "Media Technology", type: "bold" },
        { text: ", my true passion lies in the ", type: "text" },
        { text: "transformative power of great design craft", type: "underline" },
        {
          text: ", inspired by products that feel effortless and human.",
          type: "text",
        },
      ],
    },
    {
      type: "callout",
      text: "My curiosity led me to wonder: could I also create something that can evoke this effect on people?",
    },
    {
      segments: [
        { text: "Today, I ", type: "text" },
        { text: "apply my multidisciplinary design skills", type: "bold" },
        {
          text: ", aiming to create solutions that make people feel and remember, ",
          type: "text",
        },
        {
          text: "elevating everyday experiences into inspiring solutions",
          type: "bold",
        },
        { text: ".", type: "text" },
      ],
    },
  ],
  signature: "DK.",
};

export type Tool = { name: string; src: string };

export const tools: Tool[] = [
  { name: "Figma", src: "/tools/figma.png" },
  { name: "Photoshop", src: "/tools/photoshop.png" },
  { name: "Framer", src: "/tools/framer.png" },
  { name: "Miro", src: "/tools/miro.png" },
  { name: "Notion", src: "/tools/notion.png" },
  { name: "Spotify", src: "/tools/spotify.png" },
];

export type GalleryImage = { src: string; alt: string };

export const galleryImages: GalleryImage[] = [
  { src: "/gallery/amsterdam.png", alt: "Travel moment on a canal bridge" },
  { src: "/gallery/nyc-skyline.png", alt: "City skyline at sunset" },
  { src: "/gallery/manhattan-bridge.png", alt: "Manhattan Bridge street view" },
];

export type SocialIconName = "mail" | "linkedin" | "instagram";

export type Social = {
  name: string;
  href: string;
  icon: SocialIconName;
};

export const resume: {
  note: string;
  downloadHref: string;
  downloadLabel: string;
  socials: Social[];
} = {
  note: "Product Designer with 13 years of experience, focused on creating functional and user-centered digital products with visually stunning designs.",
  downloadHref: "/resume.pdf",
  downloadLabel: "Resume",
  socials: [
    { name: "Email", href: "mailto:ebenezarjosh@gmail.com", icon: "mail" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dineshkumar-dk-3369b2164?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BflMQpngTT6SanTSeHi55vQ%3D%3D",
      icon: "linkedin",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ebenezar_dk?igsh=NGx2aHBpam8xazBl",
      icon: "instagram",
    },
  ],
};

export type Track = {
  index: string;
  title: string;
  artist: string;
  gradient: string;
  previewUrl: string | null;
  spotifyUrl: string;
};

export const favoriteJams: { title: string; tracks: Track[] } = {
  title: "HANGOUT JUNCTION",
  tracks: [
    {
      index: "01",
      title: "Fanfare",
      artist: "Magic City Hippies",
      gradient: "linear-gradient(135deg, #4f8a8b 0%, #2c3e50 100%)",
      previewUrl: null,
      spotifyUrl: "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu",
    },
    {
      index: "02",
      title: "Everybody Wants To Rule The World",
      artist: "Tears For Fears",
      gradient: "linear-gradient(135deg, #6a3093 0%, #a044ff 100%)",
      previewUrl: null,
      spotifyUrl: "https://open.spotify.com/track/4RvWPyQ5RL0ao9LPZeSouE",
    },
    {
      index: "03",
      title: "You Get What You Give",
      artist: "New Radicals",
      gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
      previewUrl: null,
      spotifyUrl: "https://open.spotify.com/track/2VqgZmKkdwt5o3MJiJfFcq",
    },
  ],
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    name: "Victoria Wotton",
    company: "Fermentum Odio Co.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "2",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    name: "Marcus Chen",
    company: "Studio North",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    quote:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, sed dignissim odio volutpat at.",
    name: "Sarah Mitchell",
    company: "Pixel & Co.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

export type ChatMessage =
  | string
  | { prefix: string; linkText: string; suffix: string };

export const profile: {
  imageSrc: string;
  email: string;
  chatMessages: ChatMessage[];
} = {
  imageSrc: "/images/dk.png",
  email: "ebenezarjosh@gmail.com",
  chatMessages: [
    "Hey hello..,",
    "My name is Dineshkumar Selvam",
    "But you call me DK..!",
    { prefix: "If you want anything plz ", linkText: "grap", suffix: " my mail" },
  ],
};

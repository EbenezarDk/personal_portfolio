export type NavItem = {
  id: string;
  label: string;
  index: string;
  href?: string;
};

export const navItems: NavItem[] = [
  { id: "landing", index: "01", label: "Who I'm" },
  { id: "playground", index: "02", label: "My Playground" },
  { id: "about", index: "03", label: "Know about me" },
  { id: "contact", index: "04", label: "If you want anything" },
];

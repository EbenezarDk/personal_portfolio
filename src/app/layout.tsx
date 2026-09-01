import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { IntroProvider } from "@/context/IntroContext";

export const metadata: Metadata = {
  title: "Ebenezar DK — Portfolio",
  description: "Portfolio and playground.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-dvh bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
        <IntroProvider>
          <SmoothCursor />
          <Header />
          {children}
        </IntroProvider>
      </body>
    </html>
  );
}

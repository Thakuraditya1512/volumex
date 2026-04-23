import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillBridge — Learn. Code. Track. Grow Together.",
  description:
    "SkillBridge is your all-in-one platform to learn in-demand skills, code in our built-in IDE, track your progress, and showcase your journey with GitHub & LinkedIn integration.",
  keywords: "learn coding, AI roadmap, built-in IDE, progress tracking, tech career, full stack developer",
  openGraph: {
    title: "SkillBridge — Learn. Code. Track. Grow Together.",
    description: "Your all-in-one platform to learn, build, and grow your tech career.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

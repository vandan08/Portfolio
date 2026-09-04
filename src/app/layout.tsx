import type { Metadata } from "next";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CursorMark from "@/components/CursorMark";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vandan Sheth — Software Engineer",
  description:
    "Software Engineer at OneIT. I build dependable backend and cloud systems with Java, Spring Boot, AWS and GCP — and I care about how they're made.",
  keywords: [
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Cloud Engineer",
    "AWS",
    "GCP",
    "Google Cloud",
    "Kubernetes",
    "Docker",
    "Kafka",
    "Distributed Systems",
    "Angular",
    "React",
    "Backend Developer",
    "AI Engineer",
  ],
  authors: [{ name: "Vandan Sheth" }],
  openGraph: {
    title: "Vandan Sheth — Software Engineer",
    description:
      "Software Engineer at OneIT. Dependable backend and cloud systems with Java, Spring Boot, AWS and GCP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable} antialiased`}
      >
        {children}
        <CursorMark />
      </body>
    </html>
  );
}

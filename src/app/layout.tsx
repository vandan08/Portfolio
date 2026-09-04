import type { Metadata, Viewport } from "next";
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

/**
 * Most of the people who open this open it on a phone, so the page is set for
 * one first: the browser chrome is tinted to the paper rather than sitting on
 * it as a grey band, and the layout is allowed under the notch so the ivory
 * runs edge to edge — the safe insets are put back on the page's own gutters
 * in globals.css. Zoom is deliberately left alone; pinching a page is nobody's
 * business but the reader's.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5efe3",
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

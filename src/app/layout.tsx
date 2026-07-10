import type { Metadata } from "next";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
    "Software Engineer at OneIT. I build dependable enterprise software with Java, Angular, and modern AI tooling — and I care about how it's made.",
  keywords: [
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Angular",
    "React",
    "Full Stack Developer",
    "AI Engineer",
  ],
  authors: [{ name: "Vandan Sheth" }],
  openGraph: {
    title: "Vandan Sheth — Software Engineer",
    description:
      "Software Engineer at OneIT. Dependable enterprise software with Java, Angular, and modern AI tooling.",
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
      </body>
    </html>
  );
}

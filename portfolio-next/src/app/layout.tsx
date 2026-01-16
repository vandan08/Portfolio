import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vandan Sheth - Software Engineer",
  description: "Software Engineer at OneIT. Building scalable enterprise applications with Java, Spring Boot, AI/ML integration, and modern web technologies.",
  keywords: ["Software Engineer", "Java", "Spring Boot", "React", "Angular", "Full Stack Developer", "AI Engineer"],
  authors: [{ name: "Vandan Sheth" }],
  openGraph: {
    title: "Vandan Sheth - Software Engineer",
    description: "I build things for the Web. Full-stack developer specializing in enterprise applications and AI integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        {/* Animated Background Orbs */}
        <div className="bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        {children}
      </body>
    </html>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EXPERIMENTS_PATH } from "@/lib/links";

const RESUME_URL = "/resume.pdf";

const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Capabilities", href: "#skills" },
    { name: "Experiments", href: EXPERIMENTS_PATH },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);

            const sections = navLinks.map((link) => link.href.slice(1));
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.getBoundingClientRect().top <= 120) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Chrome cancels the native fragment scroll while the menu's exit
    // animation is running, so close first and scroll once it's done.
    const handleMobileNav = (href: string) => {
        setIsMenuOpen(false);
        // Links to other pages (e.g. Experiments) navigate normally — only in-page anchors scroll.
        if (!href.startsWith("#")) return;
        setTimeout(() => {
            document
                .getElementById(href.slice(1))
                ?.scrollIntoView({ behavior: "smooth" });
        }, 320);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-paper transition-shadow duration-300 ${
                isScrolled ? "border-b border-rule" : ""
            }`}
        >
            <nav className="container-page flex items-center justify-between py-4">
                <a
                    href="#top"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-lg font-semibold tracking-tight text-ink hover:text-accent transition-colors"
                >
                    Vandan Sheth
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`eyebrow transition-colors hover:text-accent ${
                                activeSection === link.href.slice(1)
                                    ? "text-accent"
                                    : ""
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow border border-rule-strong rounded-[2px] px-4 py-2 text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                        Résumé ↗
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden eyebrow text-ink py-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="md:hidden overflow-hidden border-b border-rule bg-paper"
                    >
                        <div className="container-page flex flex-col gap-1 py-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => handleMobileNav(link.href)}
                                    className={`eyebrow py-3 border-b border-rule last:border-b-0 transition-colors hover:text-accent ${
                                        activeSection === link.href.slice(1)
                                            ? "text-accent"
                                            : ""
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="eyebrow py-3 text-accent"
                            >
                                Résumé ↗
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

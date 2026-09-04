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

    // An open menu covers the page; letting the page scroll under it means a
    // reader who flicks the drawer scrolls the article behind it instead.
    useEffect(() => {
        if (!isMenuOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isMenuOpen]);

    // A phone turned on its side can cross into the desktop nav with the drawer
    // still open behind it, leaving a panel nothing can close.
    useEffect(() => {
        const wide = window.matchMedia("(min-width: 768px)");
        const settle = () => {
            if (wide.matches) setIsMenuOpen(false);
        };
        settle();
        wide.addEventListener("change", settle);
        return () => wide.removeEventListener("change", settle);
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
            <nav className="container-page flex items-center justify-between py-2 md:py-4">
                <a
                    href="#top"
                    onClick={() => setIsMenuOpen(false)}
                    className="-ml-1 flex min-h-11 items-center px-1 font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent"
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
                    className="-mr-2 flex min-h-11 items-center px-2 md:hidden eyebrow text-ink"
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
                        <div className="container-page flex flex-col py-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => handleMobileNav(link.href)}
                                    className={`eyebrow flex min-h-12 items-center border-b border-rule text-[0.8125rem] transition-colors last:border-b-0 hover:text-accent ${
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
                                className="eyebrow flex min-h-12 items-center text-[0.8125rem] text-accent"
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

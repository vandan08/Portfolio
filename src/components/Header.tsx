"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { FaDownload } from "react-icons/fa";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect active section
            const sections = navLinks.map((link) => link.href.slice(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.getElementById(href.slice(1));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <nav className="container-custom py-4 flex items-center justify-between">
                {/* Logo - Profile Image */}
                <motion.a
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#home");
                    }}
                    className="cursor-pointer relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#8b5cf6]"
                    whileHover={{ scale: 1.1, borderColor: "#3b82f6" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Image
                        src="/profile.jpg"
                        alt="Vandan Sheth"
                        fill
                        className="object-cover"
                        sizes="40px"
                    />
                </motion.a>

                {/* Desktop Nav - Pill Style */}
                <div className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/5">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.href);
                            }}
                            className={`nav-pill relative text-sm font-medium ${activeSection === link.href.slice(1)
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {activeSection === link.href.slice(1) && (
                                <motion.div
                                    layoutId="nav-pill-bg"
                                    className="absolute inset-0 bg-[#8b5cf6] rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{link.name}</span>
                        </motion.a>
                    ))}
                </div>

                {/* Resume Button - Enhanced with fixed hover */}
                <motion.a
                    href="https://drive.google.com/file/d/124To-yuuO7wtlCFQ_4GQw-W6hmWA9i_t/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm 
                               bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white
                               border border-transparent
                               transition-all duration-300 ease-out
                               hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                               hover:from-[#9b6cf7] hover:to-[#4b92f7]"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaDownload className="text-sm" />
                    </motion.span>
                    <span>Resume</span>
                </motion.a>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? (
                        <HiX className="text-2xl" />
                    ) : (
                        <HiMenu className="text-2xl" />
                    )}
                </motion.button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="container-custom py-4 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`block py-2 px-4 rounded-lg text-lg font-medium transition-all ${activeSection === link.href.slice(1)
                                            ? "bg-[#8b5cf6] text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="https://drive.google.com/file/d/124To-yuuO7wtlCFQ_4GQw-W6hmWA9i_t/view?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="flex items-center gap-2 py-3 px-4 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white rounded-lg text-center justify-center mt-4 font-medium"
                            >
                                <FaDownload />
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

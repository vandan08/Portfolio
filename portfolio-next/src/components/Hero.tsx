"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
    FaGithub,
    FaLinkedin,
    FaMedium,
    FaEnvelope,
    FaDownload,
    FaCopy,
    FaCheck,
    FaJava,
    FaGem,
    FaTerminal,
} from "react-icons/fa";
import { SiLeetcode, SiSpring, SiTypescript } from "react-icons/si";
import { FadeIn } from "./AnimatedSection";

const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/vandansheth",
        icon: FaLinkedin,
        color: "#0A66C2",
    },
    {
        name: "GitHub",
        href: "https://github.com/vandan08",
        icon: FaGithub,
        color: "#ffffff",
    },
    {
        name: "LeetCode",
        href: "https://leetcode.com/vandansheth",
        icon: SiLeetcode,
        color: "#FFA116",
    },
    {
        name: "Medium",
        href: "https://medium.com/@vandansheth",
        icon: FaMedium,
        color: "#ffffff",
    },
    {
        name: "Email",
        href: "mailto:vandansheth.work@gmail.com",
        icon: FaEnvelope,
        color: "#EA4335",
    },
];

// Floating tech icons around profile - Updated: Ruby, Shell, TS, Java, Spring
const floatingIcons = [
    { icon: FaJava, color: "#E76F00", position: "top-0 -right-4", delay: 0 },
    { icon: FaGem, color: "#CC342D", position: "-bottom-2 -left-4", delay: 1 },
    { icon: SiSpring, color: "#6DB33F", position: "top-1/3 -right-8", delay: 0.5 },
    { icon: FaTerminal, color: "#4EAA25", position: "bottom-1/4 -left-8", delay: 1.5 },
    { icon: SiTypescript, color: "#3178C6", position: "top-2/3 -right-6", delay: 0.8 },
];

export default function Hero() {
    const [copied, setCopied] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse following
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position to -1 to 1 range
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(x * 50);
            mouseY.set(y * 50);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const copyCommand = () => {
        navigator.clipboard.writeText("npx vandansheth");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Animated background gradient orbs that follow mouse */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/20 rounded-full blur-[120px]"
                    style={{
                        x: smoothX,
                        y: smoothY,
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/20 rounded-full blur-[120px]"
                    style={{
                        x: smoothX,
                        y: smoothY,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8b5cf6]/10 rounded-full blur-[150px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <FadeIn delay={0.1}>
                            <p className="text-[#8b5cf6] font-medium mb-4 tracking-wide">
                                Hello, I&apos;m
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text">
                                Vandan Sheth
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <h2 className="text-xl md:text-2xl text-gray-300 mb-2">
                                Software Engineer at{" "}
                                <span className="text-[#3b82f6] font-semibold">OneIT</span>
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                                I build things for the Web. Passionate about creating scalable
                                enterprise applications with clean architecture, AI integration,
                                and modern web technologies.
                            </p>
                        </FadeIn>

                        {/* Command Line Element */}
                        <FadeIn delay={0.5}>
                            <div className="flex items-center justify-center lg:justify-start mb-8">
                                <motion.div
                                    className="glass rounded-lg px-4 py-3 flex items-center gap-3 font-mono text-sm group cursor-pointer"
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
                                    onClick={copyCommand}
                                >
                                    <span className="text-[#3b82f6]">$</span>
                                    <span className="text-gray-300">npx vandans</span>
                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="ml-2 p-2 hover:bg-white/10 rounded transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? (
                                            <FaCheck className="text-green-400" />
                                        ) : (
                                            <FaCopy className="text-gray-400 group-hover:text-[#8b5cf6] transition-colors" />
                                        )}
                                    </motion.button>
                                </motion.div>
                            </div>
                        </FadeIn>

                        {/* CTA Buttons */}
                        <FadeIn delay={0.6}>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                                <motion.a
                                    href="#contact"
                                    className="btn-primary flex items-center gap-2 relative overflow-hidden group"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Get In Touch</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </motion.a>
                                <motion.a
                                    href="https://drive.google.com/file/d/124To-yuuO7wtlCFQ_4GQw-W6hmWA9i_t/view?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary flex items-center gap-2 group"
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: "#8b5cf6",
                                        boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaDownload className="group-hover:animate-bounce" />
                                    Download Resume
                                </motion.a>
                            </div>
                        </FadeIn>

                        {/* Social Links */}
                        <FadeIn delay={0.7}>
                            <div className="flex items-center justify-center lg:justify-start gap-4">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass rounded-full hover:border-[#8b5cf6] transition-all group"
                                        whileHover={{
                                            scale: 1.2,
                                            y: -8,
                                            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
                                        }}
                                        whileTap={{ scale: 0.9, rotate: 15 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        title={link.name}
                                    >
                                        <link.icon
                                            className="text-xl transition-all group-hover:scale-110"
                                            style={{ color: link.color }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Profile Image */}
                    <FadeIn delay={0.4} direction="left">
                        <div className="relative">
                            {/* Glowing ring */}
                            <motion.div
                                className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] opacity-70 blur-sm"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] opacity-50" />

                            {/* Profile container */}
                            <motion.div
                                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-black"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src="/profile.jpg"
                                    alt="Vandan Sheth - Software Engineer"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 256px, 320px"
                                />
                            </motion.div>

                            {/* Floating tech icons - Ruby, Shell, TS, Java, Spring */}
                            {floatingIcons.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute ${item.position} glass rounded-full p-3`}
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: item.delay
                                    }}
                                    whileHover={{ scale: 1.3, rotate: 15 }}
                                >
                                    <item.icon className="text-2xl" style={{ color: item.color }} />
                                </motion.div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

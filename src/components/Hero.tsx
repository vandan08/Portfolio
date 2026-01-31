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
    FaXTwitter,
} from "react-icons/fa6";
import { SiLeetcode, SiSpring, SiTypescript } from "react-icons/si";
import { FadeIn } from "./AnimatedSection";

const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/vandan-sheth08/",
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
        name: "X",
        href: "https://x.com/vandans08",
        icon: FaXTwitter,
        color: "#ffffff",
    },
    {
        name: "LeetCode",
        href: "https://leetcode.com/u/vandan08/",
        icon: SiLeetcode,
        color: "#FFA116",
    },
    {
        name: "Medium",
        href: "https://medium.com/@vandanbsheth9",
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
        navigator.clipboard.writeText("npx vandans");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#8b5cf6]/30 to-[#3b82f6]/20 rounded-full blur-[120px]"
                    style={{
                        x: smoothX,
                        y: smoothY,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#3b82f6]/25 to-[#a855f7]/15 rounded-full blur-[120px]"
                    style={{
                        x: smoothX,
                        y: smoothY,
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.25, 0.4, 0.25],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#8b5cf6]/15 via-[#3b82f6]/10 to-[#a855f7]/15 rounded-full blur-[150px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />
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
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(139, 92, 246, 0.6)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Get In Touch</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{
                                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                            backgroundSize: "200% 100%",
                                        }}
                                    />
                                </motion.a>
                                <motion.a
                                    href="https://drive.google.com/file/d/124To-yuuO7wtlCFQ_4GQw-W6hmWA9i_t/view?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary flex items-center gap-2 group relative overflow-hidden"
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: "#8b5cf6",
                                        boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100"
                                        animate={{
                                            x: ["-100%", "100%"],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    />
                                    <motion.span
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <FaDownload className="group-hover:animate-bounce" />
                                    </motion.span>
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
                                        className="p-3 glass rounded-full hover:border-[#8b5cf6] transition-all group relative overflow-hidden"
                                        whileHover={{
                                            scale: 1.2,
                                            y: -10,
                                            boxShadow: `0 15px 40px ${link.color}50`,
                                            borderColor: link.color,
                                        }}
                                        whileTap={{ scale: 0.9, rotate: 15 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        title={link.name}
                                    >
                                        <motion.div
                                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                                            style={{ backgroundColor: link.color }}
                                        />
                                        <link.icon
                                            className="text-xl transition-all group-hover:scale-125 relative z-10"
                                            style={{ color: link.color }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.4} direction="left">
                        <div className="relative">
                            <motion.div
                                className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#a855f7] opacity-70 blur-sm"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#a855f7] opacity-50"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-black"
                                whileHover={{ scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 to-[#3b82f6]/20"
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                <Image
                                    src="/profile.jpg"
                                    alt="Vandan Sheth - Software Engineer"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 256px, 320px"
                                />
                            </motion.div>

                            {floatingIcons.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute ${item.position} glass rounded-full p-3`}
                                    animate={{ 
                                        y: [0, -20, 0],
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: item.delay,
                                    }}
                                    whileHover={{ scale: 1.4, rotate: 20, boxShadow: `0 0 30px ${item.color}60` }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        <item.icon className="text-2xl" style={{ color: item.color }} />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

"use client";

import { FaHeart, FaLinkedin, FaGithub, FaMedium, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

const footerLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/vandansheth", icon: FaLinkedin },
    { name: "GitHub", href: "https://github.com/vandan08", icon: FaGithub },
    { name: "X", href: "https://x.com/vandans08", icon: FaXTwitter },
    { name: "LeetCode", href: "https://leetcode.com/vandansheth", icon: SiLeetcode },
    { name: "Medium", href: "https://medium.com/@vandansheth", icon: FaMedium },
    { name: "Email", href: "mailto:vandansheth.work@gmail.com", icon: FaEnvelope },
];

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-8">
            <div className="container-custom">
                <div className="flex flex-col items-center gap-6">
                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {footerLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-[#8b5cf6] transition-colors"
                                whileHover={{ scale: 1.2, y: -3 }}
                                whileTap={{ scale: 0.9 }}
                                title={link.name}
                            >
                                <link.icon className="text-xl" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                            Made With <FaHeart className="text-red-500" /> By Vandan.
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

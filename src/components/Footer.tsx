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
        <footer className="bg-black border-t border-white/5 py-12 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#8b5cf6]/5 via-transparent to-transparent opacity-50"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <div className="container-custom relative z-10">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-6">
                        {footerLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass rounded-full hover:border-[#8b5cf6] transition-all group relative overflow-hidden"
                                whileHover={{ scale: 1.2, y: -5, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                title={link.name}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-[#8b5cf6] rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                                />
                                <link.icon className="text-xl text-gray-500 group-hover:text-[#8b5cf6] transition-colors relative z-10" />
                            </motion.a>
                        ))}
                    </div>

                    <div className="text-center">
                        <motion.p 
                            className="text-gray-500 text-sm flex items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Made With{" "}
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <FaHeart className="text-red-500" />
                            </motion.span>{" "}
                            By Vandan.
                        </motion.p>
                        <motion.p 
                            className="text-gray-600 text-xs mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            © {new Date().getFullYear()} All rights reserved.
                        </motion.p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

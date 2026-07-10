"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Quiet scroll reveal — a short rise-and-settle that plays once.
 * The whole site shares this single motion so nothing feels busy.
 */
export default function AnimatedSection({
    children,
    className = "",
    delay = 0,
}: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

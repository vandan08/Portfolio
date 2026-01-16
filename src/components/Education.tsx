"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { FaGraduationCap, FaBook, FaAward } from "react-icons/fa";

const coursework = [
    "Data Structures & Algorithms",
    "Software Architecture",
    "Database Management",
    "Full-Stack Development",
    "Cloud Computing",
    "Computer Networks",
    "Agile Engineering",
];

export default function Education() {
    return (
        <section id="education" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-custom relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-[#8b5cf6] font-medium mb-2 tracking-wider uppercase text-sm">
                        My Background
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">
                        Education
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        My academic background and qualifications
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <motion.div
                        className="glass rounded-2xl p-6 md:p-10 card-hover max-w-4xl mx-auto"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {/* Icon */}
                            <motion.div
                                className="flex-shrink-0"
                                whileHover={{ rotate: 10, scale: 1.1 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center glow-purple">
                                    <FaGraduationCap className="text-3xl text-white" />
                                </div>
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            Bachelor of Computer Application
                                        </h3>
                                        <p className="text-[#8b5cf6] font-semibold text-lg">
                                            Indus University
                                        </p>
                                    </div>
                                    <div className="mt-2 md:mt-0 md:text-right">
                                        <span className="text-[#3b82f6] font-medium bg-[#3b82f6]/10 px-3 py-1 rounded-full text-sm">
                                            Aug 2021 - Jun 2024
                                        </span>
                                    </div>
                                </div>

                                {/* CGPA Badge */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <motion.div
                                        className="flex items-center gap-2 glass rounded-full px-4 py-2"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <FaAward className="text-yellow-500" />
                                        <span className="text-white font-semibold">CGPA: 8.16</span>
                                    </motion.div>
                                    <span className="text-[#8b5cf6] font-medium">
                                        First Class with Distinction
                                    </span>
                                </div>

                                {/* Coursework */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaBook className="text-[#3b82f6]" />
                                        <h4 className="text-lg font-semibold text-white">
                                            Relevant Coursework
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {coursework.map((course, i) => (
                                            <motion.span
                                                key={course}
                                                className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg border border-white/10 text-sm hover:border-[#8b5cf6] transition-colors"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.05 * i }}
                                            >
                                                {course}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
}

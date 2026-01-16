"use client";

import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

const projects = [
    {
        title: "Aveling LMS Portal",
        description:
            "A flagship enterprise-grade Learning Management System tailored for Aveling Australia, offering a unified experience across client, trainer, and admin portals.",
        features: [
            "Multi-role access: clients (individual/company), trainers, and admins",
            "Fully functional group booking and scheduling engine",
            "Invoice generation, company-level pricing, and payment management",
            "Secure Eway Payment Gateway integration",
        ],
        techStack: ["Java", "Angular 19", "TypeScript", "REST APIs", "PostgreSQL", "Eway Gateway"],
        isPrivate: true,
        gradient: "from-[#8b5cf6] to-[#3b82f6]",
    },
    {
        title: "Skyline Estate",
        description:
            "A modern real estate platform that breaks away from conventional limitations by allowing dynamic property type creation and better property discovery.",
        features: [
            "Dynamic property type selection during listing creation",
            "Advanced filtering and category management",
            "User dashboard for property listing and management",
            "30% faster page load with optimized backend queries",
        ],
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"],
        github: "https://github.com/vandan08/skyline-estate",
        gradient: "from-[#3b82f6] to-[#06b6d4]",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-custom relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-[#8b5cf6] font-medium mb-2 tracking-wider uppercase text-sm">
                        My Work
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Some of the projects I&apos;ve worked on that showcase my skills
                    </p>
                </AnimatedSection>

                <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.2}>
                    {projects.map((project) => (
                        <StaggerItem key={project.title}>
                            <motion.div
                                className="group glass rounded-2xl overflow-hidden card-hover h-full"
                                whileHover={{ y: -8, scale: 1.01 }}
                            >
                                {/* Gradient header */}
                                <div
                                    className={`h-2 bg-gradient-to-r ${project.gradient}`}
                                />

                                <div className="p-6 md:p-8">
                                    {/* Title and links */}
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#8b5cf6] transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3">
                                            {project.isPrivate ? (
                                                <span className="text-gray-500 flex items-center gap-1 text-sm">
                                                    <FaLock className="text-xs" />
                                                    Private
                                                </span>
                                            ) : project.github ? (
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors"
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FaGithub className="text-lg" />
                                                </motion.a>
                                            ) : null}
                                            <motion.button
                                                className="p-2 glass rounded-lg text-gray-400 hover:text-[#8b5cf6] transition-colors"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaExternalLinkAlt className="text-sm" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-[#3b82f6] mb-3 uppercase tracking-wider">
                                            Key Features
                                        </h4>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="text-gray-400 text-sm flex items-start gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * i }}
                                                >
                                                    <span className="text-[#8b5cf6] mt-0.5">▹</span>
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/10 hover:border-[#8b5cf6] transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.05 * i }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* View more hint */}
                <AnimatedSection className="text-center mt-12" delay={0.4}>
                    <motion.a
                        href="https://github.com/vandan08"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#8b5cf6] hover:text-white transition-colors group"
                        whileHover={{ x: 5 }}
                    >
                        View more projects on GitHub
                        <FaGithub className="group-hover:rotate-12 transition-transform" />
                    </motion.a>
                </AnimatedSection>
            </div>
        </section>
    );
}

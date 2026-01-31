"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

interface GithubRepo {
    label: string;
    url: string;
}

interface Project {
    title: string;
    description: string;
    features: string[];
    techStack: string[];
    isPrivate?: boolean;
    hideButtons?: boolean;
    github?: string;
    githubRepos?: GithubRepo[];
    liveUrl?: string;
    gradient: string;
}

function ProjectCard({ project }: { project: Project }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useTransform(x, [-100, 100], [-8, 8]);
    const mouseY = useTransform(y, [-100, 100], [8, -8]);

    const rotateX = useSpring(mouseY, { stiffness: 300, damping: 20 });
    const rotateY = useSpring(mouseX, { stiffness: 300, damping: 20 });

    return (
        <motion.div
            className="group glass rounded-2xl overflow-hidden card-hover h-full relative"
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left - rect.width / 2);
                y.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <motion.div
                className={`h-2 bg-gradient-to-r ${project.gradient}`}
                animate={{
                    backgroundSize: ["200% 100%", "100% 100%"],
                    backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    backgroundSize: "200% 100%",
                }}
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    background: "conic-gradient(transparent, rgba(139, 92, 246, 0.05), transparent)",
                }}
            />

            <div className="p-6 md:p-8 relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#8b5cf6] transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {project.hideButtons ? null : project.isPrivate ? (
                            <span className="text-gray-500 flex items-center gap-1 text-sm">
                                <FaLock className="text-xs" />
                                Private
                            </span>
                        ) : project.githubRepos ? (
                            // Multiple GitHub repos with labels
                            project.githubRepos.map((repo) => (
                                <motion.a
                                    key={repo.label}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 glass rounded-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaGithub className="text-sm" />
                                    {repo.label}
                                </motion.a>
                            ))
                        ) : project.github ? (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaGithub className="text-lg" />
                            </motion.a>
                        ) : null}
                        {!project.hideButtons && project.liveUrl && (
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 glass rounded-lg text-gray-400 hover:text-[#8b5cf6] transition-colors"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaExternalLinkAlt className="text-sm" />
                            </motion.a>
                        )}
                    </div>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {project.description}
                </p>

                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#3b82f6] mb-3 uppercase tracking-wider">
                        Key Features
                    </h4>
                    <ul className="space-y-2">
                        {project.features.map((feature: string, i: number) => (
                            <motion.li
                                key={i}
                                className="text-gray-400 text-sm flex items-start gap-2 group-hover:text-gray-300 transition-colors"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <motion.span
                                    className="text-[#8b5cf6] mt-0.5"
                                    whileHover={{ scale: 1.2, x: 3 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    ▹
                                </motion.span>
                                {feature}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, i: number) => (
                        <motion.span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/10 hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 hover:text-white transition-all cursor-default"
                            whileHover={{ scale: 1.08, y: -2 }}
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
    );
}

const projects: Project[] = [
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
        hideButtons: true,
        isPrivate: true,
        gradient: "from-[#8b5cf6] to-[#3b82f6]",
    },
    {
        title: "VendorConnect",
        description:
            "AI-powered service marketplace with MCP server for LLM-to-backend orchestration and conversational job management. Features semantic vendor search and contextual recommendations.",
        features: [
            "MCP server for LLM-to-backend orchestration and conversational job management",
            "RAG pipeline with vector embeddings for semantic vendor search",
            "JWT/OAuth authentication with role-based access control",
            "Real-time dashboards and 6-language internationalization support",
        ],
        techStack: ["Java", "Spring Boot", "Spring AI", "React", "MySQL", "MCP", "RAG", "Vector DB"],
        githubRepos: [
            { label: "Frontend", url: "https://github.com/vandan08/vendr-connect-nexus" },
            { label: "Backend", url: "https://github.com/vandan08/VenderEconnect-Backend" },
        ],
        gradient: "from-[#06b6d4] to-[#8b5cf6]",
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
                            <ProjectCard project={project} />
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

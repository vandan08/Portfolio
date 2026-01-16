"use client";

import { motion } from "framer-motion";
import AnimatedSection, { FadeIn } from "./AnimatedSection";

const experiences = [
    {
        title: "Software Engineer",
        company: "OneIT",
        location: "Remote",
        duration: "Jul 2024 - Present",
        description: [
            "Built scalable backend modules using **Core Java** and **RESTful APIs** to streamline enterprise workflows",
            "Built an **AI Wrapper** supporting multiple LLM providers (OpenAI, Anthropic) with unified API abstraction",
            "Implemented **Model Context Protocol (MCP)**-based workflows to manage contextual memory, tool usage, and knowledge grounding across AI-powered projects",
            "Integrated **Eway Payment Gateway** and **Chargebee** for secure payments and automated billing",
            "Worked on **automated code generation** using Ruby-based pipelines, enabling faster UI scaffolding",
            "Migrated the entire frontend from **Angular 9 → Angular 19**, improving performance and maintainability",
        ],
        techStack: [
            "Core Java",
            "RESTful APIs",
            "Angular 19",
            "TypeScript",
            "PostgreSQL",
            "Ruby",
            "MCP",
            "AI Integration",
        ],
    },
    {
        title: "Software Engineer Intern",
        company: "TEACHNOOKPRO",
        location: "Bangalore, India",
        duration: "Aug 2023 - Nov 2023",
        description: [
            "Gained hands-on experience in **JavaScript**, **React.js**, **Node.js**, and **Tailwind CSS** through practical assignments",
            "Built small-scale web components and APIs to strengthen full-stack development fundamentals",
            "Demonstrated **quick adaptability** by learning new frameworks and tools within short timelines",
        ],
        techStack: ["JavaScript", "React.js", "Node.js", "Tailwind CSS"],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#3b82f6]/10 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-[#8b5cf6] font-medium mb-2 tracking-wider uppercase text-sm">
                        My Journey
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">
                        Experience
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        My professional journey in software development
                    </p>
                </AnimatedSection>

                {/* Timeline - Alternating left/right */}
                <div className="relative">
                    {/* Timeline line - desktop center */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8b5cf6] via-[#3b82f6] to-[#8b5cf6]"
                        style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                    />

                    {/* Timeline items */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={exp.company} className="relative">
                                {/* Timeline dot - desktop */}
                                <motion.div
                                    className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b5cf6] border-4 border-black z-10"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                    style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                                />

                                {/* Content - alternating sides */}
                                <div
                                    className={`md:w-[45%] ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
                                        }`}
                                >
                                    <FadeIn direction={index % 2 === 0 ? "left" : "right"} delay={0.1}>
                                        <motion.div
                                            className="glass rounded-2xl p-6 md:p-8 card-hover"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#8b5cf6]">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-white font-medium">
                                                        {exp.company}
                                                        <span className="text-gray-500 ml-2">
                                                            • {exp.location}
                                                        </span>
                                                    </p>
                                                </div>
                                                <span className="text-sm text-[#3b82f6] font-medium mt-2 md:mt-0 md:text-right bg-[#3b82f6]/10 px-3 py-1 rounded-full">
                                                    {exp.duration}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <ul className="space-y-2 mb-6">
                                                {exp.description.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-gray-400 text-sm flex items-start gap-3"
                                                    >
                                                        <span className="text-[#8b5cf6] mt-1">▹</span>
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.replace(
                                                                    /\*\*(.*?)\*\*/g,
                                                                    '<strong class="text-white">$1</strong>'
                                                                ),
                                                            }}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.techStack.map((tech) => (
                                                    <span key={tech} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </FadeIn>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

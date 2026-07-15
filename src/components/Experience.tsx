"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const experiences = [
    {
        title: "Software Engineer",
        company: "OneIT",
        location: "Remote",
        duration: "Jul 2024 — Present",
        description: [
            "Build scalable backend modules in Core Java with RESTful APIs that streamline enterprise workflows.",
            "Delivered a CorePlan API integration end-to-end, solo — timed batches sync ~10k records daily and configurations weekly through a multithreaded fetch pool, surfaced in eight Angular 19 chart dashboards.",
            "Designed an AI wrapper supporting multiple LLM providers (OpenAI, Anthropic) behind one unified API.",
            "Implemented Model Context Protocol (MCP) workflows for contextual memory, tool usage, and knowledge grounding across AI projects.",
            "Integrated the Eway payment gateway and Chargebee for secure payments and automated billing.",
            "Built Ruby-based automated code-generation pipelines that speed up UI scaffolding.",
            "Migrated the entire frontend from Angular 9 to Angular 19, improving performance and maintainability.",
        ],
        techStack: [
            "Core Java",
            "REST APIs",
            "Angular 19",
            "TypeScript",
            "PostgreSQL",
            "Ruby",
            "MCP",
        ],
    },
    {
        title: "Software Engineer Intern",
        company: "TEACHNOOKPRO",
        location: "Bangalore, India",
        duration: "Aug 2023 — Nov 2023",
        description: [
            "Gained hands-on experience with JavaScript, React.js, Node.js, and Tailwind CSS through practical assignments.",
            "Built small-scale web components and APIs to strengthen full-stack fundamentals.",
            "Picked up new frameworks and tools on short timelines.",
        ],
        techStack: ["JavaScript", "React.js", "Node.js", "Tailwind CSS"],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-20 md:py-28 scroll-mt-16">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="01"
                        label="Experience"
                        title={
                            <>
                                Where I&apos;ve{" "}
                                <em className="italic text-accent font-normal">worked</em>
                            </>
                        }
                    />
                </AnimatedSection>

                <div>
                    {experiences.map((exp, index) => (
                        <AnimatedSection key={exp.company} delay={index * 0.1}>
                            <article
                                className={`grid md:grid-cols-12 gap-4 md:gap-8 py-10 ${
                                    index > 0 ? "border-t border-rule" : ""
                                }`}
                            >
                                {/* Dates */}
                                <div className="md:col-span-3">
                                    <p className="eyebrow">{exp.duration}</p>
                                    <p className="eyebrow mt-1 text-ink-faint">
                                        {exp.location}
                                    </p>
                                </div>

                                {/* Role */}
                                <div className="md:col-span-9">
                                    <h3 className="font-display text-2xl md:text-3xl font-medium mb-1">
                                        {exp.title}
                                    </h3>
                                    <p className="text-accent italic text-lg mb-6">
                                        {exp.company}
                                    </p>

                                    <ul className="space-y-2.5 mb-6 max-w-2xl">
                                        {exp.description.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-ink-soft flex gap-3"
                                            >
                                                <span
                                                    className="text-accent select-none"
                                                    aria-hidden
                                                >
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="eyebrow">
                                        {exp.techStack.join("  ·  ")}
                                    </p>
                                </div>
                            </article>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

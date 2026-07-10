"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const skillCategories = [
    {
        title: "Languages",
        skills: ["Java", "JavaScript", "TypeScript", "Python", "Ruby", "SQL", "Shell", "Solidity"],
    },
    {
        title: "Frameworks",
        skills: ["Spring Boot", "Hibernate", "Angular", "React.js", "Node.js", "Express.js"],
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    {
        title: "AI Engineering",
        skills: ["RAG", "CAG", "MCP", "Spring AI", "Vector DBs", "Context Design"],
    },
    {
        title: "Tools & Platforms",
        skills: ["Git & GitHub", "Docker", "Jenkins", "Postman", "IntelliJ IDEA", "Render"],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 md:py-28 scroll-mt-16">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="03"
                        label="Capabilities"
                        title={
                            <>
                                Tools of{" "}
                                <em className="italic text-accent font-normal">the trade</em>
                            </>
                        }
                    />
                </AnimatedSection>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {skillCategories.map((category, index) => (
                        <AnimatedSection key={category.title} delay={index * 0.06}>
                            <div>
                                <h3 className="eyebrow border-b border-rule pb-3 mb-4">
                                    {category.title}
                                </h3>
                                <ul className="space-y-1.5">
                                    {category.skills.map((skill) => (
                                        <li key={skill} className="text-lg text-ink-soft">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

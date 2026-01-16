"use client";

import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import {
    FaJava,
    FaJs,
    FaPython,
    FaGem,
    FaDatabase,
    FaBrain,
    FaRobot,
    FaCloud,
    FaGitAlt,
    FaGithub,
    FaDocker,
    FaJenkins,
    FaAngular,
    FaReact,
    FaNodeJs,
    FaTerminal,
} from "react-icons/fa";
import {
    SiTypescript,
    SiSolidity,
    SiSpringboot,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiPostman,
    SiExpress,
    SiIntellijidea,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbBrain } from "react-icons/tb";

const skillCategories = [
    {
        title: "Languages",
        skills: [
            { name: "Java", icon: FaJava, color: "#E76F00" },
            { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Python", icon: FaPython, color: "#3776AB" },
            { name: "Ruby", icon: FaGem, color: "#CC342D" },
            { name: "Solidity", icon: SiSolidity, color: "#363636" },
            { name: "SQL", icon: FaDatabase, color: "#00758F" },
            { name: "Shell", icon: FaTerminal, color: "#4EAA25" },
        ],
    },
    {
        title: "Frameworks & Libraries",
        skills: [
            { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
            { name: "Hibernate", icon: FaDatabase, color: "#59666C" },
            { name: "Angular", icon: FaAngular, color: "#DD0031" },
            { name: "React.js", icon: FaReact, color: "#61DAFB" },
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Express.js", icon: SiExpress, color: "#ffffff" },
        ],
    },
    {
        title: "Databases",
        skills: [
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        ],
    },
    {
        title: "AI Engineering",
        skills: [
            { name: "RAG", icon: FaBrain, color: "#8b5cf6" },
            { name: "CAG", icon: FaRobot, color: "#3b82f6" },
            { name: "MCP", icon: TbBrain, color: "#a855f7" },
            { name: "Spring AI", icon: SiSpringboot, color: "#6DB33F" },
            { name: "Vector DB", icon: FaDatabase, color: "#8b5cf6" },
            { name: "Context Design", icon: TbBrain, color: "#3b82f6" },
        ],
    },
    {
        title: "Tools & Platforms",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "#ffffff" },
            { name: "Docker", icon: FaDocker, color: "#2496ED" },
            { name: "Jenkins", icon: FaJenkins, color: "#D24939" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#FE315D" },
            { name: "VS Code", icon: VscCode, color: "#007ACC" },
            { name: "Render", icon: FaCloud, color: "#46E3B7" },
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Central glow effect behind skills */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8b5cf6] rounded-full blur-[200px] opacity-10 pointer-events-none" />

            <div className="container-custom relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-[#8b5cf6] font-medium mb-2 tracking-wider uppercase text-sm">
                        My Arsenal
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">
                        Tech Skills
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </AnimatedSection>

                <div className="space-y-10">
                    {skillCategories.map((category, categoryIndex) => (
                        <AnimatedSection key={category.title} delay={categoryIndex * 0.1}>
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-semibold text-[#8b5cf6]">
                                    {category.title}
                                </h3>
                            </div>
                            <StaggerContainer
                                className="flex flex-wrap justify-center gap-3"
                                staggerDelay={0.03}
                            >
                                {category.skills.map((skill) => (
                                    <StaggerItem key={skill.name}>
                                        <motion.div
                                            className="skill-chip group relative overflow-hidden"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -8,
                                                boxShadow: `0 20px 40px ${skill.color}40`,
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            {/* Glow effect on hover */}
                                            <motion.div
                                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"
                                                style={{ backgroundColor: skill.color }}
                                            />
                                            <skill.icon
                                                className="text-xl transition-all duration-300 group-hover:scale-125 relative z-10"
                                                style={{ color: skill.color }}
                                            />
                                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors relative z-10">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

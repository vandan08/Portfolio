"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const RESUME_URL = "/resume.pdf";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/vandan08" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vandan-sheth08/" },
    { name: "X", href: "https://x.com/vandans08" },
    { name: "LeetCode", href: "https://leetcode.com/u/vandan08/" },
    { name: "Medium", href: "https://medium.com/@vandanbsheth9" },
];

const facts = [
    { label: "Currently", value: "Software Engineer, OneIT" },
    { label: "Focus", value: "Java · Cloud (AWS · GCP) · Distributed Systems" },
    { label: "Location", value: "India — working remotely" },
];

const rise = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export default function Hero() {
    return (
        <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
            {/* The lake panorama, washed with the paper tone so type stays legible */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <Image
                    src="/backdrop.jpg"
                    alt=""
                    fill
                    className="object-cover object-[50%_35%]"
                    priority
                    unoptimized
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-paper/75 via-paper/85 to-paper" />
            </div>

            <div className="container-page relative">
                {/* Masthead line */}
                <motion.div {...rise} transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className="flex items-end justify-between pb-3">
                        <p className="eyebrow">Portfolio — MMXXVI</p>
                        <p className="eyebrow hidden sm:block">Software · Thoughtfully Made</p>
                    </div>
                    <div className="rule-double" />
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-14 md:pt-20 pb-16">
                    {/* Introduction */}
                    <div className="lg:col-span-7">
                        <motion.p
                            className="eyebrow mb-6"
                            {...rise}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        >
                            Software Engineer at OneIT
                        </motion.p>

                        <motion.h1
                            className="font-display text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8"
                            {...rise}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        >
                            Vandan{" "}
                            <em className="italic text-accent font-normal">Sheth</em>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl leading-relaxed text-ink-soft max-w-xl mb-10"
                            {...rise}
                            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        >
                            I build dependable backend systems and ship them to the
                            cloud — Java and Spring Boot on AWS and GCP by trade,
                            event-driven and AI-powered tools by curiosity. I care as
                            much about{" "}
                            <em className="italic text-ink">how</em> a thing is made
                            as whether it works.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap items-center gap-4 mb-10"
                            {...rise}
                            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                        >
                            <a href="#contact" className="btn-ink">
                                Get in touch
                            </a>
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                Read my résumé ↗
                            </a>
                        </motion.div>

                        <motion.p
                            className="eyebrow flex flex-wrap gap-x-2 gap-y-2"
                            {...rise}
                            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                        >
                            {/* Still a run-in line of names, but each name is
                                given a thumb's worth of height to land on —
                                "X" is nine pixels of type on its own. */}
                            {socialLinks.map((link, index) => (
                                <span key={link.name} className="flex items-center">
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex min-h-11 items-center transition-colors hover:text-accent"
                                    >
                                        {link.name}
                                    </a>
                                    {index < socialLinks.length - 1 && (
                                        <span className="ml-2 text-ink-faint">·</span>
                                    )}
                                </span>
                            ))}
                        </motion.p>
                    </div>

                    {/* Portrait, mounted like a print */}
                    <motion.div
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                        initial={{ opacity: 0, y: 24, rotate: 0 }}
                        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                    >
                        <figure className="bg-paper-raised border border-rule p-3 pb-3 shadow-[0_20px_50px_-20px_rgba(33,28,20,0.35)] max-w-xs w-full">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src="/portrait.jpg"
                                    alt="Vandan Sheth"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                    sizes="(max-width: 1024px) 320px, 380px"
                                />
                            </div>
                            <figcaption className="eyebrow pt-3 text-center normal-case tracking-normal font-mono text-xs">
                                Fig. 1 — The author, off duty.
                            </figcaption>
                        </figure>
                    </motion.div>
                </div>

                {/* Facts strip */}
                <motion.div
                    className="border-t border-b border-rule grid sm:grid-cols-3"
                    {...rise}
                    transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                >
                    {facts.map((fact, index) => (
                        <div
                            key={fact.label}
                            className={`py-5 sm:px-6 first:pl-0 last:pr-0 ${
                                index > 0
                                    ? "border-t sm:border-t-0 sm:border-l border-rule"
                                    : ""
                            }`}
                        >
                            <p className="eyebrow mb-1">{fact.label}</p>
                            <p className="text-ink">{fact.value}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

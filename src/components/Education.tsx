"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

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
        <section id="education" className="py-20 md:py-28 scroll-mt-16">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="05"
                        label="Education"
                        title={
                            <>
                                Where I{" "}
                                <em className="italic text-accent font-normal">studied</em>
                            </>
                        }
                    />
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <article className="grid md:grid-cols-12 gap-4 md:gap-8">
                        <div className="md:col-span-3">
                            <p className="eyebrow">Aug 2021 — Jun 2024</p>
                            <p className="eyebrow mt-1 text-ink-faint">
                                Ahmedabad, India
                            </p>
                        </div>

                        <div className="md:col-span-9">
                            <h3 className="font-display text-2xl md:text-3xl font-medium mb-1">
                                Bachelor of Computer Application
                            </h3>
                            <p className="text-accent italic text-lg mb-5">
                                Indus University
                            </p>

                            <p className="text-ink-soft mb-6 max-w-2xl">
                                Graduated with a CGPA of{" "}
                                <strong className="text-ink font-medium">8.16</strong> —
                                First Class with Distinction.
                            </p>

                            <p className="eyebrow mb-2">Relevant coursework</p>
                            <p className="text-ink-soft max-w-2xl">
                                {coursework.join(" · ")}
                            </p>
                        </div>
                    </article>
                </AnimatedSection>
            </div>
        </section>
    );
}

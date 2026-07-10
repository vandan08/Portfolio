"use client";

import AnimatedSection from "./AnimatedSection";

/** Full-width editorial pull quote — a magazine interlude between sections. */
export default function Interlude() {
    return (
        <section className="py-20 md:py-28">
            <div className="container-page">
                <AnimatedSection>
                    <div className="border-t border-b border-rule py-14 md:py-16 text-center">
                        <p className="eyebrow mb-8">An admission</p>
                        <blockquote className="font-display italic text-2xl md:text-4xl leading-snug max-w-3xl mx-auto text-ink">
                            “Intelligence is the only advantage nature gave us —
                            no claws, no wings, no fangs. Just wit. So I use mine
                            as intended: I do the thinking, and the{" "}
                            <span className="text-accent">artificial</span> kind
                            does the typing. Some call that delegation. I call
                            it evolution.”
                        </blockquote>
                        <p className="eyebrow mt-8">— V. Sheth, on working with AI</p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

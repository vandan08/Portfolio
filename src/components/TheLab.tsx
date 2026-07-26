import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

/**
 * Homepage teaser for The Lab. The full interactive experience lives on its
 * own page at /lab; this card drives clicks there.
 */
export default function TheLab() {
    return (
        <section id="lab" className="py-20 md:py-28 bg-paper-deep scroll-mt-16">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="04"
                        label="Vandan's Intelligence"
                        title={
                            <>
                                An <em className="italic text-accent font-normal">experiment</em>
                            </>
                        }
                    />
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <Link
                        href="/lab"
                        className="group block rounded-[3px] border border-rule bg-paper-raised transition-colors hover:border-accent"
                    >
                        <div className="grid md:grid-cols-12 items-center gap-6 md:gap-8 p-6 md:p-9">
                            <div className="md:col-span-8">
                                <p className="font-mono text-[12px] text-ink-soft mb-4">
                                    graph · breadth-first / depth-first · O(V&nbsp;+&nbsp;E)
                                </p>
                                <h3 className="font-display text-2xl md:text-3xl font-medium mb-3">
                                    Watch an algorithm{" "}
                                    <em className="italic text-accent font-normal">think</em>
                                </h3>
                                <p className="text-ink-soft max-w-xl mb-6">
                                    A small interactive product built into this site: type-a-problem,
                                    see it solved. It steps through a graph traversal like a page from
                                    a technical journal — a live diagram beside a monospace state
                                    ledger. The animation is driven by the real algorithm, not a model.
                                </p>
                                <span className="eyebrow text-accent group-hover:text-accent-deep transition-colors">
                                    Open the Lab ↗
                                </span>
                            </div>

                            {/* Static graph motif — a hint, not the real thing. */}
                            <div className="md:col-span-4">
                                <svg
                                    viewBox="0 0 220 160"
                                    className="w-full h-auto max-w-[240px] mx-auto"
                                    aria-hidden
                                >
                                    <g stroke="var(--rule-strong)" strokeWidth={1.5} strokeLinecap="round">
                                        <line x1="40" y1="80" x2="110" y2="34" />
                                        <line x1="40" y1="80" x2="110" y2="126" />
                                        <line x1="110" y1="34" x2="180" y2="80" />
                                        <line x1="110" y1="126" x2="180" y2="80" />
                                    </g>
                                    {[
                                        { x: 40, y: 80, fill: "var(--accent)", stroke: "var(--ink)", t: "var(--paper)" },
                                        { x: 110, y: 34, fill: "var(--accent-light)", stroke: "var(--accent-deep)", t: "var(--ink)" },
                                        { x: 110, y: 126, fill: "var(--paper-raised)", stroke: "var(--ink)", t: "var(--ink)" },
                                        { x: 180, y: 80, fill: "var(--paper-raised)", stroke: "var(--ink)", t: "var(--ink)" },
                                    ].map((n, i) => (
                                        <g key={i}>
                                            <circle cx={n.x} cy={n.y} r={18} fill={n.fill} stroke={n.stroke} strokeWidth={1.4} />
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
}

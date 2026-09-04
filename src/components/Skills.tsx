"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { TECH_GROUPS, TECH_MARKS } from "@/lib/tech-marks";

/**
 * The things with no mark to draw. Simple Icons has no logo for a query
 * language or for a way of arranging context, and inventing one would be worse
 * than setting them in type — so they are set in type, as a footnote under the
 * case, rather than dressed up as brands they are not.
 */
const UNMARKED = [
    "SQL",
    "Serverless / Edge functions",
    "RAG",
    "CAG",
    "Model Context Protocol",
    "Vector databases",
    "Context design",
    "Supabase CLI",
];

/**
 * Capabilities, set as a type case.
 *
 * A printer keeps his sorts in a shallow drawer divided into compartments and
 * reads the drawer rather than a list. This is that drawer: every technology as
 * its own mark, laid out on shelves, drawn in ink until you pick one up — at
 * which point it inks in its own brand colour and the label above the case says
 * what it is and what it says when it breaks.
 *
 * The marks and the errors are the same set the cursor carries, from
 * @/lib/tech-marks, so the two can never drift apart.
 */
export default function Skills() {
    // Nothing is hovered on a phone, so the case opens on a chosen specimen
    // rather than on an empty label waiting for a pointer that never comes.
    const [picked, setPicked] = useState(0);
    const mark = TECH_MARKS[picked];
    const { Icon } = mark;

    return (
        <section id="skills" className="scroll-mt-20 py-20 md:py-28">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="03"
                        label="Capabilities"
                        title={
                            <>
                                Tools of{" "}
                                <em className="font-normal italic text-accent">
                                    the trade
                                </em>
                            </>
                        }
                    />
                </AnimatedSection>

                {/* ------------------------------------------------- the label
                    Above the case, not below it: on a phone the compartment you
                    tap can be anywhere down a long drawer, and a caption under
                    the whole thing would be off the bottom of the screen by the
                    time it had anything to say. */}
                <AnimatedSection delay={0.05}>
                    <div
                        className="specimen-label"
                        style={{ "--tint": mark.tint } as CSSProperties}
                    >
                        <div className="flex items-start gap-4 sm:gap-5">
                            <Icon className="specimen-label__mark" aria-hidden />
                            <div className="min-w-0 flex-1">
                                <p className="eyebrow">
                                    № {String(picked + 1).padStart(2, "0")} —{" "}
                                    {mark.group}
                                </p>
                                <p className="mt-1 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                                    {mark.name}
                                </p>
                            </div>
                        </div>

                        <p className="eyebrow mt-5 border-t border-rule pt-4">
                            What it says when it is unhappy
                        </p>
                        <p className="specimen-label__error">{mark.error}</p>
                    </div>
                </AnimatedSection>

                {/* -------------------------------------------------- the case */}
                <AnimatedSection delay={0.1}>
                    <p className="eyebrow mt-8 mb-5 text-ink-faint">
                        Pick up a mark — the cursor carries these too
                    </p>

                    <div className="space-y-8">
                        {TECH_GROUPS.map((group) => {
                            const shelf = TECH_MARKS.map((m, i) => ({ m, i })).filter(
                                ({ m }) => m.group === group,
                            );
                            if (shelf.length === 0) return null;

                            return (
                                <div key={group}>
                                    <div className="mb-3 flex items-baseline gap-3 border-b border-rule pb-2">
                                        <h3 className="eyebrow">{group}</h3>
                                        <span
                                            className="eyebrow ml-auto tabular-nums text-ink-faint"
                                            aria-hidden
                                        >
                                            {String(shelf.length).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <div className="specimen-case">
                                        {shelf.map(({ m, i }) => {
                                            const Mark = m.Icon;
                                            return (
                                                <button
                                                    key={m.name}
                                                    type="button"
                                                    aria-pressed={i === picked}
                                                    aria-label={m.name}
                                                    title={m.name}
                                                    data-on={i === picked ? "1" : "0"}
                                                    onClick={() => setPicked(i)}
                                                    onMouseEnter={() => setPicked(i)}
                                                    onFocus={() => setPicked(i)}
                                                    className="specimen-cell"
                                                    style={
                                                        { "--tint": m.tint } as CSSProperties
                                                    }
                                                >
                                                    <Mark
                                                        className="specimen-cell__mark"
                                                        aria-hidden
                                                    />
                                                    <span className="specimen-cell__name">
                                                        {m.name}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </AnimatedSection>

                {/* --------------------------------------------- the footnote */}
                <AnimatedSection delay={0.15}>
                    <div className="mt-12 border-t border-rule pt-6">
                        <p className="eyebrow mb-3">Set in type, for want of a mark</p>
                        <p className="max-w-3xl text-ink-soft">{UNMARKED.join(" · ")}</p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

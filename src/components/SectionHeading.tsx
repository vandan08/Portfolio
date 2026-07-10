import { ReactNode } from "react";

interface SectionHeadingProps {
    number: string;
    label: string;
    title: ReactNode;
    dark?: boolean;
}

/** Numbered editorial section header: "№ 01 — Label" over a rule, then the title. */
export default function SectionHeading({
    number,
    label,
    title,
    dark = false,
}: SectionHeadingProps) {
    return (
        <div className="mb-12 md:mb-16">
            <div
                className={`flex items-baseline gap-3 border-b pb-3 mb-8 ${
                    dark ? "border-night-rule" : "border-rule"
                }`}
            >
                <span className={`eyebrow ${dark ? "text-night-soft" : ""}`}>
                    № {number}
                </span>
                <span
                    className={dark ? "text-night-rule" : "text-ink-faint"}
                    aria-hidden
                >
                    —
                </span>
                <span className={`eyebrow ${dark ? "text-night-soft" : ""}`}>
                    {label}
                </span>
            </div>
            <h2
                className={`font-display text-4xl md:text-5xl font-medium tracking-tight ${
                    dark ? "text-night-ink" : "text-ink"
                }`}
            >
                {title}
            </h2>
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";

interface DossierProps {
    project: Project | null;
    /** 1-based position in the reel — drives the figure numbering. */
    number: number;
    /** How many projects there are, for the counter in the masthead. */
    total: number;
    /** Move to the previous/next project without leaving the dialog. */
    onStep: (delta: number) => void;
    onClose: () => void;
}

/**
 * The long read on a single project, opened from the reel.
 *
 * Built on a native <dialog> so focus trapping, Esc-to-close and inert-ing the
 * page behind come from the platform rather than from us. Everything below the
 * masthead is set like a printed article: a deck, the argument, then numbered
 * figures with captions.
 *
 * The masthead carries the reel's transport, so a reader who is already inside
 * one dossier can walk the whole set without closing it first.
 */
export default function ProjectDossier({
    project,
    number,
    total,
    onStep,
    onClose,
}: DossierProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Open and close the real dialog in step with the `project` prop.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (project && !el.open) el.showModal();
        else if (!project && el.open) el.close();
    }, [project]);

    // A step to the next project is a new article: start it at the top.
    useEffect(() => {
        if (project) scrollerRef.current?.scrollTo({ top: 0 });
    }, [project?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Close on Escape ourselves rather than trusting the dialog to do it.
     * showModal() runs from an effect — a task after the click that triggered
     * it — so the user activation is already spent and Chrome's close watcher
     * silently declines to fire `cancel`. Handling the key directly makes the
     * behaviour the same everywhere.
     */
    useEffect(() => {
        if (!project) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "ArrowRight") {
                onStep(1);
            } else if (e.key === "ArrowLeft") {
                onStep(-1);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [project, onClose, onStep]);

    // showModal() blocks interaction but not scroll on every browser; pin the page.
    useEffect(() => {
        if (!project) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [project]);

    if (!project) {
        // Keep the element mounted so the open/close effect always has a target.
        return <dialog ref={ref} onClose={onClose} className="hidden" />;
    }

    const figure = String(number).padStart(2, "0");

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onClick={(e) => {
                // With no padding on the dialog, the element itself is the backdrop.
                if (e.target === ref.current) onClose();
            }}
            aria-labelledby="dossier-title"
            className="m-auto w-[min(64rem,calc(100vw-2rem))] max-h-[90dvh] overflow-hidden rounded-[3px] border border-rule-strong bg-paper p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-[2px]"
        >
            <div ref={scrollerRef} className="max-h-[90dvh] overflow-y-auto">
                {/* Masthead — stays put while the article scrolls under it */}
                <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-rule bg-paper/95 px-5 py-3 backdrop-blur-sm md:px-10">
                    <span className="eyebrow shrink-0">
                        № {figure} — Dossier
                    </span>

                    <div className="flex items-center gap-3 md:gap-5">
                        <button
                            type="button"
                            onClick={() => onStep(-1)}
                            aria-label="Previous project"
                            className="eyebrow cursor-pointer px-1 py-1 text-ink-soft transition-colors hover:text-accent"
                        >
                            ← <span className="hidden sm:inline">Prev</span>
                        </button>
                        <span className="eyebrow hidden tabular-nums text-ink-faint sm:inline">
                            {figure} / {String(total).padStart(2, "0")}
                        </span>
                        <button
                            type="button"
                            onClick={() => onStep(1)}
                            aria-label="Next project"
                            className="eyebrow cursor-pointer px-1 py-1 text-ink-soft transition-colors hover:text-accent"
                        >
                            <span className="hidden sm:inline">Next</span> →
                        </button>
                        <span className="h-4 w-px bg-rule" aria-hidden />
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="eyebrow cursor-pointer px-1 py-1 text-ink-soft transition-colors hover:text-accent"
                        >
                            Close ✕
                        </button>
                    </div>
                </div>

                <div key={project.slug} className="dossier-in px-5 py-8 md:px-10 md:py-12">
                    <h2
                        id="dossier-title"
                        className="font-display text-4xl font-medium tracking-tight md:text-5xl"
                    >
                        {project.title}
                    </h2>
                    <p className="mt-2 font-serif text-xl italic text-ink-soft">
                        {project.kicker}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-6">
                        {project.links?.map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`eyebrow no-underline transition-colors ${
                                    link.primary
                                        ? "text-accent hover:text-ink"
                                        : "link-ink hover:text-accent"
                                }`}
                            >
                                {link.label} ↗
                            </a>
                        ))}
                        {project.note && (
                            <span className="eyebrow text-ink-faint">{project.note}</span>
                        )}
                    </div>

                    {/* The recording, with controls this time — this is the long look. */}
                    {project.media && (
                        <figure className="mt-8">
                            <div className="overflow-hidden rounded-[2px] border border-rule bg-night">
                                <video
                                    className="block w-full"
                                    style={{ aspectRatio: project.media.ratio }}
                                    poster={`/media/${project.media.clip}/poster.webp`}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                >
                                    <source
                                        src={`/media/${project.media.clip}/clip.webm`}
                                        type="video/webm"
                                    />
                                    <source
                                        src={`/media/${project.media.clip}/clip.mp4`}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                            <figcaption className="eyebrow mt-3">
                                Plate {figure} — {project.media.caption}
                            </figcaption>
                        </figure>
                    )}

                    <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-ink-soft">
                        {project.description}
                    </p>

                    <div className="mt-10 grid gap-8 border-t border-rule pt-8 md:grid-cols-12 md:gap-10">
                        <div className="md:col-span-7">
                            <p className="eyebrow mb-4">What it does</p>
                            <ul className="space-y-3">
                                {project.features.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-ink-soft">
                                        <span className="select-none text-accent" aria-hidden>
                                            —
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-5">
                            <p className="eyebrow mb-4">Built with</p>
                            <ul className="space-y-1.5">
                                {project.techStack.map((tech) => (
                                    <li
                                        key={tech}
                                        className="font-mono text-[13px] text-ink-soft"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Numbered figures, the way a printed article carries its plates */}
                    {project.shots && project.shots.length > 0 && (
                        <div className="mt-12 border-t border-rule pt-8">
                            <p className="eyebrow mb-6">Figures</p>
                            <div className="space-y-10">
                                {project.shots.map((shot, i) => (
                                    <figure key={shot.src}>
                                        <div className="overflow-hidden rounded-[2px] border border-rule bg-paper-raised">
                                            {/* Plain img: these are pre-sized stills, not art-directed sources. */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={shot.src}
                                                alt={shot.caption}
                                                // The first figure loads eagerly: an
                                                // unloaded lazy image has no height, so
                                                // a dossier with one figure could leave
                                                // it pinned below the fold forever.
                                                loading={i === 0 ? "eager" : "lazy"}
                                                decoding="async"
                                                className="block w-full"
                                            />
                                        </div>
                                        <figcaption className="mt-3 flex gap-3 text-sm text-ink-soft">
                                            <span className="eyebrow shrink-0 pt-0.5">
                                                Fig. {figure}.{i + 1}
                                            </span>
                                            <span className="italic">{shot.caption}</span>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </dialog>
    );
}

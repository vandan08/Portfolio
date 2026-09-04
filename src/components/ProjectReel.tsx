"use client";

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { projects, type Project } from "@/lib/projects";
import ProjectDossier from "./ProjectDossier";

/** How long a project holds the plate before the reel advances, in ms. */
const DWELL = 7000;
/** How far above the active row the window lets the previous title peek through. */
const PEEK = 46;
/** Resting height of a rail row, and of the reading line it glides past. */
const LINE = 68;
/**
 * One shape for every plate, whatever the recording behind it was captured at.
 * Roughly the mean of the screen recordings, so each is cropped by a few per
 * cent rather than the page resizing under the reader every seven seconds.
 */
const PLATE_RATIO = "21 / 10";

/**
 * The reel.
 *
 * A window cut into the page shows one title at a time; the list glides up past
 * a fixed reading line and the plate on the right changes to match. Projects
 * that have a recording play it, silent and looping; the rest get a set plate.
 * Every plate is cropped to the same shape, so the page never resizes under the
 * reader. Clicking the plate opens the dossier.
 *
 * The rail is driven the way a list wants to be driven: a wheel or a trackpad
 * over it steps through the projects, a drag does the same on touch, and the
 * arrow keys work because it is a real tablist. At either end of the list the
 * wheel is handed straight back to the page, so the reel can never trap a
 * reader who is only trying to scroll past it.
 *
 * The reel advances on its own but never fights the reader: it stops on hover,
 * on focus, while the dossier is open, when it scrolls out of view, and for
 * anyone who has asked for reduced motion.
 */
export default function ProjectReel() {
    const [active, setActive] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [held, setHeld] = useState(false);
    const [reduced, setReduced] = useState(false);
    const [offset, setOffset] = useState(0);
    // A phone has no hover to pause the reel with, and every advance fetches a
    // new recording — so on a touch screen the reader drives it, not a timer.
    const [coarse, setCoarse] = useState(false);
    // The reading line matches the active row, which is taller when a title wraps.
    const [lineHeight, setLineHeight] = useState(LINE);

    const railRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { ref: viewRef, inView } = useInView({ threshold: 0.3 });

    const project = projects[active];
    const running =
        inView && !held && !reduced && !coarse && openIndex === null;

    /* ---- a touch screen, and a tablet that has just been given a mouse ---- */
    useEffect(() => {
        const mq = window.matchMedia("(hover: none)");
        const sync = () => setCoarse(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    /* ---- honour the reduced-motion preference, and keep honouring it ---- */
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setReduced(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    /* ---- slide the list so the active title lands on the window's line ---- */
    useLayoutEffect(() => {
        const measure = () => {
            const row = rowRefs.current[active];
            if (!row) return;
            setOffset(row.offsetTop - PEEK);
            setLineHeight(row.offsetHeight);
        };
        measure();
        const list = listRef.current;
        if (!list) return;
        const ro = new ResizeObserver(measure);
        ro.observe(list);
        return () => ro.disconnect();
    }, [active]);

    const go = useCallback((delta: number) => {
        setActive((i) => (i + delta + projects.length) % projects.length);
    }, []);

    // Stable, so the dossier's Escape listener isn't torn down every render.
    const closeDossier = useCallback(() => setOpenIndex(null), []);

    /** Prev/next from inside the dossier, which also moves the reel underneath. */
    const stepDossier = useCallback((delta: number) => {
        setOpenIndex((i) => {
            if (i === null) return i;
            const next = (i + delta + projects.length) % projects.length;
            setActive(next);
            return next;
        });
    }, []);

    /* ---- the dwell timer, pausable rather than restartable ---- */
    const remaining = useRef(DWELL);
    useEffect(() => {
        remaining.current = DWELL;
    }, [active]);
    useEffect(() => {
        if (!running) return;
        const startedAt = Date.now();
        const id = window.setTimeout(() => go(1), remaining.current);
        return () => {
            window.clearTimeout(id);
            remaining.current = Math.max(
                400,
                remaining.current - (Date.now() - startedAt),
            );
        };
    }, [running, active, go]);

    /**
     * Wheel and trackpad over the rail step through the list.
     *
     * Two rules keep this from being a scrolljack. The event is only swallowed
     * when there is somewhere to go in that direction — at the first project a
     * scroll up, and at the last a scroll down, belong to the page. And a
     * gesture is rate-limited, so one flick of a trackpad advances one project
     * rather than emptying the list.
     */
    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        let travel = 0;
        let lastStep = 0;

        const onWheel = (e: WheelEvent) => {
            const down = e.deltaY > 0;
            const stuck = down
                ? active === projects.length - 1
                : active === 0;
            if (stuck) return; // the page's scroll, not ours

            e.preventDefault();

            const now = Date.now();
            if (now - lastStep < 280) return;
            // A change of direction starts the count again.
            if ((travel > 0) !== down) travel = 0;
            travel += e.deltaY;

            if (Math.abs(travel) < 24) return;
            travel = 0;
            lastStep = now;
            setActive((i) =>
                Math.min(projects.length - 1, Math.max(0, i + (down ? 1 : -1))),
            );
        };

        rail.addEventListener("wheel", onWheel, { passive: false });
        return () => rail.removeEventListener("wheel", onWheel);
    }, [active]);

    /* ---- the same gesture with a finger, for a touch screen wide enough
            to be showing the rail at all ---- */
    const railDrag = useRef<number | null>(null);
    const onRailPointerDown = (e: React.PointerEvent) => {
        railDrag.current = e.pointerType === "mouse" ? null : e.clientY;
    };
    const onRailPointerUp = (e: React.PointerEvent) => {
        const from = railDrag.current;
        railDrag.current = null;
        if (from === null) return;
        const dy = from - e.clientY;
        if (Math.abs(dy) > 40) go(dy > 0 ? 1 : -1);
    };

    /* ---- don't burn CPU decoding a plate nobody is looking at ---- */
    useEffect(() => {
        const video = videoRef.current;
        if (!video || reduced) return;
        if (inView) void video.play().catch(() => {});
        else video.pause();
    }, [inView, active, reduced]);

    /* ---- keyboard: the roving-tabindex pattern for a vertical tablist ---- */
    const onKeyDown = (e: React.KeyboardEvent) => {
        const map: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };
        if (e.key in map) {
            e.preventDefault();
            const next =
                (active + map[e.key] + projects.length) % projects.length;
            setActive(next);
            rowRefs.current[next]?.focus();
        } else if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            const next = e.key === "Home" ? 0 : projects.length - 1;
            setActive(next);
            rowRefs.current[next]?.focus();
        }
    };

    /* ---- swipe, for the plate on touch ---- */
    const swipe = useRef<{ x: number; y: number } | null>(null);
    /** Set when a pointer gesture turned out to be a swipe, so the click it
     *  also produces opens nothing. Opening stays on click so that Enter and
     *  Space reach it too. */
    const swallowClick = useRef(false);

    const onPointerDown = (e: React.PointerEvent) => {
        swipe.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: React.PointerEvent) => {
        const start = swipe.current;
        swipe.current = null;
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
            swallowClick.current = true;
            go(dx < 0 ? 1 : -1);
        }
    };
    const onPlateClick = () => {
        if (swallowClick.current) {
            swallowClick.current = false;
            return;
        }
        setOpenIndex(active);
    };

    return (
        <div
            ref={viewRef}
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocusCapture={() => setHeld(true)}
            onBlurCapture={() => setHeld(false)}
        >
            <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                {/* ------------------------------------------------ the rail */}
                <div className="md:col-span-5 lg:col-span-4">
                    {/* Mobile: the active title alone, with the counter beside it. */}
                    <div className="mb-4 flex items-baseline justify-between gap-4 md:hidden">
                        <h3 className="font-display text-3xl font-medium tracking-tight">
                            {project.title}
                        </h3>
                        <span className="eyebrow shrink-0 text-ink-faint tabular-nums">
                            {String(active + 1).padStart(2, "0")} /{" "}
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                    {/* The plate still takes a swipe, but a swipe is a gesture
                        you have to already know about — so the narrow layout
                        also carries the transport in plain sight. */}
                    <div className="mb-5 flex items-stretch justify-between border-y border-rule md:hidden">
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label="Previous project"
                            className="eyebrow flex min-h-11 flex-1 items-center justify-start px-1 text-ink-soft transition-colors active:text-accent"
                        >
                            ← Prev
                        </button>
                        <span className="eyebrow flex min-h-11 items-center px-3 text-ink-faint">
                            or swipe
                        </span>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label="Next project"
                            className="eyebrow flex min-h-11 flex-1 items-center justify-end px-1 text-ink-soft transition-colors active:text-accent"
                        >
                            Next →
                        </button>
                    </div>

                    {/* Desktop: the window, with the list sliding up behind it. */}
                    <div
                        ref={railRef}
                        className="reel-window relative hidden h-[21rem] touch-pan-y overflow-hidden md:block"
                        role="tablist"
                        aria-orientation="vertical"
                        aria-label="Selected projects"
                        onKeyDown={onKeyDown}
                        onPointerDown={onRailPointerDown}
                        onPointerUp={onRailPointerUp}
                    >
                        {/* The reading line: fixed to the window, titles glide past it. */}
                        <div
                            className="reel-line pointer-events-none absolute inset-x-0 z-10"
                            style={{ top: PEEK, height: lineHeight }}
                            aria-hidden
                        />

                        <div
                            ref={listRef}
                            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                            style={{
                                paddingTop: PEEK,
                                transform: `translateY(${-offset}px)`,
                            }}
                        >
                            {projects.map((p, i) => {
                                const on = i === active;
                                // Rows fall away from the reading line rather than
                                // simply greying out — the rail reads as depth.
                                const away = Math.min(Math.abs(i - active), 4);
                                return (
                                    <button
                                        key={p.slug}
                                        ref={(el) => {
                                            rowRefs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        id={`reel-tab-${p.slug}`}
                                        aria-selected={on}
                                        aria-controls="reel-plate"
                                        tabIndex={on ? 0 : -1}
                                        onClick={() => setActive(i)}
                                        style={{
                                            minHeight: LINE,
                                            opacity: on ? 1 : 0.72 - away * 0.13,
                                            transform: on
                                                ? "none"
                                                : `translateX(-6px) scale(${1 - away * 0.035})`,
                                            transformOrigin: "left center",
                                        }}
                                        className={`flex w-full cursor-pointer items-center gap-4 py-3 pl-5 text-left transition-[transform,opacity,color] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                                            on
                                                ? "text-ink"
                                                : "text-ink-faint hover:text-ink-soft hover:opacity-100"
                                        }`}
                                    >
                                        <span
                                            className={`eyebrow shrink-0 tabular-nums transition-colors duration-500 ${
                                                on ? "text-accent" : ""
                                            }`}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-display text-2xl font-medium leading-tight tracking-tight">
                                            {p.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* No transport: the rail is scrolled. The rule carries the
                        gesture that drives it, and the reader's place in the set. */}
                    <div className="mt-5 hidden items-center gap-5 border-t border-rule pt-4 md:flex">
                        <span className="eyebrow text-ink-faint">
                            Scroll the list
                        </span>
                        <span className="eyebrow ml-auto text-ink-faint tabular-nums">
                            {String(active + 1).padStart(2, "0")} /{" "}
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* ----------------------------------------------- the plate */}
                <div
                    className="md:col-span-7 lg:col-span-8"
                    id="reel-plate"
                    role="tabpanel"
                    aria-labelledby={`reel-tab-${project.slug}`}
                >
                    <button
                        type="button"
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                        onClick={onPlateClick}
                        aria-label={`Read the ${project.title} dossier`}
                        className="group block w-full cursor-pointer overflow-hidden rounded-[3px] border border-rule bg-paper-raised text-left transition-colors duration-300 hover:border-accent"
                    >
                        {/* One frame for every project, whatever it holds. */}
                        <div
                            key={project.slug}
                            className="reel-plate-in relative w-full overflow-hidden bg-night"
                            style={{ aspectRatio: PLATE_RATIO }}
                        >
                            {project.media ? (
                                <video
                                    key={project.media.clip}
                                    ref={videoRef}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    poster={`/media/${project.media.clip}/poster.webp`}
                                    autoPlay={!reduced}
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
                                    tabIndex={-1}
                                    aria-hidden
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
                            ) : (
                                <SetPlate project={project} index={active} />
                            )}
                        </div>
                    </button>

                    {/* Caption bar — kicker, dwell progress, and the way in */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                        <p className="font-serif text-lg italic text-ink-soft">
                            {project.kicker}
                        </p>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(active)}
                            className="eyebrow flex min-h-11 cursor-pointer items-center text-accent transition-colors hover:text-ink"
                        >
                            Read the dossier →
                        </button>
                    </div>

                    <div className="mt-4 h-px w-full bg-rule" aria-hidden>
                        <div
                            key={active}
                            className="h-px origin-left bg-accent"
                            style={{
                                animation: reduced
                                    ? "none"
                                    : `reel-dwell ${DWELL}ms linear forwards`,
                                animationPlayState: running ? "running" : "paused",
                                transform: reduced ? "scaleX(0)" : undefined,
                            }}
                        />
                    </div>
                </div>
            </div>

            <ProjectDossier
                project={openIndex === null ? null : projects[openIndex]}
                number={(openIndex ?? 0) + 1}
                total={projects.length}
                onStep={stepDossier}
                onClose={closeDossier}
            />
        </div>
    );
}

/**
 * The plate for a project with no recording. Deliberately typographic rather
 * than a grey "no image" box — a set title on ruled paper reads as a choice.
 */
function SetPlate({ project, index }: { project: Project; index: number }) {
    return (
        <div className="reel-set-plate absolute inset-0 flex flex-col justify-between p-7 md:p-10">
            <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-5xl text-ink-faint md:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                </span>
                {project.note && (
                    <span className="eyebrow text-ink-faint">{project.note}</span>
                )}
            </div>

            <h3 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
                {project.title}
            </h3>

            <p className="eyebrow leading-relaxed">
                {project.techStack.slice(0, 5).join("  ·  ")}
            </p>
        </div>
    );
}

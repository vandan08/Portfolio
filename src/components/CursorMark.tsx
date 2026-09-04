"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TECH_MARKS } from "@/lib/tech-marks";

/**
 * A mark that follows the pointer, showing one of the technologies on the
 * capabilities page at a time and turning over every few seconds — and, when
 * you click the page where there is nothing to click, throwing whatever error
 * that technology throws.
 *
 * Every mark is in the DOM at once and only one is lit. That sounds wasteful
 * and is the opposite: a single Simple Icon is one <path>, so the whole set
 * costs less than the layout work of mounting and unmounting one every five
 * seconds — and it means the change is a pair of opacity transitions the
 * compositor runs, with the outgoing mark fading under the incoming one rather
 * than being cut away beneath it.
 *
 * The follow is a CSS transition rather than an animation loop. The pointer
 * writes a new destination, the transition eases toward it, and the lag comes
 * out of the easing for free — no rAF to keep alive, nothing to shut down when
 * the pointer stops.
 */

/** How long each mark holds before the next one takes over. */
const HOLD = 5000;
/** Where the mark rides relative to the pointer — below and to the right, off
 *  the tip, so it never covers what you are about to click. */
const TRAIL_X = 20;
const TRAIL_Y = 22;
/** Clearance the mark keeps from the edge of the window before it swaps sides. */
const EDGE = 10;
/** How long a thrown error stays up, and how much of that is its exit. */
const LIFE = 6000;
const FADE = 420;
/** Most errors on screen at once. Older ones are dropped from the bottom of
 *  the stack rather than allowed to paper over the page. */
const STACK = 4;

/** What the pointer is over when a click means "open this", not "nothing here". */
const LIVE =
    'a, button, input, textarea, select, label, summary, dialog, [role="button"], [contenteditable="true"]';

interface Thrown {
    id: number;
    mark: number;
    leaving: boolean;
}

export default function CursorMark() {
    const [enabled, setEnabled] = useState(false);
    const [held, setHeld] = useState(false);
    const [lit, setLit] = useState(0);
    const [thrown, setThrown] = useState<Thrown[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const nibRef = useRef<HTMLDivElement>(null);
    // The click handler needs to know which mark is showing without being torn
    // down and rebuilt every time that changes.
    const litNow = useRef(0);
    const seq = useRef(0);
    const timers = useRef<number[]>([]);

    useEffect(() => {
        litNow.current = lit;
    }, [lit]);

    // A mouse, and permission to move. Both can change while the page is open —
    // a trackpad attached to a tablet, a system setting toggled — so this
    // listens rather than sampling once.
    useEffect(() => {
        const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const still = window.matchMedia("(prefers-reduced-motion: reduce)");
        const settle = () => setEnabled(pointer.matches && !still.matches);
        settle();
        pointer.addEventListener("change", settle);
        still.addEventListener("change", settle);
        return () => {
            pointer.removeEventListener("change", settle);
            still.removeEventListener("change", settle);
        };
    }, []);

    // Held while the tab is in the background: coming back to a page that has
    // silently advanced eleven marks is worse than coming back to the one you
    // left.
    useEffect(() => {
        const settle = () => setHeld(document.hidden);
        settle();
        document.addEventListener("visibilitychange", settle);
        return () => document.removeEventListener("visibilitychange", settle);
    }, []);

    // Turning the marks over. Keyed on the mark showing, so a click that
    // advances it by hand also buys the next one its full five seconds instead
    // of leaving it to be cut short by a timer already half spent.
    useEffect(() => {
        if (!enabled || held) return;
        const timer = window.setTimeout(
            () => setLit((n) => (n + 1) % TECH_MARKS.length),
            HOLD,
        );
        return () => window.clearTimeout(timer);
    }, [enabled, held, lit]);

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach((t) => window.clearTimeout(t));
    }, []);

    const throwError = useCallback(() => {
        const id = ++seq.current;
        setThrown((list) =>
            [...list, { id, mark: litNow.current, leaving: false }].slice(-STACK),
        );
        // Every click turns the page over to the next technology, so clicking
        // around is a tour rather than the same error four times.
        setLit((n) => (n + 1) % TECH_MARKS.length);

        timers.current.push(
            window.setTimeout(
                () =>
                    setThrown((list) =>
                        list.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
                    ),
                LIFE - FADE,
            ),
            window.setTimeout(
                () => setThrown((list) => list.filter((t) => t.id !== id)),
                LIFE,
            ),
        );
    }, []);

    // Following the pointer, and listening for clicks that land on nothing.
    useEffect(() => {
        if (!enabled) return;
        const el = ref.current;
        if (!el) return;

        const nib = nibRef.current;

        let px = 0;
        let py = 0;
        let frame = 0;
        let started = false;

        /**
         * The native arrow is only taken away once there is something on
         * screen to replace it with. Before the first movement the pointer
         * has no known position, so a page nobody has touched yet would
         * otherwise have no cursor at all — and the same on the way out of
         * the window and back.
         */
        const setAwake = (on: boolean) => {
            el.dataset.awake = on ? "1" : "0";
            if (nib) nib.dataset.awake = on ? "1" : "0";
            if (on) document.documentElement.dataset.cursor = "mark";
            else delete document.documentElement.dataset.cursor;
        };

        const place = () => {
            const { offsetWidth: w, offsetHeight: h } = el;
            // Near an edge the mark changes sides rather than being clipped by
            // it — the same thing a tooltip does, and for the same reason.
            const x =
                px + TRAIL_X + w > window.innerWidth - EDGE
                    ? px - TRAIL_X - w
                    : px + TRAIL_X;
            const y =
                py + TRAIL_Y + h > window.innerHeight - EDGE
                    ? py - TRAIL_Y - h
                    : py + TRAIL_Y;
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            // The nib does not lag and does not change sides: it is the
            // point itself, and a point that arrives late or somewhere else
            // is not one you can aim with.
            if (nib) nib.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        };

        const onMove = (e: PointerEvent) => {
            px = e.clientX;
            py = e.clientY;
            if (!started) {
                // Arrive where the pointer already is. Without cutting the
                // transition for one frame it would sail in from the top-left
                // corner of the window the first time the mouse twitches.
                started = true;
                el.style.transition = "none";
                place();
                void el.offsetWidth;
                el.style.transition = "";
                setAwake(true);
                return;
            }
            // Pointer events outrun paint, so the write is coalesced onto the
            // next frame rather than done on every one of them.
            if (!frame) {
                frame = requestAnimationFrame(() => {
                    frame = 0;
                    place();
                });
            }
        };

        const onClick = (e: MouseEvent) => {
            const target = e.target as Element | null;
            if (!target || target.closest(LIVE)) return;
            // Finishing a drag over a paragraph is reading, not clicking on
            // nothing, and should not be answered with a stack trace.
            if (window.getSelection()?.toString()) return;
            throwError();
        };

        // Out of the window is out of the picture; back when you are.
        const onLeave = (e: PointerEvent) => {
            if (!e.relatedTarget) setAwake(false);
        };
        const onEnter = () => {
            if (started) setAwake(true);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("click", onClick);
        document.addEventListener("pointerout", onLeave);
        document.addEventListener("pointerover", onEnter);

        return () => {
            cancelAnimationFrame(frame);
            // Whatever happens next — a mouse unplugged, reduced motion turned
            // on, this component going away — the page gets its arrow back.
            delete document.documentElement.dataset.cursor;
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("click", onClick);
            document.removeEventListener("pointerout", onLeave);
            document.removeEventListener("pointerover", onEnter);
        };
    }, [enabled, throwError]);

    if (!enabled) return null;

    return (
        <>
            {/* The point itself: a printer's registration mark, drawn once in
                paper and once in ink over it, so it holds against warm paper
                and against the night band alike. The gap at the centre leaves
                the exact pixel you are aiming at uncovered. */}
            <div
                ref={nibRef}
                className="cursor-nib"
                data-awake="0"
                aria-hidden="true"
            >
                <svg viewBox="0 0 16 16" className="cursor-nib__cross">
                    <path
                        className="cursor-nib__halo"
                        d="M8 .5v5M8 10.5v5M.5 8h5M10.5 8h5"
                    />
                    <path
                        className="cursor-nib__line"
                        d="M8 .5v5M8 10.5v5M.5 8h5M10.5 8h5"
                    />
                </svg>
            </div>

            <div ref={ref} className="cursor-mark" data-awake="0" aria-hidden="true">
                <div className="cursor-mark__well">
                    {TECH_MARKS.map(({ name, Icon, tint }, n) => (
                        <Icon
                            key={name}
                            className="cursor-mark__glyph"
                            data-on={n === lit ? "1" : "0"}
                            style={{ color: tint }}
                        />
                    ))}
                </div>
                <div className="cursor-mark__names">
                    {TECH_MARKS.map(({ name }, n) => (
                        <span
                            key={name}
                            className="cursor-mark__name"
                            data-on={n === lit ? "1" : "0"}
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            {/* The errors the page throws when you click where nothing lives.
                Hidden from assistive technology on purpose: they are a joke
                about the stack, and announcing a fake stack trace as a live
                status message is not the joke landing. */}
            <div className="thrown" aria-hidden="true">
                {thrown.map(({ id, mark, leaving }) => {
                    const { name, Icon, tint, error } = TECH_MARKS[mark];
                    return (
                        <div
                            key={id}
                            className="thrown__line"
                            data-leaving={leaving ? "1" : "0"}
                            style={{ "--tint": tint } as CSSProperties}
                        >
                            <Icon className="thrown__mark" />
                            <span className="thrown__where">{name}</span>
                            <span className="thrown__what">{error}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

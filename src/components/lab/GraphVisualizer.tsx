"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { runAlgorithm, edgeKey } from "@/lib/dsa/graph";
import type { AlgoKind, Frame, GraphPlan, NodeId } from "@/lib/dsa/types";

const VIEW_W = 720;
const VIEW_H = 400;
const R = 24;

type NodeState = "unseen" | "frontier" | "current" | "settled";

const STATE_STYLE: Record<NodeState, { fill: string; stroke: string; text: string }> = {
    unseen: { fill: "var(--paper-raised)", stroke: "var(--ink)", text: "var(--ink)" },
    frontier: { fill: "var(--accent-light)", stroke: "var(--accent-deep)", text: "var(--ink)" },
    current: { fill: "var(--accent)", stroke: "var(--ink)", text: "var(--paper)" },
    settled: { fill: "var(--ink)", stroke: "var(--ink)", text: "var(--paper)" },
};

function nodeState(id: NodeId, frame: Frame): NodeState {
    if (frame.current === id) return "current";
    if (frame.frontier.includes(id)) return "frontier";
    if (frame.visited.includes(id)) return "settled";
    return "unseen";
}

const LEGEND: { state: NodeState; label: string }[] = [
    { state: "unseen", label: "unseen" },
    { state: "frontier", label: "in frontier" },
    { state: "current", label: "visiting" },
    { state: "settled", label: "settled" },
];

const STEP_MS = 1050;

export default function GraphVisualizer({
    plan,
    algo,
}: {
    plan: GraphPlan;
    algo: AlgoKind;
}) {
    const result = useMemo(() => runAlgorithm(plan, algo), [plan, algo]);
    const { frames, frontierLabel, complexity } = result;
    const last = frames.length - 1;

    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const frame = frames[index];

    // Autoplay: advance one frame at a time, stop at the end.
    const playingRef = useRef(playing);
    playingRef.current = playing;
    useEffect(() => {
        if (!playing) return;
        if (index >= last) {
            setPlaying(false);
            return;
        }
        const t = setTimeout(() => setIndex((i) => Math.min(i + 1, last)), STEP_MS);
        return () => clearTimeout(t);
    }, [playing, index, last]);

    const handlePlay = () => {
        if (playing) {
            setPlaying(false);
            return;
        }
        if (index >= last) setIndex(0);
        setPlaying(true);
    };
    const step = (delta: number) => {
        setPlaying(false);
        setIndex((i) => Math.max(0, Math.min(last, i + delta)));
    };
    const reset = () => {
        setPlaying(false);
        setIndex(0);
    };

    const fmtSet = (ids: NodeId[], open: string, close: string) =>
        ids.length ? `${open} ${ids.join(", ")} ${close}` : `${open}${close}`;

    const btn =
        "font-mono text-xs tracking-wide inline-flex items-center gap-1.5 border border-rule-strong rounded-[2px] px-3 py-2 text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-rule-strong disabled:hover:text-ink";

    return (
        <div className="rounded-[3px] border border-rule bg-paper-raised p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Graph canvas */}
                <div className="lg:flex-[1.55] min-w-0">
                    <svg
                        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                        className="w-full h-auto"
                        role="img"
                        aria-label={`${plan.theme} graph, ${algo === "bfs" ? "breadth" : "depth"}-first traversal`}
                    >
                        {/* Edges */}
                        <g strokeLinecap="round">
                            {plan.edges.map(([a, b]) => {
                                const na = plan.nodes.find((n) => n.id === a)!;
                                const nb = plan.nodes.find((n) => n.id === b)!;
                                const isTree = frame.treeEdges.includes(edgeKey(a, b));
                                return (
                                    <line
                                        key={`${a}-${b}`}
                                        x1={na.x}
                                        y1={na.y}
                                        x2={nb.x}
                                        y2={nb.y}
                                        stroke={isTree ? "var(--accent-deep)" : "var(--rule)"}
                                        strokeWidth={isTree ? 3 : 1.5}
                                        style={{ transition: "stroke 0.35s ease, stroke-width 0.35s ease" }}
                                    />
                                );
                            })}
                        </g>

                        {/* Current-node ring */}
                        {frame.current &&
                            (() => {
                                const n = plan.nodes.find((x) => x.id === frame.current)!;
                                return (
                                    <circle
                                        cx={n.x}
                                        cy={n.y}
                                        r={R + 7}
                                        fill="none"
                                        stroke="var(--accent)"
                                        strokeWidth={1.5}
                                        style={{ transition: "all 0.35s ease" }}
                                    />
                                );
                            })()}

                        {/* Nodes */}
                        {plan.nodes.map((n) => {
                            const s = STATE_STYLE[nodeState(n.id, frame)];
                            return (
                                <g key={n.id}>
                                    <circle
                                        cx={n.x}
                                        cy={n.y}
                                        r={R}
                                        fill={s.fill}
                                        stroke={s.stroke}
                                        strokeWidth={1.4}
                                        style={{ transition: "fill 0.35s ease, stroke 0.35s ease" }}
                                    />
                                    <text
                                        x={n.x}
                                        y={n.y}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill={s.text}
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 15,
                                            transition: "fill 0.35s ease",
                                        }}
                                    >
                                        {n.id}
                                    </text>
                                    <text
                                        x={n.x}
                                        y={n.y + R + 17}
                                        textAnchor="middle"
                                        fill="var(--ink-soft)"
                                        style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
                                    >
                                        {n.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Legend */}
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-ink-soft">
                        {LEGEND.map((l) => (
                            <span key={l.state} className="inline-flex items-center gap-1.5">
                                <span
                                    className="inline-block h-2.5 w-2.5 rounded-[2px] border"
                                    style={{
                                        background: STATE_STYLE[l.state].fill,
                                        borderColor: STATE_STYLE[l.state].stroke,
                                    }}
                                />
                                {l.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* State ledger */}
                <div className="lg:flex-1 min-w-0 font-mono">
                    <div className="flex items-baseline justify-between border-b border-rule pb-2 mb-4 text-[11px] tracking-[0.14em] uppercase">
                        <span className="text-accent-deep">State ledger</span>
                        <span className="text-ink-faint">
                            step {index} / {last}
                        </span>
                    </div>
                    <dl className="space-y-2.5 text-sm text-ink-soft leading-relaxed">
                        <div className="flex gap-2">
                            <dt className="text-ink-faint w-16 shrink-0">current</dt>
                            <dd className="text-accent">{frame.current ?? "—"}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-ink-faint w-16 shrink-0">{frontierLabel.toLowerCase()}</dt>
                            <dd className="text-ink break-all">{fmtSet(frame.frontier, "[", "]")}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-ink-faint w-16 shrink-0">visited</dt>
                            <dd className="break-all">{fmtSet(frame.visited, "{", "}")}</dd>
                        </div>
                    </dl>
                    <p className="mt-5 border-t border-rule pt-4 font-serif not-italic text-[15px] leading-snug text-ink-soft">
                        <span className="italic">{frame.note}</span>
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
                <button onClick={() => step(-1)} disabled={index === 0} className={btn} aria-label="Previous step">
                    ‹ Prev
                </button>
                <button onClick={handlePlay} className={btn} aria-label={playing ? "Pause" : "Play"}>
                    {playing ? "❚❚ Pause" : "▶ Play"}
                </button>
                <button onClick={() => step(1)} disabled={index === last} className={btn} aria-label="Next step">
                    Next ›
                </button>
                <input
                    type="range"
                    min={0}
                    max={last}
                    value={index}
                    onChange={(e) => {
                        setPlaying(false);
                        setIndex(Number(e.target.value));
                    }}
                    aria-label="Scrub steps"
                    className="mx-1 flex-1 min-w-[120px] accent-accent"
                />
                <button onClick={reset} className={btn} aria-label="Reset">
                    ↺ Reset
                </button>
            </div>
        </div>
    );
}

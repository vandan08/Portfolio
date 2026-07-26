"use client";

import { useState } from "react";
import GraphVisualizer from "./GraphVisualizer";
import { PLANS, PLAN_BY_ID } from "@/lib/dsa/plans";
import type { AlgoKind } from "@/lib/dsa/types";

/**
 * The interactive core of The Lab — problem picker, algorithm toggle, the
 * "typed problem" line, and the graph visualiser. Self-contained: it depends
 * only on src/lib/dsa/* and the theme CSS variables, so it moves as a unit.
 */
export default function LabExperience() {
    const [planId, setPlanId] = useState(PLANS[0].id);
    const plan = PLAN_BY_ID.get(planId) ?? PLANS[0];
    const [algo, setAlgo] = useState<AlgoKind>(plan.defaultAlgo);

    const selectPlan = (id: string) => {
        setPlanId(id);
        const next = PLAN_BY_ID.get(id);
        if (next) setAlgo(next.defaultAlgo);
    };

    const algoName = algo === "bfs" ? "breadth-first search" : "depth-first search";

    return (
        <div>
            {/* Controls: problem + algorithm */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-6">
                <label className="flex flex-col gap-2">
                    <span className="eyebrow">Problem</span>
                    <select
                        value={planId}
                        onChange={(e) => selectPlan(e.target.value)}
                        className="font-serif text-lg text-ink bg-paper-raised border border-rule-strong rounded-[2px] px-3 py-2 min-w-[220px] cursor-pointer focus:outline-none focus:border-accent"
                    >
                        {PLANS.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.theme}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex flex-col gap-2">
                    <span className="eyebrow">Algorithm</span>
                    <div className="inline-flex rounded-[2px] border border-rule-strong overflow-hidden w-max">
                        {(["bfs", "dfs"] as AlgoKind[]).map((a) => (
                            <button
                                key={a}
                                onClick={() => setAlgo(a)}
                                className={`font-mono text-xs tracking-[0.14em] uppercase px-4 py-2.5 transition-colors ${
                                    algo === a ? "bg-accent text-paper" : "text-ink hover:text-accent"
                                }`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* "Typed" problem + recognised-as chip */}
            <div className="mb-4">
                <div
                    className="font-serif text-lg text-ink bg-paper-raised border border-rule rounded-[3px] px-4 py-3"
                    aria-label="Problem statement"
                >
                    {plan.prompt}
                </div>
                <p className="mt-3 font-mono text-[12px] text-ink-soft border-t border-dashed border-rule pt-3">
                    recognised as&nbsp; →&nbsp; <span className="text-accent">{algoName}</span>{" "}
                    &nbsp;·&nbsp; graph &nbsp;·&nbsp; O(V&nbsp;+&nbsp;E)
                </p>
            </div>

            {/* Remount on plan/algo change for a clean reset. */}
            <GraphVisualizer key={`${plan.id}-${algo}`} plan={plan} algo={algo} />

            <p className="mt-6 max-w-2xl text-sm text-ink-faint leading-relaxed">
                <span className="text-ink-soft">How this runs:</span> the animation is generated
                by the real algorithm executing over the graph — never by a model, so every step
                is correct by construction. The layer that turns any freely-typed problem into
                one of these plans is the next build.
            </p>
        </div>
    );
}

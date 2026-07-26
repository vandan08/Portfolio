// The Lab — deterministic traversal engine.
//
// This is the "your code writes the steps, not the model" layer. Given a
// GraphPlan, we run the actual BFS / DFS and record a correct-by-construction
// sequence of frames. No randomness, no model output — same plan in, same
// animation out, every time.

import type { AlgoResult, Frame, GraphPlan, NodeId } from "./types";

/** Undirected edge key, order-independent. */
const edgeKey = (a: NodeId, b: NodeId): string => [a, b].sort().join("|");

/** Build a sorted adjacency list so neighbour order (and the animation) is stable. */
function buildAdjacency(plan: GraphPlan): Map<NodeId, NodeId[]> {
    const order = new Map(plan.nodes.map((n, i) => [n.id, i]));
    const adj = new Map<NodeId, NodeId[]>(plan.nodes.map((n) => [n.id, []]));
    for (const [a, b] of plan.edges) {
        adj.get(a)?.push(b);
        adj.get(b)?.push(a);
    }
    for (const list of adj.values()) {
        list.sort((x, y) => (order.get(x) ?? 0) - (order.get(y) ?? 0));
    }
    return adj;
}

/** Turn a plan into a label lookup and an id→order index. */
function labeller(plan: GraphPlan) {
    const labels = new Map(plan.nodes.map((n) => [n.id, n.label]));
    const order = new Map(plan.nodes.map((n, i) => [n.id, i]));
    const L = (id: NodeId) => labels.get(id) ?? id;
    const names = (ids: NodeId[]) =>
        [...ids]
            .sort((x, y) => (order.get(x) ?? 0) - (order.get(y) ?? 0))
            .map(L)
            .join(", ");
    return { L, names };
}

export function breadthFirst(plan: GraphPlan): AlgoResult {
    const adj = buildAdjacency(plan);
    const { L, names } = labeller(plan);

    const visited = new Set<NodeId>([plan.start]);
    const queue: NodeId[] = [plan.start];
    const tree: string[] = [];
    let goalReached = plan.start === plan.goal;
    const frames: Frame[] = [];

    frames.push({
        current: null,
        frontier: [...queue],
        visited: [...visited],
        treeEdges: [...tree],
        note: `Enqueue the start node ${L(plan.start)}.`,
        goalReached,
    });

    while (queue.length) {
        const u = queue.shift() as NodeId;
        const discovered: NodeId[] = [];
        for (const v of adj.get(u) ?? []) {
            if (!visited.has(v)) {
                visited.add(v);
                tree.push(edgeKey(u, v));
                queue.push(v);
                discovered.push(v);
                if (v === plan.goal) goalReached = true;
            }
        }
        const hitGoal = plan.goal !== undefined && discovered.includes(plan.goal);
        const note = discovered.length
            ? `Dequeue ${L(u)} — discover ${names(discovered)}.` +
              (hitGoal ? ` Target ${L(plan.goal as NodeId)} reached.` : "")
            : `Dequeue ${L(u)} — neighbours already seen.`;
        frames.push({
            current: u,
            frontier: [...queue],
            visited: [...visited],
            treeEdges: [...tree],
            note,
            goalReached,
        });
    }

    frames.push({
        current: null,
        frontier: [],
        visited: [...visited],
        treeEdges: [...tree],
        note: "Queue empty — traversal complete.",
        goalReached,
    });

    return { frames, frontierLabel: "Queue", complexity: "O(V + E)" };
}

export function depthFirst(plan: GraphPlan): AlgoResult {
    const adj = buildAdjacency(plan);
    const { L, names } = labeller(plan);
    const order = new Map(plan.nodes.map((n, i) => [n.id, i]));

    const visited = new Set<NodeId>();
    const stack: NodeId[] = [plan.start];
    const parent = new Map<NodeId, NodeId>();
    const tree: string[] = [];
    let goalReached = false;
    const frames: Frame[] = [];

    frames.push({
        current: null,
        frontier: [...stack],
        visited: [],
        treeEdges: [...tree],
        note: `Push the start node ${L(plan.start)} onto the stack.`,
        goalReached,
    });

    while (stack.length) {
        const u = stack.pop() as NodeId;
        if (visited.has(u)) continue;

        visited.add(u);
        const p = parent.get(u);
        if (p !== undefined) tree.push(edgeKey(p, u));
        if (u === plan.goal) goalReached = true;

        const neighbours = adj.get(u) ?? [];
        const pushed: NodeId[] = [];
        // Push in reverse sorted order so the lowest-ordered neighbour ends up
        // on top and is explored first — keeps the descent readable.
        for (let i = neighbours.length - 1; i >= 0; i--) {
            const v = neighbours[i];
            if (!visited.has(v)) {
                stack.push(v);
                if (!parent.has(v)) parent.set(v, u);
                pushed.push(v);
            }
        }
        pushed.sort((x, y) => (order.get(x) ?? 0) - (order.get(y) ?? 0));
        const note =
            `Visit ${L(u)}` +
            (pushed.length ? ` — go deeper toward ${names(pushed)}.` : ` — dead end, backtrack.`) +
            (u === plan.goal ? ` Target reached.` : "");
        frames.push({
            current: u,
            frontier: [...stack],
            visited: [...visited],
            treeEdges: [...tree],
            note,
            goalReached,
        });
    }

    frames.push({
        current: null,
        frontier: [],
        visited: [...visited],
        treeEdges: [...tree],
        note: "Stack empty — traversal complete.",
        goalReached,
    });

    return { frames, frontierLabel: "Stack", complexity: "O(V + E)" };
}

export function runAlgorithm(plan: GraphPlan, algo: "bfs" | "dfs"): AlgoResult {
    return algo === "bfs" ? breadthFirst(plan) : depthFirst(plan);
}

export { edgeKey };

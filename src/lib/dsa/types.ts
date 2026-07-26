// The Lab — shared types for the graph visualiser.
//
// A GraphPlan is exactly the shape the classification layer will eventually
// emit (structure + entities + topology). For now the plans are hand-written
// in plans.ts. The animation FRAMES are never authored here or by a model —
// they are generated deterministically by the real algorithms in graph.ts.

export type NodeId = string;

export interface GraphNode {
    id: NodeId;
    /** Real-world entity label, e.g. "Warehouse" — the skin over the node. */
    label: string;
    /** Position in the 720×400 viewBox coordinate space. */
    x: number;
    y: number;
}

export type AlgoKind = "bfs" | "dfs";

export interface GraphPlan {
    id: string;
    /** The natural-language problem, shown in the "typed" input. */
    prompt: string;
    /** Short theme label, e.g. "Delivery route". */
    theme: string;
    nodes: GraphNode[];
    edges: [NodeId, NodeId][];
    start: NodeId;
    goal?: NodeId;
    /** Which traversal to show first. Users can switch either way. */
    defaultAlgo: AlgoKind;
}

/** One snapshot of the traversal — a single settled point in the animation. */
export interface Frame {
    current: NodeId | null;
    /** Queue (BFS) or stack (DFS) contents at this step. */
    frontier: NodeId[];
    /** Every node discovered so far, in discovery order. */
    visited: NodeId[];
    /** Discovered ("tree") edges so far, as sorted "a|b" keys. */
    treeEdges: string[];
    note: string;
    goalReached: boolean;
}

export interface AlgoResult {
    frames: Frame[];
    /** "Queue" or "Stack" — labels the frontier in the ledger. */
    frontierLabel: string;
    complexity: string;
}

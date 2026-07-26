// The Lab — hand-authored problem plans.
//
// Each plan is the exact payload the classification layer will one day return
// for a typed problem: a structure, real-world entities, and topology — but no
// steps. Coordinates live in a 720×400 viewBox.

import type { GraphPlan } from "./types";

export const PLANS: GraphPlan[] = [
    {
        id: "delivery",
        prompt:
            "A delivery van leaves the Warehouse and needs the fewest-stops route to Store C.",
        theme: "Delivery route",
        defaultAlgo: "bfs",
        start: "W",
        goal: "C",
        nodes: [
            { id: "W", label: "Warehouse", x: 90, y: 200 },
            { id: "A", label: "Store A", x: 250, y: 92 },
            { id: "B", label: "Store B", x: 250, y: 308 },
            { id: "C", label: "Store C", x: 445, y: 92 },
            { id: "D", label: "Store D", x: 445, y: 300 },
            { id: "E", label: "Store E", x: 630, y: 200 },
        ],
        edges: [
            ["W", "A"],
            ["W", "B"],
            ["A", "C"],
            ["A", "D"],
            ["B", "D"],
            ["C", "E"],
            ["D", "E"],
        ],
    },
    {
        id: "social",
        prompt: "Suggest friends-of-friends for Alice, nearest connections first.",
        theme: "Friend network",
        defaultAlgo: "bfs",
        start: "A",
        nodes: [
            { id: "A", label: "Alice", x: 96, y: 200 },
            { id: "B", label: "Bob", x: 260, y: 104 },
            { id: "C", label: "Carol", x: 260, y: 300 },
            { id: "D", label: "Dave", x: 445, y: 104 },
            { id: "E", label: "Eve", x: 445, y: 300 },
            { id: "F", label: "Frank", x: 624, y: 200 },
        ],
        edges: [
            ["A", "B"],
            ["A", "C"],
            ["B", "C"],
            ["B", "D"],
            ["C", "E"],
            ["D", "F"],
            ["E", "F"],
        ],
    },
    {
        id: "caves",
        prompt:
            "Explore every cavern reachable from the Entrance, going as deep as possible first.",
        theme: "Cave system",
        defaultAlgo: "dfs",
        start: "S",
        nodes: [
            { id: "S", label: "Entrance", x: 96, y: 200 },
            { id: "A", label: "Cavern A", x: 250, y: 96 },
            { id: "B", label: "Cavern B", x: 250, y: 304 },
            { id: "C", label: "Cavern C", x: 440, y: 84 },
            { id: "D", label: "Cavern D", x: 440, y: 210 },
            { id: "E", label: "Cavern E", x: 440, y: 320 },
            { id: "F", label: "Cavern F", x: 628, y: 200 },
        ],
        edges: [
            ["S", "A"],
            ["S", "B"],
            ["A", "C"],
            ["A", "D"],
            ["B", "E"],
            ["D", "F"],
            ["E", "F"],
        ],
    },
];

export const PLAN_BY_ID = new Map(PLANS.map((p) => [p.id, p]));

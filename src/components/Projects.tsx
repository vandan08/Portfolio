"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

interface ProjectLink {
    label: string;
    url: string;
}

interface Project {
    title: string;
    description: string;
    features: string[];
    techStack: string[];
    links?: ProjectLink[];
    note?: string;
}

const projects: Project[] = [
    {
        title: "Vigil",
        description:
            "One outage produces hundreds of alerts. Vigil is an open, self-hostable incident response platform — incident.io you can run on a €5 VPS — that collapses alert noise into a single incident with a timeline, notifies the on-call, and gets out of the way.",
        features: [
            "Alertmanager ingestion with label-set fingerprinting and sliding-window dedup — an alert storm becomes one incident, not five hundred",
            "Incident state machine with validated lifecycle transitions and an append-only timeline, the raw material for postmortems",
            "Live ops console embedded in the single Go binary via go:embed, streaming over SSE with a never-block-ingestion fan-out bus",
            "Slack notifications through a bounded lossy dispatcher — a slow webhook can never stall alert intake",
            "Monitors itself: hand-rolled Prometheus /metrics exporter with a latency histogram aligned to its own p99 SLO",
        ],
        techStack: ["Go", "stdlib-only core", "SSE", "Prometheus", "Alertmanager", "Docker", "GitHub Actions"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/Vigil-" }],
        note: "In active development",
    },
    {
        title: "Quoinly",
        description:
            "AI-powered personal wealth management. Most money apps show you a balance; Quoinly connects the real accounts, categorises the spend on its own, and answers the question you actually have — am I going to be fine? — from a terminal-inspired dashboard.",
        features: [
            "Live bank connectivity through Stripe Financial Connections, with Plaid and Teller adapters behind the same interface",
            "20+ serverless edge functions on a Deno runtime — transaction sync, AI categorisation, receipt scanning, scheduled report mail",
            "An AI investment advisor and retirement planner grounded in the user's own ledger, not generic advice",
            "Row-level-secured Postgres with timestamped migrations; realtime subscriptions push account state to the UI as it changes",
            "Ships to web and to iOS/Android through a Capacitor shell from one codebase",
        ],
        techStack: [
            "React 18",
            "TypeScript",
            "Vite",
            "Supabase (Postgres · Auth · Edge Functions)",
            "Deno",
            "Stripe",
            "Capacitor",
            "Tailwind CSS",
        ],
        note: "In active development",
    },
    {
        title: "FraudFlux",
        description:
            "Fraud has to be caught in the gap between the tap and the receipt. FraudFlux is an event-driven microservice platform that scores a transaction as it moves through the pipeline, using temporal behaviour rather than static rules.",
        features: [
            "Seven Spring Boot services communicating over Kafka topics — transaction, fraud, risk, decision, audit, notification, gateway",
            "Temporal detection in Redis: sliding-window velocity checks and per-account behaviour drift",
            "CQRS read model in PostgreSQL fed by an audit service subscribed to every topic",
            "Live Angular dashboard driven by WebSocket push, so analysts watch decisions land in real time",
        ],
        techStack: [
            "Java 17",
            "Spring Boot",
            "Apache Kafka",
            "Redis",
            "PostgreSQL",
            "Spring Cloud Gateway",
            "Angular",
            "Docker Compose",
        ],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/FraudFlux" }],
    },
    {
        title: "ChainSentry",
        description:
            "Supply-chain security, built into your CI. Most vulnerability scans drown teams in alerts; fewer than 5% are ever exploited. ChainSentry ranks findings by real-world exploitability so the ones that matter surface first.",
        features: [
            "Risk ranking that blends CVSS, EPSS exploit probability, and CISA KEV membership",
            "PR supply-chain delta — reviewers see exactly what a pull request introduces",
            "Policy-as-code gates with time-boxed suppressions, defined in chainsentry.yml",
            "CycloneDX SBOMs and OpenVEX output; normalizes Trivy, Semgrep, and OWASP Dependency-Check",
        ],
        techStack: ["Java 24", "Spring Boot 4.1", "Virtual Threads", "PostgreSQL", "Redis", "GitHub Actions"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/chainsentry" }],
    },
    {
        title: "Aegis Platform",
        description:
            "A zero-trust identity and access platform: an OAuth2/OIDC authorization server, an API gateway that enforces Open Policy Agent policies on every request, and a protected demo service proving the whole chain end to end.",
        features: [
            "Standards-compliant OAuth2 / OpenID Connect authorization server",
            "Policy-enforcing API gateway — every request is verified, nothing is trusted by default",
            "Fine-grained authorization decisions written as OPA policy, not application code",
        ],
        techStack: ["Java", "Spring Boot", "OAuth2 / OIDC", "Open Policy Agent", "API Gateway"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/aegis-platform" }],
    },
    {
        title: "CredLayer",
        description:
            "DeFi lending demands 150%+ collateral because it trusts no one. CredLayer introduces reputation-based credit scoring on-chain, letting proven borrowers access loans with as little as 40% collateral.",
        features: [
            "Off-chain risk engine feeding on-chain smart contracts, with credit bands A through D",
            "ECDSA-signed loan approvals and DAO governance over protocol parameters",
            "Blockchain event listener syncing loan activity to PostgreSQL, with REST APIs for loan terms",
        ],
        techStack: ["Solidity", "Hardhat", "Java", "Spring Boot", "Web3j", "PostgreSQL"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/CredLayer" }],
    },
    {
        title: "Aveling LMS Portal",
        description:
            "A flagship enterprise Learning Management System built for Aveling Australia — one unified experience across client, trainer, and admin portals.",
        features: [
            "Multi-role access for individual clients, companies, trainers, and admins",
            "Group booking and scheduling engine",
            "Invoicing, company-level pricing, and payment management",
            "Secure Eway payment gateway integration",
        ],
        techStack: ["Java", "Angular 19", "TypeScript", "REST APIs", "PostgreSQL"],
        note: "Proprietary client work",
    },
    {
        title: "BWEDrilling — CorePlan Integration",
        description:
            "A CorePlan integration for a drilling-operations platform, delivered end-to-end solo — from batch design to dashboards. Scheduled jobs pull nearly 10,000 records a day from the CorePlan API into the system.",
        features: [
            "Timed sync batches — operational data synced daily, configurations weekly",
            "Multithreaded fetch pool sized for ~10k records/day, tuned to prevent deadlocks",
            "Ingested API data surfaced across eight chart dashboards in Angular 19",
        ],
        techStack: ["Java", "Spring Boot", "Multithreading", "Batch Scheduling", "Angular 19", "REST APIs"],
        note: "Client work — built solo",
    },
    {
        title: "Ledgerline",
        description:
            "A green contribution square proves nothing. Almost all paid engineering happens in private repositories, so a developer can spend two years doing excellent work and leave with no portable evidence of it. Ledgerline issues signed, verifiable receipts for that history.",
        features: [
            "A receipt never claims to be true — it carries the basis for believing it, as a tier: self-attested, corroborated by independent reviewers, or countersigned by an org admin",
            "Aggregate PR metadata only: counts, date ranges, active months, languages, coarse change bands — no code, no diffs, no file names, repository names hashed by default",
            "Tier 2 is reachable from metadata alone, so a single user gets something useful on day one without waiting on their employer",
            "Independent verifier that checks a receipt's signature and renders its basis for a third party",
        ],
        techStack: ["TypeScript", "GitHub API", "Cryptographic signing", "Postgres"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/ledgerline" }],
        note: "In active development",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 md:py-28 bg-paper-deep scroll-mt-16">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="02"
                        label="Selected Projects"
                        title={
                            <>
                                Work worth{" "}
                                <em className="italic text-accent font-normal">
                                    reading about
                                </em>
                            </>
                        }
                    />
                </AnimatedSection>

                <div>
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.title} delay={index * 0.08}>
                            <article
                                className={`group grid md:grid-cols-12 gap-4 md:gap-8 py-10 ${
                                    index > 0 ? "border-t border-rule" : ""
                                }`}
                            >
                                {/* Index number */}
                                <div className="md:col-span-2">
                                    <span className="font-display text-4xl md:text-5xl text-ink-faint group-hover:text-accent transition-colors duration-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="md:col-span-10">
                                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-3">
                                        <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight">
                                            {project.title}
                                        </h3>
                                        {project.links?.map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="eyebrow link-ink no-underline hover:text-accent transition-colors"
                                            >
                                                {link.label} ↗
                                            </a>
                                        ))}
                                        {project.note && (
                                            <span className="eyebrow text-ink-faint">
                                                {project.note}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-lg text-ink-soft max-w-2xl mb-6">
                                        {project.description}
                                    </p>

                                    <ul className="space-y-2 mb-6 max-w-2xl">
                                        {project.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="text-ink-soft flex gap-3"
                                            >
                                                <span
                                                    className="text-accent select-none"
                                                    aria-hidden
                                                >
                                                    —
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="eyebrow">
                                        {project.techStack.join("  ·  ")}
                                    </p>
                                </div>
                            </article>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.1}>
                    <div className="border-t border-rule pt-8">
                        <a
                            href="https://github.com/vandan08"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-ink text-lg italic"
                        >
                            The full archive lives on GitHub ↗
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

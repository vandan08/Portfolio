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
        title: "VendorConnect",
        description:
            "An AI-powered service marketplace with an MCP server for LLM-to-backend orchestration, conversational job management, and semantic vendor search.",
        features: [
            "MCP server for LLM-to-backend orchestration",
            "RAG pipeline with vector embeddings for semantic search",
            "JWT/OAuth authentication with role-based access control",
            "Real-time dashboards and six-language internationalization",
        ],
        techStack: ["Java", "Spring Boot", "Spring AI", "React", "MySQL", "RAG"],
        links: [
            { label: "Frontend", url: "https://github.com/vandan08/vendr-connect-nexus" },
            { label: "Backend", url: "https://github.com/vandan08/VenderEconnect-Backend" },
        ],
    },
    {
        title: "Skyline Estate",
        description:
            "A real estate platform that breaks from convention by letting sellers define their own property types, with better discovery to match.",
        features: [
            "Dynamic property type creation during listing",
            "Advanced filtering and category management",
            "User dashboard for listing and management",
            "30% faster page loads via optimized backend queries",
        ],
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/skyline-estate" }],
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

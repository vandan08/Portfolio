/**
 * The project record. Lives here rather than inside the component so the reel,
 * the dossier dialog and anything later (an archive page, a feed) all read from
 * one list and can never drift apart.
 */

export interface ProjectLink {
    label: string;
    url: string;
    /** A running deployment — given the accent so it outranks the source link. */
    primary?: boolean;
}

/** A still from the project, shown as a numbered figure inside the dossier. */
export interface ProjectShot {
    src: string;
    caption: string;
}

export interface ProjectMedia {
    /**
     * Folder under /media, produced by `npm run media`. Expects
     * `{clip}/clip.mp4`, `{clip}/clip.webm` and `{clip}/poster.webp` — the whole
     * walkthrough, silent, so the dossier can show the real run rather than a
     * teaser of it. The reel loops the same file behind the plate.
     */
    clip: string;
    /**
     * Aspect ratio of the source recording. The reel crops every plate to one
     * shape so the page cannot jump as the reel advances; the dossier uses this
     * to show the recording whole, uncropped.
     */
    ratio: string;
    /** One line under the plate, in the reel. */
    caption: string;
}

export interface Project {
    slug: string;
    title: string;
    /** Six-or-so words. Carries the whole project in the rail. */
    kicker: string;
    description: string;
    features: string[];
    techStack: string[];
    links?: ProjectLink[];
    note?: string;
    media?: ProjectMedia;
    shots?: ProjectShot[];
}

export const projects: Project[] = [
    {
        slug: "autohawk",
        title: "AutoHawk",
        kicker: "Two hundred postings, scored down to four",
        description:
            "A job hunt is a reading problem wearing a search problem's clothes: the postings are all public, and the work is deciding which four of two hundred are worth a letter. AutoHawk sweeps ten boards and career pages into one file, scores every posting against your real profile, drafts the letter — and stops before the submit button, on purpose.",
        features: [
            "Ten sources in a single run — Greenhouse, Lever, Ashby, Workday, Workable, SmartRecruiters, RemoteOK, Remotive, Adzuna and the monthly Hacker News hiring thread — deduplicated by URL into one SQLite file",
            "Every posting scored 0–100 through a structured output that must return matched skills, honest gaps and its reasoning, so the number never arrives without the argument behind it",
            "One key in .env decides the provider: eleven hosted vendors, three local runtimes, and keyword matching as the zero-setup floor — no flag, no code change, no extra install",
            "Adding a vendor is a table row rather than a dependency: everything but Anthropic speaks OpenAI's chat endpoint, and the first call climbs down json_schema → json_object → schema-in-the-prompt until the endpoint accepts something",
            "Not an auto-apply bot, deliberately — the platforms that ban it are right that mass-fired applications get filtered anyway, so it automates discovery, ranking and tailoring and leaves you the final click",
            "Exactly one command writes to anyone but you, and it refuses to send without a letter you have already read, an address you typed yourself, and a job not already marked applied",
        ],
        techStack: [
            "Python 3.10+",
            "Typer · Rich",
            "SQLite",
            "Pydantic",
            "Anthropic / OpenAI-compatible providers",
            "Ollama · LM Studio · vLLM",
            "Docker Compose",
            "MIT",
        ],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/AutoHawk" }],
        note: "In active development",
        media: {
            clip: "autohawk",
            ratio: "1898 / 868",
            caption: "A whole run — CV in, shortlist scored, cover letter out",
        },
        shots: [
            {
                src: "/media/autohawk/landing.webp",
                caption:
                    "Ten boards in one table, every posting scored 0–100, and 100% of the sending left to you.",
            },
            {
                src: "/media/autohawk/profile.webp",
                caption:
                    "The profile is read out of your CV — the résumé stays the master every letter is drawn from.",
            },
            {
                src: "/media/autohawk/shortlist.webp",
                caption:
                    "173 jobs found and scored against the profile, each row carrying its skills, its source and its number.",
            },
            {
                src: "/media/autohawk/providers.webp",
                caption:
                    "Which model runs is decided by which key is present — down to a local one that costs nothing.",
            },
            {
                src: "/media/autohawk/letter.webp",
                caption:
                    "The letter, tailored from the posting and your own history, as DOCX or plain text. Then it stops.",
            },
        ],
    },
    {
        slug: "quoinly",
        title: "Quoinly",
        kicker: "AI-powered personal wealth management",
        description:
            "Most money apps show you a balance; Quoinly connects the real accounts, categorises the spend on its own, and answers the question you actually have — am I going to be fine? — from a terminal-inspired dashboard.",
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
        links: [{ label: "Live site", url: "https://quoinly.net", primary: true }],
        note: "In active development",
        media: {
            clip: "quoinly",
            ratio: "1894 / 906",
            caption: "The whole product, from the dashboard through to the advisor",
        },
        shots: [
            {
                src: "/media/quoinly/dashboard.webp",
                caption:
                    "The dashboard: net worth, cash flow, savings rate and debt in one reading, rebuilt nightly from account snapshots.",
            },
            {
                src: "/media/quoinly/budget.webp",
                caption:
                    "Budgets track against real spend, and the summary says plainly when income has already covered the month.",
            },
            {
                src: "/media/quoinly/tracking.webp",
                caption:
                    "Financial tracking — every asset, liability and category, filterable by year and exportable.",
            },
            {
                src: "/media/quoinly/sankey.webp",
                caption:
                    "A cash-flow Sankey: every dollar of income traced from source to destination.",
            },
            {
                src: "/media/quoinly/budget-analysis.webp",
                caption:
                    "Budget analysis — utilisation per category, budgeted against spent, and the trend across months.",
            },
            {
                src: "/media/quoinly/transactions.webp",
                caption:
                    "406 transactions, searchable and correctable in place, with status and type on every row.",
            },
            {
                src: "/media/quoinly/calendar.webp",
                caption:
                    "Money mapped day by day, with recurring subscriptions detected rather than declared.",
            },
            {
                src: "/media/quoinly/advisor.webp",
                caption:
                    "The AI advisor answers from your own ledger — and says on the page that it is not a licensed adviser.",
            },
        ],
    },
    {
        slug: "chainsentry",
        title: "ChainSentry",
        kicker: "Supply-chain security, ranked by real exploitability",
        description:
            "Supply-chain security, built into your CI. Most vulnerability scans drown teams in alerts; fewer than 5% are ever exploited. ChainSentry ranks findings by real-world exploitability so the ones that matter surface first.",
        features: [
            "Risk ranking that blends CVSS, EPSS exploit probability, and CISA KEV membership",
            "PR supply-chain delta — reviewers see exactly what a pull request introduces",
            "Policy-as-code gates with time-boxed suppressions, defined in chainsentry.yml",
            "CycloneDX SBOMs and OpenVEX output; normalizes Trivy, Semgrep, and OWASP Dependency-Check",
        ],
        techStack: [
            "Java 24",
            "Spring Boot 4.1",
            "Virtual Threads",
            "PostgreSQL",
            "Redis",
            "GitHub Actions",
        ],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/chainsentry" }],
        media: {
            clip: "chainsentry",
            ratio: "1898 / 914",
            caption: "The same scan ranked two ways, then gated on a broken repo",
        },
        shots: [
            {
                src: "/media/chainsentry/ranking.webp",
                caption:
                    "Same findings, different order: severity says how bad a flaw could be, exploitability says whether anyone is using it.",
            },
            {
                src: "/media/chainsentry/dashboard.webp",
                caption:
                    "Findings over time across four commits, with the gate's verdict on each one beside it.",
            },
            {
                src: "/media/chainsentry/gate.webp",
                caption:
                    "The policy gate, rule by rule — nothing on the KEV list, nothing above the risk threshold, zero criticals.",
            },
            {
                src: "/media/chainsentry/findings.webp",
                caption:
                    "Risk-ranked findings: CVSS, EPSS and KEV folded into one score, with the fix versions and the engine that found it.",
            },
        ],
    },
    {
        slug: "credlayer",
        title: "CredLayer",
        kicker: "On-chain credit for borrowers who earned it",
        description:
            "DeFi lending demands 150%+ collateral because it trusts no one. CredLayer introduces reputation-based credit scoring on-chain, letting proven borrowers access loans with as little as 40% collateral.",
        features: [
            "Off-chain risk engine feeding on-chain smart contracts, with credit bands A through D",
            "ECDSA-signed loan approvals and DAO governance over protocol parameters",
            "Blockchain event listener syncing loan activity to PostgreSQL, with REST APIs for loan terms",
        ],
        techStack: ["Solidity", "Hardhat", "Java", "Spring Boot", "Web3j", "PostgreSQL"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/CredLayer" }],
        media: {
            clip: "credlayer",
            ratio: "1912 / 870",
            caption: "A score, a band, and a loan priced off it — end to end",
        },
        shots: [
            {
                src: "/media/credlayer/dashboard.webp",
                caption:
                    "850 out of 1000 puts this wallet in band A: 40% collateral, 5% APR, read live from the registry contract.",
            },
            {
                src: "/media/credlayer/borrow.webp",
                caption:
                    "$5,000 borrowed against $2,000 of collateral — the band comparison shows what the other three would have cost.",
            },
            {
                src: "/media/credlayer/score-history.webp",
                caption:
                    "The repayment record the score is built from, and twelve months of what it did to the number.",
            },
            {
                src: "/media/credlayer/history.webp",
                caption:
                    "Five loans, $9,300 borrowed, zero defaults — the on-chain history a reputation has to come from.",
            },
        ],
    },
    {
        slug: "talon",
        title: "Talon",
        kicker: "Finds client work for freelance developers",
        description:
            "Freelance lead generation is a volume problem pretending to be a search problem. Talon pulls opportunity signals from public sources, ranks each one against your actual profile, and drafts the opening message — then makes the send the one thing a schedule can never do on its own.",
        features: [
            "Five live sources on the rail — Freelancer.com, GitHub funded issues, Hacker News “Who is hiring”, Google Places and Reddit hiring posts; two more were built, measured, and thrown away for returning noise",
            "Every lead is scored against the profile and staged in one table: surfaced → contacted → replied, with the budget, reach and source visible on the same row",
            "Upwork and LinkedIn are deliberately absent — their licences cap stored marketplace data at 24 hours, which collides with keeping an honest history",
            "The opener is drafted from the posting itself and your real project history, so it argues from evidence rather than adjectives",
            "Every route in the program funnels through a single send — nothing on a timer can reach a stranger, and the opt-out is added where a prompt cannot remove it",
        ],
        techStack: [
            "Python",
            "PostgreSQL",
            "Anthropic / OpenAI",
            "Reddit API",
            "Google Places",
            "SMTP",
            "Docker",
        ],
        note: "In active development",
        media: {
            clip: "talon",
            ratio: "1918 / 946",
            caption: "The full run — sources, scoring, the draft, and the send",
        },
        shots: [
            {
                src: "/media/talon/landing.webp",
                caption:
                    "The field above: 2,058 job postings, six companies, zero worth engineering contract work.",
            },
            {
                src: "/media/talon/sources.webp",
                caption:
                    "Five sources on the rail. Two more were built, measured, and thrown away.",
            },
            {
                src: "/media/talon/draft.webp",
                caption:
                    "The draft, with the lead router in full beside it — one route reaches a stranger.",
            },
            {
                src: "/media/talon/pipeline.webp",
                caption:
                    "The pipeline: every lead scored, staged, and priced, in a single table.",
            },
        ],
    },
    {
        slug: "preflight",
        title: "Preflight",
        kicker: "The error message is lying to you",
        description:
            "A build fails with “invalid target release: 24” and the message names the wrong thing — your JDK is fine, JAVA_HOME just points somewhere your shell does not. Preflight is a developer environment doctor that names the actual cause across toolchains, env files, services, ports and Windows, and fixes what it can do safely.",
        features: [
            "25 diagnoses, each carrying detected, expected, why and fix — never a bare pass/fail you then have to research",
            "Catches the disagreements, not just the absences: a second git shadowing the intended one on PATH, a console code page that garbles non-ASCII output, long paths that fail only for files that are plainly there",
            "Fixes are classified before anything runs — automatic, assisted, or manual — and the fix command dry-runs the whole plan first",
            "Never writes a value into an env file: it names the missing keys and refuses to invent them, because that is your team’s secret store’s job",
            "Zero daemons, zero telemetry, zero update checks; one Go binary, go-installable, and exactly one of the 25 checks may mutate your machine",
        ],
        techStack: ["Go", "single static binary", "WebAssembly playground", "MIT"],
        links: [{ label: "GitHub", url: "https://github.com/vandan08/preflight" }],
        media: {
            clip: "preflight",
            ratio: "1880 / 994",
            caption: "A check against a real project, end to end, then the fix plan",
        },
        shots: [
            {
                src: "/media/preflight/landing.webp",
                caption:
                    "The landing page — 25 diagnoses, each with a why; one package may mutate your machine.",
            },
            {
                src: "/media/preflight/run.webp",
                caption:
                    "A real run: console code page, long paths, and git config, each with its own why.",
            },
            {
                src: "/media/preflight/finding.webp",
                caption:
                    "Every finding carries detected, expected, why and fix — in that order.",
            },
            {
                src: "/media/preflight/fix-plan.webp",
                caption:
                    "The fix plan, dry run: one automatic, one needing approval, four manual.",
            },
        ],
    },
    {
        slug: "concept-atlas",
        title: "Concept Atlas",
        kicker: "Eleven machine-learning ideas you can actually run",
        description:
            "Most explanations of a transformer are a tidy diagram and a promise. Concept Atlas is eleven labs that run in your browser — no server, no recording, no video of someone else's screen — and where a measurement disagrees with the tidy diagram, the measurement is what it shows.",
        features: [
            "Two labs download a real transformer and run it on your text; a third loads the actual GPT-4 vocabulary, so the tokeniser is the tokeniser, not an approximation of one",
            "The rest are the equations themselves, evaluated as you drag — softmax temperature, gradient descent down a real loss surface, RoPE rotation on a live token pair",
            "Contextual vectors are PCA-projected for display but measured in the full 384-dimensional space, and the page says so rather than quietly conflating the two",
            "Organised as an atlas, not a course: four parts from how machines learn, through the transformer, to agents — each lab reachable on its own",
        ],
        techStack: [
            "TypeScript",
            "transformers.js (MiniLM)",
            "js-tiktoken (cl100k_base)",
            "three.js",
            "Canvas 2D",
            "Next.js",
        ],
        links: [{ label: "Live site", url: "https://aiml.vandansheth.in", primary: true }],
        media: {
            clip: "atlas",
            ratio: "1902 / 870",
            caption: "All eleven labs, every one of them live in the browser",
        },
        shots: [
            {
                src: "/media/atlas/index.webp",
                caption:
                    "Eleven things you can actually run — filtered by what each one really is.",
            },
            {
                src: "/media/atlas/artefacts.webp",
                caption:
                    "Tokenizer, embedding space and attention — three real model artefacts, not diagrams.",
            },
            {
                src: "/media/atlas/arithmetic.webp",
                caption:
                    "Real arithmetic: temperature and sampling, gradient descent, RoPE rotation.",
            },
            {
                src: "/media/atlas/atlas.webp",
                caption: "The atlas index — four parts, each lab reachable on its own.",
            },
        ],
    },
    {
        slug: "ledgerline",
        title: "Ledgerline",
        kicker: "Signed, verifiable receipts for private work",
        description:
            "A green contribution square proves nothing. Almost all paid engineering happens in private repositories, so a developer can spend two years doing excellent work and leave with no portable evidence of it. Ledgerline issues signed, verifiable receipts for that history.",
        features: [
            "A receipt never claims to be true — it carries the basis for believing it, as a tier: self-attested, corroborated by independent reviewers, or countersigned by an org admin",
            "Aggregate PR metadata only: counts, date ranges, active months, languages, coarse change bands — no code, no diffs, no file names, repository names hashed by default",
            "Tier 2 is reachable from metadata alone, so a single user gets something useful on day one without waiting on their employer",
            "Independent verifier that checks a receipt's signature and renders its basis for a third party",
        ],
        techStack: ["TypeScript", "GitHub API", "Cryptographic signing", "Postgres"],
        links: [
            { label: "Live site", url: "https://ledgerline.vandansheth.in", primary: true },
            { label: "GitHub", url: "https://github.com/vandan08/ledgerline" },
        ],
        note: "In active development",
        shots: [
            {
                src: "/media/ledgerline/receipt.webp",
                caption:
                    "A receipt of contribution: 32 merged PRs, 2 independent reviewers, 5 active months — and the basis for believing each line, tier 2 of 3.",
            },
        ],
    },
    {
        slug: "fraudflux",
        title: "FraudFlux",
        kicker: "Scoring a transaction while it is still moving",
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
        media: {
            clip: "fraudflux",
            ratio: "1900 / 868",
            caption: "One transaction, five hops, watched through to the decision",
        },
        shots: [
            {
                src: "/media/fraudflux/topology.webp",
                caption:
                    "Seven services, four topics, no direct calls — and a card-testing burst tripping the velocity rule underneath.",
            },
            {
                src: "/media/fraudflux/decision-log.webp",
                caption:
                    "An ordinary purchase: validated, scored 0.00, approved — every hop timestamped to the millisecond.",
            },
            {
                src: "/media/fraudflux/scorer.webp",
                caption:
                    "The composite scorer, driven by hand: velocity, amount and location weighted into the one number that rejects.",
            },
            {
                src: "/media/fraudflux/stack.webp",
                caption:
                    "Every choice, and its reason — the page argues for Kafka, Redis and Postgres rather than listing them.",
            },
        ],
    },
    {
        slug: "aegis-platform",
        title: "Aegis Platform",
        kicker: "Zero-trust identity, proven end to end",
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
];

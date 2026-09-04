import {
    SiAmazonwebservices,
    SiAngular,
    SiApachekafka,
    SiApachemaven,
    SiDocker,
    SiExpress,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGnubash,
    SiGooglecloud,
    SiHibernate,
    SiIntellijidea,
    SiJavascript,
    SiJenkins,
    SiKubernetes,
    SiMongodb,
    SiMysql,
    SiNetlify,
    SiNodedotjs,
    SiOpenjdk,
    SiPostgresql,
    SiPostman,
    SiPrometheus,
    SiPython,
    SiReact,
    SiRedis,
    SiRender,
    SiRuby,
    SiSolidity,
    SiSpring,
    SiSpringboot,
    SiSupabase,
    SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";

/**
 * The marks the cursor carries, in the order the capabilities section lists
 * them — languages first, then what they are built with, then where they run.
 *
 * Only what has a real mark is here. SQL, serverless functions, RAG, CAG, MCP,
 * vector databases and context design have no logo to draw, and inventing one
 * would be worse than leaving them to the page that spells them out. Java is
 * drawn as OpenJDK because the coffee cup is a trademark Simple Icons does not
 * carry, and AWS ships under `SiAmazonwebservices` in this version rather than
 * the older `SiAmazonaws`.
 *
 * `tint` is the official brand colour, except where that colour was mixed for
 * a white screen and disappears on warm paper. JavaScript's yellow, React's
 * cyan and the mint greens of Supabase, Netlify and Render are all deepened
 * here — marked below — because a logo nobody can see is not brand fidelity.
 *
 * `error` is what that technology says when it is unhappy: real messages, in
 * the wording each one actually uses, because a made-up error from a stack you
 * know reads as a lie.
 */
export type TechGroup =
    | "Languages"
    | "Frameworks"
    | "Cloud"
    | "Infrastructure"
    | "Databases"
    | "AI Engineering"
    | "Tools";

/** The shelves, in the order the case sets them out. */
export const TECH_GROUPS: TechGroup[] = [
    "Languages",
    "Frameworks",
    "Cloud",
    "Infrastructure",
    "Databases",
    "AI Engineering",
    "Tools",
];

export interface TechMark {
    name: string;
    /** The shelf it sits on in the capabilities case. */
    group: TechGroup;
    Icon: IconType;
    tint: string;
    error: string;
}

export const TECH_MARKS: TechMark[] = [
    // Languages
    {
        name: "Java",
        group: "Languages",
        Icon: SiOpenjdk,
        tint: "#437291",
        error: 'Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "<local1>" is null',
    },
    {
        name: "JavaScript",
        group: "Languages",
        Icon: SiJavascript,
        tint: "#B39400", // deepened from #F7DF1E
        error: "Uncaught TypeError: Cannot read properties of undefined (reading 'map')",
    },
    {
        name: "TypeScript",
        group: "Languages",
        Icon: SiTypescript,
        tint: "#3178C6",
        error: "TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.",
    },
    {
        name: "Python",
        group: "Languages",
        Icon: SiPython,
        tint: "#3776AB",
        error: "IndentationError: unindent does not match any outer indentation level",
    },
    {
        name: "Ruby",
        group: "Languages",
        Icon: SiRuby,
        tint: "#CC342D",
        error: "NoMethodError: undefined method `each' for nil:NilClass",
    },
    {
        name: "Shell",
        group: "Languages",
        Icon: SiGnubash,
        tint: "#3F8A1E", // deepened from #4EAA25
        error: "./deploy.sh: line 42: syntax error near unexpected token `fi'",
    },
    {
        name: "Solidity",
        group: "Languages",
        Icon: SiSolidity,
        tint: "#3B3B3B",
        error: "VM Exception while processing transaction: revert ERC20: transfer amount exceeds balance",
    },

    // Frameworks
    {
        name: "Spring Boot",
        group: "Frameworks",
        Icon: SiSpringboot,
        tint: "#54912F", // deepened from #6DB33F
        error: "APPLICATION FAILED TO START — Web server failed to start. Port 8080 was already in use.",
    },
    {
        name: "Hibernate",
        group: "Frameworks",
        Icon: SiHibernate,
        tint: "#59666C",
        error: "LazyInitializationException: could not initialize proxy [User#42] — no Session",
    },
    {
        name: "Angular",
        group: "Frameworks",
        Icon: SiAngular,
        tint: "#C3002F",
        error: "NG0100: ExpressionChangedAfterItHasBeenCheckedError: expression has changed after it was checked",
    },
    {
        name: "React",
        group: "Frameworks",
        Icon: SiReact,
        tint: "#1B8FB0", // deepened from #61DAFB
        error: "Too many re-renders. React limits the number of renders to prevent an infinite loop.",
    },
    {
        name: "Node.js",
        group: "Frameworks",
        Icon: SiNodedotjs,
        tint: "#4B8A3D", // deepened from #5FA04E
        error: "Error: listen EADDRINUSE: address already in use :::3000",
    },
    {
        name: "Express",
        group: "Frameworks",
        Icon: SiExpress,
        tint: "#2B2B2B",
        error: "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client",
    },

    // Cloud
    {
        name: "AWS",
        group: "Cloud",
        Icon: SiAmazonwebservices,
        tint: "#232F3E",
        error: "AccessDenied: User is not authorized to perform s3:GetObject on resource — explicit deny in identity-based policy",
    },
    {
        name: "Google Cloud",
        group: "Cloud",
        Icon: SiGooglecloud,
        tint: "#2F6BD4", // deepened from #4285F4
        error: "PERMISSION_DENIED: Caller does not have permission 'run.services.create' on resource",
    },
    {
        name: "Supabase",
        group: "Cloud",
        Icon: SiSupabase,
        tint: "#2A9468", // deepened from #3FCF8E
        error: 'PostgREST 42501: new row violates row-level security policy for table "profiles"',
    },
    {
        name: "Netlify",
        group: "Cloud",
        Icon: SiNetlify,
        tint: "#00877D", // deepened from #00C7B7
        error: 'Build failed — command "npm run build" exited with code 1',
    },
    {
        name: "Render",
        group: "Cloud",
        Icon: SiRender,
        tint: "#268F74", // deepened from #46E3B7
        error: "Deploy failed — service exceeded its memory limit (512 MB) during build",
    },

    // Infrastructure & DevOps
    {
        name: "Docker",
        group: "Infrastructure",
        Icon: SiDocker,
        tint: "#1B7FCB", // deepened from #2496ED
        error: "Error response from daemon: pull access denied — repository does not exist or requires authentication",
    },
    {
        name: "Kubernetes",
        group: "Infrastructure",
        Icon: SiKubernetes,
        tint: "#2C5FCC", // deepened from #326CE5
        error: "CrashLoopBackOff: back-off 5m0s restarting failed container app in pod api-7d9f4c",
    },
    {
        name: "GitHub Actions",
        group: "Infrastructure",
        Icon: SiGithubactions,
        tint: "#1B72D8", // deepened from #2088FF
        error: "Error: Process completed with exit code 1.",
    },
    {
        name: "Jenkins",
        group: "Infrastructure",
        Icon: SiJenkins,
        tint: "#C13B2C", // deepened from #D24939
        error: "FATAL: Remote call on agent-01 failed — java.io.IOException: Backing channel is disconnected",
    },
    {
        name: "Prometheus",
        group: "Infrastructure",
        Icon: SiPrometheus,
        tint: "#CE4520", // deepened from #E6522C
        error: "error scraping target: context deadline exceeded (scrape_timeout 10s)",
    },
    {
        name: "Kafka",
        group: "Infrastructure",
        Icon: SiApachekafka,
        tint: "#231F20",
        error: "org.apache.kafka.common.errors.TimeoutException: Topic reels not present in metadata after 60000 ms",
    },

    // Databases
    {
        name: "PostgreSQL",
        group: "Databases",
        Icon: SiPostgresql,
        tint: "#31589C", // deepened from #4169E1
        error: 'ERROR: duplicate key value violates unique constraint "users_pkey"',
    },
    {
        name: "MySQL",
        group: "Databases",
        Icon: SiMysql,
        tint: "#3A6788", // deepened from #4479A1
        error: "ERROR 1452 (23000): Cannot add or update a child row — a foreign key constraint fails",
    },
    {
        name: "MongoDB",
        group: "Databases",
        Icon: SiMongodb,
        tint: "#3A8A3B", // deepened from #47A248
        error: "MongoServerError: E11000 duplicate key error collection: app.users index: email_1",
    },
    {
        name: "Redis",
        group: "Databases",
        Icon: SiRedis,
        tint: "#D6291A", // deepened from #FF4438
        error: "(error) OOM command not allowed when used memory > 'maxmemory'",
    },

    // AI engineering
    {
        name: "Spring AI",
        group: "AI Engineering",
        Icon: SiSpring,
        tint: "#54912F", // deepened from #6DB33F
        error: "NonTransientAiException: 429 Too Many Requests — rate limit reached for this model",
    },

    // Tools
    {
        name: "Git",
        group: "Tools",
        Icon: SiGit,
        tint: "#D8451F", // deepened from #F05032
        error: "fatal: refusing to merge unrelated histories",
    },
    {
        name: "GitHub",
        group: "Tools",
        Icon: SiGithub,
        tint: "#181717",
        error: "remote: Permission to vandan08/portfolio.git denied — push rejected",
    },
    {
        name: "Maven",
        group: "Tools",
        Icon: SiApachemaven,
        tint: "#B01730", // deepened from #C71A36
        error: "[ERROR] Failed to execute goal — could not resolve dependencies for project",
    },
    {
        name: "Postman",
        group: "Tools",
        Icon: SiPostman,
        tint: "#E05620", // deepened from #FF6C37
        error: "Error: connect ECONNREFUSED 127.0.0.1:8080",
    },
    {
        name: "IntelliJ IDEA",
        group: "Tools",
        Icon: SiIntellijidea,
        tint: "#2B2B2B",
        error: "Cannot resolve symbol 'ApplicationContext'",
    },
];

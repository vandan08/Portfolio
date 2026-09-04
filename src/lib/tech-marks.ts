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
export interface TechMark {
    name: string;
    Icon: IconType;
    tint: string;
    error: string;
}

export const TECH_MARKS: TechMark[] = [
    // Languages
    {
        name: "Java",
        Icon: SiOpenjdk,
        tint: "#437291",
        error: 'Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "<local1>" is null',
    },
    {
        name: "JavaScript",
        Icon: SiJavascript,
        tint: "#B39400", // deepened from #F7DF1E
        error: "Uncaught TypeError: Cannot read properties of undefined (reading 'map')",
    },
    {
        name: "TypeScript",
        Icon: SiTypescript,
        tint: "#3178C6",
        error: "TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.",
    },
    {
        name: "Python",
        Icon: SiPython,
        tint: "#3776AB",
        error: "IndentationError: unindent does not match any outer indentation level",
    },
    {
        name: "Ruby",
        Icon: SiRuby,
        tint: "#CC342D",
        error: "NoMethodError: undefined method `each' for nil:NilClass",
    },
    {
        name: "Shell",
        Icon: SiGnubash,
        tint: "#3F8A1E", // deepened from #4EAA25
        error: "./deploy.sh: line 42: syntax error near unexpected token `fi'",
    },
    {
        name: "Solidity",
        Icon: SiSolidity,
        tint: "#3B3B3B",
        error: "VM Exception while processing transaction: revert ERC20: transfer amount exceeds balance",
    },

    // Frameworks
    {
        name: "Spring Boot",
        Icon: SiSpringboot,
        tint: "#54912F", // deepened from #6DB33F
        error: "APPLICATION FAILED TO START — Web server failed to start. Port 8080 was already in use.",
    },
    {
        name: "Hibernate",
        Icon: SiHibernate,
        tint: "#59666C",
        error: "LazyInitializationException: could not initialize proxy [User#42] — no Session",
    },
    {
        name: "Angular",
        Icon: SiAngular,
        tint: "#C3002F",
        error: "NG0100: ExpressionChangedAfterItHasBeenCheckedError: expression has changed after it was checked",
    },
    {
        name: "React",
        Icon: SiReact,
        tint: "#1B8FB0", // deepened from #61DAFB
        error: "Too many re-renders. React limits the number of renders to prevent an infinite loop.",
    },
    {
        name: "Node.js",
        Icon: SiNodedotjs,
        tint: "#4B8A3D", // deepened from #5FA04E
        error: "Error: listen EADDRINUSE: address already in use :::3000",
    },
    {
        name: "Express",
        Icon: SiExpress,
        tint: "#2B2B2B",
        error: "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client",
    },

    // Cloud
    {
        name: "AWS",
        Icon: SiAmazonwebservices,
        tint: "#232F3E",
        error: "AccessDenied: User is not authorized to perform s3:GetObject on resource — explicit deny in identity-based policy",
    },
    {
        name: "Google Cloud",
        Icon: SiGooglecloud,
        tint: "#2F6BD4", // deepened from #4285F4
        error: "PERMISSION_DENIED: Caller does not have permission 'run.services.create' on resource",
    },
    {
        name: "Supabase",
        Icon: SiSupabase,
        tint: "#2A9468", // deepened from #3FCF8E
        error: 'PostgREST 42501: new row violates row-level security policy for table "profiles"',
    },
    {
        name: "Netlify",
        Icon: SiNetlify,
        tint: "#00877D", // deepened from #00C7B7
        error: 'Build failed — command "npm run build" exited with code 1',
    },
    {
        name: "Render",
        Icon: SiRender,
        tint: "#268F74", // deepened from #46E3B7
        error: "Deploy failed — service exceeded its memory limit (512 MB) during build",
    },

    // Infrastructure & DevOps
    {
        name: "Docker",
        Icon: SiDocker,
        tint: "#1B7FCB", // deepened from #2496ED
        error: "Error response from daemon: pull access denied — repository does not exist or requires authentication",
    },
    {
        name: "Kubernetes",
        Icon: SiKubernetes,
        tint: "#2C5FCC", // deepened from #326CE5
        error: "CrashLoopBackOff: back-off 5m0s restarting failed container app in pod api-7d9f4c",
    },
    {
        name: "GitHub Actions",
        Icon: SiGithubactions,
        tint: "#1B72D8", // deepened from #2088FF
        error: "Error: Process completed with exit code 1.",
    },
    {
        name: "Jenkins",
        Icon: SiJenkins,
        tint: "#C13B2C", // deepened from #D24939
        error: "FATAL: Remote call on agent-01 failed — java.io.IOException: Backing channel is disconnected",
    },
    {
        name: "Prometheus",
        Icon: SiPrometheus,
        tint: "#CE4520", // deepened from #E6522C
        error: "error scraping target: context deadline exceeded (scrape_timeout 10s)",
    },
    {
        name: "Kafka",
        Icon: SiApachekafka,
        tint: "#231F20",
        error: "org.apache.kafka.common.errors.TimeoutException: Topic reels not present in metadata after 60000 ms",
    },

    // Databases
    {
        name: "PostgreSQL",
        Icon: SiPostgresql,
        tint: "#31589C", // deepened from #4169E1
        error: 'ERROR: duplicate key value violates unique constraint "users_pkey"',
    },
    {
        name: "MySQL",
        Icon: SiMysql,
        tint: "#3A6788", // deepened from #4479A1
        error: "ERROR 1452 (23000): Cannot add or update a child row — a foreign key constraint fails",
    },
    {
        name: "MongoDB",
        Icon: SiMongodb,
        tint: "#3A8A3B", // deepened from #47A248
        error: "MongoServerError: E11000 duplicate key error collection: app.users index: email_1",
    },
    {
        name: "Redis",
        Icon: SiRedis,
        tint: "#D6291A", // deepened from #FF4438
        error: "(error) OOM command not allowed when used memory > 'maxmemory'",
    },

    // AI engineering
    {
        name: "Spring AI",
        Icon: SiSpring,
        tint: "#54912F", // deepened from #6DB33F
        error: "NonTransientAiException: 429 Too Many Requests — rate limit reached for this model",
    },

    // Tools
    {
        name: "Git",
        Icon: SiGit,
        tint: "#D8451F", // deepened from #F05032
        error: "fatal: refusing to merge unrelated histories",
    },
    {
        name: "GitHub",
        Icon: SiGithub,
        tint: "#181717",
        error: "remote: Permission to vandan08/portfolio.git denied — push rejected",
    },
    {
        name: "Maven",
        Icon: SiApachemaven,
        tint: "#B01730", // deepened from #C71A36
        error: "[ERROR] Failed to execute goal — could not resolve dependencies for project",
    },
    {
        name: "Postman",
        Icon: SiPostman,
        tint: "#E05620", // deepened from #FF6C37
        error: "Error: connect ECONNREFUSED 127.0.0.1:8080",
    },
    {
        name: "IntelliJ IDEA",
        Icon: SiIntellijidea,
        tint: "#2B2B2B",
        error: "Cannot resolve symbol 'ApplicationContext'",
    },
];

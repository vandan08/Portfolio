/**
 * Reduces the raw screen recordings and screenshots listed in media.config.json
 * into the web-safe files the project reel and the dossier actually load.
 *
 *   npm run media            every project in the config
 *   npm run media quoinly    just this one
 *
 * Needs ffmpeg on PATH. Output lands in public/media/<slug>/ and is committed;
 * the sources are not, and never need to live inside the repo at all.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, mkdir, rm, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".mkv"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/** Plate width. Wide enough that a recorded terminal or table stays legible
 *  when the dossier plays it at dialog width on a retina screen. */
const CLIP_WIDTH = 1280;
/** Figures open at dialog width and want to survive a retina screen. */
const STILL_WIDTH = 1440;

async function ffmpeg(args) {
    // ffmpeg writes progress to stderr, so a non-zero exit is the only signal.
    await run("ffmpeg", ["-y", "-v", "error", ...args], { maxBuffer: 1 << 26 });
}

async function ffprobe(file, entries) {
    const { stdout } = await run("ffprobe", [
        "-v",
        "error",
        "-show_entries",
        entries,
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        file,
    ]);
    return stdout.trim();
}

/** "image copy 3.png" -> "image-copy-3" */
function slugify(name) {
    return path
        .basename(name, path.extname(name))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function resolveSource(dir, file) {
    return path.isAbsolute(file) ? file : path.resolve(root, dir, file);
}

async function exists(file) {
    try {
        await stat(file);
        return true;
    } catch {
        return false;
    }
}

/** Every image in the folder, name-ordered, when the config lists no stills. */
async function discoverStills(dir) {
    const entries = await readdir(dir);
    return entries
        .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((file) => ({ file, name: slugify(file) }));
}

async function buildClip(project, outDir) {
    const { clip } = project;
    if (!clip) return null;

    const src = resolveSource(project.dir, clip.file);
    if (!(await exists(src))) {
        console.warn(`  ! clip source missing, skipped: ${src}`);
        return null;
    }

    const start = String(clip.start ?? 0);
    // No duration means the whole walkthrough, which is the point: the dossier
    // shows the real run, not a teaser of it. `duration` is left in for a
    // recording with a dead tail worth cutting.
    const trim = clip.duration ? ["-t", String(clip.duration)] : [];
    // Seek before -i so ffmpeg jumps rather than decoding up to the cut.
    const cut = ["-ss", start, ...trim, "-i", src];
    const scale = `fps=24,scale=${CLIP_WIDTH}:-2`;

    await ffmpeg([
        ...cut, "-an", "-vf", scale,
        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-crf", "30", "-preset", "slow", "-g", "48",
        // Whole recordings are long enough that a viewer will scrub them, and
        // faststart puts the index up front so the first frame is not a download.
        "-movflags", "+faststart",
        path.join(outDir, "clip.mp4"),
    ]);

    await ffmpeg([
        ...cut, "-an", "-vf", scale,
        "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0",
        "-row-mt", "1", "-deadline", "good", "-cpu-used", "4",
        path.join(outDir, "clip.webm"),
    ]);

    // The poster is the frame the plate holds before it plays, so it is worth
    // choosing: `poster` picks one, otherwise the clip's own first frame.
    await ffmpeg([
        "-ss", String(clip.poster ?? start), "-i", src, "-frames:v", "1",
        "-vf", `scale=${CLIP_WIDTH}:-2`, "-q:v", "82",
        path.join(outDir, "poster.webp"),
    ]);

    // The reel sets aspect-ratio from this so the plate never letterboxes.
    const ratio = await ffprobe(src, "stream=width,height");
    const [width, height] = ratio.split(/\s+/);
    const seconds = Number(await ffprobe(src, "format=duration"));
    return {
        ratio: `${width} / ${height}`,
        seconds: clip.duration ?? Math.max(0, seconds - Number(start)),
    };
}

async function buildStills(project, outDir) {
    const stills =
        project.stills ?? (await discoverStills(path.resolve(root, project.dir)));
    const written = [];

    for (const still of stills) {
        const src = resolveSource(project.dir, still.file);
        if (!(await exists(src))) {
            console.warn(`  ! still source missing, skipped: ${src}`);
            continue;
        }
        const name = still.name ?? slugify(still.file);
        const out = path.join(outDir, `${name}.webp`);

        // `at` pulls the still out of a recording instead of an image file.
        const seek = still.at !== undefined ? ["-ss", String(still.at)] : [];
        await ffmpeg([
            ...seek, "-i", src, "-frames:v", "1",
            "-vf", `scale='min(${STILL_WIDTH},iw)':-2`, "-q:v", "80",
            out,
        ]);
        written.push(`/media/${project.slug}/${name}.webp`);
    }
    return written;
}

async function build(project) {
    console.log(`\n${project.slug}`);
    const outDir = path.join(root, "public", "media", project.slug);

    // Regenerate from scratch so a source you deleted stops shipping.
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });

    const clip = await buildClip(project, outDir);
    const stills = await buildStills(project, outDir);

    if (clip) {
        const mp4 = (await stat(path.join(outDir, "clip.mp4"))).size;
        console.log(
            `  clip.mp4 / clip.webm / poster.webp  (ratio ${clip.ratio}, ` +
                `${Math.round(clip.seconds)}s, ${(mp4 / 1e6).toFixed(1)} MB)`,
        );
    }
    for (const s of stills) console.log(`  ${s}`);
    return { clip, stills };
}

async function main() {
    const config = JSON.parse(
        await readFile(path.join(root, "scripts", "media.config.json"), "utf8"),
    );
    const only = process.argv.slice(2);
    const wanted = only.length
        ? config.projects.filter((p) => only.includes(p.slug))
        : config.projects;

    if (!wanted.length) {
        console.error(
            `No project matched ${only.join(", ")}. Known: ${config.projects
                .map((p) => p.slug)
                .join(", ")}`,
        );
        process.exit(1);
    }

    for (const project of wanted) await build(project);

    console.log(
        "\nDone. Reference the paths above from `media` and `shots` in src/lib/projects.ts.",
    );
}

main().catch((err) => {
    console.error(err.stderr || err.message);
    process.exit(1);
});

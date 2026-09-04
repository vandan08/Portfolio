"use client";

export default function Footer() {
    return (
        <footer className="border-t border-night-rule bg-night pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-night-soft">
            <div className="container-page flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                <p className="eyebrow text-night-soft">
                    © {new Date().getFullYear()} Vandan Sheth
                </p>
                <p className="text-sm italic">
                    Set in Fraunces &amp; Newsreader. Made by hand.
                </p>
            </div>
        </footer>
    );
}

"use client";

export default function Footer() {
    return (
        <footer className="bg-night text-night-soft border-t border-night-rule py-8">
            <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3">
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

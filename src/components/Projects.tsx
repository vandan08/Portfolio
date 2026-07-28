import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import ProjectReel from "./ProjectReel";

/**
 * Selected work, shown as a reel: one project on the plate at a time, playing
 * its own recording where there is one. The long read for each project lives in
 * the dossier behind the plate. The list itself is in @/lib/projects.
 */
export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-16 bg-paper-deep py-20 md:py-28">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        number="02"
                        label="Selected Projects"
                        title={
                            <>
                                Work worth{" "}
                                <em className="font-normal italic text-accent">
                                    reading about
                                </em>
                            </>
                        }
                    />
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <ProjectReel />
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                    <div className="mt-16 border-t border-rule pt-8">
                        <a
                            href="https://github.com/vandan08"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-ink text-lg italic"
                        >
                            The full archive lives on GitHub &#8599;
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

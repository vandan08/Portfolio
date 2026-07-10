import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Interlude from "@/components/Interlude";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Interlude />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

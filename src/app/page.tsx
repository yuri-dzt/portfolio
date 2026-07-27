import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LayersScene } from "@/components/LayersScene";
import { About } from "@/components/About";
import { Results } from "@/components/Results";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { TechStack } from "@/components/TechStack";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * A ordem conta uma história: gancho, o que eu faço, quem eu sou, prova,
 * trabalho, histórico, ferramentas, formação, contato. As antigas seções de
 * "diferenciais", "processo" e "depoimentos" saíram — eram enchimento.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LayersScene />
        <About />
        <Results />
        <Projects />
        <Experience />
        <TechStack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

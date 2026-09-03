import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechStrip from "@/components/TechStrip";
import ProjectStack from "@/components/ProjectStack";
import SkillsBento from "@/components/SkillsBento";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NetworkCanvas from "@/components/NetworkCanvas";

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-zinc-950 text-zinc-100 relative">
      <NetworkCanvas />
      <div className="film-grain" aria-hidden="true" />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <TechStrip />
        <ProjectStack />
        <SkillsBento />
        <About />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

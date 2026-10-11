import { MotionConfig } from "motion/react";
import { About } from "./components/About";
import { Brands } from "./components/Brands";
import { Contact } from "./components/Contact";
import { Coverage } from "./components/Coverage";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { GateReveal } from "./components/GateReveal";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Pillars } from "./components/Pillars";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { WhatsAppFab } from "./components/WhatsAppFab";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Services />
        <Stats />
        <GateReveal />
        <Projects />
        <Process />
        <Brands />
        <About />
        <Coverage />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  );
}

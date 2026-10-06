import { MotionConfig } from "motion/react";
import { Bag } from "./components/Bag";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Menu } from "./components/Menu";
import { Nav } from "./components/Nav";
import { Ritual } from "./components/Ritual";
import { Visit } from "./components/Visit";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Menu />
          <Bag />
          <Ritual />
          <Gallery />
          <Visit />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

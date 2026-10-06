import { MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { Bag } from "./components/Bag";
import { BagStory } from "./components/BagStory";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { MenuPreview } from "./components/MenuPreview";
import { Nav } from "./components/Nav";
import { Preloader, shouldShowIntro } from "./components/Preloader";
import { Reviews } from "./components/Reviews";
import { Ritual } from "./components/Ritual";
import { Visit } from "./components/Visit";

export default function App() {
  const reduce = useReducedMotion();
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const reveal = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        {intro && <Preloader onReveal={reveal} />}
        <Nav />
        <main>
          {/* El inicio se monta al levantar el telón para que su animación de entrada se vea. */}
          {ready ? <Hero /> : <div className="min-h-[100dvh]" />}
          <Marquee />
          <MenuPreview />
          {reduce ? <Bag /> : <BagStory />}
          <Ritual />
          <Gallery />
          <Reviews />
          <Visit />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

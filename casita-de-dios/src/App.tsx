import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Cajita } from "./components/Cajita";
import { Carta } from "./components/Carta";
import { Celebra } from "./components/Celebra";
import { Comunidad } from "./components/Comunidad";
import { Entrada } from "./components/Entrada";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Petals } from "./components/Petals";
import { Preloader, shouldShowIntro } from "./components/Preloader";
import { Taza } from "./components/Taza";
import { Visita } from "./components/Visita";

export default function App() {
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const done = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        {intro && <Preloader onDone={done} />}
        <Petals />
        <Nav />
        <main>
          {ready ? <Hero /> : <div className="min-h-[100svh]" />}
          <Entrada />
          <Taza />
          <Carta />
          <Cajita />
          <Celebra />
          <Comunidad />
          <Visita />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

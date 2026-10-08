import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Kits } from "./components/Kits";
import { Menu } from "./components/Menu";
import { Mural } from "./components/Mural";
import { Nav } from "./components/Nav";
import { PaintBear } from "./components/PaintBear";
import { PlanQuiz } from "./components/PlanQuiz";
import { Preloader, shouldShowIntro } from "./components/Preloader";
import { Ribbon } from "./components/Ribbon";
import { Visit } from "./components/Visit";

export default function App() {
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const done = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      {intro && <Preloader onDone={done} />}
      <Nav />
      <main>
        {ready ? <Hero /> : <div className="min-h-[100dvh]" />}
        <Ribbon />
        <PaintBear />
        <Kits />
        <Mural />
        <PlanQuiz />
        <Menu />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </MotionConfig>
  );
}

import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { BrushCursor } from "./components/BrushCursor";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { HeaderSwitch } from "./components/HeaderSwitch";
import { Hero } from "./components/Hero";
import { HeroCollage } from "./components/HeroCollage";
import { HeroCuadro } from "./components/HeroCuadro";
import { Kits } from "./components/Kits";
import { Menu } from "./components/Menu";
import { Mural } from "./components/Mural";
import { Nav } from "./components/Nav";
import { PaintBear } from "./components/PaintBear";
import { PlanQuiz } from "./components/PlanQuiz";
import { Preloader, shouldShowIntro } from "./components/Preloader";
import { Ribbon } from "./components/Ribbon";
import { Splash } from "./components/Splash";
import { Visit } from "./components/Visit";

// Propuestas de inicio para comparar: ?header=a (actual), b (cuadro) o c (collage).
const header = new URLSearchParams(window.location.search).get("header");
const HEROES = { a: Hero, b: HeroCuadro, c: HeroCollage } as const;
const ActiveHero = HEROES[(header ?? "a") as keyof typeof HEROES] ?? Hero;

export default function App() {
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const done = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      {intro && <Preloader onDone={done} />}
      <Splash />
      <BrushCursor />
      <Nav />
      <main>
        {ready ? <ActiveHero /> : <div className="min-h-[100dvh]" />}
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
      {header && <HeaderSwitch current={header} />}
    </MotionConfig>
  );
}

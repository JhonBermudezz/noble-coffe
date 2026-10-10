import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Castle } from "./components/Castle";
import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import { Gate, SoundToggle, shouldShowGate } from "./components/Gate";
import { Grimoire } from "./components/Grimoire";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Sins } from "./components/Sins";
import { Villanos } from "./components/Villanos";
import { Visit } from "./components/Visit";
import { setSound, useSound } from "./sound";

export default function App() {
  const [gate] = useState(shouldShowGate);
  const [ready, setReady] = useState(!gate);
  const enter = useCallback(() => setReady(true), []);
  const on = useSound();

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        {gate && <Gate onEnter={enter} />}
        <Nav />
        <main>
          {ready ? <Hero /> : <div className="h-[100svh]" />}
          <Villanos />
          <Sins />
          <Grimoire />
          <Castle />
          <Events />
          <Visit />
        </main>
        <Footer />
        <SoundToggle on={on} onToggle={() => setSound(!on)} />
      </div>
    </MotionConfig>
  );
}

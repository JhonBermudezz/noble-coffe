import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Armado } from "./components/Armado";
import { Beneficios } from "./components/Beneficios";
import { Goteo } from "./components/Bits";
import { Calidad } from "./components/Calidad";
import { Catalogo } from "./components/Catalogo";
import { ComoPedir } from "./components/ComoPedir";
import { Contacto } from "./components/Contacto";
import { Dipper } from "./components/Dipper";
import { Envios } from "./components/Envios";
import { Etiqueta } from "./components/Etiqueta";
import { Eventos } from "./components/Eventos";
import { Footer } from "./components/Footer";
import { Frase } from "./components/Frase";
import { Galeria } from "./components/Galeria";
import { Hero } from "./components/Hero";
import { Historia } from "./components/Historia";
import { Ideas } from "./components/Ideas";
import { Mujeres } from "./components/Mujeres";
import { Nav } from "./components/Nav";
import { Nosotros } from "./components/Nosotros";
import { Preguntas } from "./components/Preguntas";
import { Preloader, shouldShowIntro } from "./components/Preloader";

export default function App() {
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const done = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        {intro && <Preloader onDone={done} />}
        <Dipper />
        <Nav />
        <main>
          {ready ? <Hero /> : <div className="min-h-[100svh]" />}
          <Goteo />
          <Beneficios />
          <Armado />
          <Etiqueta />
          <Catalogo />
          <Eventos />
          <ComoPedir />
          <Frase />
          <Calidad />
          <Historia />
          <Nosotros />
          <Mujeres />
          <Galeria />
          <Ideas />
          <Envios />
          <Preguntas />
          <Contacto />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

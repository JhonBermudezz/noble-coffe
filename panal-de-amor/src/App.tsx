import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Armado } from "./components/Armado";
import { Beneficios } from "./components/Beneficios";
import { Goteo } from "./components/Bits";
import { Calidad } from "./components/Calidad";
import { Catalogo } from "./components/Catalogo";
import { Colmena } from "./components/Colmena";
import { ComoPedir } from "./components/ComoPedir";
import { CompromisoBanner, CompromisoPage } from "./components/Compromiso";
import { Contacto } from "./components/Contacto";
import { Destacados } from "./components/Destacados";
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
import { MusicToggle } from "./components/Musica";
import { Nav } from "./components/Nav";
import { Nosotros } from "./components/Nosotros";
import { PageHero } from "./components/PageHero";
import { Preguntas } from "./components/Preguntas";
import { Preloader, shouldShowIntro } from "./components/Preloader";
import { ScrollBee } from "./components/ScrollBee";
import type { PageId } from "./data";
import { RouterProvider } from "./router";

// Cada página del sitio corporativo.
function Page({ id, ready }: { id: PageId; ready: boolean }) {
  switch (id) {
    case "souvenirs":
      return (
        <>
          <Colmena as="hero" />
          <Catalogo />
          <Eventos />
          <Galeria />
        </>
      );
    case "personaliza":
      return (
        <>
          <PageHero current="Personaliza" kicker="Personaliza" title={<>Un frasquito con <span className="script text-[1.1em] text-fucsia">tu nombre</span></>} intro="Escribe los nombres, elige la frase y la cinta, de tela o de yute. Mira cómo queda y mándanos el diseño para cotizar." />
          <Etiqueta bare />
          <ComoPedir />
        </>
      );
    case "nosotros":
      return (
        <>
          <PageHero current="Nosotros" kicker="Nosotros" title={<>Hechos a mano, con fe y con <span className="script text-[1.1em] text-fucsia">amor</span></>} />
          <Nosotros />
          <Colmena kicker="Nuestra colmena" />
          <Historia />
          <Calidad />
          <Mujeres />
        </>
      );
    case "compromiso":
      return <CompromisoPage />;
    case "como-pedir":
      return (
        <>
          <PageHero current="Cómo pedir" kicker="Cómo pedir" title="Tu pedido, paso a paso" intro="Desde un solo frasquito hasta cientos para tu evento: así trabajamos contigo, de la idea a la entrega en tu ciudad." />
          <ComoPedir />
          <Envios />
          <Preguntas />
        </>
      );
    case "ideas":
      return (
        <>
          <PageHero current="Ideas" kicker="Ideas dulces" title="Inspiración para tu celebración" intro="Tradición, frases para la etiqueta y consejos para bodas, bautizos y quince años." />
          <Ideas bare />
        </>
      );
    case "contacto":
      return (
        <>
          <PageHero current="Contacto" kicker="Contacto" title="Cuéntanos de tu evento" intro="Llena el formulario y te llevamos a WhatsApp con tu solicitud lista." />
          <Contacto bare />
          <Preguntas />
        </>
      );
    default:
      return (
        <>
          {ready ? <Hero /> : <div className="min-h-[100svh]" />}
          <Goteo />
          <Beneficios />
          <Armado />
          <Destacados />
          <CompromisoBanner as="section" />
          <Colmena kicker="Nuestra colmena" />
          <Frase />
          <Eventos />
        </>
      );
  }
}

export default function App() {
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const done = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        {(page) => (
          <div className="grain">
            {intro && <Preloader onDone={done} />}
            <Dipper />
            <Nav />
            <main>
              <Page id={page} ready={ready} />
            </main>
            <Footer />
            {ready && <MusicToggle />}
            {ready && <ScrollBee />}
          </div>
        )}
      </RouterProvider>
    </MotionConfig>
  );
}

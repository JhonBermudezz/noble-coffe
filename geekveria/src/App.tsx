import { MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Brands } from "./components/Brands";
import { CartDrawer, CartProvider } from "./components/cart";
import { Club } from "./components/Club";
import { Combo } from "./components/Combo";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MenuGeek } from "./components/MenuGeek";
import { Nav } from "./components/Nav";
import { Preloader, shouldShowIntro } from "./components/Preloader";
import { Sfx } from "./components/Sfx";
import { Shop } from "./components/Shop";
import { Ticker } from "./components/Ticker";
import { Visit } from "./components/Visit";

export default function App() {
  const [intro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  const done = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {intro && <Preloader onDone={done} />}
        <Sfx />
        <Nav />
        <CartDrawer />
        {/* "stage" es lo que se sacude con cada golpe. */}
        <div id="stage">
          <main>
            {ready ? <Hero /> : <div className="min-h-[100dvh]" />}
            <Ticker />
            <Club />
            <MenuGeek />
            <Combo />
            <Shop />
            <Brands />
            <Community />
            <Visit />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </MotionConfig>
  );
}

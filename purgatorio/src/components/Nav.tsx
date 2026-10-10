import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { img } from "../data";

const LINKS = [
  { href: "#pecados", label: "Pecados" },
  { href: "#menu", label: "Carta" },
  { href: "#castillo", label: "El castillo" },
  { href: "#villanos", label: "Villanos" },
  { href: "#visita", label: "Visítanos" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 80));
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-night/85 backdrop-blur-md" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-[1300px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="El Purgatorio, inicio">
          <img src={img("logo")} alt="" className="h-10 w-10 rounded-full md:h-12 md:w-12" />
          <span className="title hidden text-xl tracking-wide text-bone sm:inline">El Purgatorio</span>
        </a>
        <ul className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] md:gap-2">
          {LINKS.map((l) => (
            <li key={l.href} className="shrink-0">
              <motion.a href={l.href} whileHover={{ color: "#ff2d6f" }} className={`title block px-2 py-2 text-sm tracking-[0.15em] text-bone/80 md:px-3 md:text-base ${l.href === "#villanos" ? "text-blood" : ""}`}>
                {l.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

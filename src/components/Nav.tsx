import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { MAPS_URL } from "../data/menu";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "#menu", label: "Menú" },
  { href: "#cafe", label: "Café en casa" },
  { href: "#visitanos", label: "Visítanos" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Solo cambia de estado al cruzar el umbral, no en cada frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-[72px] md:px-8">
        <a href="#top" aria-label="Noble Café, inicio" className="text-[2rem] md:text-[2.25rem]">
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-9 text-[15px] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative py-2">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#menu" className="rounded-full px-3 py-2 text-[15px] md:hidden">
            Menú
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <MapPin size={16} weight="bold" />
            Cómo llegar
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

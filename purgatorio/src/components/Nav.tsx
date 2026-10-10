import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { img } from "../data";

const LINKS = [
  { href: "#villanos", label: "Villanos" },
  { href: "#pecados", label: "Pecados" },
  { href: "#menu", label: "La carta" },
  { href: "#castillo", label: "El castillo" },
  { href: "#visita", label: "Visítanos" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 80));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-night/90 backdrop-blur-md" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-[1300px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="El Purgatorio, inicio">
          <img src={img("logo")} alt="" className="h-10 w-10 rounded-full md:h-12 md:w-12" />
          <span className="title text-2xl text-bone">El Purgatorio</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`block px-3 py-2 font-[family-name:var(--font-fell)] text-lg transition-colors hover:text-neon ${l.href === "#villanos" ? "text-blood" : "text-bone/85"}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid h-11 w-11 place-items-center border border-blood/60 md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-6 bg-bone transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-6 bg-bone transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-blood/30 px-5 md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-bone/10 last:border-0">
                <a href={l.href} onClick={() => setOpen(false)} className={`title block py-4 text-3xl ${l.href === "#villanos" ? "text-blood" : "text-bone"}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

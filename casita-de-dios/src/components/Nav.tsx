import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { img, wa } from "../data";

const LINKS = [
  { href: "#carta", label: "La carta" },
  { href: "#taza", label: "Un café con Dios" },
  { href: "#cajita", label: "Tu cajita" },
  { href: "#celebra", label: "Celebraciones" },
  { href: "#visita", label: "Visítanos" },
];

// Header: el toldo de rayas rosa y menta de la fachada, con su borde festoneado.
// Se esconde al bajar y vuelve al subir.
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const next = y > prev && y > 240;
    if (next !== hidden) setHidden(next);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden && !open ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <div className="bg-crema/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">
          <a href="#inicio" className="group shrink-0" aria-label="La Casita de Dios, inicio">
            <img src={img("logo-casita")} alt="" className="h-12 w-auto transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 md:h-14" />
          </a>
          <ul className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
            {LINKS.map((l) => (
              <li key={l.href} className="relative">
                <a href={l.href} onMouseEnter={() => setHover(l.href)} className="relative z-10 block px-4 py-2 font-bold">
                  {l.label}
                </a>
                {hover === l.href && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-chicle/60" transition={{ type: "spring", stiffness: 420, damping: 34 }}>
                    <svg viewBox="0 0 24 22" className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2" aria-hidden>
                      <path d="M12 21S1 14 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z" fill="#d98aa6" stroke="#fff" strokeWidth="2" />
                    </svg>
                  </motion.span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={wa("¡Hola, Casita de Dios! Quiero hacer un pedido.")}
              target="_blank"
              rel="noreferrer"
              className="display hidden rounded-full bg-cacao px-5 py-3 text-lg text-crema shadow-[0_4px_0_#3a1812] transition-transform hover:-translate-y-0.5 sm:block"
            >
              Pedir por WhatsApp
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="grid h-12 w-12 place-items-center rounded-full bg-menta lg:hidden"
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 h-[3px] w-6 rounded-full bg-cacao transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[3px] w-6 rounded-full bg-cacao transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden px-4 lg:hidden"
            >
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="border-b border-cacao/10 last:border-0">
                  <a href={l.href} onClick={() => setOpen(false)} className="display block py-4 text-3xl">
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="py-4 sm:hidden">
                <a href={wa("¡Hola, Casita de Dios! Quiero hacer un pedido.")} target="_blank" rel="noreferrer" className="display block rounded-full bg-cacao px-5 py-4 text-center text-xl text-crema">
                  Pedir por WhatsApp
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {/* El toldo */}
      <div aria-hidden className="drop-shadow-[0_6px_6px_rgb(98_42_28/0.18)]">
        <div className="toldo feston h-7 md:h-8" />
      </div>
    </motion.header>
  );
}

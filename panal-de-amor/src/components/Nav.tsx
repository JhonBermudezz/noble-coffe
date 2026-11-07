import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { img, wa } from "../data";

const LINKS = [
  { href: "#etiqueta", label: "Diseña tu etiqueta" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#como-pedir", label: "Cómo pedir" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#ideas", label: "Ideas" },
  { href: "#contacto", label: "Contacto" },
];

// Header: se esconde al bajar y vuelve al subir. El enlace activo se marca con una gota de miel.
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const next = y > prev && y > 260;
    if (next !== hidden) setHidden(next);
    if (y > 30 !== solid) setSolid(y > 30);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden && !open ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <div className={`transition-colors duration-500 ${solid || open ? "bg-crema/90 shadow-[0_10px_30px_-20px_rgb(74_42_20/0.5)] backdrop-blur-md" : ""}`}>
        <nav className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-4 md:px-8">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Panal de Amor, inicio">
            <img src={img("logo")} alt="" className="h-12 w-12 rounded-full shadow-[0_0_0_3px_#fff,0_0_0_5px_var(--color-miel)] transition-transform duration-500 group-hover:rotate-[-12deg]" />
            <span className="display hidden text-2xl sm:block">
              Panal <span className="script text-[1.15em] text-fucsia">de Amor</span>
            </span>
          </a>
          <ul className="hidden items-center xl:flex" onMouseLeave={() => setHover(null)}>
            {LINKS.map((l) => (
              <li key={l.href} className="relative">
                <a href={l.href} onMouseEnter={() => setHover(l.href)} className="relative z-10 block px-3.5 py-2 font-semibold">
                  {l.label}
                </a>
                {hover === l.href && (
                  <motion.span layoutId="nav-honey" className="absolute inset-x-2 bottom-0 h-full rounded-full bg-polen" transition={{ type: "spring", stiffness: 420, damping: 34 }}>
                    <span className="absolute -bottom-2 left-1/2 h-3 w-2.5 -translate-x-1/2 rounded-b-full bg-miel" />
                  </motion.span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={wa()} target="_blank" rel="noreferrer" className="btn-fucsia hidden rounded-full px-5 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 sm:block">
              Cotizar por WhatsApp
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="btn-miel hex-flat grid h-12 w-14 place-items-center xl:hidden"
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 h-[3px] w-6 rounded-full bg-cafe transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[3px] w-6 rounded-full bg-cafe transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden px-4 xl:hidden">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-cafe/10 last:border-0">
                  <a href={l.href} onClick={() => setOpen(false)} className="display block py-4 text-3xl">
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="py-4 sm:hidden">
                <a href={wa()} target="_blank" rel="noreferrer" className="btn-fucsia block rounded-full px-5 py-4 text-center text-lg font-bold text-white">
                  Cotizar por WhatsApp
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

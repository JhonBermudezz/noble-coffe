import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { img, pages, wa } from "../data";
import { Link, useRouter } from "../router";
import { Heart } from "./Hearts";

// Header: se esconde al bajar y vuelve al subir. La página activa queda marcada con una píldora de miel.
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { page } = useRouter();

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
          <Link to="inicio" className="group flex items-center gap-3" aria-label="Panal de Amor, inicio">
            <span className="relative">
              <img src={img("logo")} alt="" className="h-12 w-12 rounded-full shadow-[0_0_0_3px_#fff,0_0_0_5px_var(--color-miel)] transition-transform duration-500 group-hover:rotate-[-12deg]" />
              <motion.span className="absolute -right-2 -top-1" animate={{ y: [0, -4, 0], rotate: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity }}>
                <Heart className="h-4 w-4" color="#d63c7c" />
              </motion.span>
              <motion.span className="absolute -bottom-1 -left-2" animate={{ y: [0, -3, 0], rotate: [8, -8, 8] }} transition={{ duration: 3.6, repeat: Infinity }}>
                <Heart className="h-3 w-3" color="#f7c64a" />
              </motion.span>
            </span>
            <span className="display hidden text-2xl sm:block">
              Panal <span className="script text-[1.15em] text-fucsia">de Amor</span>
            </span>
          </Link>
          <ul className="hidden items-center xl:flex">
            {pages.filter((l) => l.id !== "inicio").map((l) => (
              <li key={l.id} className="relative">
                <Link to={l.id} aria-current={page === l.id ? "page" : undefined} className={`relative z-10 block px-3 py-2 font-semibold transition-colors ${page === l.id ? "" : "text-cafe/75 hover:text-cafe"}`}>
                  {l.label}
                </Link>
                {page === l.id && (
                  <motion.span layoutId="nav-honey" className="absolute inset-x-1 bottom-0 h-full rounded-full bg-polen" transition={{ type: "spring", stiffness: 420, damping: 34 }}>
                    <Heart className="absolute -top-2.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2" color="#d63c7c" />
                  </motion.span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={wa()} target="_blank" rel="noreferrer" className="btn-fucsia group hidden items-center gap-2 rounded-full px-5 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 sm:flex">
              <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" color="#fbe7b8" />
              Cotizar<span className="hidden 2xl:inline"> por WhatsApp</span>
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
              {pages.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-cafe/10 last:border-0">
                  <Link to={l.id} onClick={() => setOpen(false)} className={`display flex items-center gap-3 py-4 text-3xl ${page === l.id ? "text-fucsia" : ""}`}>
                    {page === l.id && <Heart className="h-5 w-5" color="#d63c7c" />}
                    {l.label}
                  </Link>
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

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { img } from "../data";
import { CartButton } from "./cart";

const links = [
  { href: "#club", label: "El club" },
  { href: "#menu", label: "Menú geek" },
  { href: "#tienda", label: "Tienda" },
  { href: "#club-geek", label: "Únete" },
  { href: "#visita", label: "Visítanos" },
];

export function Nav() {
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-brown">
        <div className="h-1.5 bg-yellow" />
        <nav className="mx-auto flex h-16 max-w-[1300px] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <a href="#top" aria-label="Geekveria, inicio" className="shrink-0">
            <motion.img
              src={img("logo")}
              alt=""
              whileHover={{ scale: 1.06, rotate: -2 }}
              className="h-11 w-auto md:h-14"
            />
          </a>

          <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHover(null)}>
            {links.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onMouseEnter={() => setHover(l.href)}
                  className={`relative block px-4 py-2 font-display text-xl uppercase tracking-wide transition-colors ${hover === l.href ? "text-ink" : "text-cream"}`}
                >
                  {hover === l.href && (
                    <motion.span
                      layoutId="nav-hit"
                      className="absolute inset-0 -skew-x-12 border-[3px] border-ink bg-yellow shadow-[4px_4px_0_#2a1610]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <CartButton />
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="panel-sm grid h-12 w-12 place-items-center rounded-full bg-paper lg:hidden"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden>
                <path d="M1 2h20M1 8h20M1 14h20" stroke="#2a1610" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] overflow-hidden lg:hidden"
            initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 0)" }}
            animate={{ clipPath: "polygon(-100% 0, 100% 0, 100% 200%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <div className="rays spin-slow absolute -inset-[50%]" />
            <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="panel-sm absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-yellow font-sfx text-2xl">
              ✕
            </button>
            <ul className="relative flex h-full flex-col items-start justify-center gap-4 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -80, rotate: -8, opacity: 0 }}
                  animate={{ x: 0, rotate: i % 2 ? 2 : -2, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 + i * 0.06 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="panel inline-block bg-paper px-5 py-2 font-display text-5xl uppercase">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

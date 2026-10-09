import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { INSTAGRAM_DM, img } from "../data";
import { CUADRO, CUADRO_BG } from "./cuadro-data";

const links = [
  { href: "#pinta", label: "Pinta", color: "#f28bb0" },
  { href: "#kits", label: "Kits", color: "#f2c230" },
  { href: "#plan", label: "Tu plan", color: "#3fb8a6" },
  { href: "#menu", label: "Menú", color: "#c9b8ef" },
];

// Brochazo irregular que aparece detrás del enlace al pasar el mouse.
const STROKE = "M5 20C9 8 36 3 66 6s50-2 52 10c2 13-26 18-56 16S2 34 5 20z";

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // El logo se balancea como una calcomanía mientras se baja (sin quedar de cabeza).
  const spin = useTransform(scrollY, (v) => Math.sin(v / 260) * 14);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > window.innerHeight * 0.8);
    // Se esconde al bajar y vuelve al subir, para no tapar el contenido.
    setHidden(y > window.innerHeight && y > prev + 4 ? true : y < prev - 4 ? false : hidden);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const ink = solid ? "text-forest" : "text-cream";

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {/* Fondo crema con borde festoneado, solo cuando ya se pasó el cuadro del inicio. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 drop-shadow-[0_6px_8px_rgb(31_74_50/0.12)]"
          initial={false}
          animate={{ opacity: solid ? 1 : 0, y: solid ? 0 : -20 }}
          transition={{ duration: 0.35 }}
        >
          <div className="h-full bg-cream" />
          <div
            className="h-3 w-full"
            style={{
              background: "radial-gradient(circle at 14px 0, var(--cream) 13px, transparent 14px) repeat-x",
              backgroundSize: "28px 14px",
            }}
          />
        </motion.div>

        <nav className="relative mx-auto flex h-20 max-w-[1300px] items-center justify-between gap-4 px-5 md:h-24 md:px-8">
          <a href="#top" aria-label="Creaviva Café, inicio" className="relative z-10 flex items-center gap-3">
            <motion.img
              src={img("logo")}
              alt=""
              style={{ rotate: spin }}
              whileHover={{ scale: 1.12, rotate: -12 }}
              className="mt-6 h-[72px] w-[72px] rounded-full shadow-[0_10px_24px_-10px_rgb(0_0_0/0.45)] md:mt-8 md:h-24 md:w-24"
            />
          </a>

          <ul
            className={`hidden items-center gap-1 rounded-full p-1.5 transition-colors duration-300 md:flex ${solid ? "bg-transparent" : "bg-forest/85 backdrop-blur-sm"}`}
            onMouseLeave={() => setHover(null)}
          >
            {links.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onMouseEnter={() => setHover(l.href)}
                  className={`relative block px-5 py-2 font-display text-[22px] italic transition-colors ${hover === l.href ? "text-forest" : ink}`}
                >
                  {hover === l.href && (
                    <motion.svg
                      layoutId="nav-stroke"
                      viewBox="0 0 122 36"
                      preserveAspectRatio="none"
                      className="absolute inset-0 -z-0 h-full w-full"
                      initial={{ rotate: -4 }}
                      animate={{ rotate: -2 }}
                      transition={{ type: "spring", stiffness: 380, damping: 26 }}
                      aria-hidden
                    >
                      <motion.path d={STROKE} animate={{ fill: l.color }} transition={{ duration: 0.2 }} />
                    </motion.svg>
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noreferrer"
              whileHover={{ rotate: -4, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="rounded-full bg-mustard px-5 py-3 text-[15px] font-bold text-forest shadow-[0_6px_0_#1f4a32] transition-shadow active:shadow-[0_2px_0_#1f4a32] md:px-6"
            >
              Reserva
            </motion.a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className={`grid h-12 w-12 place-items-center rounded-full md:hidden bg-forest text-cream`}
            >
              <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden>
                <path d="M1 2c6-1 13 1 20 0M1 8c7 1 13-1 20 0M1 14c6-1 13 1 20 0" stroke="currentColor" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menú de celular: pantalla completa con el cuadro de fondo. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-hidden md:hidden"
            style={{ background: CUADRO_BG }}
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <svg viewBox="0 0 700 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
              {CUADRO.map((l) => (
                <path key={l.id} d={l.d} fill={l.color} fillRule="evenodd" />
              ))}
            </svg>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-cream text-forest"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </button>
            <ul className="relative flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -40, rotate: -6 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.25 + i * 0.07 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="font-display text-6xl italic text-cream drop-shadow-[0_3px_0_rgb(91_42_115/0.35)]">
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
                <a href={INSTAGRAM_DM} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-forest px-8 py-4 text-lg font-bold text-cream">
                  Reservar por Instagram
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

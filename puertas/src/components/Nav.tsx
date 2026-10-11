import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { PHONE, PHONE_RAW, WA, asset } from "../data";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));
  const dark = !solid && !open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${dark ? "" : "bg-white/90 shadow-[0_8px_30px_-18px_rgb(10_27_46/0.35)] backdrop-blur-xl"}`}>
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Puertas Automáticas del Llano, inicio">
          <img src={asset("img/logo-cubo.png")} alt="" className="h-10 w-auto" />
          <span className={`text-[15px] font-extrabold leading-tight tracking-tight transition-colors ${dark ? "text-white" : "text-ink"}`}>
            Puertas Automáticas
            <span className="block text-[12px] font-semibold text-teal">del Llano</span>
          </span>
        </a>
        <ul className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
          {LINKS.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                onMouseEnter={() => setHover(l.href)}
                className={`relative block px-4 py-2 text-[15px] font-semibold transition-colors ${dark ? "text-white/85 hover:text-white" : "text-ink/75 hover:text-ink"}`}
              >
                {hover === l.href && (
                  <motion.span layoutId="nav-pill" className={`absolute inset-0 rounded-full ${dark ? "bg-white/12" : "bg-mist"}`} transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={`tel:+${PHONE_RAW}`} className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold md:flex ${dark ? "text-white" : "text-ink"}`}>
            <Phone size={16} /> {PHONE}
          </a>
          <a href={WA()} target="_blank" rel="noreferrer" className="brand-gradient hidden rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal/25 transition-transform hover:-translate-y-0.5 sm:block">
            Cotizar
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${dark ? "bg-white/15 text-white" : "bg-mist text-ink"}`}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden px-5 lg:hidden">
            {LINKS.map((l, i) => (
              <motion.li key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="border-t border-line">
                <a href={l.href} onClick={() => setOpen(false)} className="block py-4 text-lg font-bold">
                  {l.label}
                </a>
              </motion.li>
            ))}
            <li className="border-t border-line py-4">
              <a href={WA()} target="_blank" rel="noreferrer" className="brand-gradient block rounded-full py-3.5 text-center font-bold text-white">
                Cotizar por WhatsApp
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

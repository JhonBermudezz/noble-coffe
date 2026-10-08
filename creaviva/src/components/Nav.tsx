import { motion } from "motion/react";
import { INSTAGRAM_DM, img } from "../data";

const links = [
  { href: "#pinta", label: "Pinta" },
  { href: "#kits", label: "Kits" },
  { href: "#plan", label: "Tu plan" },
  { href: "#menu", label: "Menú" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav className="mx-auto flex max-w-[1300px] items-center justify-between gap-3 rounded-full bg-cream/85 py-2 pl-2 pr-2 shadow-[0_6px_30px_-12px_rgb(31_74_50/0.35)] ring-2 ring-forest backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2" aria-label="Creaviva Café, inicio">
          <img src={img("logo")} alt="" className="h-11 w-11 rounded-full ring-2 ring-forest" />
          <span className="font-display text-xl text-forest">Creaviva</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <li key={l.href}>
              <motion.a
                href={l.href}
                whileHover={{ rotate: i % 2 ? 3 : -3, scale: 1.06 }}
                className="block rounded-full px-4 py-2 text-[15px] font-semibold text-forest transition-colors hover:bg-mustard"
              >
                {l.label}
              </motion.a>
            </li>
          ))}
        </ul>
        <a
          href={INSTAGRAM_DM}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-tangerine px-5 py-2.5 text-[15px] font-bold text-cream transition-transform hover:-rotate-2 hover:scale-105 active:scale-95"
        >
          Reserva
        </a>
      </nav>
    </header>
  );
}

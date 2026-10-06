import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { MAPS_URL } from "../data/menu";
import { ROOT } from "../lib/paths";
import { OpenBadge } from "./OpenBadge";
import { Logo } from "./Logo";

type Page = "home" | "menu";

// En el inicio las secciones se enlazan con #ancla; desde otras páginas vuelven al inicio.
const section = (page: Page, id: string) => (page === "home" ? `#${id}` : `${ROOT}#${id}`);

export function Nav({ page = "home" }: { page?: Page }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Solo cambia de estado al cruzar el umbral, no en cada frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  const links = [
    { href: `${ROOT}menu/`, label: "Menú", current: page === "menu" },
    { href: section(page, "cafe"), label: "Café en casa", current: false },
    { href: section(page, "visitanos"), label: "Visítanos", current: false },
  ];

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
        <a href={page === "home" ? "#top" : ROOT} aria-label="Noble Café, inicio" className="block w-[3.1rem] md:w-[3.6rem]">
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 text-[15px] md:flex" onPointerLeave={() => setHovered(null)}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                onPointerEnter={() => setHovered(l.label)}
                onFocus={() => setHovered(l.label)}
                onBlur={() => setHovered(null)}
                className="relative block rounded-full px-4 py-2"
              >
                {/* Elemento compartido: una sola píldora que se desliza entre los enlaces. */}
                {hovered === l.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink/[0.08]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{l.label}</span>
                {l.current && <span className="absolute inset-x-4 bottom-1 h-px bg-ink" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <span className="mr-3 hidden xl:block">
            <OpenBadge />
          </span>
          <a href={`${ROOT}menu/`} className="rounded-full px-3 py-2 text-[15px] md:hidden">
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

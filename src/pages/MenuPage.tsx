import { MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cold, hot, type MenuGroup } from "../data/menu";
import { HOURS } from "../data/hours";
import { CursorImage } from "../components/CursorImage";
import { FoodGrid } from "../components/FoodGrid";
import { Footer } from "../components/Footer";
import { MenuRow } from "../components/MenuRow";
import { Nav } from "../components/Nav";
import { OpenBadge } from "../components/OpenBadge";
import { Photo } from "../components/Photo";

const ease = [0.16, 1, 0.3, 1] as const;

const categories = [
  { id: "calientes", label: "Calientes", photo: "chemex-gorra", groups: hot },
  { id: "frios", label: "Fríos", photo: "iced-mano", groups: cold },
  { id: "para-comer", label: "Para comer", photo: "sandwich", groups: null },
] as const;

function Groups({ groups, onHover }: { groups: MenuGroup[]; onHover: (p: string | null) => void }) {
  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="font-mono text-sm text-muted">{group.title}</h3>
          <ul className="mt-4 border-t border-line">
            {group.items.map((item) => (
              <MenuRow key={item.name} item={item} fallbackPhoto={group.photo} onHover={onHover} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function MenuPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string>(categories[0].id);

  // Marca en la barra la categoría que está a mitad de pantalla.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <Nav page="menu" />
        <CursorImage photo={hovered} />

        <main id="top">
          <header className="mx-auto grid max-w-[1400px] items-end gap-10 px-4 pb-14 pt-28 md:px-8 md:pt-36 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease }}
                className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.88]"
              >
                La carta.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease }}
                className="mt-6 max-w-[46ch] text-lg text-muted"
              >
                Precios en miles de pesos, como en el tablero del local. {HOURS.label}, {HOURS.range}
              </motion.p>
              <OpenBadge className="mt-4" />
            </div>
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 999px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 999px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease }}
              className="hidden aspect-[3/4] w-full max-w-[280px] justify-self-end overflow-hidden lg:col-span-4 lg:block"
            >
              <Photo name="buen-dia" alt="Manos con taza, pan y vaso NOBLE" sizes="280px" priority />
            </motion.div>
          </header>

          <nav
            aria-label="Categorías del menú"
            className="sticky top-16 z-30 border-y border-line bg-paper/90 backdrop-blur-md md:top-[72px]"
          >
            <ul className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-3 md:px-8">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    aria-current={active === c.id ? "true" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      active === c.id ? "text-paper" : "hover:text-muted"
                    }`}
                  >
                    {active === c.id && (
                      <motion.span
                        layoutId="menu-cat"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {categories.map((c) => (
            <section
              key={c.id}
              id={c.id}
              aria-labelledby={`${c.id}-title`}
              className="mx-auto grid max-w-[1400px] scroll-mt-36 gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-44">
                  <h2 id={`${c.id}-title`} className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95]">
                    {c.label}
                  </h2>
                  <div className="mt-8 hidden aspect-square w-[70%] overflow-hidden rounded-full lg:block">
                    <Photo name={c.photo} alt="" sizes="25vw" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8">
                {c.groups ? <Groups groups={[...c.groups]} onHover={setHovered} /> : <FoodGrid />}
              </div>
            </section>
          ))}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

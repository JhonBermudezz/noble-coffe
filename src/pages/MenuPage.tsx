import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cold, hot, type MenuGroup } from "../data/menu";
import { HOURS } from "../data/hours";
import { CursorImage } from "../components/CursorImage";
import { Footer } from "../components/Footer";
import { FoodGrid } from "../components/menu/FoodGrid";
import { MagnifyList, MagnifyRow } from "../components/menu/MagnifyList";
import { MenuSelectionProvider } from "../components/menu/selection";
import { Nav } from "../components/Nav";
import { OpenBadge } from "../components/OpenBadge";
import { Photo } from "../components/Photo";

const ease = [0.16, 1, 0.3, 1] as const;

const categories = [
  { id: "calientes", label: "Calientes", photo: "chemex-gorra", alt: "Chemex con café sostenida sobre una gorra", groups: hot },
  { id: "frios", label: "Fríos", photo: "iced-mano", alt: "Mano con un iced latte en vaso NOBLE", groups: cold },
  { id: "para-comer", label: "Para comer", photo: "sandwich", alt: "Sándwich con chips de papa sobre papel NOBLE", groups: null },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-");

function Groups({ groups, onHover }: { groups: readonly MenuGroup[]; onHover: (p: string | null) => void }) {
  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="font-mono text-sm text-muted">{group.title}</h3>
          <MagnifyList className="mt-4 border-t border-line">
            {group.items.map((item) => (
              <MagnifyRow
                key={item.name}
                item={{ id: slug(`${group.title}-${item.name}`), ...item, photo: item.photo ?? group.photo }}
                onHover={onHover}
              />
            ))}
          </MagnifyList>
        </div>
      ))}
    </div>
  );
}

export default function MenuPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  // Marca la categoría que está a mitad de pantalla: cambia la píldora, el título y la foto.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as CategoryId)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    // Enlaces directos como /menu/#frios
    const hash = window.location.hash.slice(1);
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <Nav page="menu" />
        <CursorImage photo={hovered} />

        <MenuSelectionProvider>
          <main id="top">
            <header className="mx-auto grid max-w-[1400px] items-end gap-10 px-4 pb-12 pt-28 md:px-8 md:pt-36 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease }}
                  className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.88]"
                >
                  La carta.
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.15, ease }}
                  className="mt-6 space-y-1.5 text-muted"
                >
                  <p>
                    {HOURS.label}, {HOURS.range}
                  </p>
                  <OpenBadge />
                </motion.div>
              </div>
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0% round 999px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 999px)" }}
                transition={{ duration: 1.2, delay: 0.2, ease }}
                className="hidden aspect-[3/4] w-full max-w-[260px] justify-self-end overflow-hidden lg:col-span-4 lg:block"
              >
                <Photo name="buen-dia" alt="Manos con taza, pan y vaso NOBLE" sizes="260px" priority />
              </motion.div>
            </header>

            <nav
              aria-label="Categorías del menú"
              className="sticky top-16 z-30 border-y border-line bg-paper/90 backdrop-blur-md md:top-[72px]"
            >
              <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-3 md:px-8">
                {categories.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    aria-current={active === c.id ? "true" : undefined}
                    className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      active === c.id ? "text-paper" : "hover:text-muted"
                    }`}
                  >
                    {/* Elemento compartido: la píldora viaja de una categoría a otra mientras se baja. */}
                    {active === c.id && (
                      <motion.span
                        layoutId="menu-tab-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                  </a>
                ))}
              </div>
            </nav>

            <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:px-8 lg:grid-cols-12">
              {/* Columna fija: el título y la foto se funden de una categoría a la siguiente. */}
              <div className="hidden lg:col-span-4 lg:block">
                <div className="sticky top-40 pt-20">
                  <div className="relative h-[clamp(3.5rem,5vw,4.75rem)] overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.p
                        key={current.id}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -28 }}
                        transition={{ duration: 0.6, ease }}
                        className="absolute inset-x-0 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.05]"
                      >
                        {current.label}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="relative mt-6 aspect-[3/4] w-[78%] overflow-hidden rounded-full">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={current.photo}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="absolute inset-0"
                      >
                        <Photo name={current.photo} alt={current.alt} sizes="25vw" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Toda la carta en un solo recorrido. */}
              <div className="lg:col-span-8">
                {categories.map((c) => (
                  <section
                    key={c.id}
                    id={c.id}
                    aria-labelledby={`${c.id}-title`}
                    className="scroll-mt-36 py-16 first:pt-20 md:py-24 md:first:pt-20"
                  >
                    <h2 id={`${c.id}-title`} className="mb-8 font-display text-[clamp(2.5rem,9vw,3.5rem)] leading-none lg:sr-only">
                      {c.label}
                    </h2>
                    {c.groups ? <Groups groups={c.groups} onHover={setHovered} /> : <FoodGrid />}
                  </section>
                ))}
              </div>
            </div>
          </main>
        </MenuSelectionProvider>
        <Footer />
      </div>
    </MotionConfig>
  );
}

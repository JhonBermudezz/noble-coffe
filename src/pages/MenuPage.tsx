import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";
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

// Cada contenido se desvanece con un leve desenfoque mientras entra el siguiente (crossfade).
const fade = {
  initial: { opacity: 0, filter: "blur(8px)", y: 12 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(8px)", y: -12 },
  transition: { duration: 0.55, ease },
};

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

function initialCategory(): CategoryId {
  const hash = window.location.hash.slice(1);
  return categories.find((c) => c.id === hash)?.id ?? "calientes";
}

export default function MenuPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<CategoryId>(initialCategory);
  const current = categories.find((c) => c.id === active)!;

  const choose = (id: CategoryId) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };

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
              <div role="tablist" className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-3 md:px-8">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    role="tab"
                    id={`tab-${c.id}`}
                    aria-selected={active === c.id}
                    aria-controls="menu-panel"
                    onClick={() => choose(c.id)}
                    className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      active === c.id ? "text-paper" : "hover:text-muted"
                    }`}
                  >
                    {/* Elemento compartido: la píldora viaja de una pestaña a otra. */}
                    {active === c.id && (
                      <motion.span
                        layoutId="menu-tab-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-12">
              <div className="hidden lg:col-span-4 lg:block">
                <div className="sticky top-44">
                  <div className="relative aspect-[3/4] w-[78%] overflow-hidden rounded-full">
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

              <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="relative min-h-[60dvh] lg:col-span-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div key={active} {...fade}>
                    {current.groups ? <Groups groups={current.groups} onHover={setHovered} /> : <FoodGrid />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </MenuSelectionProvider>
        <Footer />
      </div>
    </MotionConfig>
  );
}

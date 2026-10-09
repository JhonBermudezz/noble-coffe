import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import { cop, img, products, type Product } from "../data";
import { useCart } from "./cart";

const KINDS = ["Todo", "Camisetas", "Pines", "Manga"] as const;
type Fly = { id: number; photo: string; from: DOMRect; to: DOMRect };

function Card({ p, i, onAdd }: { p: Product; i: number; onAdd: (p: Product, el: HTMLImageElement) => void }) {
  const imgEl = useRef<HTMLImageElement>(null);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.6, rotate: i % 2 ? 6 : -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }}
      className="panel-sm group flex flex-col overflow-hidden bg-white"
    >
      <div className="relative aspect-square overflow-hidden border-b-[3px] border-ink">
        <img ref={imgEl} src={img(p.photo)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <span className="absolute left-2 top-2 border-2 border-ink bg-yellow px-2 py-0.5 text-[11px] font-semibold uppercase">{p.kind}</span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-xl uppercase leading-tight">{p.name}</h3>
        <p className="mt-1 text-sm text-ink/60">{p.price === null ? "Precio por confirmar" : cop(p.price)}</p>
        <button
          onClick={() => imgEl.current && onAdd(p, imgEl.current)}
          className="mt-3 border-[3px] border-ink bg-red py-2 font-display text-lg uppercase tracking-wide text-white shadow-[3px_3px_0_#2a1610] transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          Agregar
        </button>
      </div>
    </motion.article>
  );
}

// Tienda: filtros, tarjetas tipo cómic y la foto que vuela al carrito al agregar.
export function Shop() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Todo");
  const [flies, setFlies] = useState<Fly[]>([]);
  const { add } = useCart();
  const list = products.filter((p) => kind === "Todo" || p.kind === kind);

  const onAdd = (p: Product, el: HTMLImageElement) => {
    const cart = document.querySelector("[data-cart]");
    if (cart && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const fly = { id: Date.now(), photo: p.photo, from: el.getBoundingClientRect(), to: cart.getBoundingClientRect() };
      setFlies((f) => [...f, fly]);
      window.setTimeout(() => {
        setFlies((f) => f.filter((x) => x.id !== fly.id));
        add({ id: p.id, name: p.name, price: p.price, photo: p.photo });
      }, 650);
    } else add({ id: p.id, name: p.name, price: p.price, photo: p.photo });
  };

  return (
    <section id="tienda" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1300px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.9]">
            La <span className="ink-text-sm text-blue">tienda</span>
          </h2>
          <LayoutGroup>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar productos">
              {KINDS.map((k) => (
                <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className="relative px-4 py-2 font-display text-lg uppercase">
                  {kind === k && <motion.span layoutId="shop-tab" className="absolute inset-0 -skew-x-12 border-[3px] border-ink bg-yellow shadow-[3px_3px_0_#2a1610]" />}
                  <span className="relative">{k}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.id} p={p} i={i} onAdd={onAdd} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fotos volando al carrito */}
      <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
        {flies.map((f) => (
          <motion.img
            key={f.id}
            src={img(f.photo)}
            className="absolute rounded-full border-[3px] border-ink object-cover"
            initial={{ left: f.from.left, top: f.from.top, width: f.from.width, height: f.from.height, rotate: 0, borderRadius: 0 }}
            animate={{
              left: f.to.left + f.to.width / 2 - 18,
              top: f.to.top + f.to.height / 2 - 18,
              width: 36,
              height: 36,
              rotate: 540,
              borderRadius: 999,
            }}
            transition={{ duration: 0.65, ease: [0.5, 0, 0.2, 1] }}
          />
        ))}
      </div>
    </section>
  );
}

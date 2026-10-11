import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { carta, cop, menu, type Category, type Item } from "../data";
import { BreakfastBadge } from "./Breakfast";
import { Heart } from "./House";

type Mode = "Porción" | "Entera";

function prices(item: Item, mode: Mode, isCake: boolean) {
  if (!isCake) return item.prices;
  const pick = item.prices.filter((x) => x.label === mode);
  return (pick.length ? pick : item.prices).map((x) => ({ ...x, label: x.label === "Entera" ? "12 porciones" : x.label }));
}

function Card({ item, mode, isCake }: { item: Item; mode: Mode; isCake: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-[22px] bg-white p-2 shadow md:rounded-[30px] md:p-3-[0_18px_40px_-26px_rgb(98_42_28/0.55)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] rounded-t-[120px] bg-malva md:rounded-[24px] md:rounded-t-[160px]">
        <img src={carta(item.photo!)} alt={item.name} loading="lazy" className="h-full w-full object-cover object-[50%_85%] transition-transform duration-700 group-hover:scale-[1.06]" />
        {item.tag && <span className="script absolute left-2 top-[42%] -rotate-6 rounded-full bg-chicle px-2.5 py-0.5 text-base md:left-3 md:px-3 md:py-1 md:text-xl text-cacao shadow-[0_0_0_3px_#fff]">{item.tag}</span>}
        <Heart className="absolute right-4 top-[38%] h-7 w-7 scale-0 transition-transform duration-300 group-hover:scale-100" />
      </div>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-3 md:px-2 md:pb-2 md:pt-4">
        <h4 className="display text-xl leading-none md:text-[1.7rem]">{item.name}</h4>
        {item.desc && <p className="mt-1.5 text-[0.8rem] leading-snug text-cacao/75 md:mt-2 md:text-[0.95rem]">{item.desc}</p>}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3 md:gap-2 md:pt-4">
          {prices(item, mode, isCake).map((pr, i) => (
            <span key={i} className="inline-flex items-baseline gap-1 rounded-full bg-crema px-2 py-1 md:gap-1.5 md:px-3 md:py-1.5">
              {pr.label && <span className="text-[0.65rem] font-bold uppercase text-cacao/60 md:text-xs">{pr.label}</span>}
              <span className="display text-base md:text-lg">{cop(pr.value)}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Rows({ title, items, mode, isCake }: { title: string; items: Item[]; mode: Mode; isCake: boolean }) {
  return (
    <div className="mt-8 rounded-[30px] bg-white/70 p-5 md:p-7">
      <p className="script text-3xl text-rosa-2">{title}</p>
      <ul className="mt-3 grid gap-x-10 gap-y-3 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.name} className="flex items-baseline gap-3">
            <span className="min-w-0 font-bold">{it.name}</span>
            <span className="mb-1 flex-1 border-b-2 border-dotted border-cacao/20" />
            <span className="display shrink-0 text-lg">{prices(it, mode, isCake).map((x) => cop(x.value)).join(" · ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Section({ c }: { c: Category }) {
  const [mode, setMode] = useState<Mode>("Porción");
  const isCake = c.id === "tortas";
  const withPhoto = c.items.filter((i) => i.photo);
  const without = c.items.filter((i) => !i.photo);
  return (
    <section id={`cat-${c.id}`} className="scroll-mt-28 md:scroll-mt-32">
      <p className="script text-3xl text-rosa-2 md:text-4xl">{c.kicker}</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <h3 className="display text-[clamp(2.8rem,6vw,4.8rem)]">{c.title}</h3>
        {c.id === "desayunos" && <BreakfastBadge />}
        {isCake && (
          <div role="tablist" aria-label="Precio por" className="flex rounded-full bg-white p-1 shadow-[0_0_0_3px_var(--color-menta)]">
            {(["Porción", "Entera"] as Mode[]).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className="relative rounded-full px-5 py-2 font-bold">
                {mode === m && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-chicle" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{m === "Porción" ? "Porción" : "Torta entera"}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {c.intro && <p className="mt-3 max-w-xl text-lg">{c.intro}</p>}
      <div className="mt-8 grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-3">
        {withPhoto.map((it) => (
          <Card key={it.name} item={it} mode={mode} isCake={isCake} />
        ))}
      </div>
      {without.length > 0 && <Rows title={isCake ? "Más sabores" : "También"} items={without} mode={mode} isCake={isCake} />}
      {c.extras && <Rows title={isCake ? "Saludables y más" : "Adiciones"} items={c.extras} mode={mode} isCake={isCake} />}
      {isCake && <p className="mt-4 text-sm text-cacao/70">Las tortas saludables son libres de gluten y sin azúcar refinada. Pregunta por la torta de temporada.</p>}
    </section>
  );
}

// La carta como la vitrina de la casita: sus fotos reales sobre el malva de sus pósters.
// En computador el índice queda fijo a la izquierda; en celular es una barra fija arriba.
export function Carta() {
  const [active, setActive] = useState(menu[0].id);
  const chips = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (v) setActive(v.target.id.replace("cat-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    menu.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const row = chips.current;
    const chip = row?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const go = (id: string) => document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="carta" className="relative bg-crema py-24 md:py-32">
      <div aria-hidden className="mantel absolute inset-x-0 top-0 h-64 opacity-70 [mask-image:linear-gradient(#000,transparent)]" />
      <div className="relative mx-auto max-w-[1320px] px-4 md:px-8">
        <p className="script text-3xl text-rosa-2 md:text-4xl">Frías o calientes, siempre abrazan el alma</p>
        <h2 className="display mt-2 text-[clamp(3.4rem,9vw,7.5rem)]">La carta</h2>

        {/* Índice fijo en celular */}
        <div ref={chips} className="sticky top-0 z-40 -mx-4 mt-8 flex gap-2 overflow-x-auto bg-crema/95 px-4 py-3 backdrop-blur [scrollbar-width:none] md:hidden">
          {menu.map((c) => (
            <button
              key={c.id}
              data-chip={c.id}
              onClick={() => go(c.id)}
              className={`display shrink-0 rounded-full px-4 py-2 text-lg transition-colors ${c.id === active ? "bg-cacao text-crema" : "bg-white text-cacao"}`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-12 md:mt-14 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label="Secciones de la carta" className="hidden md:block">
            <div className="sticky top-32">
              <ul className="space-y-1">
                {menu.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => go(c.id)} aria-current={c.id === active} className="relative w-full rounded-full px-5 py-3 text-left">
                      {c.id === active && <motion.span layoutId="carta-pill" className="absolute inset-0 rounded-full bg-white shadow-[0_0_0_3px_var(--color-menta)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                      <span className={`display relative text-2xl transition-colors ${c.id === active ? "text-cacao" : "text-cacao/45 hover:text-cacao/80"}`}>{c.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-8 px-5 text-sm text-cacao/70">Precios en pesos colombianos. Pregunta por los sabores del mes.</p>
            </div>
          </nav>
          <div className="min-w-0 space-y-24">
            {menu.map((c) => (
              <Section key={c.id} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

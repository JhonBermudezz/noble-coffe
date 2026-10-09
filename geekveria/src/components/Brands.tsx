import { BRANDS } from "../data";

// Las marcas que manejan, como cinta de cómic.
export function Brands() {
  const list = [...BRANDS, ...BRANDS];
  return (
    <section aria-label="Marcas" className="relative overflow-hidden border-y-4 border-ink bg-red py-6 text-paper">
      <div className="halftone-light absolute inset-0" aria-hidden />
      <p className="relative mb-3 text-center font-display text-xl uppercase tracking-[0.2em] text-yellow">Distribuidor autorizado Panini · Todas tus marcas favoritas</p>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-10" style={{ animationDuration: "40s" }}>
          {list.map((b, i) => (
            <span key={i} className="ink-text-sm whitespace-nowrap font-display text-4xl uppercase md:text-5xl">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

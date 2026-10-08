import { Painted } from "./Painted";
const WORDS = ["Cerámica", "Velas", "Tote bags", "Plantas", "Café", "Cumpleaños", "Primeras citas", "Panadería"];

function Row({ className, reverse }: { className: string; reverse?: boolean }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div className={`overflow-hidden py-3 ${className}`}>
      <div className="marquee-track flex w-max gap-8" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-3xl italic md:text-5xl">
            {w}
            <Painted name="flower" color="currentColor" className="h-7 w-7 opacity-70 md:h-9 md:w-9" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Dos cintas cruzadas de colores con lo que se puede hacer en Creaviva.
export function Ribbon() {
  return (
    <div aria-label="Cerámica, velas, tote bags, plantas, café y cumpleaños" className="relative h-44 overflow-hidden md:h-56">
      <Row className="absolute left-[-5%] top-8 w-[110%] -rotate-2 bg-forest text-cream" />
      <Row reverse className="absolute left-[-5%] top-20 w-[110%] rotate-1 bg-mustard text-forest md:top-28" />
    </div>
  );
}

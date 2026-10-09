const WORDS = ["Club", "Cómic", "Manga", "Café", "Camisetas", "Pines", "Funkos", "Coleccionables"];

function Row({ className, reverse }: { className: string; reverse?: boolean }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div className={`overflow-hidden border-y-4 border-ink py-2 ${className}`}>
      <div className="marquee-track flex w-max gap-6" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-6 font-display text-4xl uppercase md:text-6xl">
            {w}
            <span aria-hidden className="font-sfx text-3xl text-red md:text-5xl">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Dos cintas cruzadas como en la referencia: cómic puro.
export function Ticker() {
  return (
    <div aria-label="Club, cómic, manga, café, camisetas, pines y coleccionables" className="relative z-10 -my-6 h-40 overflow-x-clip md:h-52">
      <Row className="absolute left-[-5%] top-4 w-[110%] -rotate-3 bg-yellow text-ink" />
      <Row reverse className="absolute left-[-5%] top-16 w-[110%] rotate-2 bg-brown text-paper md:top-24" />
    </div>
  );
}

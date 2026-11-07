import { events } from "../data";
import { HexIcon } from "./Bits";

// Dos cintas de etiquetas que se cruzan, con todos los eventos donde va un frasquito.
function Row({ reverse = false, tone }: { reverse?: boolean; tone: "miel" | "fucsia" }) {
  const items = [...events, ...events];
  return (
    <div className={`flex overflow-hidden py-3 ${tone === "miel" ? "btn-miel -rotate-2" : "btn-fucsia rotate-1"}`}>
      <ul className="marquee-track flex shrink-0 items-center gap-8 pr-8" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {items.map((e, i) => (
          <li key={i} className={`display flex items-center gap-3 whitespace-nowrap text-2xl md:text-3xl ${tone === "miel" ? "text-cafe" : "text-white"}`}>
            <HexIcon className="h-5 w-5" fill={tone === "miel" ? "#fff" : "#f7c64a"} />
            {e}
          </li>
        ))}
      </ul>
      <ul aria-hidden className="marquee-track flex shrink-0 items-center gap-8 pr-8" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {items.map((e, i) => (
          <li key={i} className={`display flex items-center gap-3 whitespace-nowrap text-2xl md:text-3xl ${tone === "miel" ? "text-cafe" : "text-white"}`}>
            <HexIcon className="h-5 w-5" fill={tone === "miel" ? "#fff" : "#f7c64a"} />
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Eventos() {
  return (
    <section aria-label="Eventos" className="relative overflow-hidden bg-crema py-14">
      <p className="sr-only">Recordatorios para {events.join(", ")}.</p>
      <Row tone="miel" />
      <div className="mt-3">
        <Row tone="fucsia" reverse />
      </div>
    </section>
  );
}

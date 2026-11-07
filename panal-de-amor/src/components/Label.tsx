import type { EventKind } from "../data";

// Pequeños motivos dorados para la etiqueta, según el evento.
function Motif({ kind, color }: { kind: EventKind; color: string }) {
  const p = { fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "boda":
      return (
        <svg viewBox="0 0 40 24" className="h-[1.1em] w-auto" aria-hidden>
          <circle cx="15" cy="13" r="8" {...p} />
          <circle cx="25" cy="13" r="8" {...p} />
          <path d="M23 3l2-2 2 2-2 2z" {...p} />
        </svg>
      );
    case "bautizo":
      return (
        <svg viewBox="0 0 24 24" className="h-[1.1em] w-auto" aria-hidden>
          <path d="M12 2v20M6 8h12" {...p} />
        </svg>
      );
    case "quince":
      return (
        <svg viewBox="0 0 32 24" className="h-[1.1em] w-auto" aria-hidden>
          <path d="M4 19l2-12 6 6 4-9 4 9 6-6 2 12z" {...p} />
          <path d="M4 22h24" {...p} />
        </svg>
      );
    case "comunion":
      return (
        <svg viewBox="0 0 24 24" className="h-[1.1em] w-auto" aria-hidden>
          <path d="M5 3h14c0 6-3 9-7 9s-7-3-7-9zM12 12v7M8 21h8" {...p} />
          <circle cx="12" cy="6.5" r="1.6" {...p} />
        </svg>
      );
    case "empresa":
      return (
        <svg viewBox="0 0 24 24" className="h-[1.1em] w-auto" aria-hidden>
          <path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" {...p} />
          <path d="M8.5 12.5l2.5 2.5 4.5-5" {...p} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-[1.1em] w-auto" aria-hidden>
          <path d="M12 20s-7-4.5-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5c0 5-7 9.5-7 9.5z" {...p} />
        </svg>
      );
  }
}

// La etiqueta redonda del frasquito. Mide en "em": se escala con el font-size del contenedor.
export function Label({ names, date, phrase, kind, accent }: { names: string; date: string; phrase: string; kind: EventKind; accent: string }) {
  const gold = "#b9862f";
  return (
    <div
      className="relative grid aspect-square w-[10em] place-items-center rounded-full text-center"
      style={{
        background: "radial-gradient(circle at 35% 30%, #fffdf8, #fbf3e3 70%, #f1e2c4)",
        boxShadow: `0 0 0 0.12em #fff, 0 0 0 0.22em ${accent}, 0 0.25em 0.6em rgb(74 42 20 / 0.35), inset 0 0 0.8em rgb(185 134 47 / 0.18)`,
      }}
    >
      <div className="absolute inset-[0.45em] rounded-full border-[0.06em] border-dashed" style={{ borderColor: gold }} />
      <div className="relative flex w-[78%] flex-col items-center">
        <span style={{ color: gold }} className="text-[1.2em] leading-none">
          <Motif kind={kind} color={gold} />
        </span>
        <span className="script mt-[0.12em] block max-w-full break-words text-[1.55em] leading-[0.95] text-cafe" style={{ textWrap: "balance" }}>
          {names || "Tus nombres"}
        </span>
        {date && <span className="display mt-[0.2em] text-[0.62em] font-semibold tracking-[0.08em] text-cafe/80">{date}</span>}
        <span className="display-i mt-[0.25em] line-clamp-3 text-[0.56em] leading-[1.15] text-cafe/75">{phrase}</span>
        <svg viewBox="0 0 60 8" className="mt-[0.25em] h-[0.4em]" aria-hidden>
          <path d="M2 4h22M36 4h22" stroke={gold} strokeWidth="1" />
          <path d="M30 7s-3.5-2-3.5-4a1.8 1.8 0 0 1 3.5-.6A1.8 1.8 0 0 1 33.5 3c0 2-3.5 4-3.5 4z" fill={accent} />
        </svg>
      </div>
    </div>
  );
}

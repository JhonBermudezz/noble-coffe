import { PAINTED, type PaintedName } from "./painted-data";

// Una forma del cuadro del local, en el color que se le pase.
export function Painted({ name, color, className = "" }: { name: PaintedName; color: string; className?: string }) {
  const s = PAINTED[name];
  return (
    <svg viewBox={`0 0 ${s.w} ${s.h}`} className={className} aria-hidden>
      <path d={s.d} fill={color} fillRule="evenodd" />
    </svg>
  );
}

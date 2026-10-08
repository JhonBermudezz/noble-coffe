import { motion } from "motion/react";
import type { MouseEvent } from "react";

// Osito de cerámica en blanco (bizcocho), como los que se pintan en el local.
// Cada parte se puede pintar por separado.
export const BISQUE = "#fbf8f1";

export const PARTS = ["legL", "legR", "body", "belly", "armL", "armR", "earL", "earR", "head", "snout"] as const;
export type Part = (typeof PARTS)[number];
export type Fills = Partial<Record<Part, string>>;

const SHAPES: Record<Part, { el: "ellipse" | "circle"; props: Record<string, number | string> }> = {
  legL: { el: "ellipse", props: { cx: 108, cy: 322, rx: 36, ry: 28 } },
  legR: { el: "ellipse", props: { cx: 192, cy: 322, rx: 36, ry: 28 } },
  body: { el: "ellipse", props: { cx: 150, cy: 250, rx: 86, ry: 90 } },
  belly: { el: "ellipse", props: { cx: 150, cy: 264, rx: 50, ry: 54 } },
  armL: { el: "ellipse", props: { cx: 70, cy: 236, rx: 24, ry: 46, transform: "rotate(28 70 236)" } },
  armR: { el: "ellipse", props: { cx: 230, cy: 236, rx: 24, ry: 46, transform: "rotate(-28 230 236)" } },
  earL: { el: "circle", props: { cx: 80, cy: 60, r: 33 } },
  earR: { el: "circle", props: { cx: 220, cy: 60, r: 33 } },
  head: { el: "ellipse", props: { cx: 150, cy: 122, rx: 94, ry: 82 } },
  snout: { el: "ellipse", props: { cx: 150, cy: 152, rx: 36, ry: 27 } },
};

const LABELS: Record<Part, string> = {
  legL: "pata izquierda",
  legR: "pata derecha",
  body: "cuerpo",
  belly: "barriga",
  armL: "brazo izquierdo",
  armR: "brazo derecho",
  earL: "oreja izquierda",
  earR: "oreja derecha",
  head: "cabeza",
  snout: "hocico",
};

type Props = {
  fills: Fills;
  onPaint?: (part: Part, e: MouseEvent<SVGElement>) => void;
  className?: string;
  children?: React.ReactNode;
};

export function Bear({ fills, onPaint, className = "", children }: Props) {
  return (
    <svg viewBox="0 0 300 360" className={className} role={onPaint ? "group" : "img"} aria-label="Osito de cerámica para pintar">
      {PARTS.map((part) => {
        const { el, props } = SHAPES[part];
        const Shape = el === "circle" ? motion.circle : motion.ellipse;
        return (
          <Shape
            key={part}
            {...props}
            initial={false}
            animate={{ fill: fills[part] ?? BISQUE }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            stroke="#1f4a32"
            strokeWidth={4}
            className={onPaint ? "cursor-pointer" : undefined}
            onClick={onPaint ? (e: MouseEvent<SVGElement>) => onPaint(part, e) : undefined}
            role={onPaint ? "button" : undefined}
            aria-label={onPaint ? `Pintar ${LABELS[part]}` : undefined}
          />
        );
      })}
      {/* Detalles fijos: ojos, nariz, boca y orejas internas. */}
      <g pointerEvents="none">
        <circle cx="80" cy="60" r="14" fill="#1f4a32" opacity=".12" />
        <circle cx="220" cy="60" r="14" fill="#1f4a32" opacity=".12" />
        <circle cx="116" cy="110" r="8" fill="#1b1b17" />
        <circle cx="184" cy="110" r="8" fill="#1b1b17" />
        <circle cx="119" cy="107" r="2.5" fill="#fff" />
        <circle cx="187" cy="107" r="2.5" fill="#fff" />
        <ellipse cx="150" cy="142" rx="12" ry="8" fill="#1b1b17" />
        <path d="M140 160q10 9 20 0" stroke="#1b1b17" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="98" cy="140" r="9" fill="#f28bb0" opacity=".45" />
        <circle cx="202" cy="140" r="9" fill="#f28bb0" opacity=".45" />
      </g>
      {children}
    </svg>
  );
}

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { formatPrice } from "../../data/menu";
import { useSelect, type DetailItem } from "./selection";

// Magnificación tipo Dock de macOS: la fila bajo el cursor crece y se corre a la derecha,
// y las vecinas crecen menos según su distancia. Todo con motion values, sin re-renders.
const MouseY = createContext<MotionValue<number> | null>(null);
const FAR = -99999;

export function MagnifyList({ children, className = "" }: { children: ReactNode; className?: string }) {
  const y = useMotionValue(FAR);
  return (
    <MouseY.Provider value={y}>
      <ul
        className={className}
        onPointerMove={(e) => e.pointerType === "mouse" && y.set(e.clientY)}
        onPointerLeave={() => y.set(FAR)}
      >
        {children}
      </ul>
    </MouseY.Provider>
  );
}

type RowProps = {
  item: DetailItem;
  onHover?: (photo: string | null) => void;
  size?: "lg" | "md";
};

export function MagnifyRow({ item, onHover, size = "lg" }: RowProps) {
  const select = useSelect();
  const mouseY = useContext(MouseY)!;
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseY, (my) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? Math.abs(my - (box.top + box.height / 2)) : 9999;
  });
  const spring = { stiffness: 320, damping: 30, mass: 0.5 };
  const scale = useSpring(useTransform(distance, [0, 140, 300], [1.08, 1.025, 1], { clamp: true }), spring);
  const shift = useSpring(useTransform(distance, [0, 140, 300], [22, 8, 0], { clamp: true }), spring);

  return (
    <li className="border-b border-line">
      <motion.div ref={ref} layoutId={`row-${item.id}`} className="bg-paper">
        <button
          onClick={() => select(item)}
          onPointerEnter={(e) => e.pointerType === "mouse" && item.photo && onHover?.(item.photo)}
          onPointerLeave={() => onHover?.(null)}
          onFocus={() => item.photo && onHover?.(item.photo)}
          onBlur={() => onHover?.(null)}
          aria-label={`${item.name}, ver detalle`}
          className="block w-full py-4 text-left md:py-5"
        >
          <motion.span style={{ scale, x: shift, transformOrigin: "0% 50%" }} className="flex items-center gap-4">
            <span className="min-w-0 flex-1">
              <motion.span
                layoutId={`name-${item.id}`}
                className={`block font-display leading-[1.05] ${
                  size === "lg" ? "text-[clamp(1.6rem,3.4vw,2.75rem)]" : "text-[clamp(1.5rem,2.6vw,2.25rem)]"
                }`}
              >
                {item.name}
              </motion.span>
              {item.note && <span className="mt-1 block text-sm text-muted md:text-base">{item.note}</span>}
            </span>
            <span className="shrink-0 font-mono text-base tabular-nums md:text-lg">
              {item.price !== undefined ? formatPrice(item.price) : "En barra"}
            </span>
          </motion.span>
        </button>
      </motion.div>
    </li>
  );
}

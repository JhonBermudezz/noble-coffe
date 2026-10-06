import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import { formatPrice } from "../../data/menu";
import { Photo } from "../Photo";

export type DetailItem = {
  id: string;
  name: string;
  note?: string;
  price?: number;
  photo?: string;
  // Sin foto, la tarjeta usa el dorado de la etiqueta de la bolsa.
  gold?: boolean;
};

type Select = (item: DetailItem | null) => void;
const SelectionContext = createContext<Select>(() => undefined);
export const useSelect = () => useContext(SelectionContext);

const ease = [0.16, 1, 0.3, 1] as const;

// Una sola tarjeta de detalle para toda la página. Cada fila comparte su layoutId con ella,
// así la fila se transforma en la tarjeta (elemento compartido) y vuelve al cerrar.
export function MenuSelectionProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<DetailItem | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const select = useCallback<Select>((next) => {
    if (next) opener.current = document.activeElement as HTMLElement | null;
    setItem(next);
  }, []);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setItem(null);
    window.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
      opener.current?.focus?.();
    };
  }, [item]);

  const value = useMemo(() => select, [select]);

  return (
    <SelectionContext.Provider value={value}>
      <LayoutGroup>
        {children}
        <AnimatePresence>{item && <DetailCard key={item.id} item={item} onClose={() => setItem(null)} />}</AnimatePresence>
      </LayoutGroup>
    </SelectionContext.Provider>
  );
}

function DetailCard({ item, onClose }: { item: DetailItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={item.name}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#161614]/40 backdrop-blur-sm"
      />

      <motion.div
        layoutId={`row-${item.id}`}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="relative grid w-[min(94vw,58rem)] overflow-hidden border border-line bg-paper md:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="aspect-[4/3] md:aspect-auto md:min-h-[26rem]"
        >
          {item.photo && !item.gold ? (
            <Photo name={item.photo} alt={item.name} sizes="(min-width: 768px) 30vw, 90vw" />
          ) : (
            <div className="grid h-full place-items-center bg-gold p-6 text-on-gold">
              <span className="rounded-[50%] border border-on-gold/70 px-8 py-4 text-center font-condensed text-[clamp(2.2rem,5vw,3.6rem)] uppercase leading-none">
                {item.name}
              </span>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col justify-end gap-5 p-6 md:p-10">
          <motion.h3 layoutId={`name-${item.id}`} className="font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
            {item.name}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="flex items-baseline justify-between gap-4 border-t border-line pt-5"
          >
            <p className="text-muted">{item.note ?? " "}</p>
            <p className="shrink-0 font-mono text-xl tabular-nums">{item.price !== undefined ? formatPrice(item.price) : "En barra"}</p>
          </motion.div>
        </div>

        <button
          autoFocus
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-paper/90 text-ink backdrop-blur transition-transform duration-300 hover:rotate-90 active:scale-95"
        >
          <X size={18} weight="bold" />
        </button>
      </motion.div>
    </div>
  );
}

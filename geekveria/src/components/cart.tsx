import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cop, img } from "../data";
import { shake } from "../fx";
import { Burst } from "./Burst";

export type CartLine = { id: string; name: string; price: number | null; qty: number; photo?: string };
type Cart = {
  lines: CartLine[];
  count: number;
  bump: number;
  add: (line: Omit<CartLine, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<Cart | null>(null);
export const useCart = () => useContext(Ctx)!;

// Carrito solo de interfaz: se guarda en el navegador para que no se pierda al recargar.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("geekveria-cart") ?? "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem("geekveria-cart", JSON.stringify(lines));
    } catch {
      /* sin almacenamiento */
    }
  }, [lines]);

  const add = useCallback((line: Omit<CartLine, "qty">) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === line.id);
      return found ? ls.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { ...line, qty: 1 }];
    });
    setBump((b) => b + 1);
    shake();
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);
  const clear = useCallback(() => setLines([]), []);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const value = useMemo(() => ({ lines, count, bump, add, setQty, clear, open, setOpen }), [lines, count, bump, add, setQty, clear, open]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function CartButton({ className = "" }: { className?: string }) {
  const { count, bump, setOpen } = useCart();
  return (
    <motion.button
      key={bump}
      data-cart
      onClick={() => setOpen(true)}
      aria-label={`Abrir carrito, ${count} productos`}
      initial={bump ? { scale: 1.35, rotate: -12 } : false}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      className={`panel-sm relative grid h-12 w-12 place-items-center rounded-full bg-yellow ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2a1610" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 4h2l2.4 11h11l2-8H6.2" />
        <circle cx="9.5" cy="19.5" r="1.6" />
        <circle cx="17" cy="19.5" r="1.6" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-ink bg-red px-1 font-sfx text-sm text-white">
          {count}
        </span>
      )}
    </motion.button>
  );
}

export function CartDrawer() {
  const { lines, setQty, clear, open, setOpen } = useCart();
  const [sent, setSent] = useState(false);
  const known = lines.filter((l) => l.price !== null);
  const total = known.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0);
  const pending = lines.some((l) => l.price === null);

  useEffect(() => {
    if (!open) setSent(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, setOpen]);

  const order = () => {
    setSent(true);
    shake();
    clear();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Tu pedido"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[440px] flex-col border-l-4 border-ink bg-paper"
            initial={{ x: "105%", rotate: 4 }}
            animate={{ x: 0, rotate: 0 }}
            exit={{ x: "105%", rotate: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <header className="halftone flex items-center justify-between border-b-4 border-ink bg-yellow px-5 py-4">
              <h2 className="font-display text-4xl uppercase">Tu pedido</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="panel-sm grid h-10 w-10 place-items-center rounded-full bg-paper font-sfx text-xl">
                ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {sent ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <Burst text="¡LISTO!" color="#06d6a0" className="mx-auto h-40 w-40" size="text-5xl" />
                    <p className="mt-6 font-display text-3xl uppercase">Pedido armado</p>
                    <p className="mt-2 text-sm text-ink/70">Esto es una vista previa: el pago y el envío se activan cuando la tienda en línea esté conectada.</p>
                  </div>
                </div>
              ) : lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <img src={img("mascot-cart")} alt="" className="mx-auto h-56 w-auto" />
                    <p className="mt-6 text-ink/70">Agrega algo del menú o de la tienda.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, scale: 0.8 }}
                        className="panel-sm flex items-center gap-3 bg-white p-3"
                      >
                        {l.photo ? (
                          <img src={img(l.photo)} alt="" className="h-14 w-14 shrink-0 border-2 border-ink object-cover" />
                        ) : (
                          <div className="halftone grid h-14 w-14 shrink-0 place-items-center border-2 border-ink bg-yellow font-sfx text-xl">☕</div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{l.name}</p>
                          <p className="text-sm text-ink/70">{l.price === null ? "Precio por confirmar" : cop(l.price * l.qty)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Quitar uno de ${l.name}`} className="h-8 w-8 rounded-full border-2 border-ink bg-paper font-bold">
                            −
                          </button>
                          <span className="w-6 text-center font-display text-xl">{l.qty}</span>
                          <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Agregar uno de ${l.name}`} className="h-8 w-8 rounded-full border-2 border-ink bg-yellow font-bold">
                            +
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {!sent && lines.length > 0 && (
              <footer className="border-t-4 border-ink bg-white px-5 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-2xl uppercase">Total</span>
                  <span className="font-display text-4xl">{cop(total)}</span>
                </div>
                {pending && <p className="mt-1 text-xs text-ink/60">Los productos de la tienda se suman cuando se confirme su precio.</p>}
                <button onClick={order} className="panel mt-4 w-full bg-red py-4 font-display text-2xl uppercase tracking-wide text-white transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
                  ¡Hacer pedido!
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

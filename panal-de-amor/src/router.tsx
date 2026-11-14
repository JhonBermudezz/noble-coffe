import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ROOT, img, pagePath, pages, type PageId } from "./data";

// Enrutador mínimo: cada página es una URL real (con su index.html para abrirla directo), pero al
// navegar no se recarga: así la música sigue sonando y la cortina de miel hace la transición.
function fromPath(path: string): PageId {
  const rest = path.startsWith(ROOT) ? path.slice(ROOT.length) : "";
  const id = rest.split("/")[0] as PageId;
  return pages.some((p) => p.id === id) ? id : "inicio";
}

type Router = { page: PageId; go: (id: PageId, hash?: string) => void };
const Ctx = createContext<Router>({ page: "inicio", go: () => {} });
export const useRouter = () => useContext(Ctx);

export function RouterProvider({ children }: { children: (page: PageId) => React.ReactNode }) {
  const [page, setPage] = useState<PageId>(() => fromPath(location.pathname));
  const [curtain, setCurtain] = useState(false);

  const show = useCallback((id: PageId, hash?: string) => {
    setPage(id);
    document.title = pages.find((p) => p.id === id)!.title;
    requestAnimationFrame(() => {
      const el = hash && document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  }, []);

  const go = useCallback(
    (id: PageId, hash?: string) => {
      if (id === page) {
        const el = hash && document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      history.pushState({ id }, "", pagePath(id) + (hash ? `#${hash}` : ""));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return show(id, hash);
      setCurtain(true);
      setTimeout(() => show(id, hash), 520);
      setTimeout(() => setCurtain(false), 620);
    },
    [page, show],
  );

  useEffect(() => {
    document.title = pages.find((p) => p.id === page)!.title;
    const pop = () => show(fromPath(location.pathname), location.hash.slice(1) || undefined);
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Ctx.Provider value={{ page, go }}>
      {children(page)}
      {/* Cortina de miel entre páginas */}
      <AnimatePresence>
        {curtain && (
          <motion.div
            key="cortina"
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-[100svh]"
            initial={{ y: "-115%" }}
            animate={{ y: "0%" }}
            exit={{ y: "112%" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.25, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#f7c64a,#e9a426_45%,#b9740a)]" />
            <div className="panal-light absolute inset-0" />
            <div className="absolute left-0 top-[calc(100%-2px)] h-[clamp(80px,9vw,150px)] w-full" style={{ backgroundImage: `url(${img("miel-goteo")})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x" }} />
            <div className="grid h-full place-items-center">
              <img src={img("abeja")} alt="" className="flap w-24" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

// Enlace interno: URL real (abre en otra pestaña si se pide) y navegación sin recarga con un clic normal.
export function Link({ to, hash, className, children, onClick, ...rest }: { to: PageId; hash?: string; className?: string; children: React.ReactNode; onClick?: () => void } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { go } = useRouter();
  return (
    <a
      {...rest}
      href={pagePath(to) + (hash ? `#${hash}` : "")}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.();
        go(to, hash);
      }}
    >
      {children}
    </a>
  );
}

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ROOT, articles, img, pagePath, pages, type PageId } from "./data";

// Enrutador mínimo: cada página es una URL real (con su index.html para abrirla directo), pero al
// navegar no se recarga: así la música sigue sonando y la cortina de miel hace la transición.
type Route = { page: PageId; sub?: string };

function fromPath(path: string): Route {
  const rest = path.startsWith(ROOT) ? path.slice(ROOT.length) : "";
  const [id, sub] = rest.split("/") as [PageId, string | undefined];
  if (!pages.some((p) => p.id === id)) return { page: "inicio" };
  return { page: id, sub: sub || undefined };
}

function titleOf(r: Route) {
  const a = r.page === "ideas" && r.sub ? articles.find((x) => x.slug === r.sub) : undefined;
  return a ? `${a.title} | Panal de Amor` : pages.find((p) => p.id === r.page)!.title;
}

type Router = { page: PageId; sub?: string; go: (id: PageId, hash?: string, sub?: string) => void };
const Ctx = createContext<Router>({ page: "inicio", go: () => {} });
export const useRouter = () => useContext(Ctx);

export function RouterProvider({ children }: { children: (page: PageId, sub?: string) => React.ReactNode }) {
  const [route, setRoute] = useState<Route>(() => fromPath(location.pathname));
  const { page, sub } = route;
  const [curtain, setCurtain] = useState(false);

  const show = useCallback((r: Route, hash?: string) => {
    setRoute(r);
    document.title = titleOf(r);
    requestAnimationFrame(() => {
      const el = hash && document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  }, []);

  const go = useCallback(
    (id: PageId, hash?: string, to?: string) => {
      if (id === page && to === sub) {
        const el = hash && document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const r = { page: id, sub: to };
      history.pushState(r, "", pagePath(id, to) + (hash ? `#${hash}` : ""));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return show(r, hash);
      setCurtain(true);
      setTimeout(() => show(r, hash), 520);
      setTimeout(() => setCurtain(false), 620);
    },
    [page, sub, show],
  );

  useEffect(() => {
    document.title = titleOf(route);
    const pop = () => show(fromPath(location.pathname), location.hash.slice(1) || undefined);
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Ctx.Provider value={{ page, sub, go }}>
      {children(page, sub)}
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
export function Link({ to, sub, hash, className, children, onClick, ...rest }: { to: PageId; sub?: string; hash?: string; className?: string; children: React.ReactNode; onClick?: () => void } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { go } = useRouter();
  return (
    <a
      {...rest}
      href={pagePath(to, sub) + (hash ? `#${hash}` : "")}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.();
        go(to, hash, sub);
      }}
    >
      {children}
    </a>
  );
}

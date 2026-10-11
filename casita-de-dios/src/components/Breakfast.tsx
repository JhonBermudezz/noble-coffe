import { useEffect, useState } from "react";
import { BREAKFAST_UNTIL } from "../data";

// Hora de Colombia, para saber si todavía hay desayunos (regla real de la carta).
function bogotaHour() {
  const h = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", hour: "numeric", hour12: false }).format(new Date());
  return parseInt(h, 10);
}

export function useBreakfastOpen() {
  const [open, setOpen] = useState(() => bogotaHour() < BREAKFAST_UNTIL);
  useEffect(() => {
    const t = setInterval(() => setOpen(bogotaHour() < BREAKFAST_UNTIL), 60_000);
    return () => clearInterval(t);
  }, []);
  return open;
}

export function BreakfastBadge({ className = "" }: { className?: string }) {
  const open = useBreakfastOpen();
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-[0_0_0_3px_var(--color-menta)] ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-menta-2 opacity-70" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-menta-2" : "bg-rosa"}`} />
      </span>
      {open ? `Hay desayunos hasta las ${BREAKFAST_UNTIL}:00 a. m.` : `Desayunos mañana, hasta las ${BREAKFAST_UNTIL}:00 a. m.`}
    </span>
  );
}

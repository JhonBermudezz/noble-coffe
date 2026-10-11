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

// Cartelito colgado de un clavo, como el de "abierto" en la puerta de la casita.
export function BreakfastBadge({ className = "" }: { className?: string }) {
  const open = useBreakfastOpen();
  return (
    <div className={`sway inline-flex w-[230px] flex-col items-center ${className}`} style={{ animationDuration: "5s" }}>
      <svg viewBox="0 0 230 30" className="h-[30px] w-full" aria-hidden>
        <path d="M115 6 L40 30 M115 6 L190 30" stroke="#622a1c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="115" cy="6" r="5" fill="#d98aa6" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className={`-mt-1 w-full -rotate-2 rounded-[20px] border-[3px] border-white px-4 pb-2.5 pt-2 text-center shadow-[0_0_0_3px_var(--color-cacao)] ${open ? "bg-menta" : "bg-chicle"}`}>
        <p className="script whitespace-nowrap text-[1.45rem] leading-none text-cacao">{open ? "Hay desayunos" : "Desayunos mañana"}</p>
        <p className="display mt-1 text-[0.9rem] text-cacao/80">hasta las {BREAKFAST_UNTIL}:00 a. m.</p>
      </div>
    </div>
  );
}

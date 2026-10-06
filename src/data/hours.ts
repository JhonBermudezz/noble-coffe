// Horario del local en hora de Bogotá. Días: 0 = domingo ... 6 = sábado.
export const HOURS = {
  days: [1, 2, 3, 4, 5, 6],
  open: 8,
  close: 19,
  label: "Lunes a sábado",
  range: "8:00 a.m. a 7:00 p.m.",
};

type Status = { open: boolean; text: string };

// Calcula si está abierto usando la zona horaria de Bogotá, sin importar dónde esté el visitante.
export function getStatus(now = new Date()): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) + Number(get("minute")) / 60;
  const openToday = HOURS.days.includes(day);

  if (openToday && hour >= HOURS.open && hour < HOURS.close) {
    return { open: true, text: "Abierto ahora, hasta las 7:00 p.m." };
  }
  if (openToday && hour < HOURS.open) {
    return { open: false, text: "Cerrado. Abrimos hoy a las 8:00 a.m." };
  }
  // Después del cierre: el próximo día hábil.
  const next = (day + 1) % 7;
  const nextLabel = HOURS.days.includes(next) ? "mañana" : "el lunes";
  return { open: false, text: `Cerrado. Abrimos ${nextLabel} a las 8:00 a.m.` };
}

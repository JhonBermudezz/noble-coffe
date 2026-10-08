// Color de pintura activo, compartido entre el pincel del cursor y las chispas.
export const COLORS = ["#ee5a24", "#f28bb0", "#f2c230", "#3fb8a6", "#b9a6e8"];

let index = 0;
const listeners = new Set<(c: string) => void>();

export const currentColor = () => COLORS[index];

export function nextColor() {
  index = (index + 1) % COLORS.length;
  listeners.forEach((fn) => fn(COLORS[index]));
}

export function onColor(fn: (c: string) => void) {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}

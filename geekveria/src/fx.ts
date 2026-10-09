// Pequeño bus de efectos: sacudir la pantalla desde cualquier componente.
export function shake() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = document.getElementById("stage");
  if (!el) return;
  el.classList.remove("shake");
  void el.offsetWidth; // reinicia la animación
  el.classList.add("shake");
}

export const SFX = ["¡POW!", "¡BAM!", "¡ZAS!", "¡BOOM!", "¡KRAK!", "¡WHAM!", "¡ZOOM!", "¡PAF!"];
export const SFX_COLORS = ["#f2c40f", "#e63946", "#2ec4f1", "#ff5fa2", "#06d6a0", "#7b2ff7"];
export const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

import { useSyncExternalStore } from "react";
import { snd } from "./data";

// Sonido del castillo. Los navegadores no dejan sonar nada sin un toque del usuario,
// así que todo empieza apagado y se enciende al entrar con sonido o con el botón flotante.
type Name = "gate" | "shuffle" | "laugh";

let enabled = false;
const listeners = new Set<() => void>();
let ambient: HTMLAudioElement | null = null;
const fx: Partial<Record<Name, HTMLAudioElement>> = {};

function getAmbient() {
  if (!ambient) {
    ambient = new Audio(snd("ambient"));
    ambient.loop = true;
    ambient.volume = 0;
  }
  return ambient;
}

function fade(el: HTMLAudioElement, to: number, ms = 1200) {
  const from = el.volume;
  const start = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / ms);
    el.volume = Math.min(1, Math.max(0, from + (to - from) * k));
    if (k < 1) requestAnimationFrame(step);
    else if (to === 0) el.pause();
  };
  requestAnimationFrame(step);
}

export function setSound(on: boolean) {
  enabled = on;
  const a = getAmbient();
  if (on) {
    a.play().catch(() => {});
    fade(a, 0.35);
  } else fade(a, 0, 500);
  listeners.forEach((l) => l());
}

export function play(name: Name, volume = 0.7) {
  if (!enabled) return;
  const el = (fx[name] ??= new Audio(snd(name)));
  el.volume = volume;
  el.currentTime = 0;
  el.play().catch(() => {});
}

export function useSound() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => enabled,
  );
}

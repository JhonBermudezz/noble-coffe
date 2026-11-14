import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { ROOT } from "../data";

// Música de fondo: nunca suena sola al cargar (normativa en Colombia); solo con el permiso de la persona.
let audio: HTMLAudioElement | null = null;
let playing = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

function el() {
  if (!audio) {
    audio = new Audio(`${ROOT}audio/musica.mp3`);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none";
  }
  return audio;
}

function fadeTo(target: number, done?: () => void) {
  const a = el();
  const step = () => {
    const diff = target - a.volume;
    if (Math.abs(diff) < 0.04) {
      a.volume = target;
      done?.();
      return;
    }
    a.volume = Math.max(0, Math.min(1, a.volume + Math.sign(diff) * 0.03));
    requestAnimationFrame(step);
  };
  step();
}

export function playMusic() {
  const a = el();
  a.play()
    .then(() => {
      playing = true;
      emit();
      fadeTo(0.35);
    })
    .catch(() => {
      /* el navegador lo bloqueó: queda el botón */
    });
}

export function pauseMusic() {
  playing = false;
  emit();
  fadeTo(0, () => audio?.pause());
}

export function useMusic() {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => playing,
  );
}

// Botón flotante: barritas que bailan mientras suena, nota tachada cuando está en silencio.
export function MusicToggle() {
  const on = useMusic();
  return (
    <button
      onClick={() => (on ? pauseMusic() : playMusic())}
      aria-pressed={on}
      aria-label={on ? "Silenciar la música" : "Activar la música"}
      className="btn-miel group fixed bottom-4 left-4 z-[55] flex h-12 w-12 items-center justify-center gap-2 rounded-full font-bold text-cafe md:bottom-6 md:left-6 md:h-14 md:w-auto md:pl-4 md:pr-5"
    >
      {on ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <motion.span key={i} className="w-[3px] rounded-full bg-cafe" animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }} transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" fill="currentColor" />
          <circle cx="17" cy="16" r="3" fill="currentColor" />
          <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
      <span className="hidden text-sm md:inline">{on ? "Silenciar" : "Música"}</span>
    </button>
  );
}

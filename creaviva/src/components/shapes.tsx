// Pegatinas y formas dibujadas a mano en SVG, inspiradas en los murales del local.
type P = { className?: string; color?: string; center?: string };

export function Flower({ className = "", color = "#ee5a24", center = "#f2c230", petals = 8 }: P & { petals?: number }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="0" cy="-26" rx="12" ry="22" fill={color} transform={`rotate(${(360 / petals) * i})`} />
      ))}
      <circle r="13" fill={center} />
      <path d="M-5 -4 q5 -6 10 0" stroke="#f6efe2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Monstera({ className = "", color = "#1f4a32" }: P) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path
        fill={color}
        d="M60 112c-6-10-8-22-6-34-12 8-28 9-40 2 12-2 22-8 28-16-14 0-26-6-32-16 12 2 24 0 32-6C30 36 24 22 28 8c8 12 18 20 30 22-2-10 2-20 10-26 0 10 4 18 10 22 6-8 16-12 26-10-8 6-12 14-12 22 10-2 20 2 26 10-12 0-20 4-26 12 10 2 18 10 20 20-10-6-20-6-28-2 4 10 2 22-6 30 0-10-4-18-10-24-2 14-4 26-8 36z"
      />
      <path d="M60 110C58 80 60 50 70 18" stroke="#f6efe2" strokeOpacity=".35" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function Sprig({ className = "", color = "#7f9a5b" }: P) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden>
      <path d="M30 118C30 80 32 40 30 4" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      {[18, 38, 58, 78].map((y, i) => (
        <g key={y}>
          <path d={`M30 ${y + 14}c-14 -2 -22 -10 -24 -20 12 0 22 8 24 20z`} fill={color} />
          <path d={`M30 ${y + 4 + i}c14 -2 22 -10 24 -20 -12 0 -22 8 -24 20z`} fill={color} />
        </g>
      ))}
    </svg>
  );
}

export function Cup({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden>
      <path d="M56 10c-8 10 8 14 0 26M70 6c-8 10 8 14 0 26" stroke="#c8643b" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M14 44h80c0 30-14 50-40 50S14 74 14 44z" fill="#f6efe2" stroke="#1f4a32" strokeWidth="5" strokeLinejoin="round" />
      <path d="M94 52c14 0 16 22-4 24" stroke="#1f4a32" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M8 100h96" stroke="#1f4a32" strokeWidth="5" strokeLinecap="round" />
      <circle cx="44" cy="62" r="5" fill="#f28bb0" />
      <circle cx="64" cy="68" r="5" fill="#3fb8a6" />
    </svg>
  );
}

export function Brush({ className = "", color = "#ee5a24" }: P) {
  return (
    <svg viewBox="0 0 40 140" className={className} aria-hidden>
      <rect x="15" y="44" width="10" height="92" rx="5" fill="#c8643b" />
      <rect x="13" y="34" width="14" height="16" rx="2" fill="#b9b3a6" />
      <path d="M13 36c0-14 2-26 7-34 5 8 7 20 7 34z" fill={color} />
    </svg>
  );
}

export function Heart({ className = "", color = "#f28bb0" }: P) {
  return (
    <svg viewBox="0 0 100 90" className={className} aria-hidden>
      <path d="M50 86C20 64 4 48 4 28 4 14 15 4 28 4c9 0 17 5 22 13C55 9 63 4 72 4c13 0 24 10 24 24 0 20-16 36-46 58z" fill={color} />
      <path d="M22 26c2-8 8-12 14-12" stroke="#f6efe2" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className = "", color = "#1f4a32" }: P) {
  return (
    <svg viewBox="0 0 200 30" className={className} aria-hidden preserveAspectRatio="none">
      <path d="M2 15c16-18 32 18 48 0s32 18 48 0 32 18 48 0 32 18 48 0" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

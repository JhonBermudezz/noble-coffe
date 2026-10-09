// Estallido de cómic (starburst) con una onomatopeya adentro.
function points(n: number, rOut: number, rIn: number, jitter = 0) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? rOut - ((i * 7) % 5) * jitter : rIn;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`);
  }
  return pts.join(" ");
}

type Props = {
  text: string;
  color?: string;
  textColor?: string;
  className?: string;
  spikes?: number;
  size?: string;
};

export function Burst({ text, color = "#f2c40f", textColor = "#2a1610", className = "", spikes = 14, size = "text-[1.6em]" }: Props) {
  return (
    <div className={`relative grid place-items-center ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <polygon points={points(spikes, 50, 34, 2.2)} fill="#2a1610" transform="translate(3 3)" />
        <polygon points={points(spikes, 50, 34, 2.2)} fill={color} stroke="#2a1610" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <span className={`relative -rotate-6 font-sfx leading-none tracking-wide ${size}`} style={{ color: textColor }}>
        {text}
      </span>
    </div>
  );
}

// Sello circular con la elipse inclinada de las historias destacadas de @somos.noble.
export function Seal({ label, className = "", spin = true }: { label: string; className?: string; spin?: boolean }) {
  return (
    <div
      className={`relative grid aspect-square place-items-center rounded-full bg-[#fffaf5] text-[#161614] ring-1 ring-[#161614]/15 ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-[22%_2%] rounded-[50%] border border-[#161614]/70 ${spin ? "spin-slow" : "-rotate-12"}`}
      />
      <span className="relative font-mono text-[0.62em]">{label}</span>
    </div>
  );
}

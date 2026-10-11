// Foto recortada en silueta de casita, con el borde blanco y el halo menta del logo.
export function House({ src, alt, className = "", imgClass = "" }: { src: string; alt: string; className?: string; imgClass?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="casa absolute -inset-[12px] bg-menta" />
      <div aria-hidden className="casa absolute -inset-[6px] bg-white" />
      <img src={src} alt={alt} className={`casa relative h-full w-full object-cover ${imgClass}`} />
    </div>
  );
}

export function Heart({ className = "", fill = "#d98aa6" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} aria-hidden>
      <path d="M12 21S1 14 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z" fill={fill} stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

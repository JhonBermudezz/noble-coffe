import { forwardRef } from "react";
import { LOGO_LETTERS, LOGO_VIEWBOX } from "./logo-data";

type LogoProps = {
  className?: string;
  // Muestra el símbolo ® como en el logo original.
  registered?: boolean;
  title?: string;
};

// Logo NOBLE en vector. Usa currentColor, así que toma el color del texto.
export const Logo = forwardRef<SVGSVGElement, LogoProps>(function Logo(
  { className = "", registered = true, title = "Noble" },
  ref,
) {
  return (
    <svg ref={ref} viewBox={LOGO_VIEWBOX} role="img" aria-label={title} className={`block overflow-visible ${className}`}>
      <g fill="currentColor" fillRule="evenodd">
        {LOGO_LETTERS.map((l) => (
          <path key={l.letter} data-letter={l.letter} d={l.d} />
        ))}
      </g>
      {registered && (
        <g data-registered fill="none" stroke="currentColor">
          <circle cx="1748" cy="154" r="64" strokeWidth="14" />
          <path d="M1722 196V112h30q24 0 24 22t-24 22h-30M1752 156l26 40" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
});

import { forwardRef } from "react";
import { LOGO_LETTERS, LOGO_REGISTERED, LOGO_VIEWBOX } from "./logo-data";

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
        <path
          data-registered
          d={LOGO_REGISTERED}
          fill="currentColor"
          fillRule="evenodd"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      )}
    </svg>
  );
});

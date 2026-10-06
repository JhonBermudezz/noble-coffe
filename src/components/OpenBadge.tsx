import { useEffect, useState } from "react";
import { getStatus } from "../data/hours";

// Estado en vivo del local. El punto de color sí comunica algo real: abierto o cerrado.
export function OpenBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={`inline-flex items-center gap-2 text-sm ${className}`} aria-live="polite">
      <span className="relative flex size-2">
        {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-[#4f8a5b] opacity-60 motion-reduce:hidden" />}
        <span className={`relative size-2 rounded-full ${status.open ? "bg-[#4f8a5b]" : "bg-muted"}`} />
      </span>
      {status.text}
    </p>
  );
}

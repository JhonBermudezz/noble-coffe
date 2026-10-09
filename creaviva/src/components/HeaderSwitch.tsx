// Selector temporal para comparar las propuestas de inicio. Solo aparece con ?header= en la URL.
const OPTIONS = [
  { id: "a", label: "A · Actual" },
  { id: "b", label: "B · Cuadro" },
  { id: "c", label: "C · Collage" },
];

export function HeaderSwitch({ current }: { current: string }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[110] flex -translate-x-1/2 gap-1 rounded-full bg-forest p-1 text-sm shadow-xl">
      {OPTIONS.map((o) => (
        <a
          key={o.id}
          href={`?header=${o.id}`}
          className={`whitespace-nowrap rounded-full px-3 py-2 font-semibold md:px-4 ${o.id === current ? "bg-cream text-forest" : "text-cream hover:bg-cream/15"}`}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}

/** Bottom fade into page background — matches About / Team hero treatment. */
export function HeroBandScrim() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-48 bg-gradient-to-t from-void via-void/75 to-transparent"
      aria-hidden
    />
  );
}

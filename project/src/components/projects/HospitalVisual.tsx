export default function HospitalVisual() {
  return (
    <div
      aria-hidden="true"
      className="perspective-1000 group/visual relative h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-950/60 sm:h-80"
    >
      <img
       src="/images/projects/hospital-management-system.png"
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/visual:scale-110 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgb(59_130_246/0.15),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary-400/10" />
    </div>
  );
}

import { techMarquee } from '@/data/portfolio';

function MarqueeGroup({ hidden }: { hidden: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {techMarquee.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-display text-3xl font-bold tracking-tight text-ink-200 transition-colors duration-300 hover:text-primary-300 sm:text-5xl">
            {item}
          </span>
          <span className="h-2 w-2 rotate-45 bg-primary-500/70" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function TechMarquee() {
  return (
    <section aria-label="Technologies" className="marquee-wrap relative overflow-hidden border-y border-white/10 bg-ink-900/50 py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max">
        <MarqueeGroup hidden={false} />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}

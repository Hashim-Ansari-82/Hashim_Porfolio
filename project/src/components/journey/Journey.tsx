import { GraduationCap } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { journeyEntries } from '@/data/portfolio';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import Reveal from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';

export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!track || !progress || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: track, start: 'top 75%', end: 'bottom 60%', scrub: true },
        },
      );
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative scroll-mt-24 py-32 lg:py-40">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Journey</p>
          <SplitText text="MY JOURNEY" className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl" />
        </div>

        <div ref={trackRef} className="relative mt-16 max-w-4xl pl-10 sm:pl-16">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 sm:left-[23px]" aria-hidden="true">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-top bg-gradient-to-b from-primary-300 via-primary-500 to-secondary-500 shadow-[0_0_16px_2px_rgb(59_130_246/0.6)]"
            />
          </div>

          <ol className="space-y-16">
            {journeyEntries.map((entry) => (
              <li key={entry.id} className="relative">
                <span className="absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary-400/50 bg-ink-950 text-primary-300 shadow-[0_0_24px_-4px_rgb(59_130_246/0.8)] sm:-left-16 sm:h-12 sm:w-12">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>

                <Reveal>
                  <div className="glass-strong rounded-3xl p-6 sm:p-10">
                    <p className="eyebrow text-ink-400">
                      {entry.kind} · {entry.period}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">{entry.title}</h3>
                    <p className="mt-3 text-base text-ink-200">{entry.organization}</p>

                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-success-400/30 bg-success-500/10 px-3.5 py-1.5 text-xs font-medium text-success-300">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-success-400" />
                      </span>
                      {entry.status}
                    </span>

                    <p className="mt-6 max-w-2xl text-base leading-[1.5] text-ink-300">{entry.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

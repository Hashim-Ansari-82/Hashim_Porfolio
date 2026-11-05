
import { Building2, GraduationCap, MapPin } from 'lucide-react';
import { aboutContent, profile } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';

const factIcons = [GraduationCap, Building2, MapPin];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32 lg:py-40">
      <div className="section-shell grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div
                className="absolute -inset-4 rounded-[2rem] border border-primary-400/15"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-ink-800">
                <img
                  src={profile.photo}
                  alt="Mohammad Hashim in a charcoal suit"
                  width={720}
                  height={922}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow">{aboutContent.eyebrow}</p>

          <SplitText
            text={aboutContent.heading}
            className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl"
          />

          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-xl leading-[1.2] text-primary-200 sm:text-2xl">
              {aboutContent.subheading}
            </p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.05 * index}>
                <p className="text-base leading-[1.5] text-ink-300 sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {aboutContent.facts.map((fact, index) => {
              const Icon = factIcons[index];

              return (
                <li key={fact.label}>
                  <Reveal delay={0.1 * index} className="h-full">
                    <div className="glass h-full rounded-2xl p-5 transition duration-500 hover:-translate-y-1 hover:border-primary-400/40">
                      <Icon
                        className="h-5 w-5 text-primary-400"
                        aria-hidden="true"
                      />

                      <p className="mt-4 font-display text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">
                        {fact.label}
                      </p>

                      <p className="mt-2 text-sm leading-[1.5] text-ink-100">
                        {fact.value}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

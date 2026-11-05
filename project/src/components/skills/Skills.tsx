import { skillCategories } from '@/data/portfolio';
import SkillCard from '@/components/skills/SkillCard';
import SplitText from '@/components/ui/SplitText';
import Reveal from '@/components/ui/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-32 lg:py-40">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Skills</p>
          <SplitText text="TECHNICAL EXPERTISE" className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-[1.5] text-ink-300 sm:text-lg">
              The languages, frameworks, and tools I use to build backend systems, from application logic to database
              design.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} delay={(index % 3) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

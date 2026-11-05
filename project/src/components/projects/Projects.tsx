import { projects } from '@/data/portfolio';
import ProjectCard from '@/components/projects/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-32 lg:py-40">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Projects</p>
          <SplitText text="FEATURED PROJECTS" className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-[1.5] text-ink-300 sm:text-lg">
              Some practical applications I&apos;ve built using Java and Spring Boot.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-10 lg:gap-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} isReversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

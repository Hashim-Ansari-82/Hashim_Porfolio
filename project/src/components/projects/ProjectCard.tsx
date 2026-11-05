import { motion } from 'framer-motion';
import { Check, Github } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import { useTilt } from '@/hooks/useTilt';
import ProjectVisual from '@/components/projects/ProjectVisual';
import Reveal from '@/components/ui/Reveal';

interface ProjectCardProps {
  project: Project;
  isReversed: boolean;
}

const numberStroke = {
  blue: 'rgb(96 165 250 / 0.7)',
  violet: 'rgb(167 139 250 / 0.7)',
} as const;

const accentText = {
  blue: 'text-primary-300',
  violet: 'text-secondary-300',
} as const;

const accentBorder = {
  blue: 'border-primary-400/30 bg-primary-500/10 text-primary-100',
  violet: 'border-secondary-400/30 bg-secondary-500/10 text-secondary-300',
} as const;

const accentCheck = {
  blue: 'text-primary-400',
  violet: 'text-secondary-400',
} as const;

export default function ProjectCard({ project, isReversed }: ProjectCardProps) {
  const tilt = useTilt({ maxTilt: 6 });

  return (
    <Reveal>
      <article className="glow-border group grid gap-10 border border-white/10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:p-14">
        <motion.div
          className={isReversed ? 'lg:order-last' : undefined}
          style={{ rotateX: tilt.style.rotateX, rotateY: tilt.style.rotateY, transformPerspective: 1200 }}
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.onPointerLeave}
        >
          <ProjectVisual variant={project.visual} />
        </motion.div>

        <div>
          <div className="flex items-end gap-4">
            <span
              className="font-display text-7xl font-bold leading-[1.2] text-transparent [-webkit-text-stroke-width:1px] sm:text-8xl"
              style={{ WebkitTextStrokeColor: numberStroke[project.accent] }}
            >
              {project.index}
            </span>
          </div>

          <p className={`mt-4 font-display text-xs font-medium uppercase tracking-[0.12em] ${accentText[project.accent]}`}>
            {project.category}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.title}</h3>
          <p className="mt-5 text-base leading-[1.5] text-ink-300">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className={`rounded-full border px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wider ${accentBorder[project.accent]}`}
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="eyebrow mb-4 text-ink-400">Key features</p>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-[1.5] text-ink-200">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentCheck[project.accent]}`} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary uppercase tracking-[0.12em]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View Source Code
              <span className="sr-only">for {project.title}, opens in a new tab</span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

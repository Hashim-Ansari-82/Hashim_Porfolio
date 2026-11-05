import { motion } from 'framer-motion';
import { Code2, Database, HardDrive, Layers, Server, Wrench, type LucideIcon } from 'lucide-react';
import type { SkillCategory } from '@/data/portfolio';
import { useTilt } from '@/hooks/useTilt';
import { useSpotlight } from '@/hooks/useSpotlight';
import Reveal from '@/components/ui/Reveal';

const iconMap: Record<SkillCategory['icon'], LucideIcon> = {
  Code2,
  Server,
  HardDrive,
  Database,
  Wrench,
  Layers,
};

interface SkillCardProps {
  category: SkillCategory;
  delay: number;
}

export default function SkillCard({ category, delay }: SkillCardProps) {
  const tilt = useTilt({ maxTilt: 7 });
  const { spotlightRef, onPointerMove: onSpotlightMove } = useSpotlight();
  const Icon = iconMap[category.icon];

  return (
    <Reveal delay={delay} className="h-full">
      <motion.article
        style={{ rotateX: tilt.style.rotateX, rotateY: tilt.style.rotateY, transformPerspective: 1100 }}
        onPointerMove={(event) => {
          tilt.onPointerMove(event);
          onSpotlightMove(event);
        }}
        onPointerLeave={() => {
          tilt.onPointerLeave();
          if (spotlightRef.current) spotlightRef.current.style.background = 'transparent';
        }}
        className="glass-strong group relative h-full overflow-hidden rounded-3xl p-8 transition-[border-color,box-shadow] duration-500 hover:border-primary-400/40 hover:shadow-[0_30px_80px_-30px_rgb(59_130_246/0.45)]"
      >
        <div ref={spotlightRef} aria-hidden="true" className="pointer-events-none absolute inset-0 transition-opacity duration-500" />

        <div className="relative flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-400/30 bg-primary-500/10 text-primary-300 transition duration-500 group-hover:scale-105 group-hover:border-primary-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xs font-medium tracking-[0.12em] text-ink-500">CARD {category.index}</span>
        </div>

        <h3 className="relative mt-8 text-xl font-bold tracking-tight text-white sm:text-2xl">{category.title}</h3>

        <ul className="relative mt-6 flex flex-wrap gap-2">
          {category.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink-200 transition duration-300 group-hover:border-white/15 hover:!border-primary-400/50 hover:!text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.article>
    </Reveal>
  );
}

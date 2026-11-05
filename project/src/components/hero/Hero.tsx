import { motion } from 'framer-motion';
import { Download, MapPin, Mail } from 'lucide-react';
import { heroIntro, profile } from '@/data/portfolio';
import { useScrollTo } from '@/context/SmoothScrollContext';
import SocialLinks from '@/components/ui/SocialLinks';
import SplitText from '@/components/ui/SplitText';
import HeroVisual from '@/components/hero/HeroVisual';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease } }),
};

export default function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 lg:pt-28">
      <div className="section-shell grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="eyebrow flex items-center gap-4"
          >
            <span className="h-px w-10 bg-primary-400" aria-hidden="true" />
            {heroIntro.greeting}
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-white">
            <SplitText as="span" text={profile.firstName.toUpperCase()} className="block" delay={0.2} />
            <SplitText as="span" text={profile.lastName.toUpperCase()} className="block text-primary-400" delay={0.35} />
          </h1>

          <motion.p
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 font-display text-base font-medium uppercase tracking-[0.12em] text-ink-100 sm:text-xl"
          >
            {profile.title.toUpperCase()}
          </motion.p>

          <motion.p
            custom={0.65}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-base leading-[1.5] text-ink-300 sm:text-lg"
          >
            {heroIntro.description}
          </motion.p>

          <motion.p
            custom={0.75}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 flex items-center gap-2 text-sm text-ink-400"
          >
            <MapPin className="h-4 w-4 text-primary-400" aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.div
            custom={0.9}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              onClick={(event) => {
                event.preventDefault();
                scrollTo('#projects');
              }}
              className="btn-primary"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollTo('#contact');
              }}
              className="btn-ghost"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </a>
            <a href={profile.resumePath} download={profile.resumeFileName} className="btn-ghost">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            custom={1.05}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center gap-5"
          >
            <span className="eyebrow text-ink-400">Find me</span>
            <SocialLinks className="flex items-center gap-3" />
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="eyebrow text-[10px] text-ink-400">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="scroll-hint-line absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-primary-400" />
        </span>
      </div>
    </section>
  );
}

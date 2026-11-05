import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { profile } from '@/data/portfolio';
import { supportsWebGL } from '@/lib/webgl';

const HeroScene = lazy(() => import('@/components/hero/HeroScene'));

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setHasWebGL(supportsWebGL());
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-[420px] w-full max-w-[580px] items-center justify-center sm:h-[520px] lg:h-[640px]"
    >
      {/* 3D Wireframe Scene */}
      {hasWebGL && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
        >
          <Suspense fallback={null}>
            <HeroScene isActive={isVisible} />
          </Suspense>
        </div>
      )}

      {/* Circle - Size thoda aur bada kiya aur overflow-hidden se image circle ke boundary mein fit hogi */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.1,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 isolate aspect-square w-[76%] max-w-[400px] flex-none overflow-hidden rounded-full border border-sky-200/40 shadow-[0_0_0_8px_rgba(59,130,246,0.1),0_0_60px_10px_rgba(37,99,235,0.36),inset_0_0_35px_rgba(96,165,250,0.22)] bg-[radial-gradient(circle_at_50%_28%,#1d4ed8_0%,#102b70_48%,#06112e_78%,#030817_100%)]"
      >
        {/* Blue glow effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] top-[8%] h-[50%] w-[55%] rounded-full bg-blue-400/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[5%] top-[22%] h-6 w-6 rounded-full bg-sky-200/80 blur-md"
        />

        {/* Profile Image - circle ke dimensions ke hisab se exact fit */}
        <img
          src={profile.photo}
          alt="Portrait of Mohammad Hashim"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 z-[1] h-full w-full select-none object-cover object-top"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(96, 165, 250, 0.2))',
          }}
        />
      </motion.figure>

      {/* Bottom overlay & Name text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-40 flex aspect-square w-[76%] max-w-[400px] flex-none -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-end rounded-full px-4 pb-[9%] text-center">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[38%] rounded-b-full bg-gradient-to-t from-[#040d25]/85 via-[#061641]/45 to-transparent"
        />
      </div>
    </div>
  );
}
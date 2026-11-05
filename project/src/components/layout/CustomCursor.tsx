import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion';

const INTERACTIVE_SELECTOR = 'a, button, label, [role="button"], input[type="submit"], [data-cursor="hover"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!isEnabled || !dot || !ring) return;

    document.documentElement.classList.add('custom-cursor-active');
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    let hasEntered = false;

    const handleMove = (event: PointerEvent) => {
      if (!hasEntered) {
        hasEntered = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, { scale: 1.8, duration: 0.35, ease: 'power3.out' });
        gsap.to(dot, { scale: 0.4, duration: 0.35 });
      }
    };

    const handleOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' });
        gsap.to(dot, { scale: 1, duration: 0.35 });
      }
    };

    const handleDown = () => gsap.to(ring, { scale: 0.75, duration: 0.2 });
    const handleUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power3.out' });
    const handleLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    const handleEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.25 });

    window.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerover', handleOver);
    document.addEventListener('pointerout', handleOut);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    document.documentElement.addEventListener('pointerleave', handleLeave);
    document.documentElement.addEventListener('pointerenter', handleEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
      document.documentElement.removeEventListener('pointerenter', handleEnter);
      gsap.killTweensOf([dot, ring]);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full border border-primary-400/60 bg-primary-400/5 mix-blend-screen"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] h-2 w-2 rounded-full bg-primary-300 shadow-[0_0_12px_2px_rgb(96_165_250/0.8)]"
      />
    </>
  );
}

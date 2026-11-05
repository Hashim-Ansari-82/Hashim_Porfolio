import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

interface TiltOptions {
  maxTilt?: number;
}

interface TiltHandlers {
  style: { rotateX: MotionValue<number>; rotateY: MotionValue<number> };
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

export function useTilt({ maxTilt = 8 }: TiltOptions = {}): TiltHandlers {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawY.set(px * maxTilt * 2);
    rawX.set(-py * maxTilt * 2);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { style: { rotateX, rotateY }, onPointerMove, onPointerLeave };
}

import { useRef, type PointerEvent as ReactPointerEvent } from 'react';

export function useSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const spotlight = spotlightRef.current;
    if (!spotlight || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spotlight.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgb(59 130 246 / 0.16), transparent 70%)`;
  };

  return { spotlightRef, onPointerMove };
}

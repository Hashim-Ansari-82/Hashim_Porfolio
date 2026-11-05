import { useLayoutEffect, useRef, type ElementType } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, as: Tag = 'h2', className, delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const inners = container.querySelectorAll<HTMLElement>('[data-word-inner]');
    const ctx = gsap.context(() => {
      gsap.from(inners, {
        yPercent: 110,
        rotate: 4,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.06,
        delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <span data-word-inner className="inline-block origin-bottom-left will-change-transform">
            {word}
          </span>
          {index < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  );
}

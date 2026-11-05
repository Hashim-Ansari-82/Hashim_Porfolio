import { AnimatePresence, motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useEffect } from 'react';
import { navigation, profile } from '@/data/portfolio';
import { useScrollTo } from '@/context/SmoothScrollContext';
import SocialLinks from '@/components/ui/SocialLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const scrollTo = useScrollTo();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const handleBreakpoint = () => {
      if (desktopQuery.matches) onClose();
    };
    desktopQuery.addEventListener('change', handleBreakpoint);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      desktopQuery.removeEventListener('change', handleBreakpoint);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (href: string) => {
    onClose();
    window.setTimeout(() => scrollTo(href), 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink-950/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigate(item.href);
                    }}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl text-white transition hover:text-primary-300"
                  >
                    <span className="font-sans text-xs font-medium text-primary-400">0{index + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="mt-auto flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              onClick={onClose}
              className="btn-primary w-full"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
            <SocialLinks className="flex items-center justify-center gap-3" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

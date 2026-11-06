import { motion } from 'framer-motion';
import { Braces, Download, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { navigation, profile } from '@/data/portfolio';
import { useScrollTo } from '@/context/SmoothScrollContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import MobileMenu from '@/components/layout/MobileMenu';

const sectionIds = navigation.map((item) => item.href.slice(1));

export default function Navbar() {
  const scrollTo = useScrollTo();
  const activeId = useActiveSection(sectionIds);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen
            ? 'border-b border-white/10 bg-ink-950/80 py-3 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5'
          }`}
      >
        <div className="section-shell flex items-center justify-between">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(0);
            }}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-400/40 bg-primary-500/10 text-primary-300 transition duration-500 group-hover:rotate-6 group-hover:border-primary-300">
              <span className="text-sm font-bold tracking-tight">H</span>
            </span>
            <span className="font-display text-lg font-bold tracking-[0.18em] text-white">HASHIM</span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/60 p-1.5 backdrop-blur-xl">
              {navigation.map((item) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <li key={item.href} className="relative">
                    <a
                      href={item.href}
                      onClick={(event) => handleLinkClick(event, item.href)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm transition duration-300 ${isActive ? 'text-white' : 'text-ink-300 hover:text-white'
                        }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-primary-500/20 ring-1 ring-primary-400/40"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="btn-ghost hidden !px-5 !py-2.5 md:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              className="icon-link md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

import { ArrowUp, Braces } from 'lucide-react';
import { footerNavigation, profile } from '@/data/portfolio';
import { useScrollTo } from '@/context/SmoothScrollContext';
import SocialLinks from '@/components/ui/SocialLinks';

export default function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink-950/80">
      <div className="section-shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-400/40 bg-primary-500/10 text-primary-300">
                <Braces className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-display text-lg font-bold tracking-[0.18em] text-white">MOHAMMAD HASHIM</p>
            </div>
            <div className="space-y-1 text-sm text-ink-300">
              <p>Java Full Stack Developer</p>
              <p>Mumbai, Maharashtra, India</p>
            </div>
            <SocialLinks />
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-5 text-ink-400">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(item.href);
                      }}
                      className="text-ink-300 transition duration-300 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="eyebrow text-ink-400">Back to top</p>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="icon-link h-14 w-14 hover:-translate-y-1"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}. All Rights Reserved.</p>
          <p className="font-display uppercase tracking-[0.12em]">Built with React, Three.js &amp; GSAP</p>
        </div>
      </div>
    </footer>
  );
}

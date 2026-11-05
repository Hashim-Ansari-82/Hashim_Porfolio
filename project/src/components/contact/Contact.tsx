import { Mail, MapPin, Phone } from 'lucide-react';
import { contactContent, profile } from '@/data/portfolio';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/ui/Reveal';
import SocialLinks from '@/components/ui/SocialLinks';
import SplitText from '@/components/ui/SplitText';

const contactDetails = [
  { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { id: 'phone', label: 'Phone', value: profile.phone, href: profile.phoneHref, icon: Phone },
  { id: 'location', label: 'Location', value: profile.location, href: undefined, icon: MapPin },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-32 lg:py-40">
      <div className="section-shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <SplitText text={contactContent.heading} className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-2xl leading-[1.2] text-primary-200 sm:text-3xl">{contactContent.question}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base leading-[1.5] text-ink-300 sm:text-lg">{contactContent.description}</p>
          </Reveal>

          <ul className="mt-12 space-y-4">
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon;
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary-400/30 bg-primary-500/10 text-primary-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">{detail.label}</span>
                    <span className="mt-1 block break-words text-sm text-ink-100 sm:text-base">{detail.value}</span>
                  </span>
                </>
              );
              return (
                <li key={detail.id}>
                  <Reveal delay={0.1 * index}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition duration-300 hover:border-primary-400/40 hover:bg-white/[0.05]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">{content}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center gap-5">
              <span className="eyebrow text-ink-400">Social</span>
              <SocialLinks />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

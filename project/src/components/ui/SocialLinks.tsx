import { Github, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { socialLinks } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ className = 'flex items-center gap-3', iconClassName }: SocialLinksProps) {
  return (
    <ul className={className}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        const isExternal = link.href.startsWith('http');
        return (
          <li key={link.id}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              className={iconClassName ?? 'icon-link'}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

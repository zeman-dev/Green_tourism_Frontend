import type { ComponentType } from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/icons/icons';
import css from './SocialList.module.css';

interface SocialLink {
  name: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://www.facebook.com/', Icon: FacebookIcon },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    Icon: InstagramIcon,
  },
  { name: 'X', href: 'https://x.com/', Icon: XIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/', Icon: YoutubeIcon },
];

interface SocialListProps {
  className?: string;
}

export default function SocialList({ className }: SocialListProps) {
  return (
    <ul className={className ? `${css.list} ${className}` : css.list}>
      {socialLinks.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            className={css.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
          >
            <Icon className={css.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

import Link from 'next/link';
import css from './FooterNav.module.css';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Головна' },
  { href: '/stories', label: 'Статті' },
  { href: '/travellers', label: 'Еко-Мандрівники' },
];

interface FooterNavProps {
  className?: string;
}

export default function FooterNav({ className }: FooterNavProps) {
  return (
    <nav className={className} aria-label="Нижнє меню">
      <ul className={css.list}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={css.link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

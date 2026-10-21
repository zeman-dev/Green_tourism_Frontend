import Link from 'next/link';
import { EcoIcon } from '@/components/icons/icons';
import css from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={className ? `${css.logo} ${className}` : css.logo}
    >
      <EcoIcon className={css.icon} />
      <span className={css.text}>
        Природні
        <br />
        Мандри
      </span>
    </Link>
  );
}

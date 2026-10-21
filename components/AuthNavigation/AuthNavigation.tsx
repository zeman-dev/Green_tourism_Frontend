import Link from 'next/link';
import css from './AuthNavigation.module.css';

type AuthNavigationProps = {
  onNavigate?: () => void;
};

export default function AuthNavigation({
  onNavigate,
}: AuthNavigationProps) {
  return (
    <div className={css.actions}>
      <Link
        href="/login"
        className={css.login}
        onClick={onNavigate}
      >
        Вхід
      </Link>

      <Link
        href="/register"
        className={css.register}
        onClick={onNavigate}
      >
        Реєстрація
      </Link>
    </div>
  );
}
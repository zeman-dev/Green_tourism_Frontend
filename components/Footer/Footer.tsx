import Copyright from '@/components/Copyright/Copyright';
import FooterNav from '@/components/FooterNav/FooterNav';
import Logo from '@/components/Logo/Logo';
import SocialList from '@/components/SocialList/SocialList';
import css from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.top}>
          <Logo className={css.logo} />
          <SocialList className={css.social} />
          <FooterNav className={css.nav} />
        </div>
        <div className={css.credits}>
          <Copyright serverYear={currentYear} />
        </div>
      </div>
    </footer>
  );
}

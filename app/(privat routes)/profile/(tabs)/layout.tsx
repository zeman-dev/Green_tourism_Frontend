import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';
import css from './layout.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Мій профіль | Природні мандри',
  robots: { index: false, follow: false },
};

type ProfileLayoutProps = {
  children: ReactNode;
  stories: ReactNode;
};

export default function ProfileLayout({
  children,
  stories,
}: ProfileLayoutProps) {
  return (
    <>
      <Header />
      <main className={css.profile}>
        <ProfileInfo />
        <ProfileTabs />
        {stories}
        {children}
      </main>
      <Footer />
    </>
  );
}

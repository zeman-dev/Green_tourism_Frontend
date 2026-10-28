import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';
import css from './layout.module.css';

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
    <main className={css.profile}>
      <ProfileInfo />
      <ProfileTabs />
      {stories}
      {children}
    </main>
  );
}

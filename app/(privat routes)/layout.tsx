import type { ReactNode } from 'react';
import Header from '@/components/Header/Header';

export default function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
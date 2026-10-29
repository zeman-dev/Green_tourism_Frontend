import type { Metadata } from 'next';
import ConfirmEmail from '@/components/ConfirmEmail/ConfirmEmail';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Підтвердження email | Природні мандри',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ConfirmEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <main className={css.page}>
      <div className="container">
        <ConfirmEmail token={token} />
      </div>
    </main>
  );
}

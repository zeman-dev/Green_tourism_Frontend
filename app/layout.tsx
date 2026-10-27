import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import { Montserrat, Sora, Nunito_Sans } from 'next/font/google';
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Природні мандри',
  description: 'Відкрий Україну заново — еко-мандри для натхнення',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${sora.variable} ${montserrat.variable} ${nunito.variable}`}
    >
      <body>
        <TanstackProvider>{children}</TanstackProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

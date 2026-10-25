import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
    <Header />
      {children}
      <Footer />
    </>
  );
}




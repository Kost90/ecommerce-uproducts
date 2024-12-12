import StoreProvider from './StoreProvider';
import Header from '@/components/header/Header';

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <StoreProvider>
      <Header />
      <main className="container my-6">{children}</main>
    </StoreProvider>
  );
}

export default CostumerFacingLayout;

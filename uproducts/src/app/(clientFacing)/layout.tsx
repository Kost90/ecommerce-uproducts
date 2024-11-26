import StoreProvider from './StoreProvider';
import Header from './_components/header/Header';

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Header />
      <main className="container my-6">{children}</main>
    </StoreProvider>
  );
}

export default CostumerFacingLayout;

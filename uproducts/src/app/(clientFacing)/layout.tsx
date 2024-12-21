import Header from '@/components/header/Header';

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <Header />
      <main className="container my-6 relative">{children}</main>
    </>
  );
}

export default CostumerFacingLayout;

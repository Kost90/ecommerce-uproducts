import Header from '@/components/header/Header';

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="relative">
      <Header />
      <main className="container relative w-full mx-auto mt-44 md:mb-10">{children}</main>
    </div>
  );
}

export default CostumerFacingLayout;

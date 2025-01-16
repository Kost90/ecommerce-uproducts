import Header from '@/components/header/Header';
import SideMenu from '@/components/sideMenu/SideMenu';

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="relative">
      <Header />
      <div className="flex mt-24 md:h-screen-minus-header">
        <SideMenu />
        <main className="container relative w-full mx-auto my-0 md:overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default CostumerFacingLayout;

import Header from '@/components/header/Header';

function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header profile={true} />
      <div className="container my-36 h-screen-minus-header">{children}</div>
    </>
  );
}

export default AdminRootLayout;

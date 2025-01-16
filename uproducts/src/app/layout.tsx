import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils/utils';
import { Toaster } from '@/components/ui/toaster';
import Modal from '@/components/modal/Modal';
import StoreProvider from './(clientFacing)/StoreProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Uproducts | Market',
  description: 'E-commerce market with East Europe products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={cn('min-h-screen bg-white font-sans antialiased lg:overflow-hidden', fontSans.variable)}>
          {children}
          <Toaster />
          <Modal />
        </body>
      </html>
    </StoreProvider>
  );
}

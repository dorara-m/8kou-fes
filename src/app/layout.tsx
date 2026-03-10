import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import './globals.css';

const headingFont = localFont({
  src: '../../public/fonts/smartphone-ui.otf',
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '八煌フェス　〜V体育祭〜',
  description: 'VTuberとリスナーでつくる体育祭の思い出',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`scroll-smooth scroll-pt-12 md:scroll-pt-16 ${headingFont.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

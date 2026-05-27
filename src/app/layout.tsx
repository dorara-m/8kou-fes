import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import './globals.css';

const notoSans = Noto_Sans_JP({
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const headingFont = localFont({
  src: '../../public/fonts/smartphone-ui.otf',
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '八煌フェス　〜V体育祭〜',
  description: '「やりたいことを、きみと一緒に。」',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`scroll-smooth scroll-pt-12 md:scroll-pt-16 ${notoSans.variable} ${headingFont.variable}`}
    >
      <body className="min-h-screen antialiased font-sans">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'SK shieldus Installer Support',
  description: '홈보안 제품 설치 Q&A 지원 포털',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <Header />
        <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      </body>
    </html>
  );
}

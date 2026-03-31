import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ayo Philip Odongo — Web Developer',
  description:
    'Freelance web developer based in Uganda. I build purposeful digital experiences for organisations, schools, and businesses.',
  keywords: [
    'web developer',
    'freelance web developer',
    'Uganda',
    'Lira',
    'frontend developer',
    'Next.js developer',
    'React developer',
    'Ayo Philip Odongo',
    'thephilcode',
  ],
  authors: [{ name: 'Ayo Philip Odongo' }],
  openGraph: {
    type: 'website',
    title: 'Ayo Philip Odongo — Web Developer',
    description: 'Freelance web developer based in Uganda. Building purposeful digital experiences.',
    url: 'https://thephilcode.github.io/',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'ROzLIt3HLlrXALgcnFiWr58-3lAmzQIBCVXmzONu2W8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        {/* Satoshi — available via Fontshare, not on Google Fonts */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

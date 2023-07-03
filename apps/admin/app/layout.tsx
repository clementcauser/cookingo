import { Inter, Roboto_Mono } from 'next/font/google';
import './global.css';
import { PropsWithChildren } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: 'Bienvenue sur Cookingo',
  description: "L'outil de gestion pour votre restaurant",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

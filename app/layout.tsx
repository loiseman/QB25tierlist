
import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'QB Tiers 2025',
  description: 'Vote par tiers pour les QB NFL 2025',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

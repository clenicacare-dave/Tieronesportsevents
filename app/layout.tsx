import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tier One Sports Events',
  description: 'Tier One Sports Events is preparing a premium sports events experience.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--tierone-bg)] text-[var(--tierone-text)] antialiased">
        {children}
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Maksym Zakaliuzhnyi — Middle Frontend Developer Portfolio',
  description: 'Middle Frontend Developer focused on React, Next.js, TypeScript, CMS-driven websites, performance, and production support.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

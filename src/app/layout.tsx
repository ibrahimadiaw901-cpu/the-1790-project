import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Source_Serif_4 } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Coherent — A community for politics',
  description: 'See what is happening, hear what people are saying, share your perspective, and become part of the conversation. Politics is the subject. Community is the product.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sourceSerif.variable}`}>{children}</body>
    </html>
  );
}

import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'XYLEM SEASIDE RESORT - Luxury Beachfront Experience',
  description: 'Experience luxury at XYLEM SEASIDE RESORT. Premium accommodations, world-class dining, and breathtaking ocean views await you.',
  keywords: 'luxury resort, seaside resort, beachfront hotel, ocean view, premium accommodation',
  authors: [{ name: 'XYLEM SEASIDE RESORT' }],
  openGraph: {
    title: 'XYLEM SEASIDE RESORT - Luxury Beachfront Experience',
    description: 'Experience luxury at XYLEM SEASIDE RESORT. Premium accommodations, world-class dining, and breathtaking ocean views await you.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XYLEM SEASIDE RESORT - Luxury Beachfront Experience',
    description: 'Experience luxury at XYLEM SEASIDE RESORT. Premium accommodations, world-class dining, and breathtaking ocean views await you.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
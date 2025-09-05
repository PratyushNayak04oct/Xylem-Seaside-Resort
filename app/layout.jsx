import './globals.css';

export const metadata = {
  title: 'XYLEM Seaside Resort',
  description: 'Discover luxury and tranquility at XYLEM Seaside Resort. Experience pristine beaches, world-class amenities, and exceptional hospitality in our oceanfront paradise. Book your perfect getaway with stunning sea views, fine dining, and relaxation.',
  keywords: 'seaside resort, luxury hotel, beach resort, oceanfront accommodation, vacation resort, sea view rooms, beach holiday, luxury travel',
  authors: [{ name: 'XYLEM Seaside Resort' }],
  creator: 'XYLEM Seaside Resort',
  publisher: 'XYLEM Seaside Resort',
  robots: 'index, follow',
  openGraph: {
    title: 'XYLEM Seaside Resort',
    description: 'Discover luxury and tranquility at XYLEM Seaside Resort. Experience pristine beaches, world-class amenities, and exceptional hospitality in our oceanfront paradise.',
    type: 'website',
    locale: 'en_US',
    siteName: 'XYLEM Seaside Resort',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XYLEM Seaside Resort',
    description: 'Discover luxury and tranquility at XYLEM Seaside Resort. Experience pristine beaches and world-class amenities.',
    creator: '@xylemresort',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0066cc',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
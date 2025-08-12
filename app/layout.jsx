import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Xylem Seaside Resort",
  description: "Xylem Seaside Resort - Premium seaside luxury with top-notch rooms, fine dining, and world-class amenities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster font load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Xylem Seaside Resort - Premium seaside luxury with top-notch rooms, fine dining, and world-class amenities." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.xylemseasideresort.com" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
} 
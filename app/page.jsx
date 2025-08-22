"use client";

import React from "react";
import dynamic from "next/dynamic";
import SEOMetadata from "./components/SEOMetadata";
import { useLoading } from "./components/ClientLayout";

// Lazy load the HeroSection for performance
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  ssr: false,
  loading: () => (
    <div 
      className="h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center"
      role="status"
      aria-label="Loading hero section"
    >
      <div className="text-white text-xl">Loading...</div>
    </div>
  )
});

// Main Home Content Component
const HomeContent = React.memo(() => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* Add more sections here as needed */}
    </main>
  );
});

HomeContent.displayName = 'HomeContent';

export default function Home() {
  const { contentVisible } = useLoading();

  return (
    <>
      <SEOMetadata
        title="Xylem Seaside Resort - Premium Seaside Luxury"
        description="Experience luxury like never before at Xylem Seaside Resort with premium rooms, fine dining, and world-class amenities by the sea."
        keywords="seaside resort, luxury hotel, premium accommodation, fine dining, beachfront, vacation, travel"
        canonicalUrl="https://www.xylemseasideresort.com"
      />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      
      {/* Only render content when loading is complete */}
      {contentVisible && <HomeContent />}
    </>
  );
}
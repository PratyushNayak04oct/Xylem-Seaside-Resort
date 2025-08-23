"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import SEOMetadata from "./components/SEOMetadata";
import LoadingScreen from "./components/LoadingScreen"; // Add this import

// Lazy load the HeroSection for performance
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  ssr: false,
  loading: () => null // Remove the loading fallback since we have the loading screen
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
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

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

      {/* Loading Screen */}
      {!isLoadingComplete && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      {/* Main Content */}
      <div 
        className={`main-content ${isLoadingComplete ? 'content-visible' : 'content-hidden'}`}
        id="main-content"
      >
        <HomeContent />
      </div>
    </>
  );
}
"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import SEOMetadata from "./components/SEOMetadata";

// Lazy load the LoadingScreen for performance
const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), {
  ssr: false,
  loading: () => (
    <div 
      className="h-screen w-screen bg-gray-900 flex items-center justify-center"
      role="status"
      aria-label="Loading application"
    >
      <div className="sr-only">Loading...</div>
    </div>
  )
});

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

// Main Home Content Component (now just the Hero Section)
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
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    requestAnimationFrame(() => {
      setContentVisible(true);
    });
  }, []);

  // Prevent scroll during loading and manage focus
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Announce loading state to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Application is loading, please wait...';
      document.body.appendChild(announcement);
      
      return () => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      };
    } else {
      document.body.style.overflow = '';
      // Announce completion to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Application loaded successfully';
      document.body.appendChild(announcement);
      
      // Focus management - focus on main content
      const cleanup = setTimeout(() => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.focus();
        }
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 100);

      return () => {
        clearTimeout(cleanup);
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      };
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Performance optimization: preload critical resources
  useEffect(() => {
    // Preload critical images and video poster
    const preloadResources = [
      '/Loading-Screen-Image.webp',
      '/hero-poster.jpg'
    ];

    preloadResources.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Preload video metadata if not on mobile to save bandwidth
    if (typeof window !== 'undefined' && !window.matchMedia('(max-width: 768px)').matches) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = '/Hero Section Video.webm';
    }
  }, []);

  return (
    <>
      <SEOMetadata
        title="Your App Name - Welcome to the Future"
        description="Experience innovation like never before with our cutting-edge solutions that transform the way you work and live."
        keywords="innovation, technology, future, cutting-edge solutions, platform, transformation"
        canonicalUrl="https://yourapp.com"
      />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      {/* Main Content */}
      <div 
        id="main-content"
        className={`main-content ${contentVisible ? 'content-visible' : 'content-hidden'}`}
        style={{ 
          visibility: contentVisible ? 'visible' : 'hidden',
          opacity: contentVisible ? 1 : 0 
        }}
        tabIndex={-1}
      >
        <HomeContent />
      </div>
    </>
  );
}
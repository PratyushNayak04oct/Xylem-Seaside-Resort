"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";

// Create a loading context
const LoadingContext = createContext();

// Export the context for use in other components
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Lazy load the LoadingScreen for performance
const LoadingScreen = dynamic(() => import("./LoadingScreen"), {
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

const ClientLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    requestAnimationFrame(() => {
      setContentVisible(true);
    });
  };

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
      '/hero-poster.jpg',
      '/Circular-logo.webp'
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
    <LoadingContext.Provider value={{ isLoading, contentVisible }}>
      {/* Loading Screen - Shows first */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      {/* Main Content - Only shows after loading is complete */}
      <div 
        className={`main-layout ${contentVisible ? 'content-visible' : 'content-hidden'}`}
        style={{ 
          visibility: contentVisible ? 'visible' : 'hidden',
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {/* Navbar - Only renders when content is visible */}
        {contentVisible && <Navbar />}
        
        {/* Page content */}
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </div>
    </LoadingContext.Provider>
  );
};

export default ClientLayout;
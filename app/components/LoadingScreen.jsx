"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import AnimatedLogo from "./AnimatedLogo";
import bgImage from "../../public/Loading-Screen-Image.webp";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    // Wait 500ms after logo animation completes
    setTimeout(() => {
      setIsAnimatingOut(true);
      
      // Remove loading screen after animation completes
      setTimeout(() => {
        setShowContent(true);
        onLoadingComplete?.();
      }, 800); // Match CSS animation duration
    }, 500);
  }, [onLoadingComplete]);

  if (showContent) {
    return null; // Loading screen is completely removed
  }

  return (
    <>
      {/* Loading Screen Overlay */}
      <div 
        className={`loading-screen ${isAnimatingOut ? 'animate-out' : ''}`}
        role="img"
        aria-label="Loading screen with animated company logo"
        aria-live="polite"
        aria-atomic="true"
      >
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          quality={80}
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
          loading="eager"
        />
        
        {/* Loading content container */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <AnimatedLogo onAnimationComplete={handleAnimationComplete} />
        </div>
        
        {/* Loading indicator for screen readers */}
        <div className="sr-only" aria-live="assertive">
          {isAnimatingOut ? "Loading complete" : "Loading..."}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
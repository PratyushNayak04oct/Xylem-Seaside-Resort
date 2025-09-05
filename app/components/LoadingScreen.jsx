"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import AnimatedLogo from "./AnimatedLogo";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const loadingScreenRef = useRef(null);
  const backgroundImageRef = useRef(null);

  const handleAnimationComplete = useCallback(() => {
    console.log('Logo animation completed');
    setIsAnimationComplete(true);
    
    // Start exit animation after a brief pause
    setTimeout(() => {
      console.log('Starting exit animation');
      setIsExiting(true);
    }, 800); // Pause to let users see the completed logo
  }, []);

  // Initialize loading screen position and opacity
  useEffect(() => {
    if (loadingScreenRef.current) {
      gsap.set(loadingScreenRef.current, {
        y: 0,
        opacity: 1,
        visibility: 'visible'
      });
    }
  }, []);

  // GSAP animation for slide-up exit effect
  useGSAP(() => {
    if (isExiting && loadingScreenRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log('Exit animation completed');
          // Small delay before calling onLoadingComplete
          setTimeout(() => {
            onLoadingComplete?.();
          }, 100);
        }
      });

      // Smooth slide-up animation with better easing
      tl.to(loadingScreenRef.current, {
        y: "-100%",
        duration: 1.2,
        ease: "power3.inOut",
        transformOrigin: "top center"
      });

      return () => {
        tl.kill();
      };
    }
  }, { 
    dependencies: [isExiting], 
    scope: loadingScreenRef,
    revertOnUpdate: true 
  });

  return (
    <div 
      ref={loadingScreenRef}
      className="loading-screen"
      role="img"
      aria-label="Loading screen with animated company logo"
      aria-live="polite"
      aria-atomic="true"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        backgroundColor: '#000',
        overflow: 'hidden',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Background Image */}
      <div 
        ref={backgroundImageRef}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <Image
          src="/Loading-Screen-Image.webp"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
          loading="eager"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
      
      {/* Loading content container */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
        style={{ zIndex: 2 }}
      >
        <div className="w-full max-w-md aspect-square flex items-center justify-center">
          <AnimatedLogo 
            onAnimationComplete={handleAnimationComplete}
            key="loading-logo" // Ensure consistent mounting
          />
        </div>
      </div>
      
      {/* Loading indicator for screen readers */}
      <div className="sr-only" aria-live="assertive">
        {isAnimationComplete ? "Animation complete, loading site..." : "Loading..."}
      </div>
    </div>
  );
};

export default LoadingScreen;
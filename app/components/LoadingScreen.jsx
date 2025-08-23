"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import AnimatedLogo from "./AnimatedLogo";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const loadingScreenRef = useRef(null);

  const handleAnimationComplete = useCallback(() => {
    console.log('Logo animation completed'); // Debug log
    
    // Start slide-up animation immediately after logo animation completes
    setTimeout(() => {
      console.log('Starting slide-up animation'); // Debug log
      setIsAnimationStarted(true);
    }, 300); // Small delay after logo animation
  }, []);

  // GSAP animation for slide-up effect
  useGSAP(() => {
    if (isAnimationStarted && loadingScreenRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log('Slide-up animation completed');
          // Notify parent that loading is complete after animation finishes
          onLoadingComplete?.();
        }
      });

      // Slide up animation
      tl.to(loadingScreenRef.current, {
        y: "-100%",
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "top center"
      });

      return () => {
        tl.kill();
      };
    }
  }, { dependencies: [isAnimationStarted], scope: loadingScreenRef });

  return (
    <div 
      ref={loadingScreenRef}
      className="loading-screen"
      role="img"
      aria-label="Loading screen with animated company logo"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Background Image */}
      <Image
        src="/Loading-Screen-Image.webp"
        alt=""
        fill
        priority
        quality={80}
        className="object-cover"
        sizes="100vw"
        loading="eager"
      />
      
      {/* Loading content container */}
      <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md aspect-square flex items-center justify-center">
          <AnimatedLogo onAnimationComplete={handleAnimationComplete} />
        </div>
      </div>
      
      {/* Loading indicator for screen readers */}
      <div className="sr-only" aria-live="assertive">
        {isAnimationStarted ? "Loading complete" : "Loading..."}
      </div>
    </div>
  );
};

export default LoadingScreen;
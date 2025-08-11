"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const HeroSection = ({ isVisible = false }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Always show hero section immediately to prevent black screen
    gsap.set(heroRef.current, { opacity: 1 });

    if (!isVisible || !heroRef.current) {
      // If not visible yet, show static content as fallback
      gsap.set(videoRef.current, {
        scale: 1,
        opacity: 1,
        transformOrigin: "center center"
      });
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Simple fade-in for reduced motion users
      gsap.set(videoRef.current, { scale: 1, opacity: 1 });
      return;
    }

    // Create GSAP timeline for video zoom animation
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    // Set initial state for video
    gsap.set(videoRef.current, {
      scale: 1.2,
      opacity: 0,
      transformOrigin: "center center"
    });

    // Smooth zoom-in animation
    tl.to({}, { duration: 0.1 }) // Small delay for smooth transition
    .to(videoRef.current, {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power3.out"
    });

    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf(videoRef.current);
    };
  }, [isVisible]);

  return (
    <div 
      ref={heroRef}
      className="hero-section relative w-screen h-screen overflow-hidden" 
      style={{ 
        margin: 0, 
        padding: 0, 
        background: '#000',
        opacity: 1  // Always visible
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0"
        style={{
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          objectFit: 'cover',
          margin: 0,
          padding: 0
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/Hero Section Video.webm" type="video/webm" />
        <source src="/Hero Section Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default HeroSection ; 
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = ({ isVisible = false }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Always show hero section immediately to prevent black screen
    gsap.set(heroRef.current, { opacity: 1 });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isVisible || !heroRef.current) {
      // If loading screen hasn't ended, show video immediately as fallback
      gsap.set(videoRef.current, {
        scale: 1,
        opacity: 1,
        transformOrigin: "center center"
      });
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        y: 0,
        opacity: 1
      });
      return;
    }

    if (prefersReducedMotion) {
      // Simple appearance for reduced motion users
      gsap.set([videoRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      });
      return;
    }

    // STEP 1: Show video immediately when loading screen ends (no animation delay)
    gsap.set(videoRef.current, {
      scale: 1.2,
      opacity: 1, // Video appears immediately
      transformOrigin: "center center"
    });

    // STEP 2: Hide text elements initially
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      y: 100,
      opacity: 0
    });

    // STEP 3: Start video zoom animation immediately
    const videoTl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    videoTl.to(videoRef.current, {
      scale: 1,
      duration: 2,
      ease: "power3.out"
    });

    // STEP 4: Start text animations after a short delay
    const textTl = gsap.timeline({
      delay: 0.5, // Small delay after video starts
      defaults: { ease: "power2.out" }
    });

    textTl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Parallax effect for video
    gsap.to(videoRef.current, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        refreshPriority: -1
      }
    });

    // Overlay parallax effect
    gsap.to(overlayRef.current, {
      opacity: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top center',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Cleanup function
    return () => {
      videoTl.kill();
      textTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([videoRef.current, titleRef.current, subtitleRef.current, ctaRef.current, overlayRef.current]);
    };
  }, [isVisible]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: section, offsetY: 80 },
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="hero-section relative w-screen h-screen overflow-hidden"
      style={{
        margin: 0,
        padding: 0,
        background: '#000',
        opacity: 1
      }}
    >
      {/* Background Video - Full Screen Coverage */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0"
        style={{
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          objectFit: 'cover',
          margin: 0,
          padding: 0,
          position: 'fixed', // Fixed positioning for full coverage
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'translateZ(0)'
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/Hero Section Video.webm" type="video/webm" />
        <source src="/Hero Section Video.mp4" type="video/mp4" />
        <source src="https://player.vimeo.com/external/342333493.sd.mp4?s=47deb8b6e6b8e2b0b6b8e2b0b6b8e2b0b6b8e2b0&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        
      {/* Video Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 z-5"
        style={{ 
          willChange: 'opacity',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)'
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ willChange: 'transform, opacity' }}
          >
            Welcome to
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Xylem Resort
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            Experience luxury and tranquility in our paradise retreat. 
            Where nature meets elegance.
          </p>
          
          <div 
            ref={ctaRef} 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ willChange: 'transform, opacity' }}
          >
            <button 
              onClick={() => scrollToSection('rooms')}
              className="group relative px-8 py-4 font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa, #93c5fd)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite',
                willChange: 'transform, background-position'
              }}
            >
              <span className="relative z-10 text-white">Explore Rooms</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('video')}
              className="group relative px-8 py-4 font-semibold rounded-full transform hover:scale-105 transition-all duration-300 border-2 overflow-hidden"
              style={{
                borderImage: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa, #93c5fd) 1',
                background: 'transparent',
                color: 'white',
                willChange: 'transform, background'
              }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Watch Video
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa, #93c5fd)',
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Hero Section Full Screen Coverage */
        .hero-section {
          background: #000;
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        /* Performance optimizations */
        video, h1, p, div[style*="willChange"] {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Ensure video covers entire viewport */
        video {
          object-fit: cover !important;
          width: 100vw !important;
          height: 100vh !important;
          min-width: 100vw !important;
          min-height: 100vh !important;
        }

        /* Mobile video adjustments */
        @media (max-width: 768px) {
          video {
            object-position: center center;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });

    // Hero content animations
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Parallax effect for video
    gsap.to(videoRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-black"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform transform translate-z-0 backface-hidden"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          aria-hidden="true"
          style={{ perspective: '1000px' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight will-change-transform"
        >
          XYLEM SEASIDE
          <br />
          <span className="text-teal-300">RESORT</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-inter text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed will-change-transform"
        >
          Where luxury meets the endless horizon. Experience unparalleled comfort 
          and breathtaking ocean views at our exclusive beachfront paradise.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center will-change-transform">
          <button className="relative overflow-hidden bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 will-change-transform translate-z-0">
            Book Your Stay
          </button>
          <button className="relative overflow-hidden border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 will-change-transform translate-z-0">
            Explore Resort
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer will-change-transform"
        onClick={scrollToNext}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToNext();
          }
        }}
      >
        <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300">
          <span className="font-inter text-sm mb-2 tracking-wide">Discover More</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ isVisible = false }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return; // Only run when loading is complete

    const tl = gsap.timeline({ delay: 1 });
    
    // Animate hero content - exact same as your provided code
    tl.fromTo(titleRef.current,
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

    // Parallax effect for video - exact same as your provided code
    gsap.to(videoRef.current, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
    <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120%] object-cover"
        >
          <source src="/Hero Section Video.webm" type="video/webm" />
          <source src="/Hero Section Video.mp4" type="video/mp4" />
          <source src="https://player.vimeo.com/external/342333493.sd.mp4?s=47deb8b6e6b8e2b0b6b8e2b0b6b8e2b0b6b8e2b0&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Welcome to
            <span className="block text-amber-400">Xylem Resort</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience luxury and tranquility in our paradise retreat. 
            Where nature meets elegance.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('rooms')}
              className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Rooms
            </button>
            
            <button 
              onClick={() => scrollToSection('video')}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Watch Video
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
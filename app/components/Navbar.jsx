"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef([]);
  const logoRef = useRef(null);
  const hamburgerRef = useRef(null);
  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Navigation items - ensure consistent rendering
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Amenities", href: "/amenities" },
    { name: "Food", href: "/food" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  // Set client state after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Initial animations on component mount - Updated timing
  useEffect(() => {
    if (!isClient) return;
    
    const ctx = gsap.context(() => {
      // Navbar slide down animation - earlier start
      gsap.fromTo(navRef.current, 
        { 
          y: -100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.2 // Reduced from 0.5
        }
      );

      // Logo animation - appears first now
      gsap.fromTo(logoRef.current, 
        { 
          scale: 0, 
          rotation: -180, 
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3 // Reduced from 1, appears before nav items
        }
      );

      // Staggered animation for nav items - appears after logo
      gsap.fromTo(navItemsRef.current, 
        { 
          y: -30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.6 // Reduced from 0.8, appears after logo
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, [isClient]);

  // Mobile menu animations
  const toggleMobileMenu = () => {
    if (!isClient) return;
    
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      
      // Animate menu in
      gsap.timeline()
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .fromTo(mobileMenuRef.current,
          { x: "100%" },
          { 
            x: "0%",
            duration: 0.5,
            ease: "power3.out"
          },
          "-=0.1"
        )
        .fromTo(closeButtonRef.current,
          { scale: 0, rotation: -90, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
          },
          "-=0.3"
        )
        .fromTo(mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.3"
        );
    } else {
      // Animate menu out
      gsap.timeline()
        .to(closeButtonRef.current,
          {
            scale: 0,
            rotation: 90,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          }
        )
        .to(mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
          {
            x: 50,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in"
          },
          "-=0.1"
        )
        .to(mobileMenuRef.current,
          { 
            x: "100%",
            duration: 0.4,
            ease: "power3.in"
          },
          "-=0.1"
        )
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setIsMobileMenuOpen(false)
        }, "-=0.2");
    }
  };

  // Hamburger animation
  const animateHamburger = (isOpen) => {
    if (!isClient || !hamburgerRef.current) return;
    
    const lines = hamburgerRef.current.querySelectorAll('.hamburger-line');
    
    if (isOpen) {
      gsap.timeline()
        .to(lines[0], { rotation: 45, y: 6, duration: 0.3, ease: "power2.out" })
        .to(lines[1], { opacity: 0, duration: 0.2, ease: "power2.out" }, "-=0.2")
        .to(lines[2], { rotation: -45, y: -6, duration: 0.3, ease: "power2.out" }, "-=0.3");
    } else {
      gsap.timeline()
        .to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: "power2.out" })
        .to(lines[1], { opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.2")
        .to(lines[2], { rotation: 0, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.3");
    }
  };

  // Handle mobile menu toggle with hamburger animation
  const handleMobileToggle = () => {
    animateHamburger(!isMobileMenuOpen);
    toggleMobileMenu();
  };

  // Close button animation
  const animateCloseButton = () => {
    if (!isClient || !closeButtonRef.current) return;
    
    gsap.to(closeButtonRef.current, {
      rotation: 180,
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  // Handle close button click
  const handleCloseClick = () => {
    animateCloseButton();
    setTimeout(() => {
      animateHamburger(false);
      toggleMobileMenu();
    }, 100);
  };

  // Render a simple version on server, full version on client
  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.55)] backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation - Left Side */}
            <div className="hidden lg:flex items-center space-x-12 xl:space-x-16">
              {navItems.slice(0, 3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-white font-medium text-lg tracking-wide transition-all duration-300 cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Logo - Center */}
            <a
              href="/"
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 relative">
                <Image
                  src="/Circular-logo.webp"
                  alt="Xylem Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
            </a>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden lg:flex items-center space-x-12 xl:space-x-16">
              {navItems.slice(3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-white font-medium text-lg tracking-wide transition-all duration-300 cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button - Only show on mobile screens */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer hamburger-container"
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line block w-6 h-0.5 bg-white transform transition-all duration-300"></span>
              <span className="hamburger-line block w-6 h-0.5 bg-white transform transition-all duration-300"></span>
              <span className="hamburger-line block w-6 h-0.5 bg-white transform transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-glass ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation - Left Side - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-12 xl:space-x-16">
              {navItems.slice(0, 3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={el => navItemsRef.current[index] = el}
                  className="nav-link text-white font-medium text-lg tracking-wide transition-all duration-300 cursor-pointer relative"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Logo - Center */}
            <a
              href="/"
              ref={logoRef}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 relative">
                <Image
                  src="/Circular-logo.webp"
                  alt="Xylem Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
            </a>

            {/* Desktop Navigation - Right Side - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navItems.slice(3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={el => navItemsRef.current[index + 3] = el}
                  className="nav-link text-white font-medium text-lg tracking-wide transition-all duration-300 cursor-pointer relative"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button - Only visible on mobile (below lg breakpoint) */}
            <button
              ref={hamburgerRef}
              className="lg:hidden hamburger-container"
              onClick={handleMobileToggle}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line block w-6 h-0.5 bg-white transform transition-all duration-300"></span>
              <span className="hamburger-line block w-6 h-0.5 bg-white transform transition-all duration-300"></span>
              <span className="hamburger-line block w-6 h-0.5 bg-white transform transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm mobile-overlay"
          style={{ opacity: 0 }}
          onClick={handleMobileToggle}
        />
      )}

      {/* Mobile Menu - Translucent background */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 mobile-menu z-50 transform translate-x-full"
        style={{ 
          maxWidth: "85vw",
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)"
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleCloseClick}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 close-button"
          aria-label="Close mobile menu"
          style={{ opacity: 0 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col h-full pt-20 px-8">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-12">
            <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
              <Image
                src="/Circular-logo.webp"
                alt="Xylem Logo"
                fill
                className="object-contain p-2"
                sizes="64px"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="mobile-nav-item text-white text-xl font-medium py-3 px-4 rounded-lg hover:bg-[rgba(255,255,255,0.1)] hover:text-blue-400 transition-all duration-300 transform hover:translateX-2"
                onClick={handleMobileToggle}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="mt-auto mb-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Xylem</p>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for improved animations and responsiveness */}
      <style jsx>{`
        /* Updated navbar glass styles with darker background */
        .navbar-glass {
          background: rgba(0, 0, 0, 0.55); /* Increased from 0.45 */
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
        }

        .navbar-glass.scrolled {
          background: rgba(0, 0, 0, 0.85); /* Increased from 0.8 */
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.5rem 0;
        }

        /* Navigation link enhanced hover effects */
        .nav-link {
          position: relative;
          display: inline-block;
          transform: translateZ(0);
          will-change: transform, color;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 4px;
          bottom: -8px;
          left: 50%;
          background: linear-gradient(90deg, #87CEEB, #00BFFF, #ADD8E6);
          background-size: 200% 100%;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-50%) scaleX(0);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(135, 206, 235, 0.5);
        }

        .nav-link:hover::after {
          width: 100%;
          transform: translateX(-50%) scaleX(1);
          background-position: -200% 0;
        }

        /* Mobile menu enhanced styles */
        .mobile-menu {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
        }

        .mobile-nav-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, background-color;
        }

        .mobile-nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(59, 130, 246, 0.1), 
            rgba(139, 92, 246, 0.1), 
            transparent
          );
          transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }

        .mobile-nav-item:hover::before {
          left: 100%;
        }

        .mobile-nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(8px) scale(1.02);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .mobile-nav-item:active {
          transform: translateX(8px) scale(0.98);
        }

        /* Close button styles */
        .close-button {
          position: relative;
          transform: translateZ(0);
          will-change: transform, background-color;
        }

        .close-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ef4444, #f97316, #eab308, #ef4444);
          background-size: 400% 400%;
          border-radius: 50%;
          opacity: 0;
          z-index: -1;
          animation: gradientShift 2s ease infinite;
          transition: opacity 0.3s ease;
        }

        .close-button:hover::before {
          opacity: 0.5;
        }

        .close-button:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.25);
        }

        .close-button:active {
          transform: scale(0.95);
        }

        /* Hamburger menu enhanced animation */
        .hamburger-container {
          width: 32px;
          height: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .hamburger-container:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          background: linear-gradient(90deg, #ffffff, #e2e8f0);
          border-radius: 2px;
          transform-origin: center;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
          margin: 2px 0;
        }

        /* Mobile menu overlay */
        .mobile-overlay {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from { 
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        /* Responsive enhancements */
        @media (max-width: 1024px) {
          /* Hamburger is visible below lg breakpoint (1024px) */
          .hamburger-container {
            display: flex;
          }
        }

        @media (min-width: 1025px) {
          /* Hide hamburger on desktop */
          .hamburger-container {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .navbar-glass {
            padding: 0.75rem 0;
          }
          
          .mobile-menu {
            width: min(320px, 85vw);
          }
          
          .mobile-nav-item {
            font-size: 1.125rem;
            padding: 0.875rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-glass {
            padding: 0.5rem 0;
          }
          
          .mobile-menu {
            width: min(280px, 90vw);
          }
          
          .mobile-nav-item {
            font-size: 1rem;
            padding: 0.75rem 0.875rem;
          }
        }

        /* Performance optimizations */
        .navbar-glass,
        .mobile-menu,
        .nav-link,
        .close-button {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .nav-link::after,
          .mobile-nav-item::before,
          .hamburger-line,
          .close-button::before {
            transition: none;
            animation: none;
          }
          
          .mobile-nav-item:hover,
          .close-button:hover {
            transform: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .navbar-glass {
            background: rgba(0, 0, 0, 0.9);
            border-bottom: 2px solid #ffffff;
          }
          
          .nav-link::after {
            background: #ffffff;
            height: 3px;
          }
          
          .mobile-nav-item:hover {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid #ffffff;
          }

          .close-button {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid #ffffff;
          }
        }

        /* Focus management for accessibility */
        .nav-link:focus,
        .mobile-nav-item:focus,
        .hamburger-container:focus,
        .close-button:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }

        .nav-link:focus:not(:focus-visible),
        .mobile-nav-item:focus:not(:focus-visible),
        .hamburger-container:focus:not(:focus-visible),
        .close-button:focus:not(:focus-visible) {
          outline: none;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent text selection on navigation elements */
        .nav-link,
        .mobile-nav-item,
        .hamburger-container,
        .close-button {
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        /* Custom scrollbar for mobile menu if content overflows */
        .mobile-menu::-webkit-scrollbar {
          width: 6px;
        }

        .mobile-menu::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .mobile-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .mobile-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default Navbar;
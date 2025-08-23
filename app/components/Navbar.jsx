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

  // Simple mounting animation - only slide down, no going up
  useEffect(() => {
    if (!isClient) return;
    
    const ctx = gsap.context(() => {
      // Set initial state without animation, then animate down
      gsap.set(navRef.current, { y: -100, opacity: 0 });
      
      // Simple slide down animation
      gsap.to(navRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
      });
    }, navRef);

    return () => ctx.revert();
  }, [isClient]);

  // Mobile menu animations - FIXED: No black screen
  const toggleMobileMenu = () => {
    if (!isClient) return;
    
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      
      // Start with menu slide-in first, then overlay fade-in
      gsap.timeline()
        .fromTo(mobileMenuRef.current,
          { x: "100%" },
          { 
            x: "0%",
            duration: 0.4,
            ease: "power3.out"
          }
        )
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.2") // Start overlay fade slightly before menu finishes
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
            stagger: 0.08,
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
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in"
        }, "-=0.2")
        .to(mobileMenuRef.current,
          { 
            x: "100%",
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => setIsMobileMenuOpen(false)
          },
          "-=0.3"
        );
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Desktop Navigation - Left Side */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.slice(0, 3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-black font-medium text-base tracking-wide transition-all duration-300 cursor-pointer"
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
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <Image
                  src="/Circular-logo.webp"
                  alt="Xylem Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 40px, 48px"
                />
              </div>
            </a>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.slice(3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-black font-medium text-base tracking-wide transition-all duration-300 cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button - Only show on mobile screens */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 cursor-pointer hamburger-container"
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line block w-5 h-0.5 bg-black transform transition-all duration-300"></span>
              <span className="hamburger-line block w-5 h-0.5 bg-black transform transition-all duration-300"></span>
              <span className="hamburger-line block w-5 h-0.5 bg-black transform transition-all duration-300"></span>
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
          <div className="flex items-center justify-between h-12">
            {/* Desktop Navigation - Left Side - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.slice(0, 3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={el => navItemsRef.current[index] = el}
                  className="nav-link text-black font-medium text-base tracking-wide transition-all duration-300 cursor-pointer relative"
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
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <Image
                  src="/Circular-logo.webp"
                  alt="Xylem Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 40px, 48px"
                />
              </div>
            </a>

            {/* Desktop Navigation - Right Side - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.slice(3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={el => navItemsRef.current[index + 3] = el}
                  className="nav-link text-black font-medium text-base tracking-wide transition-all duration-300 cursor-pointer relative"
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
              <span className="hamburger-line block w-5 h-0.5 bg-black transform transition-all duration-300"></span>
              <span className="hamburger-line block w-5 h-0.5 bg-black transform transition-all duration-300"></span>
              <span className="hamburger-line block w-5 h-0.5 bg-black transform transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Now with transparent background initially */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 mobile-overlay"
          style={{ 
            background: "transparent", // Start transparent
            backdropFilter: "blur(0px)" // Start with no blur
          }}
          onClick={handleMobileToggle}
        />
      )}

      {/* Mobile Menu - Translucent background */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 mobile-menu z-50 transform translate-x-full"
        style={{ 
          maxWidth: "85vw",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)"
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleCloseClick}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm border border-black/20 flex items-center justify-center text-black hover:bg-black/20 transition-all duration-300 close-button"
          aria-label="Close mobile menu"
          style={{ opacity: 0 }}
        >
          <svg
            width="16"
            height="16"
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

        <div className="flex flex-col h-full pt-12 px-6">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-black/10 backdrop-blur-sm border border-black/20">
              <Image
                src="/Circular-logo.webp"
                alt="Xylem Logo"
                fill
                className="object-contain p-1.5"
                sizes="40px"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-2 flex-1 justify-center">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="mobile-nav-item text-black text-base font-medium py-2 px-3 rounded-lg hover:bg-black/5 transition-all duration-300 transform hover:translateX-2"
                onClick={handleMobileToggle}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="pb-4 text-center flex-shrink-0">
            <p className="text-gray-600 text-xs">© 2024 Xylem</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
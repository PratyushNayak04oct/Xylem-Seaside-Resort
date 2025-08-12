"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef([]);
  const logoRef = useRef(null);
  const hamburgerRef = useRef(null);
  const overlayRef = useRef(null);

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Rooms", href: "#rooms" },
    { name: "Amenities", href: "#amenities" },
    { name: "Food", href: "#food" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animations on component mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slide down animation
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
          delay: 0.5
        }
      );

      // Staggered animation for nav items
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
          delay: 0.8
        }
      );

      // Logo animation
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
          delay: 1
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animations
  const toggleMobileMenu = () => {
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
        .to(mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
          {
            x: 50,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in"
          }
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

  // Nav item hover animations
  const handleNavItemHover = (e, isEntering) => {
    const item = e.target;
    
    if (isEntering) {
      gsap.to(item, {
        y: -4,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(item, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[rgba(0,0,0,0.8)] backdrop-blur-md py-2" 
            : "bg-[rgba(0,0,0,0.35)] backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation - Left Side */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.slice(0, 3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={el => navItemsRef.current[index] = el}
                  className="nav-link text-white font-medium text-lg tracking-wide transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => handleNavItemHover(e, true)}
                  onMouseLeave={(e) => handleNavItemHover(e, false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Logo - Center */}
            <div
              ref={logoRef}
              className="flex-shrink-0 cursor-pointer group logo-container"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 relative transform hover:scale-110 transition-transform duration-300 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <Image
                  src="/Xylem-Logo.webp"
                  alt="Xylem Logo"
                  fill
                  className="object-contain p-2"
                  priority
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
            </div>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.slice(3).map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={el => navItemsRef.current[index + 3] = el}
                  className="nav-link text-white font-medium text-lg tracking-wide transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => handleNavItemHover(e, true)}
                  onMouseLeave={(e) => handleNavItemHover(e, false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerRef}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer hamburger-container"
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

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 bg-[rgba(0,0,0,0.95)] backdrop-blur-md z-50 transform translate-x-full mobile-menu"
        style={{ maxWidth: "85vw" }}
      >
        <div className="flex flex-col h-full pt-20 px-8">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-12">
            <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
              <Image
                src="/Xylem-Logo.webp"
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

      {/* Additional CSS for enhanced animations */}
      <style jsx>{`
        .nav-link {
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 50%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .mobile-nav-item {
          position: relative;
          overflow: hidden;
        }
        
        .mobile-nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .mobile-nav-item:hover::before {
          left: 100%;
        }

        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        /* Ensure mobile menu is above everything */
        .fixed {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* Logo container hover effect */
        .logo-container::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 400% 400%;
          border-radius: 50%;
          opacity: 0;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
          transition: opacity 0.3s ease;
        }

        .logo-container:hover::before {
          opacity: 0.7;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
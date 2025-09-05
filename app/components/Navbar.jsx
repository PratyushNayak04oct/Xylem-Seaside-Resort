"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const leftItemsRef = useRef(null);
  const rightItemsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Food', href: '/food' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const leftItems = navItems.slice(0, 3);
  const rightItems = navItems.slice(3);

  // Navbar entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Navbar slides down
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    // Left nav items animate in
    .fromTo(leftItemsRef.current?.children || [], 
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    // Right nav items animate in
    .fromTo(rightItemsRef.current?.children || [], 
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    )
    // Logo scales in
    .fromTo(logoRef.current, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (isMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(mobileMenuRef.current?.children || [],
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg will-change-transform"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation Items */}
          <div ref={leftItemsRef} className="hidden lg:flex items-center space-x-10">
            {leftItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-inter font-medium text-sm tracking-wide transition-all duration-300 hover:text-teal-600 group transform will-change-transform translate-z-0 backface-hidden select-none ${
                  pathname === item.href 
                    ? 'text-teal-600' 
                    : 'text-gray-700 hover:text-teal-600'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
                style={{ perspective: '1000px' }}
              >
                <span className="relative inline-block">
                  {item.name}
                  <span 
                    className={`absolute -bottom-1.5 left-1/2 h-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-400 ease-cubic-bezier-custom transform -translate-x-1/2 scale-x-0 rounded-full shadow-sm ${
                      pathname === item.href ? 'w-full scale-x-100' : 'w-0 group-hover:w-full group-hover:scale-x-100'
                    }`}
                    style={{ 
                      backgroundSize: '200% 100%',
                      animation: pathname === item.href || undefined ? 'gradientShift 2s ease infinite' : undefined
                    }}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="XYLEM SEASIDE RESORT Home">
              <div className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] transition-all duration-300">
                <AnimatedLogo 
                  className="w-full h-full" 
                  autoPlay={false}
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation Items */}
          <div ref={rightItemsRef} className="hidden lg:flex items-center space-x-10">
            {rightItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-inter font-medium text-sm tracking-wide transition-all duration-300 hover:text-teal-600 group transform will-change-transform translate-z-0 backface-hidden select-none ${
                  pathname === item.href 
                    ? 'text-teal-600' 
                    : 'text-gray-700 hover:text-teal-600'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
                style={{ perspective: '1000px' }}
              >
                <span className="relative inline-block">
                  {item.name}
                  <span 
                    className={`absolute -bottom-1.5 left-1/2 h-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-400 ease-cubic-bezier-custom transform -translate-x-1/2 scale-x-0 rounded-full shadow-sm ${
                      pathname === item.href ? 'w-full scale-x-100' : 'w-0 group-hover:w-full group-hover:scale-x-100'
                    }`}
                    style={{ 
                      backgroundSize: '200% 100%',
                      animation: pathname === item.href || undefined ? 'gradientShift 2s ease infinite' : undefined
                    }}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-600 transition-all duration-300 transform will-change-transform translate-z-0 backface-hidden select-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              style={{ perspective: '1000px' }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                {isMenuOpen ? (
                  <X className="block h-6 w-6 transition-transform duration-300 transform rotate-90" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6 transition-transform duration-300" aria-hidden="true" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            id="mobile-menu"
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform will-change-transform translate-z-0 backface-hidden select-none overflow-hidden ${
                    pathname === item.href
                      ? 'text-teal-600 bg-teal-600/10 translate-x-1.5 scale-102'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-black/5 hover:translate-x-1.5 hover:scale-102'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  style={{ 
                    perspective: '1000px',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span 
                    className = "absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-transparent via-amber-400/10 via-red-500/10 to-transparent transition-all duration-600 ease-cubic-bezier-custom -translate-x-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), rgba(239, 68, 68, 0.1), transparent)'
                    }}
                  />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
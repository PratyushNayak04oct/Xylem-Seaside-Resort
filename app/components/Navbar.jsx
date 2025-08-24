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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation Items */}
          <div ref={leftItemsRef} className="hidden lg:flex items-center space-x-8">
            {leftItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-inter font-medium text-sm tracking-wide transition-all duration-300 hover:text-primary group ${
                  pathname === item.href 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === item.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="XYLEM SEASIDE RESORT Home">
              <div className="w-16 h-16 md:w-20 md:h-20">
                <AnimatedLogo 
                  className="w-full h-full" 
                  autoPlay={false}
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation Items */}
          <div ref={rightItemsRef} className="hidden lg:flex items-center space-x-8">
            {rightItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-inter font-medium text-sm tracking-wide transition-all duration-300 hover:text-primary group ${
                  pathname === item.href 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === item.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
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
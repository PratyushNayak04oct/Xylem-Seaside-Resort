"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowUp
} from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const backToTopRef = useRef(null);

  useGSAP(() => {
    // Footer content animation
    gsap.fromTo(contentRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Back to top button animation
    gsap.fromTo(backToTopRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    resort: [
      { name: 'About Us', href: '/about' },
      { name: 'Rooms & Suites', href: '/rooms' },
      { name: 'Dining', href: '/food' },
      { name: 'Amenities', href: '/amenities' }
    ],
    services: [
      { name: 'Spa & Wellness', href: '/amenities' },
      { name: 'Concierge', href: '/contact' },
      { name: 'Events', href: '/contact' },
      { name: 'Transportation', href: '/contact' }
    ],
    policies: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cancellation Policy', href: '/cancellation' },
      { name: 'Accessibility', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-gray-900 text-white relative"
      role="contentinfo"
    >
      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div ref={contentRef} className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 mr-4">
                <AnimatedLogo className="w-full h-full" autoPlay={false} />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold">XYLEM SEASIDE</h3>
                <p className="font-playfair text-lg text-primary">RESORT</p>
              </div>
            </div>
            <p className="font-inter text-gray-300 leading-relaxed mb-6">
              Experience unparalleled luxury at our exclusive beachfront resort. 
              Where sophisticated hospitality meets natural beauty, creating 
              unforgettable memories for discerning travelers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-inter text-gray-300">
                  123 Seaside Boulevard, Paradise Island, PI 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-inter text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-inter text-gray-300">info@xylemseaside.com</span>
              </div>
            </div>
          </div>

          {/* Resort Links */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-6">Resort</h4>
            <ul className="space-y-3">
              {footerLinks.resort.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-primary transition-colors duration-300 focus:outline-none focus:text-primary focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-primary transition-colors duration-300 focus:outline-none focus:text-primary focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-6">Policies</h4>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-primary transition-colors duration-300 focus:outline-none focus:text-primary focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="font-inter text-gray-400 text-sm">
                © 2024 XYLEM SEASIDE RESORT. All rights reserved.
              </p>
              <p className="font-inter text-gray-500 text-xs mt-1">
                Designed with luxury and sustainability in mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
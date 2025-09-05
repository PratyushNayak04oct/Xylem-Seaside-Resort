"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image animation
    gsap.fromTo(imageRef.current,
      { x: 50, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    gsap.fromTo(statsRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect for the section
    gsap.to(sectionRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  const stats = [
    { number: "50+", label: "Luxury Suites" },
    { number: "5", label: "Star Rating" },
    { number: "24/7", label: "Concierge" },
    { number: "∞", label: "Ocean Views" }
  ];

  return (
    <section 
      id="about-section"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 will-change-transform transform translate-z-0 backface-hidden"
      aria-labelledby="about-title"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 
                id="about-title"
                ref={titleRef}
                className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Where Luxury Meets
                <span className="text-teal-600 block">Tranquility</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 font-inter text-lg leading-relaxed">
                <p>
                  Nestled along the pristine coastline, XYLEM SEASIDE RESORT offers an 
                  unparalleled escape where modern luxury harmoniously blends with natural beauty. 
                  Our resort stands as a testament to sophisticated hospitality and environmental consciousness.
                </p>
                
                <p>
                  Every detail has been meticulously crafted to provide you with an extraordinary 
                  experience. From our award-winning spa treatments to our world-class dining venues, 
                  we ensure that every moment of your stay exceeds expectations.
                </p>
                
                <p>
                  Discover a sanctuary where time slows down, and every sunrise brings new possibilities 
                  for relaxation, adventure, and unforgettable memories.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center opacity-0 transform translate-y-8 duration-600 ease-out"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="font-playfair text-2xl sm:text-3xl font-bold text-teal-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="font-inter text-sm text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
                alt="Luxury resort exterior with ocean view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-600/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-inter font-semibold text-gray-900">Eco-Certified</div>
                  <div className="font-inter text-sm text-gray-600">Sustainable Luxury</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
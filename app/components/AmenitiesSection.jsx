"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Waves, 
  Utensils, 
  Dumbbell, 
  Sparkles, 
  Car, 
  Wifi,
  Shield,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AmenitiesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

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

    // Grid items animation
    gsap.fromTo(gridRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const amenities = [
    {
      icon: Waves,
      title: "Private Beach",
      description: "Exclusive access to pristine white sand beaches with crystal clear waters"
    },
    {
      icon: Utensils,
      title: "Fine Dining",
      description: "World-class restaurants featuring international and local cuisine"
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "State-of-the-art gym with personal trainers and modern equipment"
    },
    {
      icon: Sparkles,
      title: "Luxury Spa",
      description: "Rejuvenating treatments and wellness therapies in a serene environment"
    },
    {
      icon: Car,
      title: "Valet Service",
      description: "Complimentary valet parking and luxury transportation services"
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Complimentary high-speed internet access throughout the resort"
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Round-the-clock security and safety for complete peace of mind"
    },
    {
      icon: Clock,
      title: "Concierge",
      description: "Dedicated concierge service to assist with all your needs"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="amenities-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 
            id="amenities-title"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            World-Class <span className="text-primary">Amenities</span>
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Indulge in our comprehensive range of luxury amenities designed to enhance 
            every aspect of your stay and create unforgettable experiences.
          </p>
        </div>

        {/* Amenities Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <amenity.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                {amenity.title}
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
              Experience Ultimate Luxury
            </h3>
            <p className="font-inter text-gray-600 mb-6 max-w-xl mx-auto">
              Discover all our premium amenities and services designed to make your stay extraordinary.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Explore All Amenities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
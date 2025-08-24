"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import { 
  Waves, 
  Utensils, 
  Dumbbell, 
  Sparkles, 
  Car, 
  Wifi,
  Shield,
  Clock,
  Users,
  Heart,
  Gamepad2,
  Baby
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AmenitiesPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const categoriesRef = useRef(null);

  useGSAP(() => {
    // Hero animation
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Categories animation
    gsap.fromTo(categoriesRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const amenityCategories = [
    {
      title: "Recreation & Sports",
      icon: Waves,
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg",
      amenities: [
        { icon: Waves, name: "Private Beach Access", description: "Exclusive 500-meter stretch of pristine white sand beach" },
        { icon: Dumbbell, name: "Fitness Center", description: "24/7 state-of-the-art gym with personal trainers" },
        { icon: Gamepad2, name: "Water Sports", description: "Kayaking, snorkeling, jet skiing, and sailing" },
        { icon: Users, name: "Tennis Court", description: "Professional-grade court with equipment rental" }
      ]
    },
    {
      title: "Wellness & Spa",
      icon: Sparkles,
      image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      amenities: [
        { icon: Sparkles, name: "Luxury Spa", description: "Full-service spa with massage, facials, and body treatments" },
        { icon: Heart, name: "Wellness Center", description: "Yoga studio, meditation garden, and wellness programs" },
        { icon: Waves, name: "Infinity Pool", description: "Heated infinity pool overlooking the ocean" },
        { icon: Sparkles, name: "Sauna & Steam", description: "Traditional sauna and eucalyptus steam room" }
      ]
    },
    {
      title: "Dining & Entertainment",
      icon: Utensils,
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      amenities: [
        { icon: Utensils, name: "4 Restaurants", description: "Fine dining, casual, beachside, and rooftop venues" },
        { icon: Utensils, name: "Room Service", description: "24-hour gourmet room service menu" },
        { icon: Users, name: "Live Entertainment", description: "Nightly shows, live music, and cultural performances" },
        { icon: Utensils, name: "Cooking Classes", description: "Learn from our executive chefs" }
      ]
    },
    {
      title: "Services & Convenience",
      icon: Clock,
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      amenities: [
        { icon: Clock, name: "24/7 Concierge", description: "Dedicated concierge service for all your needs" },
        { icon: Car, name: "Valet Parking", description: "Complimentary valet service and luxury car rental" },
        { icon: Wifi, name: "High-Speed WiFi", description: "Complimentary fiber-optic internet throughout resort" },
        { icon: Shield, name: "Security", description: "24/7 security with keycard access and safe deposit boxes" }
      ]
    },
    {
      title: "Family & Kids",
      icon: Baby,
      image: "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg",
      amenities: [
        { icon: Baby, name: "Kids Club", description: "Supervised activities for children ages 4-12" },
        { icon: Users, name: "Family Pool", description: "Dedicated family pool area with water slides" },
        { icon: Gamepad2, name: "Game Room", description: "Video games, pool table, and board games" },
        { icon: Baby, name: "Babysitting", description: "Professional childcare services available" }
      ]
    },
    {
      title: "Business & Events",
      icon: Users,
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      amenities: [
        { icon: Users, name: "Conference Center", description: "Modern facilities for meetings and events" },
        { icon: Users, name: "Wedding Services", description: "Complete wedding planning and coordination" },
        { icon: Wifi, name: "Business Center", description: "Computers, printing, and office services" },
        { icon: Users, name: "Event Planning", description: "Professional event coordination team" }
      ]
    }
  ];

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative h-96 flex items-center justify-center bg-gradient-to-r from-primary to-accent overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg"
              alt="Resort amenities"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div ref={titleRef} className="relative z-10 text-center text-white px-4">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              World-Class Amenities
            </h1>
            <p className="font-inter text-xl max-w-2xl mx-auto">
              Discover our comprehensive collection of luxury amenities designed to enhance 
              every moment of your stay.
            </p>
          </div>
        </section>

        {/* Amenities Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={categoriesRef} className="space-y-20">
              {amenityCategories.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    categoryIndex % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${categoryIndex % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-6 ${categoryIndex % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <category.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="font-playfair text-3xl font-bold text-gray-900">
                        {category.title}
                      </h2>
                    </div>

                    <div className="grid gap-6">
                      {category.amenities.map((amenity, amenityIndex) => (
                        <div 
                          key={amenityIndex}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors duration-300"
                        >
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <amenity.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-inter text-lg font-semibold text-gray-900 mb-2">
                              {amenity.name}
                            </h3>
                            <p className="font-inter text-gray-600 leading-relaxed">
                              {amenity.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-6">
              Experience Ultimate Luxury
            </h2>
            <p className="font-inter text-xl text-white/90 mb-8 leading-relaxed">
              Every amenity at XYLEM SEASIDE RESORT is designed to exceed your expectations 
              and create unforgettable memories. Book your stay today and discover what 
              true luxury feels like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Book Your Stay
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Contact Concierge
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
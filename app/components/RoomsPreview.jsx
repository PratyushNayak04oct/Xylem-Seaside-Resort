"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wifi, Car, Coffee, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RoomsPreview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

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

    // Cards animation
    gsap.fromTo(cardsRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const rooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      description: "Spacious suite with panoramic ocean views and private balcony",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      price: "$450",
      amenities: [
        { icon: Waves, label: "Ocean View" },
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Mini Bar" },
        { icon: Car, label: "Valet Parking" }
      ]
    },
    {
      id: 2,
      name: "Beachfront Villa",
      description: "Luxury villa with direct beach access and private pool",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      price: "$850",
      amenities: [
        { icon: Waves, label: "Beach Access" },
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Private Pool" },
        { icon: Car, label: "Valet Parking" }
      ]
    },
    {
      id: 3,
      name: "Presidential Suite",
      description: "Ultimate luxury with butler service and exclusive amenities",
      image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      price: "$1200",
      amenities: [
        { icon: Waves, label: "Panoramic View" },
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Butler Service" },
        { icon: Car, label: "Private Transfer" }
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white"
      aria-labelledby="rooms-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 
            id="rooms-title"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Luxury <span className="text-primary">Accommodations</span>
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose from our collection of elegantly appointed rooms and suites, 
            each designed to provide the ultimate in comfort and sophistication.
          </p>
        </div>

        {/* Room Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="font-inter font-semibold text-primary">{room.price}/night</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                  {room.name}
                </h3>
                <p className="font-inter text-gray-600 mb-4 leading-relaxed">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <amenity.icon className="w-4 h-4 text-primary" />
                      <span className="font-inter text-sm text-gray-600">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-inter font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/rooms"
            className="inline-flex items-center space-x-2 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
          >
            <span className="transition-colors duration-300 group-hover:text-white">View All Rooms</span>
            <ArrowRight className="w-5 h-5 transition-colors duration-300 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomsPreview;
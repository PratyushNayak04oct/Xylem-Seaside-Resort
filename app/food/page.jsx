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
  Clock, 
  MapPin, 
  Phone, 
  Star,
  Utensils,
  Wine,
  Coffee,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FoodPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const restaurantsRef = useRef(null);
  const menuRef = useRef(null);

  useGSAP(() => {
    // Hero animation
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Restaurants animation
    gsap.fromTo(restaurantsRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: restaurantsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Menu animation
    gsap.fromTo(menuRef.current?.children || [],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const restaurants = [
    {
      id: 1,
      name: "Azure Oceanfront",
      cuisine: "Mediterranean Fine Dining",
      rating: 4.9,
      reviews: 234,
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      description: "Exquisite Mediterranean cuisine with panoramic ocean views. Our signature restaurant offers an unforgettable dining experience.",
      hours: "6:00 PM - 11:00 PM",
      location: "Beachfront Terrace",
      phone: "+1 (555) 123-4567",
      features: ["Ocean View", "Fine Dining", "Wine Pairing", "Romantic Setting"]
    },
    {
      id: 2,
      name: "Coral Reef Grill",
      cuisine: "Fresh Seafood & Steaks",
      rating: 4.8,
      reviews: 189,
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
      description: "Fresh catch of the day and premium steaks grilled to perfection in a relaxed beachside atmosphere.",
      hours: "12:00 PM - 10:00 PM",
      location: "Pool Deck",
      phone: "+1 (555) 123-4568",
      features: ["Fresh Seafood", "Premium Steaks", "Casual Dining", "Pool Views"]
    },
    {
      id: 3,
      name: "Sunset Lounge",
      cuisine: "Cocktails & Light Bites",
      rating: 4.7,
      reviews: 156,
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
      description: "Craft cocktails and artisanal appetizers while watching breathtaking sunsets over the horizon.",
      hours: "4:00 PM - 1:00 AM",
      location: "Rooftop Terrace",
      phone: "+1 (555) 123-4569",
      features: ["Craft Cocktails", "Sunset Views", "Live Music", "Rooftop Setting"]
    },
    {
      id: 4,
      name: "Garden Café",
      cuisine: "International Breakfast & Lunch",
      rating: 4.6,
      reviews: 298,
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      description: "Fresh, healthy options in a beautiful garden setting. Perfect for breakfast, lunch, and afternoon tea.",
      hours: "6:00 AM - 4:00 PM",
      location: "Resort Gardens",
      phone: "+1 (555) 123-4570",
      features: ["Healthy Options", "Garden Setting", "All-Day Dining", "Fresh Ingredients"]
    }
  ];

  const menuHighlights = [
    {
      category: "Appetizers",
      items: [
        { name: "Tuna Tartare", description: "Fresh yellowfin tuna with avocado and citrus", price: "$28" },
        { name: "Lobster Bisque", description: "Rich and creamy with cognac finish", price: "$24" },
        { name: "Oysters Rockefeller", description: "Fresh oysters with spinach and herbs", price: "$32" }
      ]
    },
    {
      category: "Main Courses",
      items: [
        { name: "Grilled Mahi-Mahi", description: "With tropical fruit salsa and coconut rice", price: "$42" },
        { name: "Wagyu Beef Tenderloin", description: "8oz with truffle butter and seasonal vegetables", price: "$68" },
        { name: "Lobster Thermidor", description: "Whole lobster with creamy cognac sauce", price: "$58" }
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Chocolate Lava Cake", description: "Warm chocolate cake with vanilla ice cream", price: "$16" },
        { name: "Key Lime Pie", description: "Traditional Florida-style with graham crust", price: "$14" },
        { name: "Crème Brûlée", description: "Vanilla custard with caramelized sugar", price: "$15" }
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
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
              alt="Fine dining restaurant"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div ref={titleRef} className="relative z-10 text-center text-white px-4">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Culinary Excellence
            </h1>
            <p className="font-inter text-xl max-w-2xl mx-auto">
              Savor exceptional cuisine crafted by world-renowned chefs using the finest ingredients 
              and innovative techniques.
            </p>
          </div>
        </section>

        {/* Restaurants Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Restaurants</span>
              </h2>
              <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                From fine dining to casual beachside fare, discover a world of flavors 
                at our distinctive dining venues.
              </p>
            </div>

            <div ref={restaurantsRef} className="grid md:grid-cols-2 gap-8">
              {restaurants.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary/20"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-inter text-sm font-semibold">{restaurant.rating}</span>
                      <span className="font-inter text-sm text-gray-600">({restaurant.reviews})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                        {restaurant.name}
                      </h3>
                      <p className="font-inter text-primary font-semibold mb-3">
                        {restaurant.cuisine}
                      </p>
                      <p className="font-inter text-gray-600 leading-relaxed">
                        {restaurant.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-inter text-gray-700">{restaurant.hours}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-inter text-gray-700">{restaurant.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="font-inter text-gray-700">{restaurant.phone}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {restaurant.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-inter"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-inter font-semibold transition-all duration-300 transform hover:scale-105">
                      Make Reservation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Menu <span className="text-primary">Highlights</span>
              </h2>
              <p className="font-inter text-lg text-gray-600">
                A taste of our signature dishes from Azure Oceanfront restaurant.
              </p>
            </div>

            <div ref={menuRef} className="space-y-12">
              {menuHighlights.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 text-center">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex-1">
                          <h4 className="font-inter text-lg font-semibold text-gray-900 mb-2">
                            {item.name}
                          </h4>
                          <p className="font-inter text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          <span className="font-playfair text-xl font-bold text-primary">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                View Full Menu
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
"use client" ; 

import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Users, 
  Bed, 
  Bath, 
  Square,
  ArrowRight,
  Star,
  UtensilsCrossed,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

const RoomsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev };
        rooms.forEach(room => {
          newIndex[room.id] = ((prev[room.id] || 0) + 1) % room.gallery.length;
        });
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const rooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      category: "Suite",
      price: "$450",
      rating: 4.9,
      reviews: 127,
      gallery: [
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
      ],
      description: "Spacious suite with panoramic ocean views and private balcony overlooking the pristine coastline.",
      features: {
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        area: "65 m²"
      },
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
      category: "Villa",
      price: "$850",
      rating: 5.0,
      reviews: 89,
      gallery: [
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"
      ],
      description: "Luxury villa with direct beach access, private pool, and exclusive outdoor dining area.",
      features: {
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        area: "120 m²"
      },
      amenities: [
        { icon: Waves, label: "Beach Access" },
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Private Pool" },
        { icon: UtensilsCrossed, label: "Room Service" }
      ]
    },
    {
      id: 3,
      name: "Presidential Suite",
      category: "Presidential",
      price: "$1200",
      rating: 5.0,
      reviews: 45,
      gallery: [
        "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
      ],
      description: "Ultimate luxury with butler service, panoramic views, and exclusive amenities for discerning guests.",
      features: {
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        area: "200 m²"
      },
      amenities: [
        { icon: Waves, label: "Panoramic View" },
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Butler Service" },
        { icon: Car, label: "Private Transfer" }
      ]
    },
    {
      id: 4,
      name: "Garden View Room",
      category: "Standard",
      price: "$280",
      rating: 4.7,
      reviews: 203,
      gallery: [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
      ],
      description: "Comfortable room with beautiful garden views and modern amenities for a relaxing stay.",
      features: {
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        area: "45 m²"
      },
      amenities: [
        { icon: MapPin, label: "Garden View" },
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Coffee Maker" },
        { icon: Car, label: "Parking" }
      ]
    },
    {
      id: 5,
      name: "Deluxe Ocean Suite",
      category: "Deluxe",
      price: "$650",
      rating: 4.8,
      reviews: 156,
      gallery: [
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
      ],
      description: "Elegant suite with premium ocean views, separate living area, and luxury amenities.",
      features: {
        guests: 3,
        bedrooms: 1,
        bathrooms: 2,
        area: "85 m²"
      },
      amenities: [
        { icon: Waves, label: "Premium Ocean View" },
        { icon: Wifi, label: "High-Speed WiFi" },
        { icon: Coffee, label: "Premium Mini Bar" },
        { icon: Bath, label: "Dual Bathrooms" }
      ]
    },
    {
      id: 6,
      name: "Family Villa",
      category: "Family",
      price: "$950",
      rating: 4.9,
      reviews: 78,
      gallery: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
      ],
      description: "Spacious family villa with multiple bedrooms, private pool, and dedicated children's area.",
      features: {
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        area: "180 m²"
      },
      amenities: [
        { icon: Waves, label: "Ocean & Pool View" },
        { icon: Wifi, label: "Family WiFi" },
        { icon: UtensilsCrossed, label: "Full Kitchen" },
        { icon: Users, label: "Family Friendly" }
      ]
    }
  ];

  const nextImage = (roomId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % rooms.find(r => r.id === roomId).gallery.length
    }));
  };

  const prevImage = (roomId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + rooms.find(r => r.id === roomId).gallery.length) % rooms.find(r => r.id === roomId).gallery.length
    }));
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cpath d='M0,400 Q200,200 400,400 T800,400 Q1000,200 1200,400 L1200,800 L0,800 Z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-lg transform rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-16 h-16 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className={`relative z-10 flex items-center justify-center h-full px-8 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-wide">
              Unwind in <span className="text-yellow-300">Elegance</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-serif text-white/90 italic mb-8 font-light">
              Premium Comfort, Trusted Hospitality
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto font-light">
              At Xylem Seaside Resort, each room is thoughtfully designed to offer a perfect blend of luxury, 
              privacy, and comfort. Experience modern amenities, elegant interiors, and personalized service.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Amenities Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-800 mb-4">Premium Amenities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every detail crafted for your perfect getaway</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Waves, title: "Ocean View", color: "text-blue-500" },
              { icon: Bed, title: "Premium Bedding", color: "text-purple-500" },
              { icon: Wifi, title: "High-Speed Wi-Fi", color: "text-green-500" },
              { icon: UtensilsCrossed, title: "In-Room Dining", color: "text-orange-500" }
            ].map((amenity, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${amenity.color} group-hover:scale-110 transition-transform duration-300`}>
                  <amenity.icon size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {amenity.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rooms Grid Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gray-800 mb-6">Luxury Accommodations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our collection of elegantly appointed rooms and suites, each designed for ultimate comfort and sophistication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div 
                key={room.id}
                className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image Carousel */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={room.gallery[currentImageIndex[room.id] || 0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Navigation buttons */}
                  <button 
                    onClick={() => prevImage(room.id)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => nextImage(room.id)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {room.category}
                  </div>
                  
                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="font-semibold text-blue-600">{room.price}</span>
                    <span className="text-gray-600 text-sm">/night</span>
                  </div>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {room.gallery.map((_, imgIndex) => (
                      <div 
                        key={imgIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          imgIndex === (currentImageIndex[room.id] || 0) ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {room.name}
                    </h3>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-yellow-600">{room.rating}</span>
                      <span className="text-sm text-gray-500">({room.reviews})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{room.features.guests} Guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{room.features.bedrooms} Bedroom</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{room.features.bathrooms} Bathroom</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Square className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{room.features.area}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {room.amenities.map((amenity, amenityIndex) => (
                      <div key={amenityIndex} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <amenity.icon className="w-4 h-4 text-teal-500" />
                        <span className="text-sm text-gray-700">{amenity.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                      <Calendar className="w-4 h-4" />
                      <span>Book Now</span>
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-200 hover:border-blue-400 text-gray-700 hover:text-blue-600 rounded-xl transition-all duration-300 hover:shadow-lg">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-800 mb-6">Experience Unmatched Comfort</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Every detail crafted for your perfect getaway</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Spacious Layouts", 
                description: "Thoughtfully designed spaces that blend comfort with style",
                icon: Square
              },
              { 
                title: "Modern Amenities", 
                description: "State-of-the-art facilities for your convenience",
                icon: Wifi
              },
              { 
                title: "Personalized Service", 
                description: "Dedicated staff ensuring your every need is met",
                icon: Users
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="text-center">
          <button className="bg-white text-blue-600 px-12 py-4 rounded-2xl text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-blue-50">
            Explore All Accommodations
          </button>
        </div>
      </div>
      <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default RoomsPage;
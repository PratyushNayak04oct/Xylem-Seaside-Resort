"use client";

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  User,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: ''
  });

  useGSAP(() => {
    // Hero animation
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Contact info animation
    gsap.fromTo(contactInfoRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this data to your backend
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "123 Seaside Boulevard",
        "Paradise Island, PI 12345",
        "United States"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "Reservations: +1 (555) 123-4567",
        "Concierge: +1 (555) 123-4568",
        "Spa: +1 (555) 123-4569"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "reservations@xylemseaside.com",
        "concierge@xylemseaside.com",
        "info@xylemseaside.com"
      ]
    },
    {
      icon: Clock,
      title: "Hours",
      details: [
        "Front Desk: 24/7",
        "Concierge: 6:00 AM - 11:00 PM",
        "Reservations: 8:00 AM - 8:00 PM"
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
              src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
              alt="Contact XYLEM SEASIDE RESORT"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div ref={titleRef} className="relative z-10 text-center text-white px-4">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="font-inter text-xl max-w-2xl mx-auto">
              Ready to experience luxury? Get in touch with our team to plan your 
              perfect getaway at XYLEM SEASIDE RESORT.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
                  Get in <span className="text-primary">Touch</span>
                </h2>
                <p className="font-inter text-lg text-gray-600 mb-12 leading-relaxed">
                  Our dedicated team is here to assist you with reservations, special requests, 
                  and any questions about your stay. We're committed to making your experience 
                  exceptional from the moment you contact us.
                </p>

                <div ref={contactInfoRef} className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-inter text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="font-inter text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-12 h-64 bg-gray-200 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
                    alt="Resort location map"
                    width={600}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div ref={formRef}>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Check-in and Check-out */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkIn" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                          Check-in Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="checkOut" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                          Check-out Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            id="checkOut"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label htmlFor="guests" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                        >
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter resize-none"
                          placeholder="Tell us about your preferences, special requests, or any questions you have..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
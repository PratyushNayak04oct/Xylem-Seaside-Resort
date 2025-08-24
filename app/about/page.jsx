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
  Award, 
  Users, 
  Heart, 
  Leaf,
  Star,
  Calendar,
  MapPin,
  Trophy
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const awardsRef = useRef(null);

  useGSAP(() => {
    // Hero animation
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Story section animation
    gsap.fromTo(storyRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Values animation
    gsap.fromTo(valuesRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Team animation
    gsap.fromTo(teamRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Awards animation
    gsap.fromTo(awardsRef.current?.children || [],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: awardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Exceptional Service",
      description: "We believe in creating personalized experiences that exceed expectations through genuine care and attention to detail."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Our commitment to environmental responsibility ensures that luxury and conservation go hand in hand."
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster meaningful connections between our guests, team members, and the local community."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We continuously strive for perfection in every aspect of our resort, from amenities to experiences."
    }
  ];

  const team = [
    {
      name: "Isabella Rodriguez",
      position: "General Manager",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      bio: "With over 15 years in luxury hospitality, Isabella brings passion and expertise to every guest experience."
    },
    {
      name: "Chef Marcus Chen",
      position: "Executive Chef",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      bio: "Michelin-starred chef with a passion for innovative cuisine using locally sourced ingredients."
    },
    {
      name: "Sarah Thompson",
      position: "Spa Director",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      bio: "Wellness expert dedicated to creating transformative spa experiences for mind, body, and soul."
    },
    {
      name: "David Martinez",
      position: "Activities Director",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      bio: "Adventure enthusiast who designs unique experiences to help guests discover the beauty of our destination."
    }
  ];

  const awards = [
    { year: "2024", award: "World's Best Seaside Resort", organization: "Travel + Leisure" },
    { year: "2023", award: "Luxury Hotel of the Year", organization: "Hospitality Excellence Awards" },
    { year: "2023", award: "Best Spa Resort", organization: "Spa & Wellness Awards" },
    { year: "2022", award: "Sustainable Tourism Award", organization: "Green Globe Certification" },
    { year: "2022", award: "Five Star Diamond Award", organization: "American Academy of Hospitality" },
    { year: "2021", award: "Best New Resort", organization: "Condé Nast Traveler" }
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
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
              alt="XYLEM SEASIDE RESORT"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div ref={titleRef} className="relative z-10 text-center text-red-700 px-4">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 ">
              Our Story
            </h1>
            <p className="font-inter text-xl max-w-2xl mx-auto">
              Discover the passion, vision, and dedication behind XYLEM SEASIDE RESORT's 
              commitment to luxury hospitality.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={storyRef} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900">
                  A Vision of <span className="text-primary">Luxury</span>
                </h2>
                
                <div className="space-y-6 text-gray-600 font-inter text-lg leading-relaxed">
                  <p>
                    XYLEM SEASIDE RESORT was born from a dream to create the world's most 
                    extraordinary beachfront destination. Founded in 2020, our resort represents 
                    the perfect harmony between luxury and nature, sophistication and sustainability.
                  </p>
                  
                  <p>
                    Our founders envisioned a place where discerning travelers could escape the 
                    ordinary and immerse themselves in unparalleled beauty. Every detail, from 
                    our architectural design to our curated experiences, reflects this commitment 
                    to excellence.
                  </p>
                  
                  <p>
                    Today, XYLEM SEASIDE RESORT stands as a testament to what's possible when 
                    passion meets purpose. We continue to evolve, always striving to exceed 
                    expectations and create memories that last a lifetime.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="font-playfair text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="font-inter text-sm text-gray-600 uppercase tracking-wide">Luxury Suites</div>
                  </div>
                  <div className="text-center">
                    <div className="font-playfair text-3xl font-bold text-primary mb-2">4</div>
                    <div className="font-inter text-sm text-gray-600 uppercase tracking-wide">Restaurants</div>
                  </div>
                  <div className="text-center">
                    <div className="font-playfair text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="font-inter text-sm text-gray-600 uppercase tracking-wide">Concierge</div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
                    alt="Resort architecture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-inter font-semibold text-gray-900">Est. 2020</div>
                      <div className="font-inter text-sm text-gray-600">4 Years of Excellence</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-inter font-semibold text-gray-900">Paradise Island</div>
                      <div className="font-inter text-sm text-gray-600">Prime Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do and shape every experience we create.
              </p>
            </div>

            <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Our <span className="text-primary">Team</span>
              </h2>
              <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                The passionate professionals dedicated to making your stay extraordinary.
              </p>
            </div>

            <div ref={teamRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="group text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="192px"
                    />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="font-inter text-primary font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Awards & <span className="text-primary">Recognition</span>
              </h2>
              <p className="font-inter text-lg text-gray-600">
                Our commitment to excellence has been recognized by leading industry organizations.
              </p>
            </div>

            <div ref={awardsRef} className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-playfair text-lg font-bold text-primary">{award.year}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-inter text-lg font-semibold text-gray-900 mb-1">
                      {award.award}
                    </h3>
                    <p className="font-inter text-gray-600">
                      {award.organization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
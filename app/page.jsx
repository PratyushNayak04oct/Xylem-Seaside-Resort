"use client";

import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RoomsPreview from './components/RoomsPreview';
import AmenitiesSection from './components/AmenitiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/SmoothScrollProvider';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <SmoothScrollProvider>
          <main className="min-h-screen">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <RoomsPreview />
            <AmenitiesSection />
            <TestimonialsSection />
            <Footer />
          </main>
        </SmoothScrollProvider>
      )}
    </>
  );
}
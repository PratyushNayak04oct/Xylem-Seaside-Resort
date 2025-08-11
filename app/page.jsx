"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SEOMetadata from "./components/SEOMetadata";

// Lazy load the LoadingScreen for performance
const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), {
  ssr: false,
  loading: () => (
    <div 
      className="h-screen w-screen bg-gray-900 flex items-center justify-center"
      role="status"
      aria-label="Loading application"
    >
      <div className="sr-only">Loading...</div>
    </div>
  )
});

// Your main home content component
const HomeContent = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Welcome to Our Platform
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing features and experiences designed just for you. 
              Join thousands of users who trust our platform every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="btn-primary px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-describedby="cta-description"
              >
                Get Started
              </button>
              <button
                type="button"
                className="btn-secondary px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Learn More
              </button>
            </div>
            <p id="cta-description" className="sr-only">
              Get started with our platform or learn more about our features
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <h2 
            id="features-heading"
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Performance",
                description: "Lightning-fast load times and smooth interactions",
                icon: "⚡"
              },
              {
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime",
                icon: "🔒"
              },
              {
                title: "User-Friendly",
                description: "Intuitive design that's accessible to everyone",
                icon: "👥"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-card text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4" role="img" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    requestAnimationFrame(() => {
      setContentVisible(true);
    });
  };

  // Prevent scroll during loading and manage focus
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Announce loading state to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Application is loading, please wait...';
      document.body.appendChild(announcement);
      
      return () => {
        document.body.removeChild(announcement);
      };
    } else {
      document.body.style.overflow = '';
      // Announce completion to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Application loaded successfully';
      document.body.appendChild(announcement);
      
      // Focus management - focus on main content
      setTimeout(() => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.focus();
        }
        document.body.removeChild(announcement);
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Performance optimization: preload critical resources
  useEffect(() => {
    // Preload critical images or resources here
    const preloadImage = new Image();
    preloadImage.src = '/Loading-Screen-Image.webp';
  }, []);

  return (
    <>
      
      <SEOMetadata
        title="Your App Name - Welcome to Amazing Experiences"
        description="Discover amazing features and experiences designed just for you. Join thousands of users who trust our platform every day."
        keywords="platform, features, user experience, web application, performance, security"
        canonicalUrl="https://yourapp.com"
      />
      
     
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      
      
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      
      <div 
        id="main-content"
        className={`main-content ${contentVisible ? 'content-visible' : 'content-hidden'}`}
        style={{ 
          visibility: contentVisible ? 'visible' : 'hidden',
          opacity: contentVisible ? 1 : 0 
        }}
        tabIndex={-1}
      >
        <HomeContent />
      </div>
    </>
  );
}
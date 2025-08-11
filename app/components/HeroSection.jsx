"use client"

import React from 'react'

const HeroSection = () => {
  return (
    <div className="hero-section relative w-screen h-screen overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0"
        style={{
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          objectFit: 'cover',
          margin: 0,
          padding: 0
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/Hero Section Video.webm" type="video/webm" />
        {/* Fallback for browsers that don't support WebM */}
        <source src="/Hero Section Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.45)] z-10"></div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center mb-6 leading-tight">
          <span className="block">Welcome to</span>
          <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            The Future
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 text-center mb-8 max-w-4xl leading-relaxed">
          Experience innovation like never before with our cutting-edge solutions
          that transform the way you work and live.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button className="btn-primary bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started
          </button>
          <button className="btn-secondary bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-opacity-20 shadow-lg hover:shadow-xl">
            Learn More
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white opacity-70">
            <span className="text-sm mb-2 hidden sm:block">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Optional: Background pattern overlay for extra visual interest */}
      <div className="absolute top-0 left-0 w-full h-full z-5 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-blue-900/20 to-purple-900/20"></div>
      </div>
    </div>
  )
}

export default HeroSection ; 
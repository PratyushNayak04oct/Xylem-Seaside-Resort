"use client";

import React from "react";
import Image from "next/image";
import AnimatedLogo from "./AnimatedLogo";
import bgImage from "../../public/Loading-Screen-Image.webp";

const LoadingScreen = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src={bgImage}
        alt="Loading Screen"
        fill
        priority
        quality={80}
        placeholder="blur"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnimatedLogo />
      </div>
    </div>
  );
};

export default LoadingScreen;
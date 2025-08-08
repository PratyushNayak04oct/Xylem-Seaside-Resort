"use client";

import React from "react";
import Image from "next/image";
import AnimatedLogo from "./AnimatedLogo";
import bgImage from "../../public/Loading-Screen-Image.webp" ; 

const LoadingScreen = () => {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <Image
        src={bgImage}
        alt="Loading Screen"
        fill
        priority
        quality={80}
        placeholder="blur"
        className="object-cover"
      />
      <AnimatedLogo className="z-10" />
    </div>
  );
};

export default LoadingScreen;
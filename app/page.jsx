"use client" ; 

import dynamic from "next/dynamic";

// Lazy load the LoadingScreen for performance
const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
    </>
  );
}
'use client'

import { useRouter } from "next/navigation";
import AboutSection from "./components/home/AboutSection";
import InfoSection from "./components/home/InfoSection";
import LogoBanner from "./components/home/LogoBanner";
import Button from "./components/info/loaders/Button";
import { useState } from "react";

export default function Home() {
  const navigator = useRouter();
  
  return (
    <div className="flex flex-col">
      <AboutSection />
      <LogoBanner />
      <InfoSection />
      <div className="w-full flex justify-center items-center pb-5">
        <button className="btn btn-dark btn-cta" onClick={() => navigator.push("/search")}>Experimente!</button>
      </div>
    </div>
  );
}

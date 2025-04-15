"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Fluxogram from "@/app/assets/images/app-fluxogram.png";
import MobileFluxogram from "@/app/assets/images/app-fluxogram-mobile.png";

export default function FluxogramSection() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
        Fuxograma de autenticação
      </h2>

      <div
        className={`relative w-full overflow-hidden transition-all duration-500 ${
          expanded || !isMobile ? "h-auto" : "aspect-square"
        }`}
      >
        <picture>
          <source srcSet={MobileFluxogram.src} media="(max-width: 768px)" />
          <Image
            src={Fluxogram}
            alt="Diagrama de autenticação do app"
            className="w-full pr-3"
            width={1200}
            height={800}
          />
        </picture>

        {/* Gradiente Fade-Out */}
        {!expanded && isMobile && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {isMobile && (
        <button
          onClick={() => {
            if (expanded) {
              setExpanded(false);
              window.scrollTo({ top: 10, behavior: "smooth" });
            } else {
              setExpanded(true);
            }
          }}
          className="mt-2 self-center text-sm text-primary-100 underline w-full"
        >
          {expanded ? "Mostrar menos" : "Mostrar mais"}
        </button>
      )}
    </section>
  );
}

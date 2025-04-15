"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface Props {
  images: { identifier: string; title?: string }[];
}

export const SpeciesCarousel = ({ images }: Props) => {
  const [current, setCurrent] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const next = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative w-full max-w-2xl h-[400px] overflow-hidden rounded-xl border-4 border-secondary-400">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.identifier}
            alt={img.title || `Imagem ${idx + 1}`}
            className="min-w-full md:h-full object-cover cursor-pointer"
            onClick={() => setModalIsOpen(true)}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute flex justify-center items-center px-2 py-2 top-1/2 left-4 -translate-y-1/2 bg-black/40 w-10 h-10 text-white rounded-full hover:bg-black/70 z-10"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        className="absolute flex justify-center items-center top-1/2 px-2 py-2 right-4 -translate-y-1/2 bg-black/40 w-10 h-10 text-white rounded-full hover:bg-black/70 z-10"
      >
        <ArrowRightIcon className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <ImageModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        imageSrc={images[current].identifier}
      />
    </div>
  );
};

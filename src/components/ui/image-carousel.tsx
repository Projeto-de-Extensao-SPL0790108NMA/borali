"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { MaterialIcon } from "./material-icon";

interface ImageCarouselProps {
  images: Array<{ id: string; url: string }>;
  alt?: string;
  className?: string;
  height?: string;
}

export function ImageCarousel({
  images,
  alt = "Image",
  className = "",
  height = "22.5625rem",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [offset, setOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.clientX);
    const diff = e.clientX - startX;
    setOffset(diff);
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (!isDragging) return;
    if (e) e.preventDefault();

    const threshold = 50; // Minimum drag distance to trigger slide change
    const diff = currentX - startX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setIsDragging(false);
    setOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
    const diff = e.touches[0].clientX - startX;
    setOffset(diff);
    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent) => {
    if (!isDragging) return;

    const threshold = 50;
    const diff = currentX - startX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setIsDragging(false);
    setOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (images.length === 0) {
    return (
      <div
        className={`relative w-full rounded-[1.1875rem] overflow-hidden bg-gray-200 ${className}`}
        style={{ height }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 font-poppins">
            Nenhuma imagem disponível
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-[1.1875rem] overflow-hidden ${className}`}
      style={{ height }}
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images Container */}
      <div
        className="relative w-full h-full"
        style={{
          transform: `translateX(${
            -currentIndex * 100 +
            (offset / (carouselRef.current?.offsetWidth || 1)) * 100
          }%)`,
          transition: isDragging ? "none" : "transform 0.3s ease-in-out",
        }}
      >
        <div className="flex h-full">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 w-full h-full"
            >
              <Image
                src={image.url}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10 flex items-center justify-center backdrop-blur-sm"
            aria-label="Imagem anterior"
          >
            <MaterialIcon icon="chevron_left" sizePx={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10 flex items-center justify-center backdrop-blur-sm"
            aria-label="Próxima imagem"
          >
            <MaterialIcon icon="chevron_right" sizePx={32} />
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 rounded-full ${
                  index === currentIndex
                    ? "w-2 h-2 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full z-10 font-poppins">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

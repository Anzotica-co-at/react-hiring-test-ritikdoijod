import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// Carousel slides data
const slides = [
  {
    src: "/assets/images/1.jpg",
    title: "THE RITZ-CARLTON CLUB LEVEL",
    heading: "An Elevated Retreat",
    description:
      "Enjoy a dedicated concierge, thoughtful amenities and daily culinary presentations at our exclusive ...",
    cta: "Explore Club Level",
  },
  {
    src: "/assets/images/2.jpg",
    title: "DINING & BARS",
    heading: "Extraordinary Culinary Experiences",
    description:
      "From Michelin-starred fine dining to locally inspired cooking classes, these are the moments you will ...",
    cta: "Discover Dining Destinations",
  },
  {
    src: "/assets/images/3.jpg",
    title: "SPA & WELLNESS",
    heading: "Rejuvenate Your Senses",
    description:
      "Experience luxury wellness with our signature spa treatments and tranquil spaces designed for serenity.",
    cta: "Visit Our Spa",
  },
  {
    src: "/assets/images/4.jpg",
    title: "SUITES & ROOMS",
    heading: "Refined Comfort",
    description:
      "Unwind in thoughtfully designed spaces featuring timeless elegance and modern luxury.",
    cta: "Explore Accommodations",
  },
  {
    src: "/assets/images/5.jpg",
    title: "DESTINATIONS",
    heading: "Global Discoveries Await",
    description:
      "Explore stunning Ritz-Carlton destinations across the globe — each a unique experience in elegance.",
    cta: "Browse Destinations",
  },
];

export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-full w-full flex-col justify-center bg-gradient-to-b from-[#edf4fb] to-white px-4 py-10">
      {/* Carousel */}
      <div className="relative mx-auto w-[90vw] min-w-sm md:max-w-5xl">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={100}
          centeredSlides
          loop
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="!overflow-visible"
          speed={1000}
          breakpoints={{
            1280: {
              slidesPerView: 1.15,
              spaceBetween: 100,
            },
          }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[500px] transition-all duration-1000 ease-in-out">
                <img
                  src={slide.src}
                  alt={slide.heading}
                  className={cn(
                    "absolute object-cover transition-transform duration-1000 ease-in-out",
                    i !== activeIndex && "translate-y-[35%]",
                    "md:translate-y-0",
                    i % 2 === 0 ? "md:bottom-0" : "md:top-0",
                    i === (activeIndex - 1 + slides.length) % slides.length &&
                      "md:translate-x-[35%]",
                  )}
                />

                <div
                  className={cn(
                    "absolute z-10 bg-white p-8 text-center outline outline-offset-8 outline-[#916e27] transition-all duration-1000 ease-in-out",
                    "xs:top-1/2 top-[40%] left-[50%] w-[300px] -translate-x-1/2 sm:top-[60%]",
                    "md:top-auto md:right-2 md:left-auto md:w-[395px] md:translate-x-0",
                    i % 2 === 0 ? "md:top-2" : "md:bottom-2",
                    i === (activeIndex - 1 + slides.length) % slides.length &&
                      "md:right-full",
                  )}
                >
                  <p className="text-xs tracking-wide text-gray-700 uppercase">
                    {slide.title}
                  </p>
                  <h3 className="my-2 font-serif text-2xl text-gray-900">
                    {slide.heading}
                  </h3>
                  <p className="mb-5 font-serif leading-relaxed text-gray-700">
                    {slide.description}
                  </p>
                  <button className="border-b border-black text-sm font-semibold tracking-wide">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slider */}
      <div className="mt-12 flex flex-col items-center">
        <div className="flex w-full max-w-xl items-center justify-between">
          <Button
            variant="ghost"
            className="swiper-prev flex items-center text-xs text-gray-700 hover:text-black"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            <span className="hidden md:block">Previous</span>
          </Button>

          <div className="relative mx-6 h-[1px] flex-grow bg-[#70707030]">
            <div
              className="absolute top-0 h-[5px] -translate-y-1/2 bg-[#916e27] transition-all duration-500"
              style={{
                width: `${100 / slides.length}%`,
                left: `${(100 / slides.length) * activeIndex}%`,
              }}
            />
          </div>

          <Button
            variant="ghost"
            className="swiper-next flex items-center text-xs text-gray-700 hover:text-black"
          >
            <span className="hidden md:block">Next</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <p className="mt-2 text-sm font-medium whitespace-nowrap">
          {activeIndex + 1} / {slides.length}
        </p>
      </div>
    </div>
  );
}

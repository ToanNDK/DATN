"use client";

import React, { useEffect, useState } from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { banner_1, banner_2 } from "@/images";

const slides = [
  {
    title: (
      <>
        Grab Upto 50% off on <br /> Selected Headphones
      </>
    ),
    image: banner_1,
  },
  {
    title: (
      <>
        Discover The New <br /> Smart Speakers
      </>
    ),
    image: banner_2,
  },
  {
    title: (
      <>
        New Arrivals <br /> Wireless Earbuds
      </>
    ),
    image: banner_1,
  },
];

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden">
      {/* Ảnh nền full */}
      {slides.map((item, index) => (
        <Image
          key={index}
          src={item.image}
          alt={`banner_${index}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay mờ để chữ nổi bật hơn */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text + Button overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 text-white z-10">
        <div className="space-y-5 max-w-xl">
          <Title className="text-white">{slides[current].title}</Title>
          <Link
            href="/shop"
            className="bg-shop_dark_green text-white px-5 py-3 rounded-md text-sm font-semibold hover:bg-shop_btn_dark_green transition-all inline-block"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

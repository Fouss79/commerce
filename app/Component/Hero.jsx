"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-4 rounded-2xl overflow-hidden">

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
      >

        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[300px] md:h-[420px] bg-black">
            <Image
              src="/slide1.jpg"
              fill
              className="object-cover"
              alt="Promo 1"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center px-10">
              <div className="text-white">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Promotions exceptionnelles
                </h2>
                <p className="mt-2">Jusqu’à -50% sur vos produits préférés</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>,,kk
          <div className="relative w-full h-[300px] md:h-[420px]">
            <Image
              src="/slide2.jpg"
              fill
              className="object-cover"
              alt="Promo 2"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center px-10">
              <div className="text-white">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Nouveaux produits
                </h2>
                <p className="mt-2">Découvrez les tendances du moment</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
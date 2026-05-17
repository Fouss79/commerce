// app/components/CategorieSlider.jsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CategorieItem from "./CategorieItem";

const CategorieSlider = ({ categories }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
    >
      {categories.map((categorie) => (
        <SwiperSlide key={categorie.id}>
          <CategorieItem categorie={categorie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorieSlider;

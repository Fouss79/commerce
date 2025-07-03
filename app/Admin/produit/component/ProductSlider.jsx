// app/components/ProductSlider.jsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductItem from "./ProductItems";

const ProductSlider = ({ produits, AjtePagne }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {produits.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductItem product={product} AjtePagne={AjtePagne} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;

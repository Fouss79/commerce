"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function ProduitGalerie({ produitId }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/produits/${produitId}/images`)
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, [produitId]);

  if (!images.length) return null;

  return (
    <Swiper spaceBetween={10} slidesPerView={3}>
      {images.map(img => (
        <SwiperSlide key={img.id}>
          <Image
            src={img.url.startsWith('http') ? img.url : `http://localhost:8080/${img.url}`}
            alt="image produit"
            width={200} height={200}
            className="object-cover rounded"
            unoptimized
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/carousel/list")
      .then((response) => setImages(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des images", error)
      );
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="w-full mt-24 overflow-hidden rounded-lg shadow-lg">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id}>
            <img
              src={img.url}
              alt={img.description}
              className="w-full h-[275px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
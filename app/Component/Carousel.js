import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/carousel/list")
      .then(response => setImages(response.data))
      .catch(error => console.error("Erreur lors du chargement des images", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000
  };

  return (
    <div className=" mx-auto mt-8">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id} className="">
            <img src={img.url} alt={img.description} className="rounded-lg w-full h-40 object-cover" />
          
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

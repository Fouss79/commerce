"use client"

import { useEffect, useRef, useState } from "react";

import ListProduits from "./Admin/produit/component/ListProduits";
import Link from 'next/link';
import './App.css';
import './Produits.css';
import Scrollpane from "./Component/Scrollpane";
import MegaMenu from "./Component/MegaMenu";

import AvisUtilisateurs from "./Component/AvisUtilisateurs"
import { useCart } from "./context/CartContext";
import ListCategorie from "./Admin/categorie/component/ListCategorie";
import Carousel from "./Component/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionList from "./Admin/collections/Component/CollectionList";
import CategorieMenu from "./Component/CategorieMenu";
import { motion } from "framer-motion";







  export default function Home() {
        
  const {Ajoute, addToCart, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();


  
const sliderRef = useRef(null);
const [currentIndex, setCurrentIndex] = useState(0);

const images = ["/chaussure.webp", "/imagess.jpg", "/trigo.jpeg"];

// 🔁 Auto slide
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);
const categorieList = [
        {
            nom: 'Vetements',
            Link: '/',
        },
        {
            nom: 'Chaussure',
            Link: '/Chaussure',
        },
        {
            nom: 'Telephone',
            Link: '/Telephone',
        },
    ];

// 🔁 Mise à jour du slider
useEffect(() => {
  if (sliderRef.current) {
    const slideWidth = sliderRef.current.children[0].offsetWidth;
    sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
}, [currentIndex]);

// 👉 Boutons
const nextSlide = () => {
  setCurrentIndex((prev) => (prev + 1) % images.length);
};

const prevSlide = () => {
  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
};


  const updateSlider = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0].offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      console.log(slideWidth);
    }
  };
  
     
    useEffect(() => {
      const handleClickOutside = (event) => {
            if (sliderRef.current && !sliderRef.current.contains(event.target)) {
              
              const totalSlides = sliderRef.current.children.length;
              setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
              
              updateSlider();
              
            }
          };
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, []);
      
  return (
    <main className="w-full overflow-x-hidden bg-white"> 
        <Carousel/>
      <div className="mt-4"><MegaMenu/></div>
     
     
<ListProduits/>     
     
        <div className="pt-20 overflow-y-auto flex-1 bg-white">
             <section className="w-full max-w-7xl mx-auto  overflow-hidden shadow-2xl  relative group">

  {/* IMAGE BACKGROUND */}
  <div className="relative h-[400px] md:h-[500px] overflow-hidden">
   <img
  src="/nike.jpg"
  alt="Collection hiver"
  className="w-[95%] h-[95%] object-contain mx-auto transition-transform duration-700 group-hover:scale-110"
/>

    {/* OVERLAY DARK */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

    {/* CONTENU TEXTE */}
    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">

      <h2 className="text-3xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
        COLLECTION NIKE 2026
      </h2>

      <p className="text-lg md:text-xl max-w-xl mb-6 text-gray-200 animate-fadeIn delay-200">
        Style, confort et performance. Découvrez nos nouveaux survêtements
        conçus pour vous démarquer.
      </p>

      <div className="flex gap-4 flex-wrap animate-fadeIn delay-300">
        <button className="
          px-6 py-3 rounded-xl
          bg-white text-black font-semibold
          hover:bg-gray-200 transition duration-300
        ">
          Acheter maintenant
        </button>

        <button className="
          px-6 py-3 rounded-xl
          border border-white/50
          hover:bg-white/10 transition duration-300
        ">
          Voir plus
        </button>
      </div>

    </div>
   
   
  </div>

  {/* SECTION PRODUITS EN BAS */}
 

</section>

<section className="w-full max-w-6xl mx-auto 
 
shadow-xl flex flex-col md:flex-row items-center overflow-hidden">

  {/* IMAGE GAUCHE */}
  <div className="w-full md:w-1/3 h-[300px] md:h-[400px] overflow-hidden">
    <img
      src="/survetement.png"
      alt="Survêtement"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>

  {/* TEXTE */}
  <div className="w-full md:w-1/3  px-6 md:px-10 py-8 text-center md:text-left flex flex-col justify-center">
    
    <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-snug mb-4">
      Nouveaux survêtements
    </h2>

    <p className="text-gray-600 mb-6">
      Découvrez notre collection hiver avec des designs modernes,
      confortables et élégants.
    </p>

    <button className="
      px-6 py-3 rounded-xl
      bg-gradient-to-r from-gray-700 to-white
      text-white font-semibold
      shadow-lg
      hover:scale-105 transition duration-300
    ">
      Découvrir la collection
    </button>

  </div>

  {/* IMAGE DROITE */}
  <div className="w-full md:w-1/3 h-[300px] md:h-[400px] overflow-hidden">
    <img
      src="/survet.png"
      alt="Survêtement 2"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>

</section>



  <section className="flex flex-col md:flex-row items-center bg-pink-50">

  {/* TEXTE */}
  <div className="w-full md:w-1/2 h-auto md:h-[600px] p-8 md:p-16 flex flex-col justify-center">
    
    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
      Découvrez une nouvelle façon d’acheter et vendre
    </h2>

    <p className="text-gray-600 text-lg mb-6">
      Avec <span className="font-semibold text-pink-600">Maboutique</span>, accédez à des milliers de produits,
      comparez les prix et profitez d’une expérience simple, rapide et sécurisée.
    </p>

    <ul className="space-y-3 mb-8 text-gray-600">
      <li>✅ Produits de qualité vérifiés</li>
      <li>🚀 Livraison rapide</li>
      <li>💳 Paiement sécurisé</li>
      <li>📦 Vendez vos produits facilement</li>
    </ul>

    <div className="flex gap-4 flex-wrap">
      <a href="/home/produit">
        <button className="
          px-6 py-3 rounded-xl
          bg-pink-600 hover:bg-pink-700
          text-white font-semibold
          transition-all duration-300
          hover:scale-105 shadow-lg
        ">
          Voir les produits
        </button>
      </a>

      <a href="/dashboard">
        <button className="
          px-6 py-3 rounded-xl
          border border-pink-300
          text-pink-600
          hover:bg-pink-100
          transition-all duration-300
        ">
          Vendre maintenant
        </button>
      </a>
    </div>

  </div>

  {/* IMAGE */}
  <div
    className="w-full md:w-1/2 h-[300px] md:h-[600px] bg-cover bg-center relative"
    style={{ backgroundImage: "url('/cosme1.png')" }}
  >
    {/* Overlay stylé rose */}
    <div className="absolute inset-0 bg-gradient-to-l from-pink-500/40 to-transparent"></div>
  </div>

</section>


   
<AvisUtilisateurs/>

  
 
     
      <div className="bg-white]">
      
    
      
      <Scrollpane
  cartItems={cartItems}
  isModalOpen={isModalOpen}
  openModal={openModal}
  closeModal={closeModal}
  removeItemFromCart={removeFromCart}
  Ajoute={Ajoute}
/>
</div>
    
      
     
     
    
    
    
    </div>
   
       </main>
  );
}

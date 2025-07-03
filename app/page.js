"use client"

import { useEffect, useRef, useState } from "react";
import Header from "./Admin/Component/Header";
import ListProduits from "./Admin/produit/component/ListProduits";
import Link from 'next/link';
import './App.css';
import './Produits.css';
import Scrollpane from "./Component/Scrollpane";
import { useCart } from "./context/CartContext";
import ListCategorie from "./Admin/categorie/component/ListCategorie";
import Carousel from "./Component/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionList from "./Admin/collections/Component/CollectionList";


export default function Home() {
        
  const {Ajoute, addToCart, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();






  
  


  const sliderRef = useRef(null); // Référence pour le slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateSlider = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0].offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      console.log(slideWidth);
    }
  };
  


  
  const nextSlide = () => {
    if (sliderRef.current) {
      const totalSlides = sliderRef.current.children.length;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      
      updateSlider();
      
    }
  };
  ; // Ajouter refreshKey pour re-fetch



  const prevSlide = () => {
    if (sliderRef.current) {
      const totalSlides = sliderRef.current.children.length;
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
      updateSlider();
    }};
     
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
    <main className="">
      
      <Header cartItems={cartItems}/>
       
      
      <div className="pt-20 overflow-y-auto flex-1 bg-blue-100">
      <Carousel/>
      <div className="mt-6">
      
      </div>
      <div className="bg-blue-100">
      <ListCategorie/>
      <ListProduits AjtePagne={addToCart} />
      
      <Scrollpane
  cartItems={cartItems}
  isModalOpen={isModalOpen}
  openModal={openModal}
  closeModal={closeModal}
  removeItemFromCart={removeFromCart}
  Ajoute={Ajoute}
/>
</div>
<CollectionList/>
    <div className="w-full h-96  mx-auto bg-[white] shadow-lg rounded-lg flex items-center ">
        <div className="w-96
         h-full bg-[white]">
             <img
      src="/survetement.webp" 
      alt="Image" 
      className="  object-cover  transition-transform duration-300 hover:scale-105" width={500} height={200}
    />
         </div>
         <div className="w-96 h-full  text-black font-bold mb-4 flex items-center text-4xl">
           <h2 className="mt-2 px-14">DE NOUVEAUX SURVETEMENTS DISPONIBLES POUR L'HIVER</h2>
           
         </div>
         <div className="w-96 h-full bg-[white">
         <img
      src="/survet.jpg" 
      alt="Image" 
      className=" object-cover  transition-transform duration-300 hover:scale-105 ml-20" width={500} height={100}
    />
         </div>
      </div>
      
      <div className="w-full h-96  gap-8 mx-auto bg-[red] shadow-lg rounded-lg flex justify-between items-center  ">
        
      <div className=" relative h-20 bg-[red] px-20 items-center font-bold text-white">
        <h2 className="text-4xl ">NOS MEILLEURES OFFRES </h2>
        <h2 className="mt-2 text-4xl">Ces promos pouraient vous interesser</h2>
        </div>
         <div className="  w-80 h-full bg-[white]">
         <img
      src="/vvvv.webp" 
      alt="Image" 
      className="    transition-transform duration-300 hover:scale-105" width={800} height={600}
    />
         </div>
      </div>
      <div className="w-full h-96 mt-6 gap-8 mx-auto bg-[black] shadow-lg rounded-lg flex justify-between items-center  ">
        
      <div className=" relative h-20 bg-[black] px-20 items-center font-bold text-white">
        <h2 className="text-4xl ">NOS MEILLEURES OFFRES </h2>
        <h2 className="mt-2 text-4xl">Ces promos pouraient vous interesser</h2>
        </div>
        <div className="w-full h-96  mx-auto bg-white shadow-lg rounded-lg flex justify-center items-center relative overflow-hidden">
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-700 ease-in-out w-[300%]"
        >
          <img
            src="/chaussure.webp"
            alt="Chaussure"
            className="w-full flex-shrink-0 object-cover"
          />
          <img
            src="/imagess.jpg"
            alt="Image 2"
            className="w-full  flex-shrink-0 object-cover" width={20} height={10}
          />
          <img
            src="/trigo.jpeg"
            alt="Image 3"
            className="w-full flex-shrink-0 object-cover"
          />
        </div>

        {/* Boutons de navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md"
        >
          Next
        </button>
      </div>

      </div>
    
      <div>
      {/* breadcrumb */}
      <div className="container py-4 flex items-center gap-3">
        <Link href="/" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </Link>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Product</p>
      </div>
      {/* ./breadcrumb */}

      {/* product-detail */}
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img
            src="/assets/images/products/product1.jpg"
            alt="product"
            width={500} // Spécifiez les dimensions des images
            height={500}
            className="w-full"
          />
          <div className="grid grid-cols-5 gap-4 mt-4">
            <img
              src="/assets/images/products/product2.jpg"
              alt="product2"
              width={100}
              height={100}
              className="w-full cursor-pointer border border-primary"
            />
            <img
              src="/assets/images/products/product3.jpg"
              alt="product3"
              width={100}
              height={100}
              className="w-full cursor-pointer border"
            />
            <img
              src="/assets/images/products/product4.jpg"
              alt="product4"
              width={100}
              height={100}
              className="w-full cursor-pointer border"
            />
            <img
              src="/assets/images/products/product5.jpg"
              alt="product5"
              width={100}
              height={100}
              className="w-full cursor-pointer border"
            />
            <img
              src="/assets/images/products/product6.jpg"
              alt="product6"
              width={100}
              height={100}
              className="w-full cursor-pointer border"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">Italian L Shape Sofa</h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
            </div>
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">Apex</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">Sofa</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">BE45VGRT</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">$45.00</p>
            <p className="text-base text-gray-400 line-through">$55.00</p>
          </div>

          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio
            consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus
            adipisci magnam porro.
          </p>

          {/* Size selector */}
          <div className="pt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
            <div className="flex items-center gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <div key={size} className="size-selector">
                  <input type="radio" name="size" id={`size-${size.toLowerCase()}`} className="hidden" />
                  <label
                    htmlFor={`size-${size.toLowerCase()}`}
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
            <div className="flex items-center gap-2">
              {['#fc3d57', '#000', '#fff'].map((color) => (
                <div key={color} className="color-selector">
                  <input type="radio" name="color" id={color} className="hidden" />
                  <label
                    htmlFor={color}
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: color }}
                  ></label>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
              <div className="h-8 w-8 text-base flex items-center justify-center">4</div>
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <Link
              href="#"
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
            >
              <i className="fa-solid fa-bag-shopping"></i> Add to cart
            </Link>
            <Link
              href="#"
              className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
            >
              <i className="fa-solid fa-heart"></i> Wishlist
            </Link>
          </div>
        </div>
      </div>
      {/* ./product-detail */}
    </div>
    
    </div>
    <footer className="bg-gray-900 text-white text-center py-6 "> <p>© {new Date().getFullYear()} Malisugu. Tous droits réservés.</p> </footer>
    </main>
  );
}

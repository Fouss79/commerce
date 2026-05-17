'use client';

import React, { useState } from "react";
import { Heart, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import Etoiles from "./Etoiles";

const ProductItem = ({ product, handleClick }) => {
  const [isFavori, setIsFavori] = useState(false);

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

   return (
    <div className="
  relative
  bg-white
  rounded-lg
  shadow
  p-3
  hover:shadow-lg
  transition
  duration-300
  max-w-[230px]
  mx-auto
">

      
      {/* ❤️ Favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart
          size={18}
          className={isFavori ? "text-red-500" : "text-gray-400"}
        />
      </div>

      <Link href={`/home/boutique/${product.boutiqueI}`}>
        <div className="cursor-pointer">
          <img
            src={`${API_URL}/${product.image}`}
            alt={product.nom}
            className="w-full h-72 object-cover rounded transition-transform duration-300 hover:scale-105"
          />

          <h3 className="font-semibold text-base mt-2 text-[#063c28]">
            {product.nom}
          </h3>

          <Etoiles note={product.moyenne || 0} />

          <p className="text-sm text-gray-700">
            Prix :{" "}
            <span className="text-[#15878f] font-medium">
              {product.prix.toFixed(2)} FCFA
            </span>
          </p>

          <p className="text-xs text-gray-500">
            Boutique : {product.boutiqueNom}
          </p>
        </div>
      </Link>

      <button
          style={{ backgroundColor: '#036c94' }}
          className="mt-4 px-6 py-2 text-white flex gap-2 items-center justify-center rounded-lg transition duration-300 hover:bg-green-700"
          onClick={handleClick}
        >
          <ShoppingCart size={20} />
          Ajouter au panier
        </button>
    </div>
  );
};



export default ProductItem;

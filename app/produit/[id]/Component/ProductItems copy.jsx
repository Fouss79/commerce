"use client";

import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


const ProductItem = ({ product,AjtePagne }) => {
  const [isFavori, setIsFavori] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">

      {/* 🔥 Badge promo */}
      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
        -25%
      </span>

      {/* ❤️ Favori */}
      <div
        onClick={() => setIsFavori(!isFavori)}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer z-10"
      >
        <Heart size={18} className={isFavori ? "text-red-500" : "text-gray-400"} />
      </div>

      {/* IMAGE */}
      <Link href={`/produit/${product.id}`}>
        <div className="h-52 flex items-center justify-center bg-gray-50">
          <img
            src={`${API_URL}${product.image}`}
            alt={product.nom}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* CONTENU */}
      <div className="p-3">

        {/* Nom */}
        <h3 className="text-sm font-semibold text-[#063c28] line-clamp-2">
          {product.nom}
        </h3>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[1,2,3,4,5].map((i) => (
            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
          ))}
          <span className="text-xs text-gray-500">(5)</span>
        </div>

        {/* Prix */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            {product.prix} FCFA
          </span>

          {/* Prix barré */}
          <span className="text-sm text-gray-400 line-through">
            {product.prix + 2000} FCFA
          </span>
        </div>

  
       {/* 👁️ VOIR PRODUIT */}
        <Link href={`/produit/${product.id}`}>

          <button
            className="
              mt-3 w-full py-2 rounded-lg
              bg-[#063c28] text-white text-sm font-medium
              hover:bg-gray-800 transition
              flex items-center justify-center gap-2
            "
          >
            <Eye size={18} className="text-yellow-600" />
            Voir details
          </button>

        </Link>

      </div>
    </div>
  );
};

export default ProductItem;
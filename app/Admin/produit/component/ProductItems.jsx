"use client";

import { Heart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

   const API_URL = "http://localhost:8080";

const ProductItem = ({ product }) => {
  const [isFavori, setIsFavori] = useState(false);

  return (
    <div
      className="
        group relative bg-white rounded-3xl overflow-hidden
        border border-gray-100 shadow-sm
        hover:shadow-2xl hover:-translate-y-2
        transition-all duration-500
      "
    >
      {/* 🔥 Badge promo */}
      <span
        className="
          absolute top-3 left-3 z-20
          bg-gradient-to-r from-green-600 to-[#063c28]
          text-white text-xs font-semibold
          px-3 py-1 rounded-full shadow-lg
        "
      >
        -25%
      </span>

      {/* ❤️ Favori */}
      <button
        onClick={() => setIsFavori(!isFavori)}
        className="
          absolute top-3 right-3 z-20
          w-10 h-10 rounded-full
          bg-white/90 backdrop-blur-md
          flex items-center justify-center
          shadow-lg border border-gray-100
          hover:scale-110 transition-all duration-300
        "
      >
        <Heart
          size={18}
          className={
            isFavori
              ? "text-red-500 fill-red-500"
              : "text-gray-400"
          }
        />
      </button>

      {/* IMAGE */}
      <Link href={`/produit/${product.id}`}>
        <div
          className="
            relative h-56 bg-gradient-to-br
            from-gray-50 via-white to-green-50
            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* Fond décoratif */}
          <div className="absolute w-40 h-40 bg-green-100/40 rounded-full blur-3xl"></div>

          {/* Image produit */}
         <img
                  
                  className='h-16 rounded'
                />

          <img
            src={product.image}
                  alt={product.nom}
            className="
              relative z-10 h-[85%] object-contain
              transition-all duration-700
              group-hover:scale-110
              group-hover:rotate-2
              drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]
            "
          />

          {/* 👁️ Icône œil en bas à droite */}
          <div
            className="
              absolute bottom-3 right-3 z-20
              w-10 h-10 rounded-full
              bg-[#063c28] text-white
              flex items-center justify-center
              shadow-lg
              opacity-0 translate-y-3
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300
            "
          >
            <Eye size={18} className="text-yellow-400" />
          </div>
        </div>
      </Link>

      {/* CONTENU */}
      <div className="p-4">
        {/* NOM */}
        <h3
          className="
            text-sm md:text-base font-semibold
            text-gray-800 line-clamp-2
            min-h-[48px]
          "
        >
          {product.nom}
        </h3>

        {/* ⭐ Note */}
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={14}
              className="text-yellow-400 fill-yellow-400"
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(5.0)</span>
        </div>

        {/* 💰 Prix */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-xl font-bold text-[#063c28]">
            {product.prix} FCFA
          </span>

          <span className="text-sm text-gray-400 line-through">
            {product.prix + 2000} FCFA
          </span>
        </div>

        {/* Bouton principal */}
        <Link href={`/produit/${product.id}`}>
          <button
            className="
              mt-3 w-full py-2 rounded-lg
              bg-[#063c28] text-white text-sm font-medium
              hover:bg-gray-800 transition
              flex items-center justify-center gap-2
            "
          >
            <Eye size={18} className="text-yellow-500" />
            Voir details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
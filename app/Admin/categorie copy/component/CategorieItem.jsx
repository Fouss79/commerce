import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategorieItem = ({ categorie }) => {
  const pathname = usePathname();
  const isSelected = pathname === `/categorie/${categorie.id}`;

  return (
    <Link href={`/categorie/${categorie.id}`}>
      <div
        className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
        shadow-md hover:shadow-xl hover:-translate-y-1 
        ${isSelected ? "ring-2 ring-[#15878f]" : ""}
        `}
      >
        {/* IMAGE */}
        <div className="w-full h-60 overflow-hidden">
          <img
            src={`http://localhost:8080/${categorie.image}`}
            alt={categorie.nom}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* 🔥 TEXTE EN HAUT À GAUCHE */}
        <div className="absolute bottom-3 left-3">
          <h3
            className={`px-3 py-1 rounded-lg text-sm md:text-lg font-bold uppercase tracking-wide backdrop-blur
            ${isSelected 
              ? "bg-white text-black" 
              : "bg-black/50 text-white group-hover:bg-black/70"}
            `}
          >
            {categorie.nom}
          </h3>
        </div>

        {/* BADGE SELECTED */}
        {isSelected && (
          <span className="absolute top-3 right-3 bg-[#15878f] text-white text-xs px-2 py-1 rounded-full">
            Actif
          </span>
        )}
      </div>
    </Link>
  );
};

export default CategorieItem;
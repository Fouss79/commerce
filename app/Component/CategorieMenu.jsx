"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Footprints,
} from "lucide-react";

const CategorieMenu = () => {
  const categorieList = [
    {
      logo: Shirt,
      nom: "Vêtements",
      Link: "/",
    },
    {
      logo: Footprints,
      nom: "Chaussures",
      Link: "/Chaussure",
    },
    {
      logo: Smartphone,
      nom: "Téléphones",
      Link: "/Telephone",
    },
  ];

  return (
    <div className="text-white py-6 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
      <h2 className="text-white font-bold mb-4 flex justify-center text-4xl">
        OFFRE SPÉCIALE -50%
      </h2>

      <div className="flex gap-8 px-6 font-bold items-center justify-center">
        {categorieList.map((cat) => {
          const Icon = cat.logo;

          return (
            <Link key={cat.Link} href={cat.Link}>
              <div className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform duration-300">
                <Icon size={35} />
                <span>{cat.nom}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorieMenu;
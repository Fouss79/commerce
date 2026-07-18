"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  
  Footprints,
  Menu,
  X,
  ChevronDown,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Car,
  Tv,
  ShoppingBag,
} from "lucide-react";
import api from "../../lib/api";
const MegaMenu = () => {
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const timeoutRef = useRef(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const categorieId = searchParams.get("Categorie");
const getCategoryIcon = (nom) => {
  switch (nom?.toLowerCase()) {
    case "telephone":
    case "téléphone":
      return Smartphone;
    case "mobile":
      return Smartphone;
    case "tablette":
      return Smartphone;

    case "informatique":
      return Laptop;
    case "ordinateur":
      return Laptop;
    case "chaussure":
      return Footprints;  

    case "vetement":
    case "vêtement":
      return Shirt;

    case "maison":
      return Home;

    case "automobile":
      return Car;

    case "electronique":
    case "électronique":
      return Tv;

    default:
      return ShoppingBag;
  }
};


  // ================= LOAD =================
  useEffect(() => {
  api.get("/api/categorie")
    .then((res) => {
      if (Array.isArray(res.data)) {
        const categoriesAvecLogo = res.data.map((cat) => ({
          ...cat,
          logo: getCategoryIcon(cat.nom),
        }));

        setCategories(categoriesAvecLogo);
      }
    })
    .catch((err) => console.log(err));
}, []);
  // ================= NAV =================
  const goToCategory = (catId) => {
    router.push(`/produit-cat?Categorie=${catId}`);
    setMobileOpen(false);
  };

  const goToSousCategorie = (id) => {
    router.push(`/produits?sousCategorie=${id}`);
    setMobileOpen(false);
  };

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="w-full relative z-30">

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden flex items-center justify-between px-3 py-3 border-b bg-white">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 bg-[#063c28] text-white px-4 py-2 rounded-xl shadow-md"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="font-semibold">Catégories</span>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}


      
      {mobileOpen && (
  <div className="md:hidden bg-white border-b shadow-lg px-3 py-4 space-y-3">
    {categories.map((cat) => {
      const isActive = Number(categorieId) === cat.id;
      const isOpen = openCategory === cat.id;
      const Icon = cat.logo;

      return (
        <div key={cat.id} className="border rounded-xl overflow-hidden">
          <button
            onClick={() => toggleCategory(cat.id)}
            className={`w-full flex justify-between items-center px-4 py-3 font-semibold ${
              isActive ? "bg-[#063c28] text-white" : "bg-gray-50"
            }`}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                goToCategory(cat.id);
              }}
              className="flex items-center gap-2"
            >
              {Icon && <Icon size={18} className="text-yellow-500" />}
              {cat.nom}
            </span>

            <ChevronDown
              size={18}
              className={`${isOpen ? "rotate-180" : ""} transition`}
            />
          </button>

          {isOpen && (
            <div className="bg-white px-3 py-2">
              {cat.sousCategories?.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => goToSousCategorie(sc.id)}
                  className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-[#063c28] hover:bg-green-50 rounded-lg"
                >
                  {sc.nom}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

      

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden md:flex items-center gap-3 px-3 lg:px-8 py-3 border-b overflow-x-auto whitespace-nowrap">
  {categories.map((cat) => {
    const Icon = cat.logo;
    const isActive = Number(categorieId) === cat.id;

    return (
      <div
        key={cat.id}
        onClick={() => goToCategory(cat.id)}
        className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-full font-semibold flex items-center gap-2 flex-shrink-0 text-sm lg:text-base ${
          isActive
            ? "bg-yellow-600 text-white shadow-lg"
            : "bg-[#063c28] text-white hover:bg-yellow-600 hover:text-white hover:scale-105"
        }`}
      >
        {Icon && <Icon size={18} className="text-yellow-500" />}
        <span>{cat.nom}</span>
      </div>
    );
  })}
</div>    </div>
  );
};

export default MegaMenu;
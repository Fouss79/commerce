"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "../Admin/produit/component/ProductItems";

import Carousel from "../Component/Carousel";
import MegaMenu from "../Component/MegaMenu";
import Menusouscat from "../Component/Menusouscat";

const PageProduits = () => {
  const searchParams = useSearchParams();

  // Paramètres URL
  // Exemple :
  // /produit-cat?Categorie=7
  // /produit-cat?Categorie=7&SousCategorie=5
  const categorieId = searchParams.get("Categorie");
  const sousCategorieId = searchParams.get("SousCategorie");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const [produits, setProduits] = useState([]);
  const [marques, setMarques] = useState([]);

  const [selectedMarque, setSelectedMarque] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const [loading, setLoading] = useState(true);

  // ================= LOAD DATA =================
  useEffect(() => {
    if (!categorieId) return;

    const categorieIdNumber = Number(categorieId);
    const sousCategorieIdNumber = sousCategorieId
      ? Number(sousCategorieId)
      : null;

    setLoading(true);

    // Charger tous les produits
    axios
      .get(`${API_URL}/api/produitss`)
      .then((res) => {
        let produitsFiltres = res.data.filter((p) => {
          // Filtrer d'abord par catégorie
          const appartientCategorie =
            p?.sousCategorie?.categorie?.id ===
            categorieIdNumber;

          // Si une sous-catégorie est sélectionnée,
          // filtrer également par sous-catégorie
          const appartientSousCategorie =
            !sousCategorieIdNumber ||
            p?.sousCategorie?.id ===
              sousCategorieIdNumber;

          return (
            appartientCategorie &&
            appartientSousCategorie
          );
        });

        setProduits(produitsFiltres);
      })
      .catch((err) => {
        console.error(
          "Erreur chargement produits :",
          err
        );
        setProduits([]);
      });

    // Charger les marques
    axios
      .get(`${API_URL}/api/marque`)
      .then((res) => {
        setMarques(res.data);
      })
      .catch((err) => {
        console.error(
          "Erreur chargement marques :",
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categorieId, sousCategorieId, API_URL]);

  // ================= FILTERS =================
  const produitsFiltres = produits.filter((p) => {
    return (
      (!selectedMarque ||
        p?.marque?.id === Number(selectedMarque)) &&
      (!prixMax || p?.prix <= Number(prixMax))
    );
  });

  // ================= IMAGE URL =================
  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";

    if (image.startsWith("http")) return image;

    const clean = image.replaceAll("\\", "/");

    return `${API_URL}/${clean}`;
  };

  return (
    <div>
         <section className="relative flex flex-col md:flex-row items-center mt-20 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-green-50 to-yellow-50 shadow-2xl border border-green-100">
  
  {/* Décoration de fond */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl"></div>

  {/* TEXTE */}
  <div className="relative z-10 w-full md:w-1/2 h-auto md:h-[500px] p-8 md:p-16 flex flex-col justify-center">
    
    {/* Badge */}
    <span className="inline-block w-fit px-4 py-2 mb-6 text-sm font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
      Marketplace 100% Malien
    </span>

    {/* Titre */}
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-[#063c28]">
      La satisfaction de nos clients est notre{" "}
      <span className="text-yellow-500">priorité</span>
    </h2>

    

    {/* Boutons */}
    <div className="flex gap-4 flex-wrap mt-20">
      <a href="/home/produit">
        <button className="px-8 py-4 rounded-2xl bg-[#063c28] hover:bg-[#0a5a3d] text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300">
          Voir les produits
        </button>
      </a>

      <a href="/dashboard">
        <button className="px-8 py-4 rounded-2xl border-2 border-yellow-400 text-[#063c28] font-semibold bg-white hover:bg-yellow-50 shadow-md hover:scale-105 transition-all duration-300">
          Vendre maintenant
        </button>
      </a>
    </div>
  </div>

  {/* IMAGE */}
  <div className="relative z-10 w-full md:w-1/2 h-[320px] md:h-[500px] flex items-center justify-center p-6 md:p-10">
    
    {/* Halo décoratif */}
    <div className="absolute w-80 h-80 bg-gradient-to-br from-green-200/40 to-yellow-200/40 rounded-full blur-3xl"></div>

    {/* Image principale */}
    <img
      src="/fem2.png"
      alt="MaliSugu"
      className="relative z-10 w-[75%] md:w-[80%] max-h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-700"
    />

    {/* Overlay subtil */}
    <div className="absolute inset-0 bg-gradient-to-l from-green-500/10 to-transparent"></div>
  </div>
</section>

           <div className="mt-4"><MegaMenu/></div>
      
      <Menusouscat />

      <div className="bg-gradient-to-br from-gray-50 via-white to-green-50 min-h-screen pt-20 px-4 md:px-6">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
    
    {/* ================= SIDEBAR FILTRES ================= */}
    <aside
      className="
        lg:w-[320px] w-full
        bg-white/90 backdrop-blur-md
        border border-gray-100
        rounded-3xl shadow-xl
        p-6 h-fit
        sticky top-24
      "
    >
      {/* Header */}
      <div className="mb-6">
        <span
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-full
            bg-green-100 text-[#063c28]
            text-sm font-semibold mb-4
          "
        >
          🔍 Recherche avancée
        </span>

        <h2 className="text-2xl font-bold text-[#063c28]">
          Filtres
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Affinez votre recherche pour trouver rapidement
          les produits qui vous intéressent.
        </p>
      </div>

      {/* Prix maximum */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          💰 Prix maximum
        </label>

        <input
          type="number"
          value={prixMax}
          onChange={(e) => setPrixMax(e.target.value)}
          className="
            w-full px-4 py-3 rounded-2xl
            border border-gray-200
            bg-gray-50
            focus:outline-none
            focus:ring-2 focus:ring-green-200
            focus:border-[#063c28]
            transition
          "
          placeholder="Ex: 200000 FCFA"
        />
      </div>

      {/* Marque */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          🏷️ Marque
        </label>

        <select
          value={selectedMarque}
          onChange={(e) => setSelectedMarque(e.target.value)}
          className="
            w-full px-4 py-3 rounded-2xl
            border border-gray-200
            bg-gray-50
            focus:outline-none
            focus:ring-2 focus:ring-green-200
            focus:border-[#063c28]
            transition
          "
        >
          <option value="">Toutes les marques</option>
          {marques.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>
      </div>

      {/* Bouton reset */}
      <button
        onClick={() => {
          setPrixMax("");
          setSelectedMarque("");
        }}
        className="
          w-full py-3 rounded-2xl
          border-2 border-[#063c28]
          text-[#063c28] font-semibold
          hover:bg-[#063c28]
          hover:text-white
          transition-all duration-300
        "
      >
        Réinitialiser les filtres
      </button>
    </aside>

    {/* ================= LISTE DES PRODUITS ================= */}
    <main className="flex-1">
      {/* Barre d'information */}
      <div
        className="
          bg-white border border-gray-100
          rounded-3xl shadow-sm
          px-6 py-4 mb-6
          flex flex-col md:flex-row
          justify-between items-start md:items-center
          gap-3
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-[#063c28]">
            Nos Produits
          </h2>
          <p className="text-sm text-gray-500">
            Découvrez notre sélection de produits de qualité.
          </p>
        </div>

        {!loading && (
          <div
            className="
              px-4 py-2 rounded-full
              bg-green-100 text-[#063c28]
              font-semibold text-sm
            "
          >
            {produitsFiltres.length} produit
            {produitsFiltres.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Chargement */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-14 h-14 border-4 border-green-200 border-t-[#063c28] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Chargement des produits...
          </p>
        </div>
      ) : produitsFiltres.length > 0 ? (
        /* Grille produits */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produitsFiltres.map((p) => (
            <ProductItem
              key={p.id}
              product={p}
              AjtePagne={() => handleClick(p)}
            />
          ))}
        </div>
      ) : (
        /* Aucun résultat */
        <div
          className="
            bg-white border border-gray-100
            rounded-3xl shadow-sm
            py-20 px-6 text-center
          "
        >
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Aucun produit trouvé
          </h3>
          <p className="text-gray-500">
            Essayez de modifier vos filtres pour afficher
            davantage de résultats.
          </p>
        </div>
      )}
    </main>
  </div>
</div>
    </div>
  );
};

export default PageProduits;
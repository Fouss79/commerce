"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "../Admin/produit/component/ProductItems";

import Carousel from "../Component/Carousel";
import MegaMenu from "../Component/MegaMenu";
import Menusouscat from "../Component/Menusouscat";
import api from "../../lib/api";

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
    api
      .get(`/api/produitss`)
      .then((res) => {
        let produitsFiltres = res.data.filter((p) => {
          // Filtrer d'abord par catégorie
          const appartientCategorie =
            p?.categorieId ===
            categorieIdNumber;

          // Si une sous-catégorie est sélectionnée,
          // filtrer également par sous-catégorie
          const appartientSousCategorie =
            !sousCategorieIdNumber ||
            p?.sousCategorieId ===
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
    api
      .get(`/api/marque`)
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
        p?.marqueId === Number(selectedMarque)) &&
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
       

         <Carousel/>
     
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
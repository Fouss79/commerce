// app/Component/Menusouscat.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

const Menusouscat = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Récupère l'id de la catégorie et de la sous-catégorie dans l'URL
  // Exemple : /produit-cat?Categorie=7&SousCategorie=3
  const categorieId = searchParams.get("Categorie");
  const sousCategorieActive = searchParams.get("SousCategorie");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const [sousCategories, setSousCategories] = useState([]);

  // ================= CHARGER LES SOUS-CATEGORIES =================
  useEffect(() => {
    if (!categorieId) {
      setSousCategories([]);
      return;
    }

    axios
      .get(`${API_URL}/api/souscategories/categorie/${categorieId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSousCategories(res.data);
        } else {
          setSousCategories([]);
        }
      })
      .catch((err) => {
        console.error(
          "Erreur chargement des sous-catégories :",
          err
        );
        setSousCategories([]);
      });
  }, [categorieId, API_URL]);

  // Si aucune sous-catégorie, ne rien afficher
  if (sousCategories.length === 0) {
    return null;
  }

  // Vérifie si aucun paramètre SousCategorie n'est présent
  const isAllActive = !sousCategorieActive;

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex flex-wrap gap-3 items-center">
        
        {/* Bouton "Tout" */}
        <button
          onClick={() =>
            router.push(`/produit-cat?Categorie=${categorieId}`)
          }
          className={`px-4 py-2 rounded-full transition font-medium ${
            isAllActive
              ? "bg-black text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
          }`}
        >
          TOUT
        </button>

        {/* Liste des sous-catégories */}
        {sousCategories.map((sub) => {
          const isActive =
            String(sub.id) === String(sousCategorieActive);

          return (
            <button
              key={sub.id}
              onClick={() =>
                router.push(
                  `/produit-cat?Categorie=${categorieId}&SousCategorie=${sub.id}`
                )
              }
              className={`px-4 py-2 rounded-full transition font-medium ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
              }`}
            >
              {sub.nom}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menusouscat;
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Footprints,
  ChevronLeft,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Car,
  Tv,
  ShoppingBag,
} from "lucide-react";
import api from "../../../lib/api"; // 👈 adapte le chemin selon ta structure
import ProductItem from "../../Admin/produit/component/ProductItems"; // 👈 adapte le chemin

function getCategoryIcon(nom) {
  switch (nom?.toLowerCase()) {
    case "telephone":
    case "téléphone":
    case "mobile":
    case "tablette":
      return Smartphone;
    case "informatique":
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
}

export default function CategoriePage() {
  const { id } = useParams();
  const router = useRouter();

  const [categorie, setCategorie] = useState(null);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sousCategorieActive, setSousCategorieActive] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get(`/api/categorie/${id}`),
          api.get(`/api/produitss/categorie/${id}`),
        ]);

        setCategorie(catRes.data);
        setProduits(prodRes.data || []);
      } catch (error) {
        console.error("Erreur chargement catégorie :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Filtrage local par sous-catégorie sélectionnée (sans nouvel appel réseau)
  const produitsAffiches = sousCategorieActive
    ? produits.filter((p) => p.sousCategorieId === sousCategorieActive)
    : produits;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 pt-36 lg:pt-24">
        <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!categorie) {
    return (
      <div className="text-center py-20 text-gray-500 pt-36 lg:pt-24">
        Catégorie introuvable.
      </div>
    );
  }

  const Icon = getCategoryIcon(categorie.nom);

  return (
    <div className="max-w-6xl mx-auto p-6 pt-36 lg:pt-24">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition">
          <ChevronLeft size={20} className="text-gray-500" />
        </Link>
        <span className="text-sm text-gray-400">Retour à l'accueil</span>
      </div>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#063c28] flex items-center justify-center shrink-0 overflow-hidden">
          {categorie.image ? (
            <img
              src={categorie.image}
              alt={categorie.nom}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon size={28} className="text-yellow-400" />
          )}
        </div>

        <div>
          <p className="text-yellow-600 font-semibold text-sm mb-1">Catégorie</p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#063c28]">
            {categorie.nom}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {produits.length} produit{produits.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ================= SOUS-CATÉGORIES (filtre) ================= */}
      {categorie.sousCategories?.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-10">
          <button
            onClick={() => setSousCategorieActive(null)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold border-2 transition ${
              sousCategorieActive === null
                ? "bg-[#063c28] text-white border-[#063c28]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#063c28]"
            }`}
          >
            Toutes
          </button>

          {categorie.sousCategories.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSousCategorieActive(sc.id)}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold border-2 transition ${
                sousCategorieActive === sc.id
                  ? "bg-[#063c28] text-white border-[#063c28]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#063c28]"
              }`}
            >
              {sc.nom}
            </button>
          ))}
        </div>
      )}

      {/* ================= PRODUITS ================= */}
      {produitsAffiches.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <ShoppingBag size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">
            Aucun produit dans {sousCategorieActive ? "cette sous-catégorie" : "cette catégorie"}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {produitsAffiches.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
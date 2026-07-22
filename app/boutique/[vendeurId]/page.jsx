"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Store,
  MapPin,
  Phone,
  BadgeCheck,
  Search,
  SlidersHorizontal,
  Package,
  Star,
} from "lucide-react";
import api from "../../../lib/api"; // 👈 adapte le chemin selon ta structure
import ProductItem from "../../../app/Admin/produit/component/ProductItems";// 👈 adapte le chemin

export default function BoutiqueVendeurPage() {
  const { vendeurId } = useParams();

  const [vendeur, setVendeur] = useState(null);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [tri, setTri] = useState("default");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ================= CHARGEMENT VENDEUR + PRODUITS =================
  useEffect(() => {
    if (!vendeurId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [vendeurRes, produitsRes] = await Promise.all([
          api.get(`/api/users/${vendeurId}`),
          api.get(`/api/produitss/vendeur/${vendeurId}`),
        ]);

        setVendeur(vendeurRes.data);
        setProduits(produitsRes.data || []);
      } catch (error) {
        console.error("Erreur chargement boutique :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vendeurId]);

  // ================= IMAGE HELPER =================
  const getImageUrl = (img) => {
    if (!img) return "/no-image.png";
    if (typeof img === "string" && img.startsWith("http")) return img;
    const clean = (img || "").replaceAll("\\", "/");
    return `${API_URL}${clean.startsWith("/") ? "" : "/"}${clean}`;
  };

  // ================= FILTRAGE + TRI =================
  const produitsAffiches = useMemo(() => {
    let liste = [...produits];

    if (recherche.trim()) {
      const q = recherche.toLowerCase();
      liste = liste.filter((p) => p.nom?.toLowerCase().includes(q));
    }

    switch (tri) {
      case "prixAsc":
        liste.sort((a, b) => a.prix - b.prix);
        break;
      case "prixDesc":
        liste.sort((a, b) => b.prix - a.prix);
        break;
      case "nomAsc":
        liste.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      default:
        break;
    }

    return liste;
  }, [produits, recherche, tri]);

  // ================= NOTE MOYENNE BOUTIQUE =================
  const noteMoyenneBoutique = useMemo(() => {
    const notes = produits
      .map((p) => Number(p.moyenne))
      .filter((n) => !isNaN(n) && n > 0);

    if (notes.length === 0) return 0;
    return notes.reduce((a, b) => a + b, 0) / notes.length;
  }, [produits]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-100 rounded-3xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!vendeur) {
    return (
      <div className="text-center py-20 text-gray-500">
        Boutique introuvable.
      </div>
    );
  }

 return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 pt-36 lg:pt-28 space-y-8 md:space-y-10">
      {/* ================= BANNIÈRE BOUTIQUE ================= */}
      <div
        className="
          relative overflow-hidden rounded-3xl
          bg-gradient-to-br from-[#063c28] via-[#0a5a3d] to-[#0d734b]
          p-8 md:p-10 shadow-[0_20px_50px_rgba(6,60,40,0.25)]
        "
      >
        {/* Motif décoratif discret */}
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6">

          {/* AVATAR VENDEUR */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-white/10 border-4 border-white/20 flex items-center justify-center text-yellow-400 text-4xl font-bold shrink-0">
            {vendeur.image ? (
              <img
                src={vendeur.image}
                alt={vendeur.nomBoutique || vendeur.prenom}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {vendeur.prenom?.[0]}
                {vendeur.nom?.[0]}
              </>
            )}
          </div>

          {/* INFOS */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <h1 className="text-2xl md:text-4xl font-extrabold text-white">
                {vendeur.nomBoutique || `${vendeur.prenom} ${vendeur.nom}`}
              </h1>
              {vendeur.vendeurActif && (
                <BadgeCheck className="text-yellow-400" size={26} />
              )}
            </div>

            <p className="text-green-100 text-sm md:text-base">
              Boutique tenue par {vendeur.prenom} {vendeur.nom}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm">
              <span className="flex items-center gap-2 text-green-100">
                <Package size={16} />
                {produits.length} produit{produits.length > 1 ? "s" : ""}
              </span>

              {noteMoyenneBoutique > 0 && (
                <span className="flex items-center gap-2 text-yellow-400 font-semibold">
                  <Star size={16} fill="currentColor" />
                  {noteMoyenneBoutique.toFixed(1)} / 5
                </span>
              )}

              {vendeur.adresse && (
                <span className="flex items-center gap-2 text-green-100">
                  <MapPin size={16} />
                  {vendeur.adresse}
                </span>
              )}

              {vendeur.numero && (
                <span className="flex items-center gap-2 text-green-100">
                  <Phone size={16} />
                  {vendeur.numero}
                </span>
              )}
            </div>
          </div>

          {/* BADGE STORE */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl text-white text-sm font-semibold">
            <Store size={18} className="text-yellow-400" />
            Boutique certifiée
          </div>
        </div>
      </div>

      {/* ================= BARRE RECHERCHE + TRI ================= */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un produit dans cette boutique..."
            className="
              w-full pl-11 pr-4 py-3 rounded-2xl
              border border-gray-200 bg-white
              focus:outline-none focus:ring-2 focus:ring-[#063c28]/30
              text-sm
            "
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <SlidersHorizontal size={18} className="text-gray-400 shrink-0" />
          <select
            value={tri}
            onChange={(e) => setTri(e.target.value)}
            className="
              flex-1 md:flex-none px-4 py-3 rounded-2xl
              border border-gray-200 bg-white
              text-sm font-medium text-gray-700
              focus:outline-none focus:ring-2 focus:ring-[#063c28]/30
            "
          >
            <option value="default">Par défaut</option>
            <option value="prixAsc">Prix croissant</option>
            <option value="prixDesc">Prix décroissant</option>
            <option value="nomAsc">Nom (A → Z)</option>
          </select>
        </div>
      </div>

      {/* ================= GRILLE PRODUITS ================= */}
      {produitsAffiches.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <Package size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">
            {recherche
              ? "Aucun produit ne correspond à votre recherche."
              : "Cette boutique n'a pas encore de produits."}
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
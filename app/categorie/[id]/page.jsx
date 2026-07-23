"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
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
  SlidersHorizontal,
  X,
  Star,
} from "lucide-react";
import api from "../../../lib/api";
import ProductItem from "../../Admin/produit/component/ProductItems";

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

  const [categorie, setCategorie] = useState(null);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sousCategorieActive, setSousCategorieActive] = useState(null);

  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [tri, setTri] = useState("default");
  const [marqueActive, setMarqueActive] = useState(null);
  const [prixMax, setPrixMax] = useState(null);
  const [noteMin, setNoteMin] = useState(null);

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

  useEffect(() => {
    setSousCategorieActive(null);
    setMarqueActive(null);
    setPrixMax(null);
    setNoteMin(null);
    setTri("default");
  }, [id]);

  const marquesDisponibles = useMemo(() => {
    const map = new Map();
    produits.forEach((p) => {
      if (p.marqueId && !map.has(p.marqueId)) {
        map.set(p.marqueId, p.marqueNom);
      }
    });
    return Array.from(map, ([id, nom]) => ({ id, nom }));
  }, [produits]);

  const prixMaxDisponible = useMemo(() => {
    if (produits.length === 0) return 100000;
    return Math.ceil(Math.max(...produits.map((p) => p.prix || 0)));
  }, [produits]);

  const produitsAffiches = useMemo(() => {
    let liste = [...produits];

    if (sousCategorieActive) {
      liste = liste.filter((p) => p.sousCategorieId === sousCategorieActive);
    }
    if (marqueActive) {
      liste = liste.filter((p) => p.marqueId === marqueActive);
    }
    if (prixMax !== null) {
      liste = liste.filter((p) => (p.prix || 0) <= prixMax);
    }
    if (noteMin !== null) {
      liste = liste.filter((p) => (Number(p.moyenne) || 0) >= noteMin);
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
  }, [produits, sousCategorieActive, marqueActive, prixMax, noteMin, tri]);

  const filtresActifs =
    (marqueActive !== null ? 1 : 0) +
    (prixMax !== null ? 1 : 0) +
    (noteMin !== null ? 1 : 0) +
    (tri !== "default" ? 1 : 0);

  const resetFiltres = () => {
    setMarqueActive(null);
    setPrixMax(null);
    setNoteMin(null);
    setTri("default");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 pt-36 lg:pt-24">
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

  // ================= CONTENU DU PANNEAU DE FILTRES (réutilisé sidebar + mobile) =================
  const FiltresContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-bold text-gray-800">Affiner les résultats</p>
        {filtresActifs > 0 && (
          <button
            onClick={resetFiltres}
            className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
          >
            <X size={14} />
            Réinitialiser
          </button>
        )}
      </div>

      {/* TRI */}
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-3">Trier par</p>
        <select
          value={tri}
          onChange={(e) => setTri(e.target.value)}
          className="
            w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
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

      {/* MARQUE */}
      {marquesDisponibles.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-3">Marque</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMarqueActive(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                marqueActive === null
                  ? "bg-[#063c28] text-white border-[#063c28]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#063c28]"
              }`}
            >
              Toutes
            </button>
            {marquesDisponibles.map((m) => (
              <button
                key={m.id}
                onClick={() => setMarqueActive(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  marqueActive === m.id
                    ? "bg-[#063c28] text-white border-[#063c28]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#063c28]"
                }`}
              >
                {m.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PRIX */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-600">Prix maximum</p>
          <span className="text-sm font-bold text-[#063c28]">
            {(prixMax ?? prixMaxDisponible).toLocaleString()} FCFA
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={prixMaxDisponible}
          step={Math.max(100, Math.round(prixMaxDisponible / 100))}
          value={prixMax ?? prixMaxDisponible}
          onChange={(e) => setPrixMax(Number(e.target.value))}
          className="w-full accent-[#063c28]"
        />
      </div>

      {/* NOTE */}
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-3">Note minimum</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setNoteMin(null)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition ${
              noteMin === null
                ? "bg-[#063c28] text-white border-[#063c28]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#063c28]"
            }`}
          >
            Toutes les notes
          </button>

          {[4, 3, 2, 1].map((n) => (
            <button
              key={n}
              onClick={() => setNoteMin(n)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition ${
                noteMin === n
                  ? "bg-[#063c28] text-white border-[#063c28]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#063c28]"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < n
                        ? "fill-yellow-400 text-yellow-400"
                        : noteMin === n
                        ? "text-white/30"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span>et plus</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 pt-36 lg:pt-24">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition">
          <ChevronLeft size={20} className="text-gray-500" />
        </Link>
        <span className="text-sm text-gray-400">Retour à l'accueil</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
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
            {produitsAffiches.length} produit{produitsAffiches.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ================= SOUS-CATÉGORIES ================= */}
      {categorie.sousCategories?.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-6">
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

      {/* ================= BOUTON FILTRES (mobile uniquement) ================= */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          className="
            flex items-center gap-2 px-4 py-2.5 rounded-2xl
            border border-gray-200 bg-white
            text-sm font-semibold text-gray-700
            hover:border-[#063c28] transition
          "
        >
          <SlidersHorizontal size={16} />
          Filtres
          {filtresActifs > 0 && (
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#063c28] text-white text-xs">
              {filtresActifs}
            </span>
          )}
        </button>

        {showFiltersMobile && (
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-5 mt-4">
            {FiltresContent}
          </div>
        )}
      </div>

      {/* ================= LAYOUT DESKTOP : SIDEBAR + PRODUITS ================= */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-8">

        {/* SIDEBAR FIXE (desktop uniquement) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 bg-gray-50 border border-gray-100 rounded-3xl p-5">
            {FiltresContent}
          </div>
        </aside>

        {/* ================= PRODUITS ================= */}
        <div>
          {produitsAffiches.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <ShoppingBag size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">
                Aucun produit ne correspond à ces filtres.
              </p>
              {filtresActifs > 0 && (
                <button
                  onClick={resetFiltres}
                  className="mt-4 text-sm font-semibold text-[#063c28] hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {produitsAffiches.map((p) => (
                <ProductItem key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
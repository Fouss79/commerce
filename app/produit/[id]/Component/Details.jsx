"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

import AvisSection from "./AvisSection";
import Etoiles from "./Etoiles";
import ProductItem from "./ProductItems copy";
import api from "../../../../lib/api";

export default function ProduitDetail({
  produit,
  variantes = [],
  selectedVariante,
  setSelectedVariante,
}) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [similaires, setSimilaires] = useState([]);
  const [tri, setTri] = useState("default");
  const [quantite, setQuantite] = useState(1);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState("description");

  const swiperRef = useRef(null);

  // ================= IMAGE FIX PRO =================
  const getImageUrl = (img) => {
    if (!img) return "/no-image.png";

    // Si backend envoie un objet { url: ... }
    if (typeof img === "object" && img.url) {
      img = img.url;
    }

    if (typeof img !== "string") return "/no-image.png";

    // URL déjà complète
    if (img.startsWith("http")) return img;

    // Nettoyage des backslashes
    const clean = img.replaceAll("\\", "/");

    // Concaténation avec API_URL
    return `${API_URL}${clean.startsWith("/") ? "" : "/"}${clean}`;
  };

  // ================= SYNCHRONISATION SWIPER =================
  useEffect(() => {
    if (!selectedVariante || !swiperRef.current || variantes.length === 0) {
      return;
    }

    const index = variantes.findIndex(
      (v) => v.id === selectedVariante.id
    );

    if (index !== -1) {
      swiperRef.current.slideTo(index);
    }
  }, [selectedVariante, variantes]);

  // ================= CHARGEMENT DES PRODUITS SIMILAIRES =================
  useEffect(() => {
    const fetchSimilar = async () => {
      if (!produit?.marqueId) return;

      try {
        const res = await api.get(
          `/api/produitss/similar`,
          {
            params: {
              marqueId: produit.marqueId,
              categorieId: produit?.sousCategorieId,
            },
          }
        );

        setSimilaires(res.data || []);
      } catch (error) {
        console.log("Erreur similaires :", error);
      }
    };

    fetchSimilar();
  }, [produit, API_URL]);

 

  // ================= IMAGE PRINCIPALE =================
  const finalImage = useMemo(() => {
    return getImageUrl(
      selectedVariante?.image || produit?.image
    );
  }, [selectedVariante, produit]);

  // ================= CHARGEMENT =================
  if (!produit) {
    return (
      <div className="p-10 text-center">
        Chargement...
      </div>
    );
  }

  // ================= TRI =================
  const produitsTries = [...similaires].sort((a, b) => {
    switch (tri) {
      case "prixAsc":
        return a.prix - b.prix;
      case "prixDesc":
        return b.prix - a.prix;
      case "nomAsc":
        return a.nom.localeCompare(b.nom);
      case "nomDesc":
        return b.nom.localeCompare(a.nom);
      default:
        return 0;
    }
  });

  // ================= VARIANTES UNIQUES PAR COULEUR =================
  const couleursUniques = [
    ...new Map(
      variantes.map((v) => [v.couleur, v])
    ).values(),
  ];
   const handleAddToCart = () => {
    if (!selectedVariante) return alert("Choisissez une variante");

    if (quantite > selectedVariante.stock)
      return alert("Stock insuffisant");

    addToCart({
      produitId: produit.id,
      varianteId: selectedVariante.id,
      nom: produit.nom,
      couleur: selectedVariante.couleur,
      prix: selectedVariante.prix,
      image: finalImage,
      quantite,
    });

    setMessage("Produit ajouté au panier !");
    setTimeout(() => setMessage(""), 2500);
  };
  return (
    <div className="max-w-6xl mx-auto">
      {/* ================= SECTION PRINCIPALE ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      
  
<div className="space-y-5">
  {/* ================= IMAGE PRINCIPALE ================= */}
  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-2xl">
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      spaceBetween={10}
      slidesPerView={1}
      onSlideChange={(swiper) => {
        const variante = variantes[swiper.activeIndex];
        if (variante) {
          setSelectedVariante(variante);
        }
      }}
      className="group"
    >
      {variantes.map((v) => (
        <SwiperSlide key={v.id}>
          <div className="relative flex items-center justify-center p-6 md:p-8">
            {/* Halo décoratif */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50"></div>

            {/* Badge */}
            <div className="absolute top-4 left-4 z-20  py-1 rounded-full bg-white/90 backdrop-blur-sm shadow text-xs font-semibold text-[#063c28]">
            
            </div>

            {/* Image */}
            <Image
              src={getImageUrl(v.image)}
              width={600}
              height={600}
              className="relative z-10 object-contain w-full h-[420px] md:h-[500px] transition-transform duration-700 group-hover:scale-105"
              alt={produit.nom}
              unoptimized
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Overlay subtil */}
    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50"></div>
  </div>

  {/* ================= MINIATURES ================= */}
  <div className="flex gap-3 flex-wrap justify-center md:justify-start">
    {variantes.map((v, index) => (
      <button
        key={v.id}
        onClick={() => {
          setSelectedVariante(v);
          swiperRef.current?.slideTo(index);
        }}
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
          selectedVariante?.id === v.id
            ? "border-[#063c28] shadow-lg ring-4 ring-green-100"
            : "border-gray-200 hover:border-green-300 shadow-sm"
        }`}
      >
        <Image
          src={getImageUrl(v.image)}
          width={96}
          height={96}
          className="object-cover w-full h-full"
          alt={`Miniature ${index + 1}`}
          unoptimized
        />

        {/* Overlay pour la miniature sélectionnée */}
        {selectedVariante?.id === v.id && (
          <div className="absolute inset-0 bg-[#063c28]/10"></div>
        )}
      </button>
    ))}
  </div>
  <div style={{ marginTop: 64 }}>
          {/* Tab bar */}
          <div style={{
            display: "flex", borderBottom: "2px solid #e3ede7",
            marginBottom: 32, gap: 0,
          }}>
            {[
              { key: "description", label: "Description" },
              { key: "avis", label: "Avis clients" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "14px 28px",
                  background: "none", border: "none",
                  fontSize: 15, fontWeight: 700,
                  cursor: "pointer",
                  color: activeTab === tab.key ? "#063c28" : "#9ca3af",
                  borderBottom: activeTab === tab.key
                    ? "3px solid #063c28"
                    : "3px solid transparent",
                  marginBottom: -2,
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#f8faf9", borderRadius: 20,
                padding: "28px 32px", border: "1px solid #e3ede7",
                fontSize: 16, color: "#374151", lineHeight: 1.8,
              }}
            >
              {produit.description || "Aucune description disponible pour ce produit."}
            </motion.div>
          )}

          {activeTab === "avis" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AvisSection produitId={produit.id} utilisateurId={user?.id} />
            </motion.div>
          )}
        </div>
</div>

    
       {/* ================= INFORMATIONS PRODUIT ================= */}
<div className="space-y-6">
  {/* BADGES */}
  <div className="flex flex-wrap gap-3">
    
  </div>

  {/* TITRE */}
  <div>
    <p className="text-3xl md:text-5xl font-extrabold text-[#063c28] leading-tight">
      {produit.nom}
    </p>

    {/* NOTE MOYENNE */}
    {produit.moyenne !== undefined && (
      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-1">
          <Etoiles note={produit.moyenne} />
        </div>

   <span className="text-sm font-medium text-gray-500">
  ({(Number(produit?.moyenne) || 0).toFixed(1)} / 5)
</span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
          ⭐ Très apprécié
        </span>
      </div>
    )}
  </div>

  {/* CATÉGORIE */}
  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
    <p className="text-sm text-gray-500 mb-1">Catégorie</p>
    <p className="text-lg font-semibold text-gray-800">
      {produit?.sousCategorieNom || "Non définie"}
    </p>
  </div>


  {/* PRIX */}
 <div className="
  relative overflow-hidden
  bg-gradient-to-br
  from-[#063c28]
  via-[#0a5a3d]
  to-[#0d734b]
  rounded-3xl
  p-8
  shadow-[0_20px_50px_rgba(6,60,40,0.25)]
">
    <p className="text-sm text-green-100 mb-2">Prix actuel</p>

    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-3xl md:text-4xl font-extrabold text-yellow-600">
        {(selectedVariante?.prix || produit.prix)?.toLocaleString()} FCFA
      </span>

    </div>
  </div>

  {/* STOCK */}
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 w-fit">
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
  <span className="text-green-700 font-semibold text-sm">
    {selectedVariante?.stock > 0
      ? `${selectedVariante.stock} en stock`
      : "Rupture de stock"}
  </span>
</div>

  {/* COULEURS */}
  <div>
    <p className="font-bold text-gray-800 mb-3">
       Couleur sélectionnée
    </p>

    <div className="flex gap-3 flex-wrap">
      {couleursUniques.map((v) => (
        <button
          key={v.id}
          onClick={() => {
            setSelectedVariante(v);
            setQuantite(1);
          }}
          className={`px-5 py-2 rounded-2xl font-medium border-2 transition-all duration-300 ${
            selectedVariante?.couleur === v.couleur
              ? "bg-[#063c28] text-white border-[#063c28] shadow-lg scale-105"
              : "bg-white text-gray-700 border-gray-200 hover:border-[#063c28] hover:text-[#063c28]"
          }`}
        >
          {v.couleur}
        </button>
      ))}
    </div>
  </div>

  {/* QUANTITÉ */}
  <div>
    <p className="font-bold text-gray-800 mb-3">
      Quantité
    </p>

    <div
      className="
        inline-flex items-center
        bg-gray-50 border border-gray-200
        rounded-2xl overflow-hidden
        shadow-sm
      "
    >
      <button
        onClick={() => setQuantite((q) => Math.max(1, q - 1))}
        className="
          px-5 py-3 text-xl font-bold
          text-gray-600 hover:bg-gray-100
          transition
        "
      >
        −
      </button>

      <span className="px-8 py-3 text-xl font-bold text-[#063c28] bg-white">
        {quantite}
      </span>

      <button
        onClick={() =>
          setQuantite((q) =>
            Math.min(selectedVariante?.stock || 1, q + 1)
          )
        }
        className="
          px-5 py-3 text-xl font-bold
          text-gray-600 hover:bg-gray-100
          transition
        "
      >
        +
      </button>
    </div>
  </div>

  {/* BOUTON AJOUT AU PANIER */}
  <button onClick={handleAddToCart}
  className="
    relative overflow-hidden
    w-full py-5 rounded-3xl
    bg-gradient-to-r
    from-[#063c28]
    to-[#0a5a3d]
    text-white
    font-bold
    text-lg
    shadow-xl
    scale-[1.02]
    transition-all
    duration-300
    group
  "
  
>
  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>

  <span className="relative flex items-center justify-center gap-3">
    <ShoppingCart size={24} className="text-yellow-400" />
    Ajouter au panier
  </span>
</button>

  {/* MESSAGE DE SUCCÈS */}
  {message && (
    <div
      className="
        bg-green-50 border border-green-200
        text-green-700 font-medium
        px-4 py-3 rounded-2xl
        shadow-sm text-center
        animate-pulse
      "
    >
      ✅ {message}
    </div>
  )}
{/* VENDEUR */}


<div className="
  flex items-center gap-4
  p-5
  rounded-3xl
  border
  border-gray-200
  bg-white
  shadow-sm
">
  <div className="
    w-14 h-14
    rounded-full
    bg-[#063c28]
    text-yellow-400
    font-bold
    flex items-center justify-center
  ">
    {produit?.vendeurPrenom?.[0]}
    {produit?.vendeurNom?.[0]}
  </div>

  <div>
    <p className="text-sm text-gray-500">
      Vendeur certifié
    </p>

    <p className="font-bold text-[#063c28]">
      {produit?.vendeurPrenom} {produit?.vendeurNom}
    </p>
  </div>
</div>
  {/* GARANTIES */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="bg-white rounded-2xl p-4 shadow-sm border">
    🛡️ Paiement sécurisé
  </div>

  <div className="bg-white rounded-2xl p-4 shadow-sm border">
    🚚 Livraison rapide
  </div>

  <div className="bg-white rounded-2xl p-4 shadow-sm border">
    🔄 Retour facile
  </div>

  <div className="bg-white rounded-2xl p-4 shadow-sm border">
    ⭐ Qualité garantie
  </div>
</div>
</div>
       

      </div>

      {/* ================= PRODUITS SIMILAIRES ================= */}
      <div className="mt-12">
        <h2 className="text-2xl text-[#036c94] font-bold mb-4">
          Produits similaires
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
        >
          {produitsTries.slice(0, 8).map((p) => (
            <SwiperSlide key={p.id}>
              <ProductItem product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= AVIS ================= */}
     
    </div>
  );
}



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShoppingBag,
  Sparkles,
  AlertCircle,
  PackageOpen,
  CheckCircle,
} from "lucide-react";

import ProductItem from "./ProductItems";
import styles from "./produit.module.css";
import { useCart } from "../../../context/CartContext";
import api from "../../../../lib/api";

const ListProduits = ({ refreshKey, AjtePagne }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const { addToCart } = useCart();

  /* ================= AJOUT AU PANIER ================= */
  const handleClick = (product) => {
    addToCart(product);
    setMessage("Produit ajouté au panier avec succès !");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  /* ================= SUPPRESSION ================= */
  const deleteid = async (produit_id) => {
    try {
      await api.delete(
        `/api/produitss/${produit_id}`
      );
      fetchProduits();
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  /* ================= CHARGEMENT DES PRODUITS ================= */
  const fetchProduits = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(
        "/api/produitss"
      );
      setProduits(response.data);
    } catch (error) {
      setError("Erreur lors de la récupération des produits.");
      console.error("Erreur fetch produits :", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    fetchProduits();
  }, [refreshKey]);

  /* ================= RENDER ================= */
  return (
    <div className="w-full relative">
      {/* ================= MESSAGE SUCCESS ================= */}
      {message && (
        <div
          className="
            fixed top-24 right-6 z-50
            bg-white border border-green-200
            shadow-2xl rounded-2xl
            px-5 py-4
            flex items-center gap-3
            animate-bounce
          "
        >
          <CheckCircle className="text-green-600" size={22} />
          <span className="text-green-700 font-medium text-sm">
            {message}
          </span>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-14 h-14 border-4 border-green-200 border-t-[#063c28] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Chargement des produits...
          </p>
        </div>
      ) : error ? (
        /* ================= ERREUR ================= */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle size={50} className="text-red-500 mb-4" />
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      ) : produits.length === 0 ? (
        /* ================= AUCUN PRODUIT ================= */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageOpen size={56} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aucun produit disponible
          </h3>
          <p className="text-gray-500">
            Les produits apparaîtront ici dès qu’ils seront ajoutés.
          </p>
        </div>
      ) : (
        <>
          {/* ================= HEADER SECTION ================= */}
          <section className="mt-12 px-4">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                {/* Badge */}
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-full
                    bg-green-100 text-[#063c28]
                    font-semibold text-sm mb-3
                  "
                >
                  
                  Sélection exclusive
                </div>

                {/* Titre */}
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#063c28]">
                  Articles à la une
                </h3>

                {/* Sous-titre */}
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Découvrez nos meilleurs produits soigneusement
                  sélectionnés pour vous offrir qualité, fiabilité et
                  satisfaction.
                </p>
              </div>

              {/* Nombre de produits */}
              <div
                className="
                  hidden md:flex items-center gap-2
                  bg-white border border-gray-200
                  px-5 py-3 rounded-2xl shadow-sm
                "
              >
                <ShoppingBag
                  size={20}
                  className="text-[#063c28]"
                />
                <span className="font-semibold text-gray-700">
                  {produits.length} produits
                </span>
              </div>
            </div>
          </section>

          {/* ================= LISTE DES PRODUITS ================= */}
          <div className={styles.productList}>
            {produits.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                AjtePagne={() => handleClick(product)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduits;
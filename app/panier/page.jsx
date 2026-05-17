"use client";

import React, { useState } from "react";
import { useCart } from "../../app/context/CartContext";
import { useAuth } from "../../app/context/AuthContext";
import { useRouter } from "next/navigation";
import Header from "../Admin/Component/Header";
import axios from "axios";
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle } from "lucide-react";

const PanierPage = () => {
  const { cartItems, removeFromCart, emptyCart, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [toast, setToast] = useState("");

  // ================= TOAST =================
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ================= COMMANDE =================
  const handleCheckout = () => {
  if (!isAuthenticated) {
    showToast("Connecte-toi pour commander !");
    router.push("/login");
    return;
  }

  // 👉 redirection vers checkout
  router.push("/chek");
};

  const getTotalPrice = () =>
    cartItems.reduce((t, i) => t + i.quantite * i.prix, 0);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 px-4 md:px-10">
      <Header />

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-white shadow-2xl border border-green-200 px-5 py-3 rounded-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="text-green-600" />
          <span className="text-green-700 font-medium">{toast}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#063c28] flex items-center gap-2">
          <ShoppingBag />
          Mon panier
        </h2>

        {cartItems.length > 0 && (
          <button
            onClick={handleCheckout}
            className="bg-[#063c28] text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            Valider commande
          </button>
        )}
      </div>

      {/* EMPTY */}
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-24">
          🛒 Ton panier est vide
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LISTE PRODUITS */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white rounded-3xl shadow-md p-4 flex gap-4 items-center
                  hover:shadow-xl hover:scale-[1.01]
                  transition-all duration-300
                "
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  className="w-24 h-24 rounded-2xl object-cover"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">
                    {item.nom}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.taille || "N/A"} • {item.couleur}
                  </p>

                  <p className="font-bold text-[#063c28] mt-1">
                    {item.prix} FCFA
                  </p>

                  {/* QUANTITE */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        removeFromCart(item.varianteId);
                        showToast("Produit retiré");
                      }}
                      className="p-2 bg-red-100 text-red-600 rounded-xl hover:scale-110 transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-bold">
                      {item.quantite}
                    </span>

                    <button
                      onClick={() => {
                        addToCart({ ...item, quantite: 1 });
                        showToast("Produit ajouté");
                      }}
                      className="p-2 bg-green-100 text-green-600 rounded-xl hover:scale-110 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="text-right">
                  <p className="font-bold text-gray-800">
                    {(item.quantite * item.prix).toFixed(0)} FCFA
                  </p>

                  <button
                    onClick={() => {
                      removeFromCart(item.varianteId);
                      showToast("Supprimé");
                    }}
                    className="mt-3 text-red-500 hover:text-red-700 hover:scale-110 transition"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RESUME */}
          <div className="bg-white p-6 rounded-3xl shadow-xl h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-[#063c28]">
              Résumé commande
            </h3>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Articles</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Total</span>
              <span className="font-bold text-[#063c28]">
                {getTotalPrice().toFixed(0)} FCFA
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#063c28] text-white py-3 rounded-2xl hover:scale-105 transition"
            >
              Commander maintenant
            </button>

            <button
              onClick={emptyCart}
              className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-2xl hover:bg-red-50 transition"
            >
              Vider le panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanierPage;
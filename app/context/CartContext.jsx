"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const auth = useAuth();

  const user = auth?.user;
  const isAuthenticated = auth?.isAuthenticated;

  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= UI =================
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
   
  useEffect(() => {

  const clearCart = () => {
    setCartItems([]);
  };

  window.addEventListener("cartUpdated", clearCart);

  return () => {
    window.removeEventListener("cartUpdated", clearCart);
  };

}, []);
  // ================= LOAD CART =================
  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    setCartItems(savedCart);

    setIsLoaded(true);

  }, []);

  // ================= SAVE LOCAL STORAGE =================
  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // ================= ADD TO CART =================
  const addToCart = (product) => {

    setCartItems((prev) => {

      // ✅ vérifier variante
      const exist = prev.find(
        (item) => item.varianteId === product.varianteId
      );

      // ✅ variante existe déjà
      if (exist) {

        return prev.map((item) =>

          item.varianteId === product.varianteId
            ? {
                ...item,
                quantite:
                  item.quantite + (product.quantite || 1),
              }
            : item
        );
      }

      // ✅ nouvelle variante
      return [
        ...prev,
        {
          produitId: product.produitId,
          varianteId: product.varianteId,

          nom: product.nom,
          prix: product.prix,
          image: product.image,

          taille: product.taille,
          couleur: product.couleur,

          quantite: product.quantite || 1,
        },
      ];
    });
  };

  // ================= REMOVE =================
  const removeFromCart = (varianteId) => {

    setCartItems((prev) =>

      prev
        .map((item) =>

          item.varianteId === varianteId
            ? {
                ...item,
                quantite: item.quantite - 1,
              }
            : item
        )
        .filter((item) => item.quantite > 0)
    );
  };

  // ================= CLEAR =================
  const emptyCart = () => {

    setCartItems([]);

    localStorage.removeItem("cartItems");
  };

  // ================= SYNC BACKEND =================
  const syncCartToBackend = async () => {

    if (!isAuthenticated || !user?.id) return;

    try {

      await axios.post(
        "http://localhost:8080/api/paniers",
        {
          clientId: user.id,

          produits: cartItems.map((item) => ({
            produitId: item.produitId,
            varianteId: item.varianteId,
            quantite: item.quantite,
          })),
        }
      );

    } catch (err) {

      console.error("Erreur sync panier", err);
    }
  };

  // ================= TOTAL =================
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.prix * item.quantite,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantite,
    0
  );

  return (
    <CartContext.Provider
      value={{

        cartItems,

        addToCart,
        removeFromCart,
        emptyCart,

        totalPrice,
        totalItems,

        isModalOpen,
        openModal,
        closeModal,

        isFormOpen,
        openForm,
        closeForm,

        isLoaded,

        syncCartToBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
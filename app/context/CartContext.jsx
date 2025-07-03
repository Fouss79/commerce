"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🟢 Initialisation immédiate depuis localStorage
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const[isFormOpen, setIsFormOpen] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 const openForm = () => setIsFormOpen(true)
 const closeForm = () => {
  setIsFormOpen(!openForm);}
  useEffect(() => {
    console.log("isFormOpen has changed:", isFormOpen);
  }, [isFormOpen]);  // Log pour observer tout changement d'état


  // Récupérer les éléments du panier depuis localStorage lors du montage du composant
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(savedCart); // Récupère les éléments du panier
      setIsLoaded(true); // Marque la fin du chargement
    }
  }, []); // Ce useEffect se déclenche une seule fois au montage du composant

  // Sauvegarde du panier dans `localStorage` à chaque mise à jour
  useEffect(() => {
    
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Sauvegarde dans localStorage
    
  }, [cartItems]);

  // Ajoute un produit au panier
  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prevCartItems, { ...product, quantite: 1 }];
    });
  };

 

  // Retirer un produit du panier
  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) => (item.id === id ? { ...item, quantite: item.quantite - 1 } : item))
        .filter((item) => item.quantite > 0)
    );
  };

  // Vider le panier
  const emptyCart = () => {
    setCartItems([]);
  };

  // Ajouter 1 à la quantité d'un produit dans le panier
  const Ajoute = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantite: item.quantite + 1 } : item
      )
    );
  };

  // Afficher un message de chargement tant que les données ne sont pas chargées
  if (!isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <CartContext.Provider value={{ closeForm,cartItems, addToCart, removeFromCart, emptyCart, isModalOpen, closeModal, openModal,isFormOpen,openForm, Ajoute,isLoaded }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

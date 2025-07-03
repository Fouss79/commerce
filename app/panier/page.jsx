"use client";

import React from "react";
import { useCart } from "../../app/context/CartContext";
import Link from "next/link";
import Form from "../categorie/[id]/Authent/Component/Form";
import Header from "../Admin/Component/Header";



const PanierPage = () => {
   const { cartItems, isModalOpen, openModal, isFormOpen, openForm, closeForm, closeModal, removeFromCart, Ajoute, emptyCart,addToCart } = useCart();
  

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantite * item.prix, 0);
  };

  return (
    <div className="container mx-auto p-6 pt-24">
      <Header/>
      <div className="flex justify-between"> <h2 className="text-2xl text-[#1c98a4] font-bold mb-6">Votre panier</h2>
      <button
                onClick={() => {
                  closeModal();  // Ferme le panier
                  openForm();    // Ouvre le formulaire
                }}
                className="mt-4 px-6 py-2 bg-[#1c98a4] text-white rounded hover:bg-[#1c98a4]"
              >
                Je valide ma commande
              </button>
      </div>
      

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <div className="overflow-x-auto pt-12">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-[#1c98a4] text-white">
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Nom</th>
                <th className="border px-4 py-2">Prix</th>
                <th className="border px-4 py-2">Quantité</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#1c98a4]">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">
                    {item.image && (
                      <img
                        src={`http://localhost:8080/${item.image}`}
                        alt={item.nom}
                        className="h-16 w-16 object-cover mx-auto rounded"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">{item.nom}</td>
                  <td className="border px-4 py-2">{item.prix} FCFA</td>
                  <td className="border px-4 py-2 text-center">{item.quantite}</td>
                  <td className="border px-4 py-2">
                    {(item.quantite * item.prix).toFixed(2)} FCFA
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        -
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Montant total */}
      {cartItems.length > 0 && (
        <div className="mt-4 text-lg font-bold text-[#1c98a4]">
          Total: {getTotalPrice().toFixed(2)} FCFA
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex space-x-4">
        {cartItems.length > 0 && (
          <button
            onClick={emptyCart}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Vider le panier
          </button>
        )}
        <Link href="/">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Continuer les achats
          </button>
        </Link>
      </div>
      <Form isFormOpen={isFormOpen} closeForm={closeForm} />
    </div>
  );
};

export default PanierPage;

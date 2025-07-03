"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext"; // 🔹 Assure-toi que le chemin est correct
import Form from "../categorie/[id]/Authent/Component/Form";

const Scrollpane = () => {
  const { cartItems, isModalOpen, openModal, isFormOpen, openForm, closeForm, closeModal, removeFromCart, Ajoute, emptyCart } = useCart();

  const pagneRef = useRef(null);

  const getTotalQuantities = () => {
    return cartItems.reduce((total, item) => total + item.quantite * item.prix, 0);
  };

  return (
    <div>
      <Form isFormOpen={isFormOpen} closeForm={closeForm} /> {/* Affiche le formulaire seulement si isFormOpen est true */}

      {isModalOpen && (
        <div ref={pagneRef}   className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-[#105f5d]">
          <div className="bg-white rounded-lg w-1/2 h-3/4 overflow-y-auto shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Votre panier</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-2 border-b border-gray-200">
                  {item.image && (
                    <img
                      src={`http://localhost:8080/${item.image}`}
                      alt={item.nom}
                      className="h-16 w-16 object-cover rounded mr-4"
                    />
                  )}
                  <div className="flex justify-between items-center flex-1">
                    <div>
                      <p className="text-sm font-bold">{item.nom}</p>
                      <p className="text-sm text-gray-500">Prix: {item.prix} FCFA</p>
                      <p className="text-sm font-bold">Quantité: {item.quantite}</p>
                    </div>
                    <div className="ml-20">
                      <p className="text-sm font-bold">Montant: {item.quantite * item.prix} FCFA</p>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-3 py-1 rounded ml-auto">
                        -
                      </button>
                      <div className="px-3 py-1 rounded ml-auto">{item.quantite}</div>
                      <button onClick={() => Ajoute(item.id)} className="bg-green-600 text-white px-3 py-1 rounded ml-auto">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>Montant total : {getTotalQuantities()} FCFA</div>
            <div className="gap-2 flex justify-between">
            <button
                onClick={() => {
                  closeModal();  // Ferme le panier
                  openForm();    // Ouvre le formulaire
                }}
                className="mt-4 px-6 py-2 bg-[#1c98a4] text-white rounded hover:bg-[#1c98a4]"
              >
                Commander
              </button>
              <Link href={`/panier`}>
                <button onClick={null} className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Mon panier
                </button>
              </Link>
             

              <button onClick={closeModal} className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Fermer
              </button>
                          </div>
          </div>
        </div>
      )}

      <button onClick={openModal} className="fixed bottom-4 right-4 px-4 py-2 bg-yellow-500 text-white rounded shadow-lg hover:bg-yellow-600">
        Voir panier
      </button>
    </div>
  );
};

export default Scrollpane;

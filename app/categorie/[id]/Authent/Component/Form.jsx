"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from "../../../../context/CartContext";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

const Form = ({ onSubmitSuccess }) => {
  const { isFormOpen, closeForm, cartItems, emptyCart } = useCart();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const router = useRouter();
  const formRef = useRef(null);

  // Focus auto
  useEffect(() => {
    if (isFormOpen && formRef.current) {
      formRef.current.focus();
    }
  }, [isFormOpen]);

  // 🔥 CONFIRMATION COMMANDE
  const confirmCommande = async (clientId) => {
    try {
      const commande = {
        clientId: parseInt(clientId),
        produits: cartItems.map((item) => ({
          produitId: parseInt(item.id),
          quantite: parseInt(item.quantite),
        })),
      };

      const response = await axios.post(
        "http://localhost:8080/api/paniers",
        commande
      );

      toast.success("Commande validée avec succès 🎉");

      emptyCart();
      router.push(`/panier/rapport/${response.data.panierId}`);
      
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la commande");
    }
  };

  // 🔥 SAVE CLIENT
  const saveClient = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/client",
        { prenom, nom, adresse, numero }
      );

      await confirmCommande(response.data.id);

      if (onSubmitSuccess) onSubmitSuccess();

      closeForm();
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (!isFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center">
      
      {/* MODAL */}
      <div
        ref={formRef}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-fadeIn"
      >
        {/* CLOSE */}
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📦 Adresse de livraison
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={saveClient}>
          
          <input
            type="text"
            placeholder="Prénom"
            className="input"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Nom"
            className="input"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Adresse"
            className="input"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Numéro"
            className="input"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
            >
              {loading ? "En cours..." : "Valider"}
            </button>

            <button
              type="button"
              onClick={closeForm}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
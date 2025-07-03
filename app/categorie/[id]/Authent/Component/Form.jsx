"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCart } from "../../../../context/CartContext";
// 🔹 Assure-toi que le chemin est correct

const Form = ({ onSubmitSuccess }) => {
  const { isFormOpen, closeForm } = useCart() // ✅ Nous récupérons bien closeForm
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    if (isFormOpen && formRef.current) {
      formRef.current.focus();
    }
  }, [isFormOpen]);

  const saveClient = async (e) => {
    e.preventDefault();
    setError(null);

    const clientData = { prenom, nom, adresse, numero };

    try {
      const url = "http://localhost:8080/api/client";
      const method = "post";

      const response = await axios({
        method: method,
        url: url,
        data: clientData,
        headers: { "Content-Type": "application/json" },
      });

      router.push(`/panier/${response.data.id}`);

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      closeForm(); // ✅ Nous appelons ici closeForm pour fermer le formulaire
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

    if (!isFormOpen) return null; // ✅ Si isFormOpen est false, le formulaire ne sera pas affiché.

  return (
    <div
      ref={formRef}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div className="bg-white rounded-lg w-1/2 h-3/4 overflow-y-auto shadow-lg p-6">
        <h2 className="font-semibold text-lg text-center mb-4">
           ENREGISTREZ VOTRE ADRESSE
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={saveClient}>
          <div>
            <label htmlFor="prenom" className="text-gray-500 text-sm">
              Prénom<span className="text-red-500">*</span>
            </label>
            <input
              id="prenom"
              type="text"
              placeholder="Entrer le prénom"
              className="w-full px-4 py-2 rounded-lg focus:outline-none border"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="nom" className="text-gray-500 text-sm">
              Nom<span className="text-red-500">*</span>
            </label>
            <input
              id="nom"
              type="text"
              placeholder="Entrer le nom"
              className="w-full px-4 py-2 rounded-lg focus:outline-none border"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="adresse" className="text-gray-500 text-sm">
              Adresse<span className="text-red-500">*</span>
            </label>
            <input
              id="adresse"
              type="text"
              placeholder="Entrer l'adresse"
              className="w-full px-4 py-2 rounded-lg focus:outline-none border"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="numero" className="text-gray-500 text-sm">
              Numéro<span className="text-red-500">*</span>
            </label>
            <input
              id="numero"
              type="text"
              placeholder="Entrer le numéro"
              className="w-full px-4 py-2 rounded-lg focus:outline-none border"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Enregistrer
            </button>

            <button
              type="button"
              onClick={closeForm} // ✅ Ajout du bouton pour fermer le formulaire
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

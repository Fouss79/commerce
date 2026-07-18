"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../../lib/api";

const FormulaireProduit = ({ onSubmitSuccess }) => {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  

  const [sousCategories, setSousCategories] = useState([]);
  const [marques, setMarques] = useState([]);

  const [selectedSousCategorie, setSelectedSousCategorie] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");

  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ================= LOAD DATA =================
  useEffect(() => {
    api
      .get(`/api/souscategories`)
      .then((res) => {
        setSousCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));

    api
      .get(`/api/marque`)
      .then((res) => {
        setMarques(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));
  }, [API_URL]);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (
    !nom ||
    !prix ||
    !description ||
    !selectedSousCategorie ||
    !selectedMarque
  ) {
    setError("Remplis tous les champs !");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("description", description);
    formData.append("sousCategorieId", selectedSousCategorie);
    formData.append("marqueId", selectedMarque);

    if (image) {
      formData.append("image", image);
    }

    await api.post(`/api/produitss`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Produit ajouté !");

    setNom("");
    setPrix("");
    setDescription("");
    setImage(null);
    setSelectedSousCategorie("");
    setSelectedMarque("");
    setError("");

    onSubmitSuccess && onSubmitSuccess();

  }catch (err) {
  console.log("Erreur complète :", err);

  if (err.response) {
    console.log("Status :", err.response.status);
    console.log("Data :", err.response.data);
    setError(err.response.data.message || "Erreur serveur");
  } else {
    setError("Erreur lors de l'envoi");
  }
}
};

  return (
    <div className="bg-white p-6 rounded-xl w-[400px] shadow">
      <h2 className="text-lg font-bold mb-4">
        Créer un produit
      </h2>

      {error && (
        <p className="text-red-500 mb-3">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        {/* NOM */}
        <input
          type="text"
          placeholder="Nom produit"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="border p-2 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description du produit"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded h-28 resize-none"
        />

        {/* PRIX */}
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="border p-2 rounded"
        />

        {/* SOUS-CATEGORIE */}
        <select
          value={selectedSousCategorie}
          onChange={(e) =>
            setSelectedSousCategorie(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            Choisir une sous-catégorie
          </option>

          {sousCategories.map((sc) => (
            <option key={sc.id} value={sc.id}>
              {sc.nom}
            </option>
          ))}
        </select>

        {/* MARQUE */}
        <select
          value={selectedMarque}
          onChange={(e) =>
            setSelectedMarque(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            Choisir une marque
          </option>

          {marques.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>

        {/* BUTTON */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
          Ajouter
        </button>

      </form>
    </div>
  );
};

export default FormulaireProduit;
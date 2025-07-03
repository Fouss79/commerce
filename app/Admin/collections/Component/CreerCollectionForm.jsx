'use client';
import React, { useEffect, useState } from "react";

export default function CreerCollectionForm() {
  const [titre, setTitre] = useState("");
  const [marqueId, setMarqueId] = useState("");
  const [marques, setMarques] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/marque")
      .then((res) => res.json())
      .then((data) => setMarques(data))
      .catch((err) => console.error("Erreur chargement marques:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("titre", titre);
    params.append("marqueId", marqueId);

    const response = await fetch(`http://localhost:8080/api/collectionMarque?${params.toString()}`, {
      method: "POST",
    });

    if (response.ok) {
      setMessage("✅ Collection créée avec succès !");
      setTitre("");
      setMarqueId("");
    } else if (response.status === 409) {
      setMessage("⚠️ Une collection existe déjà pour cette marque.");
    } else {
      setMessage("❌ Erreur lors de la création.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
      <h2    className=" font-bold text-center">Créer une Collection</h2>

      <input
        type="text"
        placeholder="Titre de la collection"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <select
        value={marqueId}
        onChange={(e) => setMarqueId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">-- Sélectionner une marque --</option>
        {marques.map((marque) => (
          <option key={marque.id} value={marque.id}>
            {marque.nom}
          </option>
        ))}
      </select>

      <button  style={{ backgroundColor: '#15878f' }} type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Créer la collection
      </button>

      {message && <p className="text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
}

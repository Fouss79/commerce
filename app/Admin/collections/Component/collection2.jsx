"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Collection2 = () => {
  const [selectedMarque, setSelectedMarque] = useState(null);

  useEffect(() => {
    // Récupérer la marque sélectionnée depuis le backend (ex: en tant que "collection active")
    axios.get("http://localhost:8080/api/collection-marque") // à adapter selon ton endpoint
      .then((res) => setSelectedMarque(res.data))
      .catch((err) => console.error("Erreur lors du chargement de la collection :", err));
  }, []);

  if (!selectedMarque) return <p>Chargement de la collection...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">{selectedMarque.nom}</h2>
      <p className="mb-4 text-gray-700">{selectedMarque.description}</p>
      <img
        src={`http://localhost:8080/${selectedMarque.image}`}
        alt={selectedMarque.nom}
        className="w-60 h-auto rounded mb-6"
      />

      <h3 className="text-xl font-semibold mb-3">Produits de cette marque :</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedMarque.produits?.map((produit) => (
          <div
            key={produit.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:8080/${produit.image}`}
              alt={produit.nom}
              className="h-32 object-cover mb-2 w-full rounded"
            />
            <h4 className="font-bold">{produit.nom}</h4>
            <p className="text-gray-600">{produit.prix} FCFA</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection2;

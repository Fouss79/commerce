"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectionCollection = ({ onSelect }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/collections")
      .then((res) => {
        const data = res.data;
        console.log("Réponse des collections :", data);

        // On s'assure que data est un tableau
        if (Array.isArray(data)) {
          setCollections(data);
        } else {
          setCollections([]); // fallback si ce n'est pas un tableau
          console.error("La réponse n'est pas un tableau :", data);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des collections :", err);
        setCollections([]); // fallback en cas d'erreur
      });
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Sélectionner une Collection à afficher</h2>
      <select
        className="border px-4 py-2 rounded"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const selected = collections.find((c) => c.id === selectedId);
          if (selected) {
            onSelect(selected);
          }
        }}
      >
        <option value="">-- Sélectionner une collection --</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.titre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectionCollection;

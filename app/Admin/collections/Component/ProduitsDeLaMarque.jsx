"use client";

import { useEffect, useState } from 'react';

export default function ProduitsDeLaMarque({ marqueId }) {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    
    if (!marqueId) return;

    fetch(`http://localhost:8080/api/produits/marque/${marqueId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Produits pour la marque', marqueId, data); // debug
        setProduits(data);
      })
      .catch((err) => console.error('Erreur lors du chargement des produits:', err));
  }, [marqueId]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {produits.map((produit) => (
        <div key={produit.id} className="border p-2 rounded shadow">
          {produit.image && (
            <img
              src={`http://localhost:8080/${produit.image}`}
              alt={produit.nom}
              className="h-32 w-full object-cover mb-2"
            />
          )}
          <h3 className="font-semibold text-center">{produit.nom}</h3>
        </div>
      ))}
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProduitsDeLaMarque() {
  const [produits, setProduits] = useState([]);
  const [erreur, setErreur] = useState(null);
  const marqueId=1;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/produits/marque/${marqueId}`)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des produits :', err);
        setErreur("Impossible de charger les produits.");
      });
  }, [marqueId]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {erreur && <p className="text-red-500 col-span-full">{erreur}</p>}
      {Array.isArray(produits) && produits.map((produit) => (
  <div key={produit.id} className="border p-2 rounded shadow">
    <img
      src={`http://localhost:8080/${produit.image}`}
      alt={produit.nom}
      className="h-32 w-full object-cover"
    />
    <h3 className="font-semibold">{produit.nom}</h3>
  </div>
))}

    </div>
  );
}

export default ProduitsDeLaMarque;

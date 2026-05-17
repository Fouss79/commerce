"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../../produit/component/ProductItems";

function CollectionParMarque() {
  const [produits, setProduits] = useState([]);
  const [erreur, setErreur] = useState(null);

  const marqueId = 10;
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/produitss/marque/id/${marqueId}`)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => {
        console.error(
          "Erreur lors du chargement des produits :",
          err
        );
        setErreur("Impossible de charger les produits.");
      });
  }, [marqueId, API_URL]);

  return (
    <div className="mt-4">
      {erreur && (
        <p className="text-red-500 mb-4">{erreur}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.isArray(produits) &&
          produits.map((produit) => (
            <ProductItem
              key={produit.id}
              product={produit}
            />
          ))}
      </div>
    </div>
  );
}

export default CollectionParMarque;
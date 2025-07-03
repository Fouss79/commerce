"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RapportCommande = () => {

  const [rapport, setRapport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRapport = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/paniers/${id}/rapport`);
        setRapport(response.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le rapport.");
      }
    };

    fetchRapport();
  }, [id]);

  if (error) {
    return <div className="text-red-500 p-5">{error}</div>;
  }

  if (!rapport) {
    return <div className="p-5">Chargement du rapport...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Rapport de commande</h1>

      <div className="mb-6">
        <p><strong>ID Panier :</strong> {rapport.panierId}</p>
        <p><strong>Client :</strong> {rapport.clientNom}</p>
        <p><strong>Date :</strong> {rapport.dateCommande}</p>
        <p><strong>Total :</strong> {rapport.total} €</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Produits commandés :</h2>
      <ul className="divide-y divide-gray-200">
        {rapport.produits.map((produit, index) => (
          <li key={index} className="py-2">
            <p><strong>{produit.nomProduit}</strong></p>
            <p>Prix unitaire : {produit.prix} €</p>
            <p>Quantité : {produit.quantite}</p>
            <p>Total : {produit.prix * produit.quantite} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RapportCommande;

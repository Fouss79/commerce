"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const RapportFacture = () => {
  const { id } = useParams();
  const [panier, setPanier] = useState(null);

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/paniers/rapport/${id}`);
        setPanier(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
      }
    };

    if (id) fetchPanier();
  }, [id]);

  if (!panier) return <p className="text-center mt-10">Chargement de la facture...</p>;

  const total = panier.produits.reduce((acc, p) => acc + p.prix * p.quantite, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 print:p-0 print:shadow-none print:bg-white">
      <div className="flex justify-between items-center mb-4">
       <h1 className="text-3xl text-[#15878f] font-bold ">Facture</h1>
        <button
          onClick={handlePrint}
          style={{ backgroundColor: '#15878f' }} className=" text-white px-4 py-2 rounded hover:bg-blue-700 print:hidden"
        >
          Imprimer
        </button>
      </div>

      <div className="mb-6">
  <h2 className="text-lg font-semibold">Informations du client</h2>
  <p><strong>Nom :</strong> {panier.clientNom} {panier.clientPrenom}</p>
  <p><strong>Adresse :</strong> {panier.clientAdresse}</p>
  <p><strong>Numéro :</strong> {panier.clientNumero}</p>
  <p><strong>Statut :</strong> {panier.statut}</p>
</div>


      <div className="mb-6">
        <h2 className="text-lg font-semibold">Produits commandés</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Produit</th>
              <th className="border px-4 py-2">Quantité</th>
              <th className="border px-4 py-2">Prix Unitaire</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {panier.produits.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{item.nomProduit}</td>
                <td className="border px-4 py-2">{item.quantite}</td>
                <td className="border px-4 py-2">{item.prix} €</td>
                <td className="border px-4 py-2">{item.prix * item.quantite} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-semibold text-xl">
        Total à payer : <span className="text-[#15878f]">{total} €</span>
      </div>
    </div>
  );
};

export default RapportFacture;

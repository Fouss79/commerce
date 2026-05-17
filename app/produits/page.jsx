"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Carousel from "../Component/Carousel";
import MegaMenu from "../Component/MegaMenu";

const PageProduits = () => {
  const searchParams = useSearchParams();

  const sousCategorieId = searchParams.get("sousCategorie");

  const [produits, setProduits] = useState([]);
  const [marques, setMarques] = useState([]);

  const [selectedMarque, setSelectedMarque] = useState("");
  const [prixMax, setPrixMax] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    if (!sousCategorieId) return;

    axios.get(`http://localhost:8080/api/produitss`)
      .then(res => {
        let data = res.data;

        // filtrer par sous-catégorie
        data = data.filter(
          p => p.sousCategorie?.id === Number(sousCategorieId)
        );

        setProduits(data);
      });

    axios.get("http://localhost:8080/api/marque")
      .then(res => setMarques(res.data));

  }, [sousCategorieId]);

  // ================= FILTER =================
  const produitsFiltres = produits.filter(p => {
    return (
      (!selectedMarque || p.marque?.id === Number(selectedMarque)) &&
      (!prixMax || p.prix <= Number(prixMax))
    );
  });

  return (
    <div>     <Carousel/>
      <MegaMenu/>
    <div className="flex gap-6 p-6 pt-20 overflow-y-auto ">
     
    

      {/* SIDEBAR FILTER */}
      <div className="w-[250px] bg-white p-4 rounded-xl shadow">

        <h2 className="font-bold mb-4">Filtres</h2>

        {/* PRIX */}
        <div className="mb-4">
          <label className="text-sm">Prix max</label>
          <input
            type="number"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* MARQUE */}
        <div>
          <label className="text-sm">Marque</label>
          <select
            value={selectedMarque}
            onChange={(e) => setSelectedMarque(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Toutes</option>
            {marques.map(m => (
              <option key={m.id} value={m.id}>
                {m.nom}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* PRODUITS */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {produitsFiltres.length > 0 ? (
          produitsFiltres.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 cursor-pointer"
            >
              <img
                src={`http://localhost:8080/${p.image}`}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="mt-2 font-semibold">{p.nom}</h3>

              <p className="text-gray-500 text-sm">
                {p.marque?.nom}
              </p>

              <p className="text-blue-600 font-bold mt-1">
                {p.prix} FCFA
              </p>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé</p>
        )}

      </div>
   </div>
    </div>
  );
};

export default PageProduits;
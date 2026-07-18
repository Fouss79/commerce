"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import api from "../../lib/api";

export default function VendeurDashboard() {
  const { user } = useAuth();

  const [data, setData] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    if (!user?.id) return;

    const fetchDashboard = async () => {
      try {
        const res = await api.get(
          `/api/vendeur/dashboard/${user.id}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, [user?.id]);

  if (!data) {
    return <p className="p-10">Chargement...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard Vendeur
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-10">

        <div className="bg-white p-4 rounded shadow">
          <p>Produits</p>
          <h2 className="text-2xl font-bold">{data.produits}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Commandes</p>
          <h2 className="text-2xl font-bold">{data.commandes}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Revenus</p>
          <h2 className="text-2xl font-bold text-green-600">
            {data.revenus} FCFA
          </h2>
        </div>

      </div>

      {/* COMMANDES RÉCENTES */}
      <h2 className="text-xl font-bold mb-2">
        Dernières commandes
      </h2>

      <div className="space-y-2 mb-10">
        {data.latestCommandes?.map((cmd) => (
          <div key={cmd.id} className="border p-3 rounded bg-white">
            <p>Commande #{cmd.id}</p>
            <p>Total: {cmd.montantTotal} FCFA</p>
          </div>
        ))}
      </div>

      {/* PRODUITS TOP */}
      <h2 className="text-xl font-bold mb-2">
        Produits populaires
      </h2>

      <div className="space-y-2">
        {data.topProduits?.map((p) => (
          <div key={p.id} className="border p-3 rounded bg-white">
            {p.nom} - {p.prix} FCFA
          </div>
        ))}
      </div>

    </div>
  );
}
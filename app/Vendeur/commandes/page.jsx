"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../../lib/api";

export default function CommandesPage() {
  const { user } = useAuth();

  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    if (!user?.id) return;
    fetchCommandes();
  }, [user?.id]);

  const fetchCommandes = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/api/vendeur/${user.id}`
      );

      setCommandes(res.data);
    } catch (err) {
      console.log("Erreur commandes:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE STATUT
  // =========================
  const updateStatut = async (id, statut) => {
    try {
      await api.put(`/api/commandes/${id}/statut`, {
        statut,
      });

      fetchCommandes();
    } catch (err) {
      console.log(err);
    }
  };

  const getBadge = (statut) => {
    switch (statut) {
      case "LIVREE":
        return "bg-green-100 text-green-700";
      case "PAYEE":
        return "bg-blue-100 text-blue-700";
      case "ANNULEE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return <p className="p-10">Chargement des commandes...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Gestion des commandes
      </h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {commandes.map((cmd) => (
              <tr key={cmd.commandeId} className="border-b hover:bg-gray-50">

                <td className="p-3">#{cmd.commandeId}</td>

                <td>{cmd.client}</td>

                <td>{cmd.telephone}</td>

                <td className="font-bold text-green-600">
                {cmd.montantVendeur} FCFA
                </td>

                {/* STATUT */}
                <td>
                  <span className={`px-2 py-1 rounded text-sm ${getBadge(cmd.statut)}`}>
                    {cmd.statut}
                  </span>
                </td>

                <td>
                  {new Date(cmd.dateCommande).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="flex gap-2 p-2">

                  <button
                    onClick={() => updateStatut(cmd.commandeId, "PAYEE")}
                    disabled={cmd.statut === "PAYEE" || cmd.statut === "LIVRE"}
                    className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-40"
                  >
                    Payée
                  </button>

                  <button
                    onClick={() => updateStatut(cmd.commandeId, "LIVRE")}
                    disabled={cmd.statut === "LIVRE"}
                    className="px-2 py-1 bg-green-500 text-white rounded disabled:opacity-40"
                  >
                    Livrée
                  </button>

                  <button
                    onClick={() => updateStatut(cmd.commandeId, "ANNULEE")}
                    disabled={cmd.statut === "LIVREE"}
                    className="px-2 py-1 bg-red-500 text-white rounded disabled:opascity-40"
                  >
                    Annuler
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
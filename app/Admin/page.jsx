"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RevenusChart from "./Component/RevenusChart";
import {
  Users,
  Store,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import api from "../../lib/api";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
   const [revenusJour, setRevenusJour] = useState([]);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8080";

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
    const revenusRes = await api.get(
  `/api/admin/revenus/jour`
);
    console.log(revenusRes.data);
setRevenusJour(revenusRes.data);

      const res = await api.get(
        `/api/admin/dashboard`
      );

      setDashboard(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="p-10 text-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Administrateur
      </h1>

      {/* Statistiques */}
      <div className="grid md:grid-cols-5 gap-5 mb-10">

        <div className="bg-white rounded-xl p-5 shadow">
          <Users className="mb-2 text-blue-600" />
          <h2 className="text-gray-500">
            Utilisateurs
          </h2>
          <p className="text-3xl font-bold">
            {dashboard.users}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <Store className="mb-2 text-green-600" />
          <h2 className="text-gray-500">
            Vendeurs
          </h2>
          <p className="text-3xl font-bold">
            {dashboard.vendeurs}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <ShoppingCart className="mb-2 text-orange-600" />
          <h2 className="text-gray-500">
            Commandes
          </h2>
          <p className="text-3xl font-bold">
            {dashboard.commandes}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <CreditCard className="mb-2 text-purple-600" />
          <h2 className="text-gray-500">
            Transactions
          </h2>
          <p className="text-3xl font-bold">
            {dashboard.transactions}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-gray-500">
            Revenus
          </h2>
          <p className="text-3xl font-bold text-green-700">
            {dashboard.revenus?.toLocaleString()} FCFA
          </p>
        </div>

      </div>

      {/* Dernières transactions */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          Dernières transactions
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                ID
              </th>
              <th className="text-left p-3">
                Montant
              </th>
              <th className="text-left p-3">
                Statut
              </th>
            </tr>
          </thead>

          <tbody>
            {dashboard.latestTransactions?.map(
              (transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {transaction.id}
                  </td>

                  <td className="p-3">
                    {transaction.montant} FCFA
                  </td>

                  <td className="p-3">
                    {transaction.statut}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Dernières commandes */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Dernières commandes
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                ID
              </th>
              <th className="text-left p-3">
                Client
              </th>
              <th className="text-left p-3">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {dashboard.latestCommandes?.map(
              (commande) => (
                <tr
                  key={commande.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {commande.id}
                  </td>

                  <td className="p-3">
                    {commande.nomClient}
                  </td>

                  <td className="p-3">
                    {commande.montantTotal} FCFA
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-8">
  <RevenusChart revenus={revenusJour} />
</div>

    </div>
  );
}
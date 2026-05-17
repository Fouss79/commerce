"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RapportCommandeTableau() {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRapports = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/paniers/rapports");
      const data = await res.json();
      setRapports(data);
    } catch (err) {
      console.error("Erreur lors du fetch :", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRapports();
  }, []);

  const handleStatutChange = async (panierId, newStatut) => {
    try {
      await fetch(`http://localhost:8080/api/paniers/${panierId}/statut`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: newStatut }),
      });

      fetchRapports(); // refresh
    } catch (err) {
      console.error("Erreur de mise à jour :", err);
    }
  };

  if (loading) {
    return <div className="text-center pt-20">Chargement...</div>;
  }

  return (
    <div className="p-4 pt-24 overflow-y-auto shadow-md">
      <h1 className="text-2xl text-[#15878f] font-bold mb-4">
        Liste des commandes
      </h1>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100 text-[#15878f]">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Client</th>
            <th className="border px-4 py-2">Adresse</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Statut</th>
            <th className="border px-4 py-2">Produits</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {rapports.map((rapport) => (
            <tr key={rapport.panierId}>
              <td className="border px-4 py-2">{rapport.panierId}</td>

              <td className="border px-4 py-2">
                {rapport.clientPrenom} {rapport.clientNom}
              </td>

              <td className="border px-4 py-2">
                {rapport.clientAdresse} {rapport.clientNumero}
              </td>

              <td className="border px-4 py-2">
                {rapport.dateCommande}
              </td>

              <td className="border px-4 py-2">
                {rapport.total} FCFA
              </td>

              <td className="border px-4 py-2">
                <select
                  value={rapport.statut}
                  onChange={(e) =>
                    handleStatutChange(rapport.panierId, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="LIVR">Livré</option>
                  <option value="ANNULE">Annulé</option>
                </select>
              </td>

              <td className="border px-4 py-2">
                <ul className="list-disc ml-5">
                  {rapport.produits?.map((p, index) => (
                    <li key={index}>
                      {p.nomProduit} ({p.quantite} × {p.prix} FCFA)
                    </li>
                  ))}
                </ul>
              </td>

              <td className="border px-4 py-2">
                <Link
                  href={`/panier/rapport/${rapport.panierId}`}
                  className="text-blue-500 underline"
                >
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
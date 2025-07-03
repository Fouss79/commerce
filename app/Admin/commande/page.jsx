"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RapportCommandeTableau() {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRapports = () => {
    fetch("http://localhost:8080/api/paniers/rapport-commandes")
      .then((res) => res.json())
      .then((data) => {
        setRapports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch :", err.message);
        setLoading(false);
      });
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
      fetchRapports(); // Refresh après modification
    } catch (err) {
      console.error("Erreur de mise à jour du statut :", err);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-4 pt-24  overflow-y-auto shadow-md">
      <h1 className="text-2xl text-[#15878f] font-bold mb-4">Liste des rapports de commande</h1>
      <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100 text-[#15878f]">
  <tr>
    <th className="border px-4 py-2">Panier ID</th>
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
              <td className="border px-4 py-2">{rapport.clientAdresse} {rapport.clientNumero}</td>
              <td className="border px-4 py-2">{rapport.dateCommande}</td>
              <td className="border px-4 py-2">{rapport.total} FCFA</td>
              <td className="border px-4 py-2">
              <select
  value={rapport.statut}
  onChange={(e) =>
    handleStatutChange(rapport.panierId, e.target.value)
  }
  className={`border rounded px-2 py-1 ${
    rapport.statut === "LIVRÉ" ? "bg-green-100 text-green-700" :
    rapport.statut === "ANNULÉ" ? "bg-red-100 text-red-700" :
    rapport.statut === "EN_COURS" ? "bg-yellow-100 text-yellow-700" :
    "bg-gray-100 text-gray-700"
  }`}
>

                  <option value="EN_ATTENTE">En attente</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="LIVRÉ">Livré</option>
                  <option value="ANNULÉ">Annulé</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <ul className="list-disc ml-5">
                  {rapport.produits.map((produit, index) => (
                    <li key={index}>
                      {produit.nomProduit} ({produit.quantite} × {produit.prix} FCFA)
                    </li>
                  ))}
                </ul>
                
              </td>
              <td className="border px-4 py-2"><Link href={`/panier/rapport/${rapport.panierId}`}>RAPPORT</Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function RapportCommandeTableau() {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/paniers/rapport-commandes")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error("Erreur serveur: " + text);
        }
        return res.json();
      })
      .then((data) => {
        setRapports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch :", err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des rapports de commande</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Panier ID</th>
            <th className="border px-4 py-2">Client</th>
            <th className="border px-4 py-2">Adresse</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Produits</th>
          </tr>
        </thead>
        <tbody>
          {rapports.map((rapport) => (
            <tr key={rapport.panierId}>
              <td className="border px-4 py-2">{rapport.panierId}</td>
              <td className="border px-4 py-2">{rapport.clientPrenom} {rapport.clientNom}</td>
              <td className="border px-4 py-2">{rapport.clientAdresse}</td>
              <td className="border px-4 py-2">{rapport.dateCommande}</td>
              <td className="border px-4 py-2">{rapport.total} FCFA</td>
              <td className="border px-4 py-2">
                <ul className="list-disc ml-5">
                  {rapport.produits.map((produit, index) => (
                    <li key={index}>
                      {produit.nomProduit} ({produit.quantite} × {produit.prix} FCFA)
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

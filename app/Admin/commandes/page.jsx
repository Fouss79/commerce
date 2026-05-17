"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RapportCommandeTableau() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH COMMANDES =================
  const fetchCommandes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/commandes");
      const data = await res.json();
      setCommandes(data);
    
    } catch (err) {
      console.error("Erreur lors du fetch :", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // ================= UPDATE STATUT =================
  const handleStatutChange = async (commandeId, newStatut) => {
    try {
      await fetch(`http://localhost:8080/api/commandes/${commandeId}/statut`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: newStatut }),
      });

      fetchCommandes(); // refresh
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
             <th className="border px-4 py-2">Produits</th>
            <th className="border px-4 py-2">Statut</th> 
            <th className="border px-4 py-2">Mode</th>
          </tr>
        </thead>

        <tbody>
          {commandes.map((cmd) => (
            <tr key={cmd.id}>
              <td className="border px-4 py-2">{cmd.id}</td>

              <td className="border px-4 py-2">
                {cmd.nomClient}
              </td>

              <td className="border px-4 py-2">
                {cmd.adresse} - {cmd.telephone}
              </td>

              <td className="border px-4 py-2">
                {cmd.dateCommande}
              </td>

              <td className="border px-4 py-2">
                {cmd.montantTotal} FCFA
              </td>
               {/* ================= PRODUITS ================= */}
              <td className="border px-4 py-2">
                <ul className="list-disc ml-5">
                  {cmd.details?.map((d, index) => (
                    <li key={index}>
                      {d.produit?.nom} ({d.quantite} × {d.prixUnitaire} FCFA)
                    </li>
                  ))}
                </ul>
              </td>
            
            

              {/* ================= STATUT ================= */}
              <td className="border px-4 py-2">
                
                <select
  value={cmd.statut}
  onChange={(e) => handleStatutChange(cmd.id, e.target.value)}
  className="border rounded px-2 py-1"
><option value={cmd.statut}>{cmd.statut}</option>
  <option value="EN_ATTENTE">En attente</option>
  <option value="EN_COURS">En cours</option>
  <option value="EXPEDIE">Expédié</option>
  <option value="LIVRE">Livré</option>
  <option value="ANNULE">Annulé</option>
</select> </td>

             

              <td className="border px-4 py-2">
                 {cmd.modePaiement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import api from "../../../lib/api";

export default function AbonnementsAdmin() {

  const [abonnements, setAbonnements] =
    useState([]);

  useEffect(() => {

    api
      .get("/api/abonnement")
      .then((res) =>
        setAbonnements(res.data)
      );

  }, []);

  const activer = async (id) => {

    await api.post(
      `/api/admin/abonnements/${id}/activer`
    );

    location.reload();
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Gestion des abonnements
      </h1>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Plan</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Expiration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {abonnements.map((a) => (

              <tr key={a.id}>

                <td>{a.id}</td>

                <td>
                  {a.userNom}
                </td>

                <td>
                  {a.planNom}
                </td>

                <td>
                  {a.montant} FCFA
                </td>

                <td>
                  {a.statutPaiement}
                </td>

                <td>
                  {a.dateFin}
                </td>

                <td>

                  {!a.actif && (

                    <button
                      onClick={() =>
                        activer(a.id)
                      }
                      className="
                      bg-blue-600
                      text-white
                      px-4 py-2
                      rounded
                      "
                    >
                      Activer
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
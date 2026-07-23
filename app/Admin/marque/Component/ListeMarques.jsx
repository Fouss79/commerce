"use client";

import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Package,
} from "lucide-react";

export default function ListeMarques({ onEdit, refresh }) {
  const [marques, setMarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    chargerMarques();
  }, [refresh]);

  const chargerMarques = async () => {
    try {
      const res = await api.get("/api/marque");
      setMarques(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const supprimer = async (id) => {
    if (!confirm("Supprimer cette marque ?")) return;

    try {
      await api.delete(`/api/marque/${id}`);
      chargerMarques();
    } catch (e) {
      console.log(e);
    }
  };

  const data = marques.filter((m) =>
    m.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg">

      <div className="p-5 border-b flex justify-between items-center">

        <div>
          <h2 className="font-bold text-xl">
            Marques
          </h2>

          <p className="text-gray-500 text-sm">
            {data.length} marque(s)
          </p>
        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Rechercher..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg"
          />

        </div>

      </div>

      {loading ? (
        <div className="p-10 text-center">
          Chargement...
        </div>
      ) : (
        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-3">Image</th>
              <th className="text-left p-3">Nom</th>
              <th className="text-left p-3">Description</th>
              <th className="text-center p-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {data.map((m) => (

              <tr
                key={m.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">

                  {m.image ? (

                    <img
                      src={m.image}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                  ) : (

                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">

                      <Package className="text-gray-400"/>

                    </div>

                  )}

                </td>

                <td className="p-3 font-semibold">
                  {m.nom}
                </td>

                <td className="p-3 text-gray-600">
                  {m.description}
                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(m)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                    >
                      <Pencil size={18}/>
                    </button>

                    <button
                      onClick={() => supprimer(m.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      <Trash2 size={18}/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}
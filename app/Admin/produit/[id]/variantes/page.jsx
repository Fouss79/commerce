"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ListeVariantesPage() {
  const { id } = useParams(); // produitId

  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/produitss/${id}`
        );
        setProduit(res.data);
      } catch (err) {
        console.error(err);
        alert("Erreur chargement produit");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduit();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!produit) return <p className="text-center mt-10">Produit introuvable</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Variantes du produit : {produit.nom}
      </h1>

      {/* ➕ bouton ajouter variante */}
      <Link
        href={`/Admin/produit/${id}/images`}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + Ajouter variante
      </Link>

      {/* 📋 LISTE */}
      <div className="grid gap-4">

        {produit.variantes?.length === 0 && (
          <p>Aucune variante trouvée</p>
        )}

        {produit.variantes?.map((v) => (
          <div
            key={v.id}
            className="border rounded-lg p-4 flex justify-between items-center shadow-sm"
          >
            {/* INFOS */}
            <div>
              <p className="font-semibold">
                {v.couleur} / {v.taille}
              </p>

              <p className="text-sm text-gray-500">
                Stock : {v.stock}
              </p>

              <p className="text-sm text-blue-600 font-bold">
                {v.prix} FCFA
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              {/* 📸 upload images */}
              <Link
                href={`/Admin/variante/${v.id}/images`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Images
              </Link>

              {/* ✏️ modifier */}
              <Link
                href={`/admin/variante/${v.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Modifier
              </Link>

              {/* ❌ supprimer */}
              <button
                onClick={async () => {
                  if (!confirm("Supprimer cette variante ?")) return;

                  try {
                    await axios.delete(
                      `${API_URL}/api/variantes/${v.id}`
                    );
                    location.reload();
                  } catch (err) {
                    alert("Erreur suppression");
                  }
                }}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
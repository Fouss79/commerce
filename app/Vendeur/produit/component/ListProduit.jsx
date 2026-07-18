'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../../lib/api';

const ListProduit = ({ refreshKey }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { user } = useAuth();

  // ================= DELETE =================
  const deleteid = async (produit_id) => {
    try {
      await api.delete(
        `/api/produitss/${produit_id}`
      );

      fetchProduits();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FETCH PRODUITS VENDEUR =================
  const fetchProduits = async () => {
    if (!user?.id) return;

    setLoading(true);

    try {
      const response = await api.get(
        `/api/produitss/vendeur/${user.id}`
      );

      setProduits(response.data);

    } catch (error) {
      setError("Erreur lors de la récupération des produits");
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (user?.id) {
      fetchProduits();
    }
  }, [user?.id, refreshKey]);

  return (
    <div className='bg-white rounded-xl p-5 w-full h-[700px] overflow-y-auto shadow-md'>

      <h2 className='font-semibold text-xl mb-3'>
        Mes Produits
      </h2>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : produits.length === 0 ? (
        <p>Aucun produit disponible</p>
      ) : (
        <ul className='space-y-3'>

          {produits.map(produit => (
            <li
              key={produit.id}
              className='border-b py-3 flex items-center justify-between'
            >

              {/* INFOS PRODUIT */}
              <div>
                <h3 className='font-semibold'>
                  {produit.nom}
                </h3>

                <p>
                  Prix: {produit.prix} €
                </p>

                <p>
                  Catégorie: {produit.sousCategorieNom || "N/A"}
                </p>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  onClick={() => deleteid(produit.id)}
                >
                  Supprimer
                </button>
              </div>

              {/* IMAGE */}
              {produit.image && (
                <img
                  src={produit.image}
                  alt={produit.nom}
                  className='h-16 rounded'
                />
              )}

              {/* ACTIONS */}
              <div className="flex gap-2 mt-2">

                <Link
                  href={`/Vendeur/produit/modifier/${produit.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Modifier
                </Link>

                <Link
                  href={`/Vendeur/produit/${produit.id}/variante`}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Variantes
                </Link>

              </div>

            </li>
          ))}

        </ul>
      )}

    </div>
  );
};

export default ListProduit;
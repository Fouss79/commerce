'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import api from '../../../../lib/api';

const ListProduit = ({ refreshKey }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://e-commerce-backend-7-72oy.onrender.com";

  const deleteid = (produit_id) => {
    api.delete(`/api/produits/${produit_id}`)
      .then(() => {
        fetchProduits();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProduits = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/produitss');
      setProduits(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des produits');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, [refreshKey]);

  return (
    <div className='bg-white rounded-xl p-5 w-full h-[700px] overflow-y-auto shadow-md'>
      <h2 className='font-semibold text-xl mb-3'>Liste des Produits</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : produits.length === 0 ? (
        <p>Aucun produit disponible</p>
      ) : (
        <ul className='space-y-3'>
          {produits.map(produit => (
            <li key={produit.id} className='border-b py-3 flex items-center justify-between'>
              <div>
                <h3 className='font-semibold'>{produit.nom}</h3>
                <p>Prix: {produit.prix} €</p>
                <p>Catégorie: {produit.categorie ? produit.categorie.nom : "N/A"}</p>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2"
                  onClick={() => deleteid(produit.id)}
                >
                  Supprimer
                </button>
              </div>

              {produit.image && (
                <img 
                  src={produit.image} 
                  alt={produit.nom} 
                  className='h-16 rounded' 
                />
              )}

              <div className="flex gap-2 mt-2">
  <Link
    href={`/Admin/produit/modifierproduit/${produit.id}`}
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    Modifier
  </Link>

  <Link
    href={`/Admin/produit/${produit.id}/images`}
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    Images / Couleurs
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

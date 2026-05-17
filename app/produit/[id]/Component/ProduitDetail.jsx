'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';


export default function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [produitsMarque, setProduitsMarque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [message, setMessage] = useState('');
  


  const handleClick = () => {
    addToCart(produit);
    setMessage('Produit ajouté au panier avec succes!');
  
    // Supprime le message après 3 secondes
    setTimeout(() => setMessage(''), 3000);
  };
  
  


  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/produits/${id}`);
        setProduit(response.data);

        const marqueId = response.data.marqueId;
        if (marqueId) {
          const res = await axios.get(`http://localhost:8080/api/produits/marque/id/${marqueId}`);
          // Exclure le produit actuel de la liste
          setProduitsMarque(res.data.filter(p => p.id !== response.data.id));
        }
      } catch (err) {
        setError("Erreur lors de la récupération du produit.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduit();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!produit) return <div className="text-center mt-10">Produit introuvable.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Produit principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <Image
          src={`http://localhost:8080/${produit.image}`}
          alt={produit.nom}
          width={500}
          height={400}
          className="rounded shadow-lg object-cover"
          unoptimized
        />
        <div>
        <p className="text-3xl font-bold mb-2">{produit.nom}</p>

        <p className="text-lg font-medium text-gray-500 mb-2">Catégorie : <span className="text-[#15878f] font-semibold">{produit.categorieNom}</span></p>
          <p className="text-lg font-medium text-gray-500 mb-2">
       Marque : <span className="text-[#15878f] font-semibold">{produit.marqueNom}</span></p>

            <p className="text-lg font-medium text-gray-500 mb-2">Prix : <span className="text-[#15878f] font-semibold">{produit.prix} FCFA</span></p>
          
          <button   onClick={handleClick} className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-yellow-600 transition">
            Ajouter au panier
          </button>
          {message && (
             <div className="mb-4 p-3 bg-green-100 text-green-700 rounded shadow"> {message}</div>)}

        </div>
      </div>

      {/* Produits de la même marque */}
<h2 className="text-3xl font-bold mb-4 text-black">
        PRODUITS SIMILAIRES</h2>      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {produitsMarque.map((p) => (
          <Link key={p.id} href={`/produit/${p.id}`} className="border rounded-lg p-3 shadow hover:shadow-lg transition">
            <Image
              src={`http://localhost:8080/${p.image}`}
              alt={p.nom}
              width={50}
              height={50}
              className="object-cover w-full h-30 rounded"
              unoptimized
            />
            <div className="mt-2 font-semibold text-center">{p.nom}</div>
            <div className="text-center text-yellow-700 font-bold">{p.prix} FCFA</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

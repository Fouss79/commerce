'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/collectionMarque')
      .then(res => setCollections(res.data))
      .catch(err => console.error('Erreur chargement collections', err));
  }, []);

  return (
    <div className="space-y-8 mt-6 p-6">
    
      {collections.map((collection,index) => (
        <div  key={collection.id || index} className=" bg-gray-200">
          <section className='w-full h-96  mx-auto  shadow-lg rounded-lg flex justify-between items-center'>
          <div className=" relative h-20 px-20 items-center font-bold text-white">
          <h2 className="  text-4xl font-medium uppercase">{collection.titre}</h2>
          </div>
          <div className='w-100 p-6  '>
          {collection.imageMarque && (
            <img
              src={`http://localhost:8080/${collection.imageMarque}`}
              alt={collection.nomMarque}
              className="h-32 max-auto w-100 h-80 object-cover "
            />
            
          )}
          </div>
          
          
         </section>
         
          <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          

         {Array.isArray(collection.produits) &&
  collection.produits.slice(0, 4).map((produit) => (
    <div
      key={`${collection.id}-${produit.id}`}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 group overflow-hidden"
    >
      {/* ❤️ Favori */}
      <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur p-2 rounded-full cursor-pointer hover:bg-red-500 transition">
        <Heart size={20} className="text-gray-400 group-hover:text-red-500" />
      </div>

      <Link href={`/produit/${produit.id}`}>
        <div className="cursor-pointer">

          {/* IMAGE (GRANDE 🔥) */}
          <div className="w-full h-[260px] md:h-[320px] overflow-hidden">
            <img
              src={`http://localhost:8080/${produit.image}`}
              alt={produit.nom}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* INFOS */}
          <div className="p-4">
            <h3 className="text-md md:text-lg font-semibold text-gray-800 truncate">
              {produit.nom}
            </h3>

            <p className="text-lg font-bold text-[#DB84A5] mt-1">
              {produit.prix} FCFA
            </p>
          </div>
        </div>
      </Link>

      {/* BOUTON */}
      <button
        className="w-full py-3 text-white font-semibold flex items-center justify-center gap-2 
        bg-[#DB84A5] hover:bg-pink-600 transition duration-300"
      >
        <ShoppingCart size={18} />
        Ajouter au panier
      </button>
    </div>
  ))}

          </div>
        </div>
      ))}
    </div>
  );
}

export default CollectionList;

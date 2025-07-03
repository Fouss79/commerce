'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

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
          <section className='w-full h-96  mx-auto bg-[#57c6ce] shadow-lg rounded-lg flex justify-between items-center'>
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
          

          {Array.isArray(collection.produits) && collection.produits.slice(0, 4).map(produit => (
  <div key={`${collection.id}-${produit.id}`} className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
    <img
      src={`http://localhost:8080/${produit.image}`}
      alt={produit.nom}
      className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
    />
     <div className="text-[#15878f] font-bold">
     <h3 className="text-sm font-medium ] ">{produit.nom}</h3>
    <p className="text-md font-semibold mt-1">{produit.prix} FCFA</p>
    </div>
  </div>
))}

          </div>
        </div>
      ))}
    </div>
  );
}

export default CollectionList;

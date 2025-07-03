"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ListProduit from '../../component/ListProduit';
import Modifierproduit from './Component/Modifierproduit';
import FormulaireProduit from '../../component/FormulaireProduit';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { id } = useParams(); // Récupère l'ID depuis l'URL

  const handleFormSubmitSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1); // Incrémente refreshKey pour rafraîchir ListProduit
  };

  return (
    <main className="p-5 pt-20 flex gap-5">
      {/* Passe l'ID au composant Modifierproduit */}
      <Modifierproduit onSubmitSuccess={handleFormSubmitSuccess} id={id} />
      
      {/* Rafraîchit ListProduit lorsqu'un produit est modifié ou ajouté */}
      <ListProduit key={refreshKey} />
    </main>
  );
};

export default Page;

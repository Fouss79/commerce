"use client";

import React, { useState } from 'react';
import FormulaireProduit from './component/FormulaireProduit';
import ListProduit from './component/ListProduit';


const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);


  
  const handleFormSubmitSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <main className='p-5 flex gap-5  pt-20 overflow-y-auto flex-1 bg-blue-100'>
       
      <FormulaireProduit onSubmitSuccess={handleFormSubmitSuccess} />
      <ListProduit key={refreshKey} />
      
    </main>
  );
};

export default Page;

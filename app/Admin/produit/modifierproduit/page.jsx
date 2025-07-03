"use client";

import React, { useState } from 'react';

import Modifierproduit from './[id]/Component/Modifierproduit';
import ListProduit from '../component/ListProduit';
const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmitSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <main className='p-5 flex gap-5'>
       
      <Modifierproduit onSubmitSuccess={handleFormSubmitSuccess} />
      <ListProduit key={refreshKey} />
      
    </main>
  );
};

export default Page;

"use client";

import React, { useState } from 'react';
import Form from './Component/Form';
import CategorieMenu from '../../../Component/CategorieMenu';


const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0); // Use a state to trigger refresh

  const handleFormSubmitSuccess = () => {
    // Increment the refreshKey to trigger the re-fetching of categories
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <main className='p-5 flex gap-1'>
       <div className="mt-6">
      <CategorieMenu/>
      </div>
      <Form onSubmitSuccess={handleFormSubmitSuccess} />

      
    </main>
  );
};

export default Page;

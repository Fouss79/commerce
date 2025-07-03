"use client";

import React, { useState } from 'react';
import Form from './component/Form';
import ListCate from './component/ListCate';
import ListCategorie from './component/ListCategorie';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0); // Use a state to trigger refresh

  const handleFormSubmitSuccess = () => {
    // Increment the refreshKey to trigger the re-fetching of categories
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <main className='p-5 flex gap-1   pt-20 overflow-y-auto flex-1 bg-blue-100'>
      <Form onSubmitSuccess={handleFormSubmitSuccess} />
      <ListCate key={refreshKey} /> {/* Pass refreshKey to re-render ListCate */}
      
    </main>
  );
};

export default Page;

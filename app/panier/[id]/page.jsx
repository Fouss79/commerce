"use client";

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useParams } from "next/navigation";

import Header from '../../Admin/Component/Header';
import Form from './component/produitClient';
import { Toaster } from 'react-hot-toast';




const Page = () => {
    const { id } = useParams();
  const [refreshKey, setRefreshKey] = useState(0); // Use a state to trigger refresh
  const {Ajoute, addToCart, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();
  const handleFormSubmitSuccess = () => {
    // Increment the refreshKey to trigger the re-fetching of categories
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    
    <main className='p-5 flex gap-1'>
            <Header cartItems={cartItems}/>
   
         <div className='pt-20 overflow-y-auto flex-1 bg-blue-100'>
         <Toaster />
             <Form id={id}/>
         </div>
      
    </main>
  );
};

export default Page;

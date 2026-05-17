"use client";


import { useCart } from '../../context/CartContext';
import { useParams } from "next/navigation";
import ProduitDetail from './Component/Details';
import Header from '../../Admin/Component/Header';
import { useState,useEffect } from 'react';
import Breadcrumb from './Component/Breadcrumb';
import axios from 'axios';

const Page = () => {
    const { id } = useParams();
  const [refreshKey, setRefreshKey] = useState(0); // Use a state to trigger refresh
  const {Ajoute, addToCart, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();
  const handleFormSubmitSuccess = () => {
    // Increment the refreshKey to trigger the re-fetching of categories
    setRefreshKey(prevKey => prevKey + 1);
  };
   const [produit, setProduit] = useState(null);
   const [variantes, setVariantes] = useState([]);
   const [selectedVariante, setSelectedVariante] = useState(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;



    useEffect(() => {
       const fetchData = async () => {
         try {
           const res = await axios.get(`${API_URL}/api/produitss/${id}`);
           const prod = res.data;
   
           setProduit(prod);
   
           const varRes = await axios.get(
             `${API_URL}/api/varianteimage/produit/${id}`
           );
   
           const vars = varRes.data || [];
           setVariantes(vars);
   
           setSelectedVariante(vars[0] || null);
         } catch (err) {
           console.error("Erreur produit:", err);
         }
       };
   
       if (id && API_URL) fetchData();
     }, [id, API_URL]);
   



  return (
    
    <main className='p-5 flex gap-1 mt-16'>
            
            <div className=' overflow-y-auto flex-1 mt-8'>
               <Breadcrumb produit={produit} />
   <ProduitDetail produit={produit} variantes={variantes} selectedVariante={selectedVariante} setSelectedVariante={setSelectedVariante}/>
   </div>
   
      
    </main>
  );
};

export default Page;

"use client";

import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Component/Sidebar';
import Header from './Component/Header';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Footer from './Component/Footer';
const Layout = ({ children }) => {

  const {Ajoute, addToCart, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    console.log('Toggle Sidebar clicked');
    setIsOpen(!isOpen);
  };

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false); // Close sidebar when the route changes
  }, [pathname]);

  // Handle click outside of the sidebar to close it
  useEffect(() => {
const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTotal = () => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + item.quantite * item.prix, 0);
  };
  
  const getTotalQuantitie = () => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + item.quantite, 0);
  };
  

  return (
    <main className='relative flex  '>
      {/* Sidebar always visible on larger screens */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      {/* Sidebar on mobile with transition */}
      <div 
        ref={sidebarRef} 
        className={`fixed md:hidden ease-in-out transition-all duration-400 z-30 ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <section className='flex-1 flex flex-col min-h-screen'>
        <Header toggleSidebar={toggleSidebar} cartItems={cartItems} />
        <section className='flex-1 bg-[#eff3f4]'>{children}</section>
        <Footer/>
      </section>
    </main>
  );
};

export default Layout;

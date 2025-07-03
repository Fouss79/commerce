"use client";  // Ajoutez cette ligne en haut du fichier

import Link from 'next/link';
import React, { useState } from 'react';
import { FaToolbox, FaUser, FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCollections } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const menuList = [
    {
      nom: 'Dashboard',
      link: '/Admin',
      icon: <MdDashboard />
    },
    {
      nom: 'Produit',
      link: '/Admin/produit',
      icon: <FaToolbox />
    },
    {
      nom: 'Categorie',
      link: '/Admin/categorie',
      icon: <BiCategory className='h-5 w-5' />
    },
    {
      nom: 'Collection',
      link: '/Admin/collections',
      icon: <FaShoppingCart />
    },
    {
      nom: 'Commande',
      link: '/Admin/commande',
      icon: <FaShoppingCart />
    },
    {
      nom: 'Clients',
      link: '/Admin/clients',
      icon: <FaUser />
    },
    {
      nom: 'Accueil',
      link: '/',
      icon: <MdCollections />

    }

  ];

  return (
    
    
  

    <section className="flex flex-col gap-10 items-center bg-white border-r px-5 py-3 h-screen overflow-hidden w-[250px]">
      <div className='flex justify-center'>
        <img className="h-8" src="/imm.png" alt="logo" />
      </div>
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-3">
        {menuList.map((menu, index) => (
          <Tab key={index} menu={menu} />
        ))}
      </ul>
    </section>
  );
};

const Tab = ({ menu }) => {
  const pathname = usePathname(); 
  const isSelected = pathname === menu.link; 

  return (
    <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold 
      ${isSelected ? "bg-[#15878f] text-white" : "bg-white text-black"}`}>
      <Link href={menu.link} className="flex items-center gap-2">
        {menu.icon}
        {menu.nom}
      </Link>
    </li>
  );
};

export default Sidebar;

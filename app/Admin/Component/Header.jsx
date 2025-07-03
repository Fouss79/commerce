'user client';
import React from 'react';
import Link from 'next/link';
import {
    Home,
    User,
    Box,
    Tag,
    ShoppingCart,
    MessageSquare,
    LogOut
  } from 'lucide-react';
  


const Header = ({cartItems}) => {
 
    const menulist =[
{
    nom : 'Accueil',
    Link : '/',
    icon:<Home size={20}/>
},
{
    nom : 'Contact',
    Link : '/contact',
    icon:<User size={20}/>
    
},
{
    nom : "A propos",
    Link : "/a propos",
    icon:<Box size={20}/>
    
}

    ]
    const getTotal = () => {
        if (!cartItems || !Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => total + item.quantite * item.prix, 0);
      };
      
      const getTotalQuantitie = () => {
        if (!cartItems || !Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => total + item.quantite, 0);
      };
      


  return (
    <nav  style={{ backgroundColor: '#15878f' }} className=" border-b  shadow-md  flex justify-between items-center   fixed top-0 left-0 w-full z-30">
    <img className="h-30 w-20" src="/WhatsApp Image 2025-05-30 at 10.11.01.jpeg" alt="" />
 
    


<div className='flex justify-center items-center md:hidden'>
      </div>
      
 
    <div className="flex  gap-5 px-6 font-bold  justify-center ">
    {menulist.map((menu) => (
  <div key={menu.Link} className=' text-white py-2 px-6 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300'>
    <Link href={menu.Link}>
      <button className='flex justify-between gap-2'>{menu.icon}{menu.nom}</button>
    </Link>
  </div>
))}

    
</div>

<div className='flex items-center gap-6 pr-6'>
  <div className='text-white font-bold'>{getTotal()} FCFA</div>
   
  <div className="relative">
    <Link href={'/panier'}>
    <ShoppingCart size={28} color='white' />
    {getTotalQuantitie() > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {getTotalQuantitie()}
      </span>
    )}
    </Link>
  </div>

  <Link href={'/Admin'} className='flex items-center gap-2 font-bold text-white'>
    Connexion
    <button className="bg-blue-400 py-2 px-2 hover:bg-[green] font-bold rounded-full text-white">
      <User size={30} color='white' />
    </button>
  </Link>
</div>

    


         
         </nav>
  );
};

export default Header;

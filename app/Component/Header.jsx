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



  return (
    <nav className=" border-b bg-white shadow-md p-4 flex justify-between items-center">
    <img className="h-20" src="/imm.png" alt="" />
 
    


<div className='flex justify-center items-center md:hidden'>
      </div>
      
 
    <div className="flex  gap-5 px-6 font-bold  justify-center ">
    {menulist.map((menu) => (
        <div  className='py-2 px-6 rounded-lg  hover:bg-green-700 hover:text-white transition duration-300'><Link key={menu.Link} href={menu.Link}>
            <button className='flex justify-between gap-2'>{menu.icon}{menu.nom}</button>
        </Link></div>
    ))}
    
</div>
<div className="cart">
        🛒 Cart ({cartItems.length})

        
      </div>
    <div className=''>
    <Link href={'/Admin'} className='flex justify-between gap-2'>
        <button className=" bg-green-600 py-2 px-5 hover:bg-[red] font-bold rounded-full text-white">
        <User size={30} color='white'/>
        </button>
    </Link>
    </div>
    


         
         </nav>
  );
};

export default Header;

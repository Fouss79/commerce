import Link from 'next/link'
import React from 'react'

const Header = ({cartItems}) => {

    const menulist =[
{
    nom : 'Accueil',
    Link : '/'
},
{
    nom : 'Contact',
    Link : '/contact'
},
{
    nom : "A propos",
    Link : "/a propos"
}

    ]

    
  return (
    <nav className=" border-b flex justify-between items-center bg-green-500 text-white px-4">
    <img className="h-20" src="/imm.png" alt="" />
    
    <div className="flex  gap-5 px-6 font-bold  justify-between ">
    {menulist.map((menu) => (
        <div  key={menu.Link}  className=' py-2 px-6 rounded-lg  hover:bg-blue-700 hover:text-white transition duration-300'><Link href={menu.Link}>
            <button>{menu.nom}</button>
        </Link></div>
    ))}
    
</div>

    <div className=''>

    
    </div>
    <div className="cart">
        🛒 Cart ({cartItems.length})

        
      </div>
</nav>
  )
}

export default Header
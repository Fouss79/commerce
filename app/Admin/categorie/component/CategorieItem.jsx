import React from "react";
import Link from "next/link";
import styles from "./categorie.module.css";
import { usePathname } from "next/navigation";
const CategorieItem = ({ categorie}) => {


  const pathname = usePathname(); 
  const isSelected = pathname === `/categorie/${categorie.id}`;

  return (
    <div className="">

      <Link href={`/categorie/${categorie.id}`}>
    <div className="product-item overflow-hidden  rounded-lg px-6">
    <span className={`px-4 py-2 rounded 
        ${isSelected ? "bg-[#15878f] text-white" : "text-[#15878f]"}`}>
          {categorie.nom.toUpperCase()}
        </span>
      <img 
                  src={`http://localhost:8080/${categorie.image}`} 
                  alt={categorie.nom} 
                  className='w-full h-32 py-2 transition-transform duration-300 hover:scale-105' 
                />
     
      </div>
      </Link>
 </div>   
  );
};

export default CategorieItem;

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from "../../../context/CartContext";
import Link from "next/link";



const ProductItem = ({ product }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isFavori, setIsFavori] = useState(false);

  const handleClick = () => {
    addToCart(product);
  };

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

    

  return (
    <div className="relative max-w-sm p-4 shadow-lg rounded-lg bg-white">
      {/* ❤️ Cœur favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart size={30} className={isFavori ? "text-red-500" : "text-gray-400"} />
      </div>

      <div className="product-item overflow-hidden rounded-lg text-[#15878f] font-bold">
        <Link href={`/produit/${product.id}`}>
          <div className="cursor-pointer">
            <img
              src={`http://localhost:8080/${product.image}`}
              alt={product.nom}
              className="mx-auto rounded object-cover h-36 w-46 mt-6 transition-transform duration-300 hover:scale-105"
            />
            <h3>{product.nom}</h3>
            <p>{product.prix.toFixed(2)} FCFA </p>
          </div>
        </Link>

        <button
          style={{ backgroundColor: '#15878f' }}
          className="mt-4 px-6 py-2 text-white flex gap-2 items-center justify-center rounded-lg transition duration-300 hover:bg-green-700"
          onClick={handleClick}
        >
          <ShoppingCart size={20} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

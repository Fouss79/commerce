"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingCart,
  LogOut,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");

  // Déterminer la page de destination selon le rôle
 const dashboardLinkMap = {
  ADMIN: "/Admin",
  VENDEUR: "/Vendeur",
  CLIENT: "/Client",
};
  


const handleLogout = () => {
  logout();
  router.push("/");
};

const dashboardLink = dashboardLinkMap[user?.role] || "/User";
  const total =
    cartItems?.reduce(
      (acc, item) => acc + item.prix * item.quantite,
      0
    ) || 0;

  const totalItems =
    cartItems?.reduce(
      (acc, item) => acc + item.quantite,
      0
    ) || 0;

  // Recherche
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/produits?search=${encodeURIComponent(search)}`
    );
  };

  return (
    <nav
  className="
    bg-gradient-to-r from-[#063c28] via-[#0a5a3d] to-[#0d6b49]
    shadow-2xl backdrop-blur-md
    fixed top-0 left-0 w-full z-50
    border-b border-white/10
  "
>
  {/* 
    CHANGEMENTS IMPORTANTS :
    - max-w-7xl supprimé pour utiliser toute la largeur de l'écran
    - px-2 sur mobile et px-3 sur desktop pour rapprocher les éléments des bords
    - ml-auto sur le bloc de droite pour pousser logout à l'extrême droite
  */}
  <div className="w-full px-2 md:px-3 py-2 flex items-center gap-4">
    
    {/* LOGO - très proche du bord gauche */}
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <div
        className="
          bg-white/10 backdrop-blur-md
          rounded-2xl
          border border-white/10
          shadow-lg
        "
      >
        <img
          src="/imm1.png"
          className="h-14 w-14 object-contain"
          alt="logo"
        />
      </div>

      <div className="hidden md:block">
        <span className="text-white font-bold text-2xl tracking-wide">
          Mali
        </span>
        <span className="text-yellow-600 font-bold text-2xl tracking-wide">
          Sugu
        </span>

        <p className="text-green-100 text-xs">
          Marketplace 100% Malien
        </p>
      </div>
    </Link>

    {/* BARRE DE RECHERCHE */}
   
    {/* RIGHT SIDE - poussé complètement à droite */}
    <div className="flex items-center gap-2 md:gap-6 shrink-0 ml-auto">
       <form
      onSubmit={handleSearch}
      className="
        hidden lg:flex flex-1 max-w-2xl mx-6
        items-center
        bg-white rounded-full
        overflow-hidden
        shadow-lg
      "
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un produit, une marque..."
        className="
          flex-1 px-16 py-1
          outline-none
          text-gray-700
          placeholder-gray-400
        "
      />

      <button
        type="submit"
        className="
           text-[#063c28]
          px-4 py-2 bg-yellow-600
          hover:bg-yellow-300
          transition-all duration-300
          font-semibold
          flex items-center gap-2
        "
      >
        <Search size={20} />
       
      </button>
    </form>

      {/* TOTAL */}
      <div
        className="
          hidden md:flex items-center
          bg-white/10 backdrop-blur-md
          px-4 py-2 rounded-full
          text-white font-semibold
          border border-white/10
        "
      >
        <span className="text-yellow-400 mr-2">💰</span>
        {total.toLocaleString()} FCFA
      </div>

      {/* PANIER */}
      <Link
        href="/panier"
        className="
          relative p-3 rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/10
          hover:bg-white/20
          transition-all duration-300
          hover:scale-110
        "
      >
        <ShoppingCart size={24} className="text-white" />

        {totalItems > 0 && (
          <span
            className="
              absolute -top-1 -right-1
              bg-yellow-600 text-[#063c28]
              text-xs font-bold
              min-w-[22px] h-[22px]
              px-1 flex items-center justify-center
              rounded-full shadow-lg
            "
          >
            {totalItems}
          </span>
        )}
      </Link>

      {/* AUTH */}
      {isAuthenticated ? (
        <div className="flex items-center gap-2 md:gap-3">
          {/* Dashboard / Compte utilisateur - visible aussi sur mobile (icône seule) */}
          <Link
            href={dashboardLink}
            className="
              flex items-center gap-2
              bg-white/10 backdrop-blur-md
              px-3 md:px-4 py-2 md:py-2 rounded-full
              text-white font-semibold
              border border-white/10
              hover:bg-white/20
              transition-all duration-300
            "
          >
            <span aria-hidden="true">👤</span>
            <span className="hidden md:inline">{user?.nom}</span>
          </Link>

          {/* LOGOUT - quasiment collé au bord droit */}
          <button
            onClick={handleLogout}
            className="
              p-3 rounded-full
              bg-red-500/90 text-white
              shadow-lg
              hover:bg-red-600
              hover:scale-110
              transition-all duration-300
            "
          >
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="
            p-3 rounded-full
            bg-yellow-600 text-[#063c28]
            shadow-lg
            hover:bg-yellow-300
            hover:scale-110
            transition-all duration-300
          "
        >
          <User size={20} />
        </Link>
      )}
    </div>
  </div>
  <div className="lg:hidden px-4 pb-3">
        <form
          onSubmit={handleSearch}
          className="
            flex items-center
            bg-white rounded-full
            overflow-hidden
            shadow-lg
          "
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="
              flex-1 px-4 py-2
              outline-none
              text-gray-700
            "
          />

          <button
            type="submit"
            className="
              bg-yellow-600 text-[#063c28]
              px-4 py-3
              hover:bg-yellow-300
              transition
            "
          >
            <Search size={20} />
          </button>
        </form>
      </div>
</nav>
  );
};

export default Header;
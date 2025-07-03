"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; // Remarque le chemin relatif

import Header from "../../Component/Header";
import CategorieMenu from "../../Component/CategorieMenu";
import ProduitsByCat from "./component/ProduitsBycat";
import Scrollpane from "../../Component/Scrollpane";
import { useParams } from "next/navigation";
import ListCategorie from "../../Admin/categorie/component/ListCategorie";



const Page = () => {
  const { id } = useParams(); // Récupérer le paramètre "categorieId" de l'URL
  const { cartItems, addToCart, removeFromCart, emptyCart, isModalOpen, closeModal,openModal} = useCart(); // Utilisation du contexte pour gérer le panier
  
  return (
    <main>
      <Header cartItems={cartItems} />
      <div className="mt-6">
        <CategorieMenu />
      </div>
      <ListCategorie/>
      <ProduitsByCat AjtePagne={addToCart} id={id} />
      <Scrollpane
        cartItems={cartItems}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        removeItemFromCart={removeFromCart}
        effAchat={emptyCart}
      />
    </main>
  );
};

export default Page;

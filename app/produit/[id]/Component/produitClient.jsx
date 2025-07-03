"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "@/app/context/CartContext";


const Form = ({ onSubmitSuccess,id }) => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(null); // Gestion des erreurs

  const { cartItems, isModalOpen, openModal, isFormOpen, openForm, closeForm, closeModal, removeFromCart, Ajoute, emptyCart } = useCart();
  
  const handleCommande = async () => {
    const commande = {
        clientId: parseInt(id),
        produits: cartItems.map((item) => ({
            produitId: parseInt(item.id),
            quantite: parseInt(item.quantite),
        })),
    };

    try {
        const response = await axios.post("http://localhost:8080/api/paniers", commande);
        alert("Cart added successfully!");
        console.log(response.data);
        emptyCart(); // Si tu veux vider le panier après
    } catch (error) {
        console.error("Error adding cart:", error);
        alert("Failed to add cart. Please try again.");
    }
};




  // Fonction pour sauvegarder le client
  const saveClient = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    const clientData = { prenom, nom, adresse, numero };

    try {
      const url = id
        ? `http://localhost:8080/api/client/${id}`
        : "http://localhost:8080/api/client";
      const method = id ? "put" : "post";

      const response = await axios({
        method: method,
        url: url,
        data: clientData,
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Redirection avec l'ID généré
      router.push(`/produit/${response.data.id}`);
      console.log("ID généré :", response.data.id);
      alert(`Client enregistré avec ID : ${response.data.id}`);

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Charger les données du client si on est en mode édition
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/client/${id}`)
        .then((response) => {
          setPrenom(response.data.prenom);
          setNom(response.data.nom);
          setAdresse(response.data.adresse);
          setNumero(response.data.numero);
          alert(response.data.id)
        }
       )
        .catch((error) => {
          console.log(error);
          setError("Impossible de charger les données du client.");
        });
    }
  }, [id]);

  return (
    <div className="flex item-between">
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">
        {id ? "Mettre à jour" : "Créer"} un client
      </h1>
      
      {error && <p className="text-red-500">{error}</p>}

      <form className="flex flex-col gap-3" onSubmit={saveClient}>
        <div className="flex flex-col gap-1">
          <label htmlFor="prenom" className="text-gray-500 text-sm">
            Prénom<span className="text-red-500">*</span>
          </label>
          <input
            id="prenom"
            type="text"
            placeholder="Entrer le prénom"
            className="px-4 py-2 rounded-lg focus:outline-none border"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nom" className="text-gray-500 text-sm">
            Nom<span className="text-red-500">*</span>
          </label>
          <input
            id="nom"
            type="text"
            placeholder="Entrer le nom"
            className="px-4 py-2 rounded-lg focus:outline-none border"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="adresse" className="text-gray-500 text-sm">
            Adresse<span className="text-red-500">*</span>
          </label>
          <input
            id="adresse"
            type="text"
            placeholder="Entrer l'adresse"
            className="px-4 py-2 rounded-lg focus:outline-none border"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="numero" className="text-gray-500 text-sm">
            Numéro<span className="text-red-500">*</span>
          </label>
          <input
            id="numero"
            type="text"
            placeholder="Entrer le numéro"
            className="px-4 py-2 rounded-lg focus:outline-none border"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
         
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3">
          {id ? "Mettre à jour" : "Enregistrer"}
        </button>
      </form>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 " onClick={handleCommande}>
          Valider
        </button>
     
    </div>
    <div className="gap-2">
      <div className="p-4 bg-white shadow rounded-lg">
    <h2 className="font-semibold text-lg">Informations du client</h2>
    <p><strong>ID :</strong>{id}</p>
    <p><strong>Nom :</strong> {nom}</p>
    <p><strong>Prénom :</strong> {prenom}</p>
    <p><strong>Adresse :</strong> {adresse}</p>
    <p><strong>Numéro :</strong> {numero}</p>
  </div>
      </div>
      <div>
      <div className="p-4 bg-white shadow rounded-lg">
    <h2 className="font-semibold text-lg">Votre panier</h2>
    {cartItems.length === 0 ? (
      <p>Votre panier est vide.</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="py-2">
            <p><strong>{item.nom}</strong></p>
            <p>Prix unitaire : {item.prix} €</p>
            <p>Quantité : {item.quantite}</p>
            <p>Total : {item.prix * item.quantite} €</p>
          </li>
        ))}
      </ul>
    )}
  </div>
      </div>
      </div>
    
  );
};

export default Form;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link"; // ✅ CORRECT


const Form = ({ onSubmitSuccess, id }) => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [panierId, setPanierId] = useState(null);

  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    cartItems,
    removeFromCart,
    Ajoute,
    emptyCart,
  } = useCart();

  const router = useRouter();

  const confirmCommande = async () => {
    const commande = {
      clientId: parseInt(id),
      produits: cartItems.map((item) => ({
        produitId: parseInt(item.id),
        quantite: parseInt(item.quantite),
      })),
    };
    console.log("Commande envoyée :", commande);


    try {
      const response = await axios.post("http://localhost:8080/api/paniers", commande);
const panierIdCree = response.data.panierId;
   setPanierId(panierIdCree); // <-- stocke l’ID ici

      toast.success(`Commande validée ! ID du panier : ${panierIdCree}`);

      console.log("clientId:", commande.clientId);
console.log("Produits:");
commande.produits.forEach((p, index) => {
  console.log(`Produit ${index + 1}:`, p);
});

      console.log("Commande envoyée :", commande);
  
      console.log(response.data);
      emptyCart();
      setShowConfirmation(false);
      const panierId = response.data.panierId;


    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Échec lors de la validation de la commande.");
      setShowConfirmation(false);
    }
  };

  const saveClient = async (e) => {
    e.preventDefault();
    setError(null);

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

    
  
      toast.success(`Client enregistré avec ID : ${response.data.id}`);

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/client/${id}`)
        .then((response) => {
          setPrenom(response.data.prenom);
          setNom(response.data.nom);
          setAdresse(response.data.adresse);
          setNumero(response.data.numero);
        })
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

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
          onClick={() => setShowConfirmation(true)}
        >
          Valider
        </button>
      </div>

      <div className="gap-2">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-semibold text-lg">Informations du client</h2>
          <p><strong>ID :</strong> {id}</p>
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
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-2 border-b border-gray-200">
                  {item.image && (
                    <img
                      src={`http://localhost:8080/${item.image}`}
                      alt={item.nom}
                      className="h-16 w-16 object-cover rounded mr-4"
                    />
                  )}
                  <div className="flex justify-between items-center flex-1">
                    <div>
                      <p className="text-sm font-bold">{item.nom}</p>
                      <p className="text-sm text-gray-500">Prix: {item.prix} FCFA</p>
                      <p className="text-sm font-bold">Quantité: {item.quantite}</p>
                    </div>
                    <div className="ml-20">
                      <p className="text-sm font-bold">Montant: {item.quantite * item.prix} FCFA</p>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-3 py-1 rounded ml-auto">
                        -
                      </button>
                      <div className="px-3 py-1 rounded ml-auto">{item.quantite}</div>
                      <button onClick={() => Ajoute(item.id)} className="bg-green-600 text-white px-3 py-1 rounded ml-auto">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            

          )}
          
        </div>
      </div>
    
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirmer la commande</h2>
            <p className="mb-6">Souhaitez-vous vraiment valider cette commande ?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Annuler
              </button>
              <button
                onClick={confirmCommande}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
      {panierId && (
  <Link href={`/panier/rapport/${panierId}`}>
    <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">
      Afficher la facture
    </button>
  </Link>
)}

    </div>
  );
};

export default Form;

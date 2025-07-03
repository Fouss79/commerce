"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/navigation";

const Form = ({ onSubmitSuccess }) => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(null); // Gestion des erreurs
  const router = useRouter(); // ✅ Correction ici
  const { id } = useParams();

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
        })
        .catch((error) => {
          console.log(error);
          setError("Impossible de charger les données du client.");
        });
    }
  }, [id]);

  return (
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
    </div>
  );
};

export default Form;

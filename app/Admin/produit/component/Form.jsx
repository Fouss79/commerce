"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SelectCategory from './SelectCategory'; // Assurez-vous d'importer le composant
import api from '../../../../lib/api';

const Form = () => {
  const [selectedImage, setSelectedImage] = useState(null);  
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [quantiteEnStock, setQuantiteEnStock] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const { id } = useParams();

  // Fonction pour sauvegarder le produit
  const saveProduit = (e) => {
    e.preventDefault();
    
    // Vérifie si les champs sont remplis
    if (!nom || !prix || !quantiteEnStock || !selectedCategory) {
        alert('Tous les champs doivent être remplis.');
        return;
    }
    
    // Créer un objet FormData pour envoyer les données en multipart
    const formData = new FormData();
    formData.append('nom', nom);
    
    // Assurer que le prix est bien un nombre et non une chaîne
    const prixAsNumber = parseFloat(prix);
    if (isNaN(prixAsNumber)) {
      alert("Le prix doit être un nombre valide.");
      return;
    }
    formData.append('prix', prixAsNumber);

    // Vérifier la quantité en stock est bien un entier
    const quantiteAsInt = parseInt(quantiteEnStock);
    if (isNaN(quantiteAsInt)) {
      alert("La quantité en stock doit être un nombre entier valide.");
      return;
    }
    formData.append('quantiteEnStock', quantiteAsInt);

    formData.append('categorie_id', selectedCategory); 
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    // Requête POST ou PUT selon le contexte (création ou mise à jour)
    const url = id 
      ? `/api/produit/${id}` 
      : '/api/produit';

    axios({
      method: id ? 'put' : 'post',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Erreur lors de l'enregistrement du produit :", error.response.data);
    });
  };

  useEffect(() => {
    if (id) {
      api.get(`/api/produit/${id}`)
        .then((response) => {
          setNom(response.data.nom);
          setPrix(response.data.prix);
          setQuantiteEnStock(response.data.quantiteEnStock);
          setSelectedImage(response.data.image); 
          setSelectedCategory(response.data.categorie_id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1 className='font-semibold'>{id ? 'Mettre à jour' : 'Créer'} un produit</h1>
      <form className='flex flex-col gap-3' onSubmit={saveProduit}>
        <label htmlFor='category-image' className='text-gray-500 text-sm'>Image<span className='text-red-500'>*</span></label>
        {selectedImage && (
          <div className='flex justify-center items-center'>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className='h-32' />
          </div>
        )}
        <input
          id='category-image'
          type='file'
          name='image'
          className='px-4 py-2 rounded-lg focus:outline-none'
          onChange={handleImageChange}
        />

        <div className='flex flex-col gap-1'>
          <label htmlFor='product-name' className='text-gray-500 text-sm'>Nom<span className='text-red-500'>*</span></label>
          <input
            id='product-name'
            type='text'
            placeholder='Entrer le nom'
            name='product-name'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='prix' className='text-gray-500 text-sm'>Prix<span className='text-red-500'>*</span></label>
          <input
            id='prix'
            type='number'
            step='0.01'
            placeholder='Entrer le prix'
            name='prix'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='quantiteEnStock' className='text-gray-500 text-sm'>Quantité<span className='text-red-500'>*</span></label>
          <input
            id='quantiteEnStock'
            type='number'
            placeholder='Entrer la quantité'
            name='quantiteEnStock'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={quantiteEnStock}
            onChange={(e) => setQuantiteEnStock(e.target.value)}
          />
        </div>

        <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <button style={{ backgroundColor: '#15878f' }} className='bg-[#15878f] text-white px-4 py-2 rounded-lg mt-3'>
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default Form;

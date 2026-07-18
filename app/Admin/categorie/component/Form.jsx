"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../../lib/api';


const Form = ({onSubmitSuccess}) => {
  const [selectedImage, setSelectedImage] = useState(null);  
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();

  // Fonction pour sauvegarder la catégorie
  const saveCategorie = (e) => {s
    e.preventDefault();
    
    // Créer un objet FormData pour envoyer les données en multipart
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    if (selectedImage) {
      formData.append('image', selectedImage); // Ajouter l'image à formData
    }

    // Requête POST ou PUT selon le contexte (création ou mise à jour)
    const url = id ? `/api/categorie/${id}` : '/api/categorie';

    api({
      method: id ? 'put' : 'post',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response.data);
      onSubmitSuccess(); 
      

    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (id) {
      api.get(`/api/categorie/${id}`)
        .then((response) => {
          setNom(response.data.nom);
          setDescription(response.data.description);
          setSelectedImage(response.data.image); // Peut-être ajuster la gestion de l'image ici
        }).catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Directement le fichier sélectionné
  };

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1 className='font-semibold'>{id ? 'Mettre à jour' : 'Créer'} une catégorie</h1>
      <form className='flex flex-col gap-3' onSubmit={saveCategorie}>
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
          <label htmlFor='category-name' className='text-gray-500 text-sm'>Nom<span className='text-red-500'>*</span></label>
          <input
            id='category-name'
            type='text'
            placeholder='Entrer le nom'
            name='category-name'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='description' className='text-gray-500 text-sm'>Description<span className='text-red-500'>*</span></label>
          <input
            id='description'
            type='text'
            placeholder='Entrer la description'
            name='description'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button style={{ backgroundColor: '#15878f' }} className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-3'>
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default Form;

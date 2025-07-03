"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormulaireProduit = ({ onSubmitSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedMarque, setSelectedMarque] = useState('');
  const [marques , setMarques] = useState([]);

  const saveProduit = (e) => {
    e.preventDefault();
    if (!nom || !prix || !selectedCategory || !selectedMarque) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prix', prix);
    formData.append('categorieId', selectedCategory);
    formData.append('marqueId',selectedMarque);
    if (selectedImage) formData.append('image', selectedImage);

    const url = id 
      ? `http://localhost:8080/api/produits/${id}` 
      : 'http://localhost:8080/api/produits';

    setLoading(true);
    axios({
      method: id ? 'put' : 'post',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      onSubmitSuccess();
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setError("Une erreur s'est produite lors de l'envoi.");
      setLoading(false);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/categoriee')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
    axios.get('http://localhost:8080/api/marque')
    .then((response)=>setMarques(response.data))
    .catch((error) =>console.error(error));
    if (id) {
      axios.get(`http://localhost:8080/api/produits/${id}`)
        .then((response) => {
          setNom(response.data.nom);
          setPrix(response.data.prix);
          setSelectedCategory(response.data.categorie.id);
          setSelectedImage(response.data.imagePath); // Chemin vers l'image
        }).catch(error => console.log(error));
    }
  }, [id]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1 className='font-semibold'>{id ? 'Mettre à jour' : 'Créer'} un produit</h1>
      <form className='flex flex-col gap-3' onSubmit={saveProduit}>
        {error && <div className="text-red-500">{error}</div>}
        <label htmlFor='product-image' className='text-gray-500 text-sm'>Image</label>
        {selectedImage && (
          <div className='flex justify-center items-center'>
            {typeof selectedImage === 'string' ? (
              <img src={`http://localhost:8080/${selectedImage}`} alt="Selected" className='h-32' />
            ) : (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" className='h-32' />
            )}
          </div>
        )}
        <input
          id='product-image'
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
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='prix' className='text-gray-500 text-sm'>Prix<span className='text-red-500'>*</span></label>
          <input
            id='prix'
            type='number'
            placeholder='Entrer le prix'
            name='prix'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='categorie' className='text-gray-500 text-sm'>Catégorie<span className='text-red-500'>*</span></label>
          <select
            id='categorie'
            name='categorie'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((categoriee) => (
              <option key={categoriee.id} value={categoriee.id}>
                {categoriee.nom}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='marque' className='text-gray-500 text-sm'>Marque<span className='text-red-500'>*</span></label>
          <select
            id='marque'
            name='marque'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={selectedMarque}
            onChange={(e) => setSelectedMarque(e.target.value)}
            required
          >
            <option value="">Sélectionner une marque</option>
            {marques.map((marque) => (
              <option key={marque.id} value={marque.id}>
                {marque.nom}
              </option>
            ))}
          </select>
        </div>

        <button  style={{ backgroundColor: '#15878f' }} className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-3' disabled={loading}>
          {loading ? 'Envoi...' : (id ? "Mettre à jour" : "Ajouter")}
        </button>
      </form>
    </div>
  );
}

export default FormulaireProduit;

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modifierproduit = ({ onSubmitSuccess, id }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const saveProduit = (e) => {
    e.preventDefault();
    if (!nom || !prix || !selectedCategory || !selectedBrand) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prix', prix);
    formData.append('categorieId', selectedCategory);
    formData.append('marqueId', selectedBrand);
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
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        onSubmitSuccess();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Une erreur s'est produite lors de l'envoi.");
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/categoriee')
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
        setError('Impossible de charger les catégories.');
      });

    axios
      .get('http://localhost:8080/api/marque')
      .then((res) => setBrands(res.data))
      .catch((err) => {
        console.error(err);
        setError('Impossible de charger les marques.');
      });

    if (id) {
      axios
        .get(`http://localhost:8080/api/produits/${id}`)
        .then((res) => {
          const produit = res.data;
          setNom(produit.nom);
          setPrix(produit.prix);
          if (produit.categorie?.id) {
            setSelectedCategory(produit.categorie.id);
          }
          if (produit.marque?.id) {
            setSelectedBrand(produit.marque.id);
          }
          setSelectedImage(produit.imagePath);
        })
        .catch((err) => {
          console.error(err);
          setError("Impossible de charger les données du produit.");
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? 'Mettre à jour' : 'Créer'} un produit</h1>
      <form className="flex flex-col gap-3" onSubmit={saveProduit}>
        {error && <div className="text-red-500">{error}</div>}

        <label htmlFor="product-image" className="text-gray-500 text-sm">Image</label>
        {selectedImage ? (
          typeof selectedImage === 'string' ? (
            <img src={`http://localhost:8080/${selectedImage}`} alt="Produit actuel" className="h-32" />
          ) : (
            <img src={URL.createObjectURL(selectedImage)} alt="Nouvelle sélection" className="h-32" />
          )
        ) : (
          <p>Aucune image sélectionnée</p>
        )}

        <input
          id="product-image"
          type="file"
          name="image"
          className="px-4 py-2 rounded-lg focus:outline-none"
          onChange={handleImageChange}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="product-name" className="text-gray-500 text-sm">
            Nom<span className="text-red-500">*</span>
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Entrer le nom"
            name="product-name"
            className="px-4 py-2 rounded-lg focus:outline-none"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="prix" className="text-gray-500 text-sm">
            Prix<span className="text-red-500">*</span>
          </label>
          <input
            id="prix"
            type="number"
            placeholder="Entrer le prix"
            name="prix"
            className="px-4 py-2 rounded-lg focus:outline-none"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categorie" className="text-gray-500 text-sm">
            Catégorie<span className="text-red-500">*</span>
          </label>
          <select
            id="categorie"
            name="categorie"
            className="px-4 py-2 rounded-lg focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="marque" className="text-gray-500 text-sm">
            Marque<span className="text-red-500">*</span>
          </label>
          <select
            id="marque"
            name="marque"
            className="px-4 py-2 rounded-lg focus:outline-none"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            required
          >
            <option value="">Sélectionner une marque</option>
            {brands.map((marque) => (
              <option key={marque.id} value={marque.id}>
                {marque.nom}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
          disabled={loading}
        >
          {loading ? 'Envoi...' : id ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default Modifierproduit;

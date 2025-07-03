import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormulaireProduits = ({ onSubmitSuccess }) => {
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();

  // Charger les catégories disponibles
  useEffect(() => {
    axios.get('http://localhost:8080/api/categorie')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
        setError("Impossible de charger les catégories");
      });
  }, []);

  // Charger les données du produit si nous sommes en mode "mise à jour"
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/produits/${id}`)
        .then(response => {
          setNom(response.data.nom);
          setPrix(response.data.prix);
          setSelectedCategory(response.data.categorie.id);
        })
        .catch(error => {
          console.log(error);
          setError("Erreur lors du chargement des informations du produit");
        });
    }
  }, [id]);

  // Fonction pour sauvegarder le produit
  const saveProduit = (e) => {
    e.preventDefault();

    // Validation de base
    if (!nom || !prix || !selectedCategory) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }

    const produit = {
      nom,
      prix,
      categorie: { id: selectedCategory }
    };

    const url = id 
      ? `http://localhost:8080/api/produits/${id}` 
      : 'http://localhost:8080/api/produits';

    setLoading(true);
    axios({
      method: id ? 'put' : 'post',
      url: url,
      data: produit,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      onSubmitSuccess();
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setError("Une erreur s'est produite lors de l'envoi.");
      setLoading(false);
    });
  };

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1 className='font-semibold'>{id ? 'Mettre à jour' : 'Créer'} un produit</h1>
      <form className='flex flex-col gap-3' onSubmit={saveProduit}>
        {error && <div className="text-red-500">{error}</div>}
        
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
            required>
            <option value="">Sélectionner une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>

        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-3' disabled={loading}>
          {loading ? 'Envoi...' : (id ? "Mettre à jour" : "Ajouter")}
        </button>
      </form>
    </div>
  );
}

export default FormulaireProduits;

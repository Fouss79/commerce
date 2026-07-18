import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../../../Admin/produit/component/ProductItems';
import api from '@/lib/api';

 // Vérifiez le chemin


const ProduitsByCat = ({ AjtePagne,id }) => {
  
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  // Fonction pour supprimer un produit
  const deleteid = (produit_id) => {
    api.delete(`/api/produits/${produit_id}`)
      .then((response) => {
        console.log(response.data);
        fetchProduits(); // Recharger les produits après la suppression
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fonction pour récupérer les produits par catégorie
  const fetchProduits = async () => {
    setLoading(true); // Début du chargement
    try {
      const url = id
        ? `/api/produits/categorie/${id}` // Si "categorieId" est présent dans l'URL
        : '/api/produitss'; // Sinon, récupérer tous les produits

      const response = await api.get(url);
      setProduits(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des produits'); // Mettre à jour l'état d'erreur
      console.error('Error fetching produits:', error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Recharger les produits chaque fois que "categorieId" change
  useEffect(() => {
    fetchProduits(); // Appeler la fonction pour récupérer les produits dès que "categorieId" change
  }, [id]); // Le tableau de dépendances assure le rechargement quand "categorieId" change

  return (
    <div className="rounded-xl p-5 w-full">
      {loading ? (
        <p>Chargement...</p> // Afficher un message de chargement si les produits sont en cours de récupération
      ) : error ? (
        <p>{error}</p> // Afficher un message d'erreur si une erreur s'est produite
      ) : produits.length === 0 ? (
        <p>Aucun produit disponible</p> // Afficher un message si aucun produit n'est trouvé
      ) : (
        <div>
          <div className="product-list gap-10">
            {produits.map((product) => (
              
           <ProductItem  key={product.id} product={product} AjtePagne={AjtePagne} />
                // Afficher chaque produit
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduitsByCat;

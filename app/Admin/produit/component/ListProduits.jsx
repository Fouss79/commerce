import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItems';
import styles from "./produit.module.css"; // Import du CSS module

const ListProduits = ({ refreshKey,AjtePagne }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur
  
  const deleteid = (produit_id) => {
    axios.delete(`http://localhost:8080/api/produitss/${produit_id}`)
      .then((response) => {
        console.log(response.data);
        fetchProduits() // Reload produits after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProduits = async () => {
    setLoading(true); 
    // Début du chargement
    try {
      const response = await axios.get('http://localhost:8080/api/produitss');
      setProduits(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des produits'); // Mettre à jour l'état d'erreur
      console.error('Error fetching produits:', error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  useEffect(() => {
   
    fetchProduits();
  }, [refreshKey]); // Ajouter refreshKey pour re-fetch

  return (
    <div className='  rounded-xl p-5 w-full'>
      
      {loading ? ( // Affichage pendant le chargement
        <p>Chargement...</p>
      ) : error ? ( // Afficher l'erreur si elle existe
        <p>{error}</p>
      ) : produits.length === 0 ? (
        <p>Aucun produit disponible</p>
      ) : (

        
        <div>
          
      <section className="mt-12 px-4"> <h3 className="text-2xl font-bold mb-6">
      Produits en vedette</h3> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {produits.map(product => ( <div key={product.id} className="bg-white p-4 rounded-xl shadow"> 
        <img
              src={`http://localhost:8080/${product.image}`}
              alt={product.nom}
              className=" rounded-xl shadow-md  "
            /> <h4 className="text-lg font-semibold">{product.nom}</h4> <p className="text-gray-600">{product.prix}</p> </div> ))} </div> </section> 


        <div className={`${styles.productList} `}>
          {produits.slice(0, 8).map((product) => (
            <ProductItem key={product.id} product={product} AjtePagne={AjtePagne} />
          ))}
        </div>
        </div>
      
      
          )}
    </div>
  );
}
        
export default ListProduits;

"use client";

import React, { useEffect, useState } from 'react';

import api from '../../../../lib/api';

const ListCate = ({ refreshKey }) => {
  const [categories, setCategories] = useState([]);

  const API_URL = "https://e-commerce-backend-7-72oy.onrender.com";

  // Function to delete a category by ID
  const deleteid = (categorie_id) => {
    api.delete(`/api/categoriee/${categorie_id}`)
      .then((response) => {
        console.log(response.data);
        fetchCategories(); // Reload categories after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to fetch the list of categories (adapted for DTO)
  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categoriee');
      console.log(response.data);

      // Verify if the received data is an array
      if (Array.isArray(response.data)) {
        setCategories(response.data); // Update state with categories
      } else {
        console.error("The response does not contain an array!");
        alert("The response does not contain an array!");
        setCategories([]); // Reset state in case of an issue
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // useEffect to call fetchCategories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, [refreshKey]);

  return (
    <div className="container mx-auto mt-1">
      <div   className='flex justify-center bg-white rounded-xl w-full md:w-[400px] ml-5'>
        <h2 className= "text-center text-[#15878f] font-bold">LISTE DES CATÉGORIES</h2>
      </div>
      <table className="border-separate border-spacing-y-1">
        <thead>
          <tr>
            <th className="border-y bg-white px-3 py-2 border-l rounded-l-lg">ID</th>
            <th className="border-y bg-white px-3 py-2 border-l rounded-l-lg">Nom</th>
            <th className="border-y bg-white px-3 py-2 border-l rounded-l-lg">Description</th>
            <th className="border-y bg-white px-3 py-2 border-l rounded-l-lg">Image</th>
            <th className="border-y bg-white px-3 py-2 border-l rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((categorie) => (
              <tr key={categorie.id} className="bg-white">
                <td className="border border-y px-3 py-2">{categorie.id}</td>
                <td className="border border-y px-3 py-2">{categorie.nom}</td>
                <td className="border border-y px-3 py-2">{categorie.description}</td>
                <td className="border border-y px-3 py-2">
                

<img 
  src={categorie.image} 
  alt={categorie.nom}
  className="h-auto w-auto object-cover"
/>
                </td>
                <td className="border border-y px-3 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteid(categorie.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">Aucune catégorie disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCate;

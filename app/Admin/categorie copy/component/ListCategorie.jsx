
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategorieItem from './CategorieItem';

import 'swiper/css';
import 'swiper/css/navigation';

const ListCategorie = ({ refreshKey }) => {
  const [categories, setCategories] = useState([]);

  // Function to delete a category by ID
  const deleteid = (categorie_id) => {
    axios.delete(`http://localhost:8080/api/categoriee/${categorie_id}`)
      .then((response) => {
        console.log(response.data);
        fetchCategories(); // Reload categories after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to fetch the list of categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categoriee');
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
  <div className="max-w-7xl mx-auto px-4 mt-8">

    {/* 🔥 TEXTE */}
    <div className="mb-6 text-center md:text-left">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 text-center">
        Nos catégories
      </h2>

     
    </div>

    {/* 🔥 GRID */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {categories.map((categorie) => (
        <CategorieItem key={categorie.id} categorie={categorie} />
      ))}
    </div>

  </div>
);}
  export default ListCategorie;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Récupérer les catégories via l'API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categoriee');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <label htmlFor="category-select" className="text-gray-500 text-sm">Catégorie<span className="text-red-500">*</span></label>
      <select
        id="category-select"
        className="px-4 py-2 rounded-lg focus:outline-none"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.nom}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;

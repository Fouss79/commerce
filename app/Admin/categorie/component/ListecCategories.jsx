import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategorieSlider from './CategorieSlider'; // ← slider importé
import styles from "./categorie.module.css";

const ListCategorie = ({ refreshKey }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categoriee');
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("The response does not contain an array!");
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshKey]);

  return (
    <div className={styles.categorieContainer}>
      <CategorieSlider categories={categories} />
    </div>
  );
};

export default ListCategorie;


"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategorieItem from './CategorieItem';
import styles from "./categorie.module.css";// Import du CSS module

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
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




  <div className= '{styles.categorieList} relative overflow-visible' >
    <Swiper
  modules={[Navigation]}
  navigation
  spaceBetween={20}
  slidesPerView={6}
  slidesOffsetBefore={30}  // Espace avant le 1er slide
  slidesOffsetAfter={30}   // Espace après le dernier slide
  className="w-full custom-swiper-container px-10" // padding horizontal

>


    {categories.map((categorie) => (
      
      <SwiperSlide key={categorie.id} >
        <div className=''>
      <CategorieItem key={categorie.id} categorie={categorie}  />
      </div>
    </SwiperSlide>
    ))}
    </Swiper>
  </div>


    

  )}
  export default ListCategorie;
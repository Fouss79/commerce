"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const FormSousCategorie = ({ onSubmitSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const [categorieId, setCategorieId] = useState("");
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categoriee")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= LOAD (UPDATE) =================
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/souscategories/${id}`)
        .then((res) => {
          setNom(res.data.nom);
          setDescription(res.data.description);
          setCategorieId(res.data.categorieId);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // ================= SAVE =================
  const saveSousCategorie = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("categorieId", categorieId);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const url = id
      ? `http://localhost:8080/api/souscategories/${id}`
      : "http://localhost:8080/api/souscategories";

    axios({
      method: id ? "put" : "post",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        onSubmitSuccess?.();
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">
        {id ? "Mettre à jour" : "Créer"} une sous-catégorie
      </h1>

      <form className="flex flex-col gap-3" onSubmit={saveSousCategorie}>
        
        {/* IMAGE */}
        <label>Image</label>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            className="h-32"
            alt="preview"
          />
        )}
        <input type="file" onChange={handleImageChange} />

        {/* NOM */}
        <label>Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="px-4 py-2 border rounded"
        />

        {/* DESCRIPTION */}
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 border rounded"
        />

        {/* SELECT CATEGORIE */}
        <label>Catégorie</label>
        <select
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">-- Choisir une catégorie --</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>

        {/* SUBMIT */}
        <button className="bg-[#15878f] text-white py-2 rounded">
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default FormSousCategorie;
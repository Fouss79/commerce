"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import api from "../../../lib/api";

const FormSousCategorie = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [categories, setCategories] = useState([]);

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    api
      .get("/api/categoriee")
      .then((res) => setCategories(res.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/api/souscategories/${id}`)
      .then((res) => {
        setNom(res.data.nom || "");
        setDescription(res.data.description || "");
        setCategorieId(res.data.categorieId || "");
      })
      .catch(console.log);
  }, [id]);

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
      ? `/api/souscategories/${id}`
      : "/api/souscategories";

    api({
      method: id ? "put" : "post",
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);

        // reset form après succès
        setNom("");
        setDescription("");
        setCategorieId("");
        setSelectedImage(null);

        alert("Succès !");
      })
      .catch(console.log);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">
        {id ? "Mettre à jour" : "Créer"} une sous-catégorie
      </h1>

      <form onSubmit={saveSousCategorie} className="flex flex-col gap-3">
        <label>Image</label>

        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            className="h-32 object-cover"
            alt="preview"
          />
        )}

        <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />

        <label>Nom</label>
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="border p-2 rounded"
        />

        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <label>Catégorie</label>
        <select
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Choisir --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>

        <button className="bg-[#15878f] text-white py-2 rounded">
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default FormSousCategorie;
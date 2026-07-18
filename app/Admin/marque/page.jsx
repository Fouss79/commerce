"use client";

import api from "../../../lib/api";
import React, { useState, useEffect } from "react";


const FormMarque = ({ onSuccess, editData }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const isEdit = !!editData?.id;

  useEffect(() => {
    if (isEdit) {
      setNom(editData.nom || "");
      setDescription(editData.description || "");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEdit) {
        await api.put(`/api/marque/${editData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/api/marque`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess && onSuccess();

      setNom("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full md:w-[400px]">
      <h2 className="font-bold text-lg mb-3">
        {isEdit ? "Modifier Marque" : "Créer Marque"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Nom de la marque"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            className="h-24 object-cover"
          />
        )}

        <button
          type="submit"
          className="bg-[#15878f] text-white p-2 rounded"
        >
          {isEdit ? "Modifier" : "Ajouter"}
        </button>

      </form>
    </div>
  );
};

export default FormMarque;
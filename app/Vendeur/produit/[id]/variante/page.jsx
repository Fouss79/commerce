"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../../../lib/api";

export default function AddVariantePage() {
  const { id } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [variantes, setVariantes] = useState([]);
  const [form, setForm] = useState({
    couleur: "",
    taille: "",
    stock: "",
    prix: "",
    image: null,
  });

  const fetchVariantes = async () => {
    const res = await api.get(
      `/api/produitss/${id}/variantes`
    );
    setVariantes(res.data);
  };

  useEffect(() => {
    fetchVariantes();
  }, [id]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("couleur", form.couleur);
    formData.append("taille", form.taille);
    formData.append("stock", form.stock);
    formData.append("prix", form.prix);
    formData.append("image", form.image);

    await api.post(
      `/api/produitss/${id}/variante`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setForm({
      couleur: "",
      taille: "",
      stock: "",
      prix: "",
      image: null,
    });

    fetchVariantes();
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">

      <h1 className="text-xl font-bold mb-4">
        Ajouter une variante
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Couleur"
          value={form.couleur}
          onChange={(e) => handleChange("couleur", e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Taille"
          value={form.taille}
          onChange={(e) => handleChange("taille", e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Prix"
          value={form.prix}
          onChange={(e) => handleChange("prix", e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="file"
          onChange={(e) =>
            handleChange("image", e.target.files[0])
          }
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Ajouter
        </button>
      </form>

      {/* LISTE */}
      <div className="mt-6 space-y-3">
        {variantes.map((v) => (
          <div key={v.id} className="border p-3 rounded flex gap-3">

            {v.image && (
              <img
                src={v.image}
                className="w-16 h-16 object-cover rounded"
              />
            )}

            <div>
              <p>{v.couleur} - {v.taille}</p>
              <p>{v.stock} pcs</p>
              <p className="text-green-600">{v.prix} FCFA</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
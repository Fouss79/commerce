"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function AddVariantePage() {
  const { id } = useParams(); // 🔥 produitId

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [variantes, setVariantes] = useState([
    { couleur: "", taille: "", stock: "", prix: "" }
  ]);

  const [loading, setLoading] = useState(false);

  // ➕ ajouter ligne
  const addVariante = () => {
    setVariantes([
      ...variantes,
      { couleur: "", taille: "", stock: "", prix: "" }
    ]);
  };

  // ❌ supprimer ligne
  const removeVariante = (index) => {
    const updated = variantes.filter((_, i) => i !== index);
    setVariantes(updated);
  };

  // ✏️ modifier champ
  const handleChange = (index, field, value) => {
    const updated = [...variantes];
    updated[index][field] = value;
    setVariantes(updated);
  };

  // 📌 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/produitss/${id}/variantes`,
        variantes
      );

      alert("Variantes ajoutées avec succès !");
      setVariantes([{ couleur: "", taille: "", stock: "", prix: "" }]);

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        Ajouter variantes au produit #{id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {variantes.map((v, index) => (
          <div
            key={index}
            className="border p-4 rounded space-y-2 relative"
          >

            <input
              type="text"
              placeholder="Couleur (ex: Rouge)"
              value={v.couleur}
              onChange={(e) =>
                handleChange(index, "couleur", e.target.value)
              }
              className="border p-2 w-full"
              required
            />

            <input
              type="text"
              placeholder="Taille (ex: 42, M, L...)"
              value={v.taille}
              onChange={(e) =>
                handleChange(index, "taille", e.target.value)
              }
              className="border p-2 w-full"
            
            />

            <input
              type="number"
              placeholder="Stock"
              value={v.stock}
              onChange={(e) =>
                handleChange(index, "stock", e.target.value)
              }
              className="border p-2 w-full"
              required
            />

            <input
              type="number"
              placeholder="Prix"
              value={v.prix}
              onChange={(e) =>
                handleChange(index, "prix", e.target.value)
              }
              className="border p-2 w-full"
              required
            />

            {/* ❌ supprimer */}
            {variantes.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariante(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* ➕ ajouter variante */}
        <button
          type="button"
          onClick={addVariante}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          + Ajouter variante
        </button>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#036c94] text-white px-6 py-2 rounded w-full"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>

      </form>
    </div>
  );
}
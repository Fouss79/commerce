"use client";

import api from "../../../../lib/api";
import { useEffect, useState } from "react";
import { Upload, ImagePlus, Save } from "lucide-react";

export default function FormMarque({ onSuccess, editData }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] =useState("");
  const [image, setImage] = useState(null);

  const isEdit = !!editData?.id;

  useEffect(() => {
    if (isEdit) {
      setNom(editData.nom || "");
      setDescription(editData.description || "");
    } else {
      setNom("");
      setDescription("");
      setImage(null);
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/api/marque", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setNom("");
      setDescription("");
      setImage(null);

      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">
          {isEdit ? "Modifier une marque" : "Nouvelle marque"}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Ajoutez ou modifiez une marque de votre catalogue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Nom de la marque
          </label>

          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex : Nike"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15878f]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de la marque..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#15878f]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Logo / Image
          </label>

          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-2xl cursor-pointer hover:border-[#15878f] transition">

            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className="h-full object-contain p-3"
              />
            ) : (
              <>
                <ImagePlus
                  size={40}
                  className="text-gray-400 mb-2"
                />

                <span className="text-gray-500 text-sm">
                  Cliquez pour choisir une image
                </span>
              </>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

          </label>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#15878f] hover:bg-[#126e75] text-white py-3 font-semibold transition"
        >
          <Save size={18} />

          {isEdit ? "Mettre à jour" : "Ajouter la marque"}
        </button>
      </form>
    </div>
  );
}
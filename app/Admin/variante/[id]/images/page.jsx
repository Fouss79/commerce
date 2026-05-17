"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function UploadImagesPage() {
  const { id } = useParams(); // varianteId

  const [file, setFile] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Ajoute une image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // ✅ UNE seule image

    try {
      await axios.post(
        `${API_URL}/api/varianteimage/variante/${id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Image ajoutée à la variante !");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Erreur upload");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">

      <h1 className="text-xl font-bold mb-4">
        Ajouter image à la variante #{id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* INPUT FILE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />

        {/* PREVIEW */}
        {file && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-40 w-auto object-cover rounded"
            />
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-[#036c94] text-white px-4 py-2 rounded w-full hover:bg-[#024e6b]"
        >
          Upload image
        </button>

      </form>
    </div>
  );
}
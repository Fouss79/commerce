"use client";

import { useState, useEffect } from "react";
import api from "../../../../lib/api";

const UploadCarouselImage = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [carousel, setCarousel] = useState(true);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]); // ✅ state manquant

  useEffect(() => {
    api
      .get("/api/carousel/list")
      .then((response) => {
        console.log("Images :", response.data);
        console.log("Nombre :", response.data.length);
        setImages(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Choisissez une image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("description", description);
      formData.append("carousel", carousel);

      const token = localStorage.getItem("token");

      const res = await api.post("/api/carousel/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ res.data peut être un objet -> éviter de rendre un objet dans le JSX
      setMessage(
        typeof res.data === "string"
          ? res.data
          : res.data?.message || "Image envoyée avec succès"
      );

      setFile(null);
      setDescription("");
      setCarousel(true);

      // ✅ recharge la liste après upload pour voir la nouvelle image
      const refreshed = await api.get("/api/carousel/list");
      setImages(refreshed.data);
    } catch (err) {
      console.error("Erreur complète :", err);

      if (err.response) {
        console.log("Status :", err.response.status);
        console.log("Data :", err.response.data);
      }

      // ✅ même précaution ici : err.response?.data peut être un objet
      const errData = err.response?.data;
      setMessage(
        typeof errData === "string"
          ? errData
          : errData?.message || "Erreur lors de l'envoi"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-xl shadow-md"
      >
        <h2 className="text-xl font-bold">
          Ajouter une image au carousel
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={carousel}
            onChange={() => setCarousel(!carousel)}
          />
          <span>Afficher dans le carousel</span>
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Envoyer
        </button>

        {message && (
          <p className="mt-2 text-sm">{message}</p>
        )}
      </form>

      {/* ✅ Affichage des images existantes */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.url || img.imageUrl}
              alt={img.description || "carousel"}
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadCarouselImage;
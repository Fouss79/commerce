'use client';

import { useState } from 'react';

const UploadCarouselImage = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [carousel, setCarousel] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("carousel", carousel);

    try {
      const res = await fetch("http://localhost:8080/api/carousel/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Erreur lors de l’envoi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">Ajouter une image au carousel</h2>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={carousel} onChange={() => setCarousel(!carousel)} />
        <span>Afficher dans le carousel</span>
      </label>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Envoyer
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default UploadCarouselImage;

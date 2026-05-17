"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const AvisSection = ({ produitId, utilisateurId }) => {
  const [avis, setAvis] = useState([]);
  const [note, setNote] = useState(5);
  const [commentaire, setCommentaire] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ API depuis .env.local
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // === Récupération des avis ===
  useEffect(() => {
    if (!produitId) return;

    const fetchAvis = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/avis/produit/${produitId}`
        );

        setAvis(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des avis :", err);
        setAvis([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvis();
  }, [produitId, refresh]); // ✅ refresh ajouté

  // === Envoi d'un avis ===
  const envoyerAvis = async (e) => {
    e.preventDefault();

    if (!utilisateurId) {
      alert("Vous devez être connecté pour laisser un avis");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/avis/produit/${produitId}`,
        {
          note,
          commentaire,
          utilisateurId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setNote(5);
      setCommentaire("");
      setRefresh(!refresh); // 🔄 recharge des avis
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'avis :", err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-[#036c94]">
        Avis des clients
      </h3>

      {loading ? (
        <p>Chargement des avis...</p>
      ) : avis.length === 0 ? (
        <p className="text-gray-500 mt-2">Aucun avis pour ce produit.</p>
      ) : (
        avis.map((a) => (
          <div key={a.id} className="border-b py-2">
            <p className="font-semibold text-gray-700">
              ⭐ {a.note} / 5
            </p>
            <p>{a.commentaire}</p>
          </div>
        ))
      )}

      {/* === Formulaire avis === */}
      <form onSubmit={envoyerAvis} className="mt-4 space-y-2">
        <label className="block font-medium">Note (1–5)</label>

        <input
          type="number"
          min="1"
          max="5"
          value={note}
          onChange={(e) => setNote(Number(e.target.value))}
          className="border px-2 py-1 rounded w-20"
          required
        />

        <textarea
          placeholder="Votre commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />

        <button
          type="submit"
          className="bg-[#036c94] hover:bg-[#02577a] text-white px-4 py-2 rounded"
        >
          Envoyer l’avis
        </button>
      </form>
    </div>
  );
};

export default AvisSection;

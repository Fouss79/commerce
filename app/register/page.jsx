"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    numero: "",
    adresse: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/api/auth/register", form);

      // 🔥 redirection login
      router.push("/login");

    } catch (err) {
      setError(
        err.response?.data || "Erreur lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Inscription
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <input
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          className="input"
        />

        <input
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          className="input"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="input"
        />

        <input
          name="numero"
          placeholder="Numéro"
          onChange={handleChange}
          className="input"
        />

        <input
          name="adresse"
          placeholder="Adresse"
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 mt-3 rounded"
        >
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
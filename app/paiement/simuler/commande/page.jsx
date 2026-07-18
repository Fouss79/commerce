"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../../lib/api";

export default function PaiementSimulePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");
  const commandeId = searchParams.get("commandeId");
  const montant = searchParams.get("montant");

  const [loading, setLoading] = useState(false);

  // ================= SUCCESS =================
  const handleSuccess = async () => {
    setLoading(true);

    await api.post("/api/paiement/callback", {
      transactionId,
      status: "SUCCESS",
      commandeId,
      montant,
    });

    setLoading(false);
    router.push("/success");
  };

  // ================= FAIL =================
  const handleFail = async () => {
    setLoading(true);

    await api.post("/api/paiement/callback", {
      transactionId,
      status: "FAILED",
      commandeId,
      montant,
    });

    setLoading(false);
    router.push("/failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-[#063c28] mb-6">
          Paiement sécurisé
        </h1>

        <div className="space-y-3 text-gray-700">
          <p><strong>Transaction :</strong> {transactionId}</p>
          <p><strong>Commande :</strong> #{commandeId}</p>
          <p><strong>Montant :</strong> {montant} FCFA</p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Choisissez une action pour simuler le paiement
        </div>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">

          <button
            onClick={handleSuccess}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700 transition"
          >
            ✔ Simuler Paiement Réussi
          </button>

          <button
            onClick={handleFail}
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-2xl hover:bg-red-600 transition"
          >
            ✖ Simuler Échec
          </button>

        </div>

        {loading && (
          <p className="text-center mt-4 text-gray-500">
            Traitement...
          </p>
        )}
      </div>
    </div>
  );
}
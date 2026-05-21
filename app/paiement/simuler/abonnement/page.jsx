"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaiementSimulation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const abonnementId = searchParams.get("abonnementId");
  const montant = searchParams.get("montant") || 0;
  const transactionId = searchParams.get("transactionId");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("WAITING"); 
  // WAITING | SUCCESS | FAILED

  // =========================
  // SIMULATION PAIEMENT
  // =========================
  const handleSuccess = async () => {
    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/abonnement/webhook`,
        {
          abonnementId,
          transactionId,
          status: "SUCCESS",
        }
      );

      setStatus("SUCCESS");

      setTimeout(() => {
        router.push("/Vendeur");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  const handleFail = async () => {
    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/paiement/webhook/fail`,
        {
          abonnementId,
          transactionId,
          status: "FAILED",
        }
      );

      setStatus("FAILED");
    } catch (err) {
      console.error(err);
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">

        <h1 className="text-2xl font-bold text-[#063c28] mb-2">
          Simulation de Paiement
        </h1>

        <p className="text-gray-500 mb-6">
          Transaction : {transactionId}
        </p>

        <p className="text-3xl font-bold mb-8">
          {montant} FCFA
        </p>

        {/* STATUS */}
        {status === "WAITING" && (
          <div className="mb-6">
            <Loader2 className="animate-spin mx-auto text-[#063c28]" size={40} />
            <p className="mt-2 text-gray-600">
              En attente de paiement...
            </p>
          </div>
        )}

        {status === "SUCCESS" && (
          <div className="mb-6 text-green-600">
            <CheckCircle size={50} className="mx-auto" />
            <p className="mt-2 font-semibold">
              Paiement réussi ✔
            </p>
          </div>
        )}

        {status === "FAILED" && (
          <div className="mb-6 text-red-500">
            <XCircle size={50} className="mx-auto" />
            <p className="mt-2 font-semibold">
              Paiement échoué ❌
            </p>
          </div>
        )}

        {/* BUTTONS */}
        {status === "WAITING" && (
          <div className="flex gap-4">
            <button
              onClick={handleSuccess}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
            >
              Simuler succès
            </button>

            <button
              onClick={handleFail}
              disabled={loading}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600"
            >
              Simuler échec
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
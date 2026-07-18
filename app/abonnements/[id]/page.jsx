"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../../lib/api";

function AbonnementContent() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const auto = searchParams.get("auto");

  const { user } = useAuth();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // LOAD PLAN
  // =========================
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get(`/api/plans/${id}`);
        setPlan(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  // =========================
  // AUTO SUBSCRIBE ESSAI
  // =========================
  useEffect(() => {
    if (!plan || !user || !auto) return;

    if (plan.nom?.toUpperCase() === "ESSAI") {
      handleSubscribe();
    }
  }, [plan, user, auto]);

  // =========================
  // SUBSCRIBE FUNCTION
  // =========================
  const handleSubscribe = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setProcessing(true);
    setMessage("");

    try {
      const res = await api.post(`/api/abonnement/init`, null, {
        params: {
          userId: user.id,
          planId: plan.id,
        },
      });

      const paymentUrl = res.data.paymentUrl;

      setMessage("Redirection vers le paiement...");

      // 🔥 REDIRECTION VERS URL BACKEND
      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || "Erreur lors de la souscription");
    } finally {
      setProcessing(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Plan introuvable
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">

        {/* TITRE */}
        <h1 className="text-3xl font-bold text-[#063c28] mb-4">
          {plan.nom}
        </h1>

        <p className="text-gray-600 mb-6">
          Durée : {plan.dureeJours} jours
        </p>

        <p className="text-2xl font-bold mb-8">
          {plan.montant === 0 ? "Gratuit" : `${plan.montant} FCFA`}
        </p>

        {/* FEATURES */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <span>Activation immédiate vendeur</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <span>Accès dashboard boutique</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <span>Gestion produits & ventes</span>
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm text-gray-700">
            {message}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubscribe}
          disabled={processing}
          className="w-full bg-[#063c28] text-white py-4 rounded-2xl font-bold hover:bg-[#0a5a3d] transition flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Traitement...
            </>
          ) : plan.nom?.toUpperCase() === "ESSAI" ? (
            "Démarrer l'essai gratuit"
          ) : (
            "Souscrire maintenant"
          )}
        </button>
      </div>
    </div>
  );
}

export default function AbonnementPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin" size={40} />
        </div>
      }
    >
      <AbonnementContent />
    </Suspense>
  );
}
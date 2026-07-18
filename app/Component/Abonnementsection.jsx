"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api";
import {
  Crown,
  Sparkles,
  Rocket,
  CheckCircle,
  ArrowRight,
} from "lucide-react";


export default function AbonnementSection() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Associer une icône et un style selon le nom du plan
  const getPlanConfig = (plan) => {
    const nom = plan.nom?.toUpperCase();

    switch (nom) {
      case "ESSAI":
        return {
          icon: Sparkles,
          badge: "Découverte",
          highlight: false,
          color: "from-gray-500 to-gray-700",
          features: [
            "Tester la plateforme gratuitement",
            "Découvrir le dashboard vendeur",
            `Publier jusqu'à ${plan.limiteProduits} produits`,
            "Sans carte bancaire",
          ],
        };

      case "BASIC":
        return {
          icon: Rocket,
          badge: "Populaire",
          highlight: true,
          color: "from-[#063c28] to-[#0a5a3d]",
          features: [
            `Publier jusqu'à ${plan.limiteProduits} produits`,
            "Statistiques de ventes",
            "Gestion des commandes",
            "Support standard",
          ],
        };

      case "PRO":
        return {
          icon: Crown,
          badge: "Professionnel",
          highlight: false,
          color: "from-blue-600 to-indigo-600",
          features: [
            `Publier jusqu'à ${plan.limiteProduits} produits`,
            "Produits mis en avant",
            "Support prioritaire",
            "Badge vendeur certifié",
          ],
        };

      case "PREMIUM":
        return {
          icon: Crown,
          badge: "Meilleure offre",
          highlight: false,
          color: "from-yellow-500 to-orange-500",
          features: [
            "Produits illimités",
            "Visibilité maximale",
            "Support VIP",
            "Toutes les fonctionnalités",
          ],
        };

      default:
        return {
          icon: Rocket,
          badge: "Offre",
          highlight: false,
          color: "from-[#063c28] to-[#0a5a3d]",
          features: [
            `Durée : ${plan.dureeJours} jours`,
            `Montant : ${plan.montant} FCFA`,
          ],
        };
    }
  };

  // Chargement des plans depuis la base de données
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get(
          `${API_URL}/api/plans`
        );

        // Ne garder que les plans actifs
        const plansActifs = (res.data || []).filter(
          (plan) => plan.actif
        );

        setPlans(plansActifs);
      } catch (error) {
        console.error(
          "Erreur chargement des plans :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [API_URL]);

  if (loading) {
    return (
      <section className="py-24 text-center">
        <div className="w-14 h-14 mx-auto border-4 border-green-200 border-t-[#063c28] rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">
          Chargement des abonnements...
        </p>
      </section>
    );
  }

  if (plans.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="text-gray-500">
          Aucun plan disponible pour le moment.
        </p>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-[#063c28] text-sm font-semibold mb-6">
            🚀 Devenez vendeur professionnel
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#063c28] leading-tight mb-6">
            Choisissez votre{" "}
            <span className="text-yellow-500">
              abonnement
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Lancez votre boutique sur MaliSugu et
            commencez à vendre partout au Mali.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const config = getPlanConfig(plan);
            const Icon = config.icon;

            const prix =
              Number(plan.montant) === 0
                ? "Gratuit"
                : `${Number(
                    plan.montant
                  ).toLocaleString()} FCFA`;

            const limiteProduits =
              plan.limiteProduits === -1
                ? "Illimités"
                : plan.limiteProduits;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  config.highlight
                    ? "border-yellow-400 shadow-2xl scale-105"
                    : "border-gray-100 shadow-xl"
                } bg-white`}
              >
                {/* Badge */}
                <div className="absolute top-5 right-5 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${config.color}`}
                  >
                    {config.badge}
                  </span>
                </div>

                {/* Header */}
                <div
                  className={`p-8 text-white bg-gradient-to-r ${config.color}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    {plan.nom}
                  </h3>

                  <div className="mb-2">
                    <span className="text-4xl font-extrabold">
                      {prix}
                    </span>
                  </div>

                  <p className="text-white/90">
                    Valable pendant{" "}
                    {plan.dureeJours} jour
                    {plan.dureeJours > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {config.features.map(
                      (feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle
                            size={20}
                            className="text-green-600 mt-0.5"
                          />
                          <span className="text-gray-700">
                            {feature.replace(
                              "Illimités",
                              limiteProduits
                            )}
                          </span>
                        </li>
                      )
                    )}
                  </ul>

                  {/* Utilisation de l'ID réel de la base de données */}
                  {/* Bouton d'action */}
{plan.nom?.toUpperCase() === "ESSAI" ? (
  /*
   * Le plan ESSAI est activé immédiatement.
   * La page /abonnements/[id] appellera directement :
   * POST /api/abonnements/souscrire?userId=...&planId=...
   *
   * Comme votre service Spring Boot détecte le plan ESSAI,
   * il active automatiquement l'abonnement et transforme
   * immédiatement l'utilisateur en VENDEUR.
   */
  <Link
    href={`/abonnements/${plan.id}?auto=true`}
    className="w-full py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 bg-green-600 text-white hover:bg-green-700 shadow-lg"
  >
    Essayer gratuitement
    <ArrowRight size={18} />
  </Link>
) : (
  /*
   * Les autres plans nécessitent un paiement.
   * La page /abonnements/[id] affichera les détails du plan
   * puis redirigera vers le paiement.
   */
  <Link
    href={`/abonnements/${plan.id}`}
    className={`w-full py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 ${
      config.highlight
        ? "bg-yellow-400 text-[#063c28] hover:bg-yellow-300 shadow-lg"
        : "bg-[#063c28] text-white hover:bg-[#0a5a3d] shadow-lg"
    }`}
  >
    Choisir ce plan
    <ArrowRight size={18} />
  </Link>
)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
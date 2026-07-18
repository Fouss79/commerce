"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Package,
  Calendar,
  CreditCard,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import api from "../../../lib/api";

export default function MesCommandesPage() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMesCommandes();
  }, []);

  const fetchMesCommandes = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      const res = await api.get(
        `/api/commandes/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommandes(res.data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des commandes :",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "EN_ATTENTE":
        return {
          label: "En attente",
          icon: Clock,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "PAYEE":
        return {
          label: "Payée",
          icon: CreditCard,
          className: "bg-blue-100 text-blue-700",
        };

      case "EXPEDIE":
      case "EXPÉDIE":
        return {
          label: "Expédiée",
          icon: Truck,
          className: "bg-purple-100 text-purple-700",
        };

      case "LIVRE":
        return {
          label: "Livrée",
          icon: CheckCircle,
          className: "bg-green-100 text-green-700",
        };

      case "ANNULE":
        return {
          label: "Annulée",
          icon: XCircle,
          className: "bg-red-100 text-red-700",
        };

      default:
        return {
          label: status || "Inconnu",
          icon: Package,
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Chargement de vos commandes...</p>
      </div>
    );
  }

  if (commandes.length === 0) {
    return (
      <div className="text-center py-20">
        <Package
          size={64}
          className="mx-auto text-gray-300 mb-4"
        />
        <h2 className="text-2xl font-bold text-[#063c28] mb-2">
          Aucune commande
        </h2>
        <p className="text-gray-500 mb-6">
          Vous n'avez pas encore passé de commande.
        </p>

        <Link
          href="/produits"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#063c28] text-white hover:bg-green-800 transition"
        >
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#063c28] mb-2">
        Mes commandes
      </h1>

      <p className="text-gray-600 mb-8">
        Consultez l'historique et le suivi de vos commandes.
      </p>

      <div className="space-y-6">
        {commandes.map((commande) => {
          const status = getStatusConfig(commande.statut);
          const StatusIcon = status.icon;

          return (
            <div
              key={commande.id}
              className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#063c28]">
                    Commande #{commande.id}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <Calendar size={16} />
                    <span>
                      {new Date(
                        commande.dateCommande
                      ).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${status.className}`}
                >
                  <StatusIcon size={16} />
                  {status.label}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {commande.details?.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span>
                      {detail.produit?.nom} × {detail.quantite}
                    </span>
                    <span className="font-semibold">
                      {detail.sousTotal?.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Mode de paiement
                  </p>
                  <p className="font-semibold">
                    {commande.modePaiement}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 text-sm">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-[#063c28]">
                    {commande.montantTotal?.toLocaleString()} FCFA
                  </p>
                </div>

                <Link
                  href={`/commande/${commande.id}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#063c28] text-[#063c28] hover:bg-green-50 transition"
                >
                  <Eye size={18} />
                  Voir les détails
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
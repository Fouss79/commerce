"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  CreditCard,
  ShoppingCart,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function DashboardUser() {
  const [user, setUser] = useState(null);
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    if (savedUser?.id) {
      fetchData(savedUser.id);
    }
  }, []);

  const fetchData = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/commandes/user/${userId}`
      );
      setCommandes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= KPI =================
  const totalCommandes = commandes.length;

  const totalDepense = commandes.reduce(
    (acc, c) => acc + (c.montantTotal || 0),
    0
  );

  const commandesLivrees = commandes.filter(
    (c) => c.statut === "LIVRE"
  ).length;

  const commandesEnAttente = commandes.filter(
    (c) => c.statut === "EN_ATTENTE"
  ).length;

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-3xl font-bold text-[#063c28]">
          Bonjour {user.prenom} 👋
        </p>
        <p className="text-gray-500">
          Voici un résumé de votre activité
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card
          icon={<ShoppingCart />}
          title="Commandes"
          value={totalCommandes}
        />

        <Card
          icon={<CreditCard />}
          title="Total dépensé"
          value={`${totalDepense.toLocaleString()} FCFA`}
        />

        <Card
          icon={<CheckCircle />}
          title="Livrées"
          value={commandesLivrees}
        />

        <Card
          icon={<Clock />}
          title="En attente"
          value={commandesEnAttente}
        />
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h2 className="text-xl font-bold text-[#063c28] mb-4">
          Commandes récentes
        </h2>

        <div className="space-y-4">
          {commandes.slice(0, 5).map((cmd) => (
            <div
              key={cmd.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-semibold">
                  Commande #{cmd.id}
                </p>
                <p className="text-sm text-gray-500">
                  {cmd.dateCommande}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-[#063c28]">
                  {cmd.montantTotal?.toLocaleString()} FCFA
                </p>
                <span className="text-sm text-gray-500">
                  {cmd.statut}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6">

        <ActionCard
          title="Voir mes commandes"
          desc="Suivre vos achats"
          link="/User/commandes"
        />

        <ActionCard
          title="Modifier profil"
          desc="Mettre à jour vos infos"
          link="/User/profil"
        />

        <ActionCard
          title="Continuer shopping"
          desc="Explorer les produits"
          link="/produits"
        />
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function Card({ icon, title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
      <div className="text-[#063c28]">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, link }) {
  return (
    <a
      href={link}
      className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition block"
    >
      <h3 className="font-bold text-[#063c28]">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </a>
  );
}
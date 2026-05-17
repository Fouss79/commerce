"use client";

import { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Edit3,
  Shield,
  Calendar,
  LogOut,
} from "lucide-react";

export default function ProfilPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        Chargement du profil...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-3xl font-bold text-[#063c28]">
          Mon profil
        </p>

        <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 hover:bg-gray-50">
          <Edit3 size={18} />
          Modifier
        </button>
      </div>

      {/* CARD PROFIL */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

        {/* AVATAR */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-[#063c28] text-2xl font-bold">
            {user.prenom?.charAt(0)}
            {user.nom?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#063c28]">
              {user.prenom} {user.nom}
            </h2>

            <p className="text-gray-500 text-sm">
              Client e-commerce
            </p>
          </div>
        </div>

        {/* INFOS */}
        <div className="grid md:grid-cols-2 gap-6">

          <Info icon={<Mail size={18} />} label="Email" value={user.email} />
          <Info icon={<Phone size={18} />} label="Téléphone" value={user.numero} />
          <Info icon={<MapPin size={18} />} label="Adresse" value={user.adresse} />
          <Info icon={<Shield size={18} />} label="Rôle" value={user.role || "CLIENT"} />

          <Info
            icon={<Calendar size={18} />}
            label="Membre depuis"
            value={user.dateCreation || "Non disponible"}
          />
        </div>

        {/* SECURITY SECTION */}
        <div className="mt-10 bg-green-50 rounded-2xl p-4 text-sm text-green-700">
          🔒 Votre compte est sécurisé. Toutes vos informations sont protégées.
        </div>

        {/* LOGOUT */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENT ================= */
function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
      <div className="text-[#063c28]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">
          {value || "Non renseigné"}
        </p>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import api from "../../lib/api";
import {
  Star,
  Quote,
  MessageCircle,
  Users,
  CheckCircle,
} from "lucide-react";

export default function AvisUtilisateurs() {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  

console.log("API_URL =", API_URL);

  // ================= LOAD AVIS =================
  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const res = await api.get("/api/avis");
        setAvis(res.data || []);
        
       console.log("LOGIN RESPONSE =", res.data);
      } catch (err) {
        console.error("Erreur chargement avis", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvis();
  }, [API_URL]);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Décorations d'arrière-plan */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-green-100 text-[#063c28]
              font-semibold text-sm
              mb-6
            "
          >
            <MessageCircle size={16} className="text-yellow-500" />
            Témoignages clients
          </div>

          {/* Titre */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#063c28] mb-6 leading-tight">
            Ce que disent nos{" "}
            <span className="text-yellow-500">utilisateurs</span>
          </h2>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Découvrez les retours de nos clients satisfaits qui utilisent
            quotidiennement MaliSugu pour acheter et vendre en toute
            confiance.
          </p>

          {/* Statistiques */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-[#063c28] font-bold">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                4.9/5
              </div>
            </div>

            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-[#063c28] font-bold">
                <Users size={18} />
                {avis.length}+ avis
              </div>
            </div>

            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-[#063c28] font-bold">
                <CheckCircle size={18} className="text-green-500" />
                Clients satisfaits
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 border-4 border-green-200 border-t-[#063c28] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Chargement des avis...
            </p>
          </div>
        ) : (
          /* ================= GRID AVIS ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {avis.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="
                  relative bg-white/90 backdrop-blur-sm
                  p-8 rounded-3xl
                  border border-gray-100
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500
                "
              >
                {/* Icône citation */}
                <div
                  className="
                    absolute top-6 right-6
                    w-12 h-12 rounded-2xl
                    bg-green-50
                    flex items-center justify-center
                  "
                >
                  <Quote className="text-yellow-500" size={22} />
                </div>

                {/* Étoiles */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.note || 5)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Commentaire */}
                <p className="text-gray-600 italic leading-relaxed mb-8 line-clamp-5">
                  “{item.commentaire}”
                </p>

                {/* Utilisateur */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="
                      w-14 h-14 rounded-2xl
                      bg-gradient-to-br from-[#063c28] to-[#0a5a3d]
                      text-white font-bold text-lg
                      flex items-center justify-center
                      shadow-lg
                    "
                  >
                    {item.user?.prenom?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  {/* Infos */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.user?.prenom || "Utilisateur"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Utilisateur MaliSugu
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
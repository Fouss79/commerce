"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Carousel from "../Component/Carousel";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Send,
  Sparkles,
  Flame,
  Clock,
} from "lucide-react";

import api from "../../lib/api";
import ProductItem from "../Admin/produit/component/ProductItems";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [marques, setMarques] = useState([]);
  const [produitsVendus, setProduitsVendus] = useState([]);
  const [produitsRecents, setProduitsRecents] = useState([]);
  const [loading, setLoading] = useState(true);

const styles = `
  .ml-marquee-wrap{
    background:#3B1F3D; color:#F1E7D4;
    overflow:hidden; white-space:nowrap;
    border-bottom:1px solid rgba(241,231,212,0.15);
    position:relative; z-index:50;
  }
  .ml-marquee{ display:inline-flex; animation: ml-scroll 26s linear infinite; }
  .ml-marquee span{
    padding:9px 2.2rem; font-family:'JetBrains Mono', monospace; font-size:0.72rem;
    letter-spacing:0.14em; text-transform:uppercase; display:inline-flex; align-items:center; gap:0.6rem;
  }
  .ml-marquee span::after{content:"◆"; color:#D4F53E; font-size:0.6rem; margin-left:0.6rem;}
  @keyframes ml-scroll{ from{transform:translateX(0);} to{transform:translateX(-50%);} }
`;







  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, marqRes, vendusRes, recentsRes] = await Promise.all([
          api.get("/api/categorie").catch(() => ({ data: [] })),
          api.get("/api/produitss").catch(() => ({ data: [] })),
          api.get("/api/marque").catch(() => ({ data: [] })),
          api.get("/api/produitss/plus-vendus?limit=12").catch(() => ({ data: [] })),
          api.get("/api/produitss/recents?limit=12").catch(() => ({ data: [] })),
        ]);

        setCategories(catRes.data || []);
        setProduits(prodRes.data || []);
        setMarques(marqRes.data || []);
        setProduitsVendus(vendusRes.data || []);
        setProduitsRecents(recentsRes.data || []);
      } catch (error) {
        console.error("Erreur chargement accueil :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const produitsVedette = produits.slice(0, 12);

  return (
    <div className="pt-36 lg:pt-24 bg-white">

      {/* ================= HERO ================= */}
      <Carousel />
       <style>{styles}</style>
      <div className="ml-marquee-wrap">
        <div className="ml-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              SOLDES D'ÉTÉ — JUSQU'À -50%
              <span> </span>
              LIVRAISON OFFERTE DÈS 90€
              <span> </span>
              NOUVELLE COLLECTION
              <span> </span>
              RETOURS GRATUITS SOUS 30 JOURS
            </span>
          ))}
        </div>
      </div>


      {/* ================= CATÉGORIES POPULAIRES — fond crème/jaune doux ================= */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-yellow-600 font-semibold text-sm mb-1">
                Explorer par catégorie
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                Catégories populaires
              </h2>
            </div>

            <Link
              href="/categories"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-yellow-600 transition"
            >
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 w-28 md:w-32 shrink-0 bg-white rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune catégorie disponible.</p>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={3}
              loop={categories.length > 6}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 7 },
              }}
              className="!pb-2"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id}>
                  <Link
                    href={`/categorie/${cat.id}`}
                    className="
                      group relative flex flex-col items-center justify-center gap-3
                      p-5 rounded-3xl bg-white border border-amber-100
                      hover:border-yellow-400 hover:shadow-lg hover:-translate-y-1
                      transition-all duration-300
                    "
                  >
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center overflow-hidden group-hover:bg-yellow-400/20 transition">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.nom}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🛍️</span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-[#063c28] line-clamp-1">
                      {cat.nom}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* ================= PLUS VENDUS — fond orange/corail chaleureux ================= */}
      {produitsVendus.length > 0 && (
        <section className="bg-gradient-to-b from-orange-50 to-white py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-orange-600 font-semibold text-sm mb-1 flex items-center gap-2">
                  <Flame size={16} />
                  Tendance
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                  Les plus vendus
                </h2>
              </div>

              <Link
                href="/produits?tri=populaire"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-orange-600 transition"
              >
                Tout voir <ArrowRight size={16} />
              </Link>
            </div>

            <div
              className="
                flex gap-4 overflow-x-auto pb-4
                snap-x snap-mandatory
                scrollbar-hide
                -mx-6 px-6
              "
              style={{ scrollBehavior: "smooth" }}
            >
              {produitsVendus.map((p) => (
                <div
                  key={p.id}
                  className="shrink-0 snap-start w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] relative"
                >
                  <span className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow">
                    <Flame size={12} />
                    Best-seller
                  </span>
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= PLUS RÉCENTS — fond bleu/violet frais ================= */}
      {produitsRecents.length > 0 && (
        <section className="bg-gradient-to-b from-indigo-50 to-white py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-indigo-600 font-semibold text-sm mb-1 flex items-center gap-2">
                  <Clock size={16} />
                  Fraîchement arrivés
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                  Nouveautés
                </h2>
              </div>

              <Link
                href="/produits?tri=recent"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-indigo-600 transition"
              >
                Tout voir <ArrowRight size={16} />
              </Link>
            </div>

            <div
              className="
                flex gap-4 overflow-x-auto pb-4
                snap-x snap-mandatory
                scrollbar-hide
                -mx-6 px-6
              "
              style={{ scrollBehavior: "smooth" }}
            >
              {produitsRecents.map((p) => (
                <div
                  key={p.id}
                  className="shrink-0 snap-start w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] relative"
                >
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow">
                    Nouveau
                  </span>
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= PRODUITS EN VEDETTE — fond vert clair (identité marque) ================= */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-emerald-700 font-semibold text-sm mb-1">
                Sélection du moment
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                Produits en vedette
              </h2>
            </div>

            <Link
              href="/produits"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-emerald-700 transition"
            >
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 w-[45%] sm:w-[30%] md:w-[23%] shrink-0 bg-white rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : produitsVedette.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun produit disponible pour le moment.</p>
          ) : (
            <div
              className="
                flex gap-4 overflow-x-auto pb-4
                snap-x snap-mandatory
                scrollbar-hide
                -mx-6 px-6
              "
              style={{ scrollBehavior: "smooth" }}
            >
              {produitsVedette.map((p) => (
                <div key={p.id} className="shrink-0 snap-start w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%]">
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= POURQUOI NOUS CHOISIR — fond sombre (identité marque forte) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#063c28] via-[#0a5a3d] to-[#0d734b] py-14 md:py-20">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-white/5" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-yellow-400 font-semibold text-sm mb-1">
              Nos engagements
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Pourquoi choisir MaliSugu
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                icon: <ShieldCheck size={26} />,
                title: "Paiement sécurisé",
                desc: "Vos transactions sont protégées à 100%",
              },
              {
                icon: <Truck size={26} />,
                title: "Livraison rapide",
                desc: "Partout au Mali, en un temps record",
              },
              {
                icon: <RotateCcw size={26} />,
                title: "Retour facile",
                desc: "Remboursement sous 7 jours",
              },
              {
                icon: <Headphones size={26} />,
                title: "Support 7j/7",
                desc: "Une équipe à votre écoute",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  flex flex-col items-center text-center gap-3
                  p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10
                  hover:bg-white/15 hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-[#063c28] flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-bold text-white">{item.title}</p>
                <p className="text-sm text-green-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MARQUES PARTENAIRES — fond gris neutre épuré ================= */}
      {marques.length > 0 && (
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-gray-500 font-semibold text-sm mb-1">
                Ils nous font confiance
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                Marques partenaires
              </h2>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              loop={marques.length > 6}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {marques.map((m) => (
                <SwiperSlide key={m.id}>
                  <div className="flex items-center justify-center h-20 bg-white rounded-2xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.nom}
                        className="max-h-14 object-contain"
                      />
                    ) : (
                      <span className="font-bold text-gray-400">{m.nom}</span>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ================= NEWSLETTER / CTA — fond vert marque, section finale ================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="
              relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-[#063c28] via-[#0a5a3d] to-[#0d734b]
              px-8 py-12 md:px-16 md:py-16
              shadow-[0_20px_50px_rgba(6,60,40,0.25)]
              text-center
            "
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-white/5" />

            <div className="relative max-w-xl mx-auto space-y-5">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Ne manquez aucune bonne affaire
              </h2>
              <p className="text-green-100">
                Inscrivez-vous et recevez nos meilleures offres directement
                dans votre boîte mail.
              </p>

              <form className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 rounded-full p-2 border border-white/10">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 w-full bg-transparent px-4 py-2.5 text-white placeholder-green-200 outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-400 text-[#063c28] font-bold rounded-full hover:bg-yellow-300 transition"
                >
                  S'inscrire <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
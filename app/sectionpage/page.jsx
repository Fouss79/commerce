"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, marqRes, vendusRes, recentsRes] = await Promise.all([
          api.get("/api/categorie").catch(() => ({ data: [] })),
          api.get("/api/produitss").catch(() => ({ data: [] })),
          api.get("/api/marques").catch(() => ({ data: [] })),
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
    <div className="pt-36 lg:pt-24">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#063c28] via-[#0a5a3d] to-[#0d734b]">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-400/10 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-yellow-400 text-sm font-semibold">
              <Sparkles size={16} />
              La marketplace 100% malienne
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Achetez local,{" "}
              <span className="text-yellow-400">soutenez</span> nos
              vendeurs maliens
            </h1>

            <p className="text-green-100 text-base md:text-lg max-w-lg mx-auto md:mx-0">
              Des milliers de produits, des vendeurs vérifiés, une
              livraison rapide partout au Mali. Découvrez MaliSugu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/produits"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-yellow-400 text-[#063c28] font-bold hover:bg-yellow-300 transition shadow-lg"
              >
                Explorer les produits
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/vendeurs"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition"
              >
                Voir les boutiques
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="aspect-square rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/hero-illustration.png"
                alt="MaliSugu"
                className="w-full h-full object-contain p-8"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= CATÉGORIES POPULAIRES ================= */}
       {/* ================= CATÉGORIES POPULAIRES ================= */}
<section className="py-14 md:py-20">
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
        <div key={i} className="h-32 w-28 md:w-32 shrink-0 bg-gray-100 rounded-3xl animate-pulse" />
      ))}
    </div>
  ) : categories.length === 0 ? (
    <p className="text-gray-400 text-sm">Aucune catégorie disponible.</p>
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
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}`}
          className="
            shrink-0 snap-start
            group relative flex flex-col items-center justify-center gap-3
            w-28 md:w-32 p-5 rounded-3xl bg-gray-50 border border-gray-100
            hover:border-[#063c28]/30 hover:shadow-lg
            transition-all duration-300
            active:scale-95
          "
        >
          <div className="w-14 h-14 rounded-2xl bg-[#063c28]/10 flex items-center justify-center overflow-hidden group-hover:bg-yellow-400/20 transition">
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
      ))}
    </div>
  )}
</section>
        {/* ================= PLUS VENDUS ================= */}
        {produitsVendus.length > 0 && (
          <section className="py-6 md:py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-yellow-600 font-semibold text-sm mb-1 flex items-center gap-2">
                  <Flame size={16} />
                  Tendance
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                  Les plus vendus
                </h2>
              </div>

              <Link
                href="/produits?tri=populaire"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-yellow-600 transition"
              >
                Tout voir <ArrowRight size={16} />
              </Link>
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              navigation
              pagination={{ clickable: true }}
              className="pb-10"
            >
              {produitsVendus.map((p) => (
                <SwiperSlide key={p.id}>
                  <div className="relative">
                    <span className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-[#063c28] text-xs font-bold shadow">
                      <Flame size={12} />
                      Best-seller
                    </span>
                    <ProductItem product={p} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* ================= PLUS RÉCENTS ================= */}
        {produitsRecents.length > 0 && (
          <section className="py-6 md:py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-yellow-600 font-semibold text-sm mb-1 flex items-center gap-2">
                  <Clock size={16} />
                  Fraîchement arrivés
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                  Nouveautés
                </h2>
              </div>

              <Link
                href="/produits?tri=recent"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-yellow-600 transition"
              >
                Tout voir <ArrowRight size={16} />
              </Link>
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              navigation
              pagination={{ clickable: true }}
              className="pb-10"
            >
              {produitsRecents.map((p) => (
                <SwiperSlide key={p.id}>
                  <div className="relative">
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#063c28] text-white text-xs font-bold shadow">
                      Nouveau
                    </span>
                    <ProductItem product={p} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* ================= PRODUITS EN VEDETTE ================= */}
        <section className="py-6 md:py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-yellow-600 font-semibold text-sm mb-1">
                Sélection du moment
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                Produits en vedette
              </h2>
            </div>

            <Link
              href="/produits"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-yellow-600 transition"
            >
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : produitsVedette.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun produit disponible pour le moment.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              navigation
              pagination={{ clickable: true }}
              className="pb-10"
            >
              {produitsVedette.map((p) => (
                <SwiperSlide key={p.id}>
                  <ProductItem product={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

        {/* ================= POURQUOI NOUS CHOISIR ================= */}
        <section className="py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="text-yellow-600 font-semibold text-sm mb-1">
              Nos engagements
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
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
                  p-6 rounded-3xl bg-white border border-gray-100
                  shadow-sm hover:shadow-lg hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <div className="w-14 h-14 rounded-2xl bg-[#063c28] text-yellow-400 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= MARQUES PARTENAIRES ================= */}
        {marques.length > 0 && (
          <section className="py-14 md:py-20">
            <div className="text-center mb-10">
              <p className="text-yellow-600 font-semibold text-sm mb-1">
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
              loop
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {marques.map((m) => (
                <SwiperSlide key={m.id}>
                  <div className="flex items-center justify-center h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
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
          </section>
        )}

        {/* ================= NEWSLETTER / CTA ================= */}
        <section className="pb-20">
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
        </section>
      </div>
    </div>
  );
}